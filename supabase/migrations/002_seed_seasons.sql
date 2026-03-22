-- Seed: Season pricing for Villa Gloria al Padre
-- Prices in cents

INSERT INTO seasons (name, start_date, end_date, price_per_night_house, price_per_night_apt, min_nights, apt_available) VALUES
  ('Hochsaison',  '2026-07-01', '2026-08-31', 45000, NULL,  7, false),
  ('Vorsaison',   '2026-06-01', '2026-06-30', 38000, 12000, 5, true),
  ('Nachsaison',  '2026-09-01', '2026-09-30', 38000, 12000, 5, true),
  ('Zwischensaison Frühling', '2026-04-01', '2026-05-31', 33000, 12000, 6, true),
  ('Zwischensaison Herbst',   '2026-10-01', '2026-10-31', 33000, 12000, 6, true),
  ('Nebensaison', '2025-11-01', '2026-03-31', 25000, 9000,  6, true);

-- Note: Seasons for the next year should be added when pricing is confirmed
-- Hochsaison: 450€/night (house only)
-- Vor/Nachsaison: 380€/night (house only)
-- Zwischensaison: 330€/night house, 120€/night apartment
-- Nebensaison: 250€/night house, 90€/night apartment
