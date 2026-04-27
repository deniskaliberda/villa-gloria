-- Marens Saison-Definition (2026-04-24 via Denis):
-- Vorsaison = 15. April - 31. Mai (Apartment separat OK)
-- Nachsaison = 15. September - 31. Oktober (Apartment separat OK)
-- Hochsaison = Juli/August (Apartment NICHT separat, nur Teil des Gesamthauses)
-- Übergänge + Nebensaison = Apartment auch nicht separat
--
-- Ersetzt die 6 Saisons aus 002_seed_seasons.sql, die Marens neue Regel
-- noch nicht abbildeten (z.B. Juni hatte apt_available=true, Nachsaison
-- begann am 01.09. statt 15.09.).

DELETE FROM seasons WHERE start_date BETWEEN '2025-11-01' AND '2026-12-31';

INSERT INTO seasons (name, start_date, end_date, price_per_night_house, price_per_night_apt, min_nights, apt_available) VALUES
  ('Nebensaison',         '2025-11-01', '2026-04-14', 25000, NULL,  6, false),
  ('Vorsaison',           '2026-04-15', '2026-05-31', 38000, 21000, 5, true),
  ('Übergangszeit Juni',  '2026-06-01', '2026-06-30', 38000, NULL,  6, false),
  ('Hochsaison',          '2026-07-01', '2026-08-31', 45000, NULL,  7, false),
  ('Übergangszeit Sept',  '2026-09-01', '2026-09-14', 38000, NULL,  6, false),
  ('Nachsaison',          '2026-09-15', '2026-10-31', 38000, 21000, 5, true);
