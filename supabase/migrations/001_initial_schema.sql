-- Villa Gloria al Padre – Initial Database Schema
-- Run this in Supabase SQL Editor

-- Saisonpreise
CREATE TABLE seasons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  price_per_night_house INTEGER NOT NULL, -- Cent (z.B. 33000 = 330€)
  price_per_night_apt INTEGER,            -- Poolwohnung-Preis (nur Nebensaison)
  min_nights INTEGER DEFAULT 7,
  apt_available BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Buchungen
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_number TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  property_type TEXT NOT NULL,

  -- Zeitraum
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  nights INTEGER GENERATED ALWAYS AS (check_out - check_in) STORED,

  -- Gäste
  guests_adults INTEGER NOT NULL DEFAULT 2,
  guests_children INTEGER DEFAULT 0,
  has_pet BOOLEAN DEFAULT false,

  -- Gast-Daten
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT,
  guest_country TEXT,
  guest_message TEXT,
  guest_language TEXT DEFAULT 'de',

  -- Preise (in Cent)
  price_per_night INTEGER NOT NULL,
  total_accommodation INTEGER NOT NULL,
  cleaning_fee INTEGER DEFAULT 0,
  pet_fee INTEGER DEFAULT 0,
  total_price INTEGER NOT NULL,
  deposit_amount INTEGER NOT NULL,
  deposit_paid BOOLEAN DEFAULT false,
  remaining_amount INTEGER NOT NULL,
  remaining_paid BOOLEAN DEFAULT false,

  -- Stripe
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,

  -- Kaution
  deposit_security INTEGER DEFAULT 40000,

  -- Quelle
  source TEXT DEFAULT 'website',
  external_ref TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  confirmed_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ
);

-- Blockierte Zeiträume
CREATE TABLE blocked_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT,
  source TEXT,
  ical_uid TEXT,
  property_type TEXT DEFAULT 'house',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- iCal-Sync Quellen
CREATE TABLE ical_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  property_type TEXT DEFAULT 'house',
  last_synced_at TIMESTAMPTZ,
  sync_errors TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- E-Mail-Log
CREATE TABLE email_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id),
  email_type TEXT NOT NULL,
  recipient TEXT NOT NULL,
  subject TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'sent',
  error TEXT
);

-- Gästebewertungen
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name TEXT NOT NULL,
  guest_location TEXT,
  date DATE NOT NULL,
  rating DECIMAL(2,1) NOT NULL,
  rating_equipment DECIMAL(2,1),
  rating_value DECIMAL(2,1),
  rating_service DECIMAL(2,1),
  rating_location DECIMAL(2,1),
  rating_cleanliness DECIMAL(2,1),
  title TEXT,
  text TEXT NOT NULL,
  recommended_for TEXT[],
  source TEXT DEFAULT 'ferienhausmiete',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_bookings_dates ON bookings(check_in, check_out);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_property ON bookings(property_type);
CREATE INDEX idx_blocked_dates_dates ON blocked_dates(start_date, end_date);
CREATE INDEX idx_blocked_dates_property ON blocked_dates(property_type);
CREATE INDEX idx_blocked_dates_ical_uid ON blocked_dates(ical_uid);
CREATE INDEX idx_email_log_booking ON email_log(booking_id);
CREATE INDEX idx_email_log_type ON email_log(email_type);

-- Row Level Security
ALTER TABLE seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE ical_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Public read access for seasons and reviews
CREATE POLICY "seasons_public_read" ON seasons FOR SELECT USING (true);
CREATE POLICY "reviews_public_read" ON reviews FOR SELECT USING (true);

-- Public read access for blocked_dates (needed for availability calendar)
CREATE POLICY "blocked_dates_public_read" ON blocked_dates FOR SELECT USING (true);

-- Service role has full access (API routes use service role key)
-- No additional policies needed for service role as it bypasses RLS
