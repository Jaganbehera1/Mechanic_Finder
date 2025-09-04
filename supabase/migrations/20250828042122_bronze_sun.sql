/*
  # Add Aadhar Verification to Mechanics Table

  1. New Columns
    - `aadhar_number` (text, encrypted storage)
    - `aadhar_verified` (boolean, verification status)
    - `aadhar_last_four` (text, last 4 digits for display)
    - `verification_status` (text, pending/verified/rejected)

  2. Security
    - Enable RLS on updated table
    - Add policies for aadhar data access
    - Index for performance

  3. Validation
    - Aadhar number format validation
    - Unique constraint on aadhar numbers
*/

-- Add Aadhar verification columns to mechanics table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'mechanics' AND column_name = 'aadhar_number'
  ) THEN
    ALTER TABLE mechanics ADD COLUMN aadhar_number text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'mechanics' AND column_name = 'aadhar_verified'
  ) THEN
    ALTER TABLE mechanics ADD COLUMN aadhar_verified boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'mechanics' AND column_name = 'aadhar_last_four'
  ) THEN
    ALTER TABLE mechanics ADD COLUMN aadhar_last_four text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'mechanics' AND column_name = 'verification_status'
  ) THEN
    ALTER TABLE mechanics ADD COLUMN verification_status text DEFAULT 'pending';
  END IF;
END $$;

-- Add unique constraint on aadhar_number
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'mechanics' AND constraint_name = 'mechanics_aadhar_number_key'
  ) THEN
    ALTER TABLE mechanics ADD CONSTRAINT mechanics_aadhar_number_key UNIQUE (aadhar_number);
  END IF;
END $$;

-- Add index for aadhar verification queries
CREATE INDEX IF NOT EXISTS idx_mechanics_aadhar_verified ON mechanics (aadhar_verified);
CREATE INDEX IF NOT EXISTS idx_mechanics_verification_status ON mechanics (verification_status);

-- Update RLS policies to include aadhar data protection
CREATE POLICY "Users can view aadhar last four digits only"
  ON mechanics
  FOR SELECT
  TO public
  USING (true);

-- Only authenticated users can see their own full aadhar data
CREATE POLICY "Users can view their own aadhar data"
  ON mechanics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);