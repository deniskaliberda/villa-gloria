-- Villa Gloria – Booking Approval Flow
-- Adds owner approval step before confirming bookings

-- Approval token for secure email links
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS approval_token UUID DEFAULT gen_random_uuid();

-- Approval tracking
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS rejected_at TIMESTAMPTZ;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

-- New status values: awaiting_approval, confirmed, rejected
-- (status is TEXT, no enum constraint to update)

-- Index for approval token lookups
CREATE INDEX IF NOT EXISTS idx_bookings_approval_token ON bookings(approval_token);
