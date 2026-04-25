-- Lead-Tracking-Tabelle fuer Villa Gloria
-- Jeder ausgefuellte Buchungs-Funnel-Schritt landet hier — egal ob er Email-Send schafft oder nicht.
-- Audit-Trail fuer Conversion-Funnel-Analyse.

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  booking_number text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Funnel-Status
  status text not null default 'inquiry'
    check (status in ('inquiry', 'approved', 'rejected', 'deposit_paid', 'fully_paid', 'cancelled', 'expired', 'spam')),

  -- Property + Dates
  property text not null check (property in ('haus', 'apartment')),
  check_in date not null,
  check_out date not null,
  nights integer generated always as (check_out - check_in) stored,

  -- Guest count
  guests_adults integer not null check (guests_adults >= 0),
  guests_children integer not null default 0 check (guests_children >= 0),
  has_pet boolean not null default false,

  -- Guest contact
  guest_name text not null,
  guest_email text not null,
  guest_phone text,
  guest_message text,

  -- Tracking + Source
  source text,           -- 'organic' | 'paid_search' | 'direct' | 'referral' | etc
  utm_source text,
  utm_medium text,
  utm_campaign text,
  user_agent text,
  ip_hash text,          -- SHA256 of IP for spam dedup, no raw PII

  -- Approve/Reject
  approved_at timestamptz,
  rejected_at timestamptz,
  reject_reason text,

  -- Stripe
  stripe_session_id text,
  stripe_payment_intent_id text,
  deposit_amount_cents integer,
  total_amount_cents integer,

  -- Internal notes
  notes text
);

create index if not exists leads_status_idx on leads (status);
create index if not exists leads_check_in_idx on leads (check_in);
create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists leads_email_idx on leads (lower(guest_email));

create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists leads_set_updated_at on leads;
create trigger leads_set_updated_at
  before update on leads
  for each row execute function set_updated_at();

-- RLS: only service role can read/write. Keine public access.
alter table leads enable row level security;

-- Eine View fuer schnelle Funnel-Auswertung — service-role-only.
create or replace view leads_funnel_summary as
select
  date_trunc('day', created_at)::date as day,
  status,
  count(*) as count,
  sum(deposit_amount_cents) / 100.0 as deposit_eur,
  sum(total_amount_cents) / 100.0 as total_eur
from leads
group by 1, 2
order by 1 desc, 2;

comment on table leads is 'Villa Gloria booking funnel — every inquiry persisted, even if email-send fails.';
comment on column leads.status is 'inquiry → approved/rejected → deposit_paid → fully_paid';
comment on column leads.ip_hash is 'SHA256 of IP for dedup; no raw IP stored';
