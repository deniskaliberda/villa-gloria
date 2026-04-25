-- Lead-Attribution-Erweiterung der bestehenden bookings-Tabelle.
-- Bisher hat /api/booking nichts persistiert (nur Email an Wieland). Jetzt landet
-- jede Anfrage als status='pending' in bookings + wird beim approve/reject geupdated.
--
-- Diese Migration ergaenzt nur Attribution-Felder auf der bestehenden Tabelle.
-- Keine destruktiven Aenderungen, keine Drops. Idempotent.

alter table bookings
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists referrer text,
  add column if not exists user_agent text,
  add column if not exists ip_hash text;

create index if not exists bookings_status_idx on bookings (status);
create index if not exists bookings_created_at_idx on bookings (created_at desc);
create index if not exists bookings_email_idx on bookings (lower(guest_email));
create index if not exists bookings_utm_source_idx on bookings (utm_source) where utm_source is not null;

-- Funnel-View fuer einfache Auswertung pro Tag + Status + Source
create or replace view bookings_funnel_summary as
select
  date_trunc('day', created_at)::date as day,
  status,
  coalesce(utm_source, source, 'unknown') as source,
  count(*) as count,
  sum(deposit_amount) / 100.0 as deposit_eur,
  sum(total_price) / 100.0 as total_eur
from bookings
group by 1, 2, 3
order by 1 desc, 2, 3;

comment on column bookings.utm_source is 'utm_source from inquiry URL — paid_search, organic, direct, etc.';
comment on column bookings.ip_hash is 'SHA256 prefix of inquirer IP for spam dedup; no raw IP stored';
comment on column bookings.referrer is 'document.referrer at form submit time';
