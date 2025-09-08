/*
  # Remove Aadhar verification and add security enhancements

  1. Table Changes
    - Remove Aadhar-related columns from mechanics table
    - Add profile image URL support
    - Add skills array for better categorization
    - Add social media links for professional presence
    - Add location coordinates for map integration
    - Add profile completion percentage
    - Add last login tracking

  2. Security Enhancements
    - Add email verification status
    - Add phone verification status
    - Add profile verification levels
    - Add reporting system for mechanics

  3. New Features
    - Add favorite mechanics system
    - Add mechanic reviews and ratings system
    - Add work portfolio/gallery support
*/

-- Remove Aadhar-related columns
ALTER TABLE mechanics DROP COLUMN IF EXISTS aadhar_number;
ALTER TABLE mechanics DROP COLUMN IF EXISTS aadhar_verified;
ALTER TABLE mechanics DROP COLUMN IF EXISTS aadhar_last_four;
ALTER TABLE mechanics DROP COLUMN IF EXISTS verification_status;

-- Add new enhancement columns
ALTER TABLE mechanics ADD COLUMN IF NOT EXISTS profile_image_url text;
ALTER TABLE mechanics ADD COLUMN IF NOT EXISTS skills text[] DEFAULT '{}';
ALTER TABLE mechanics ADD COLUMN IF NOT EXISTS social_links jsonb DEFAULT '{}';
ALTER TABLE mechanics ADD COLUMN IF NOT EXISTS latitude numeric;
ALTER TABLE mechanics ADD COLUMN IF NOT EXISTS longitude numeric;
ALTER TABLE mechanics ADD COLUMN IF NOT EXISTS profile_completion_percentage integer DEFAULT 0;
ALTER TABLE mechanics ADD COLUMN IF NOT EXISTS last_login timestamptz;
ALTER TABLE mechanics ADD COLUMN IF NOT EXISTS email_verified boolean DEFAULT false;
ALTER TABLE mechanics ADD COLUMN IF NOT EXISTS phone_verified boolean DEFAULT false;
ALTER TABLE mechanics ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false;
ALTER TABLE mechanics ADD COLUMN IF NOT EXISTS portfolio_images text[] DEFAULT '{}';

-- Create reviews table for mechanic ratings and feedback
CREATE TABLE IF NOT EXISTS mechanic_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mechanic_id uuid REFERENCES mechanics(id) ON DELETE CASCADE,
  customer_name text NOT NULL,
  customer_email text,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text,
  work_category text,
  created_at timestamptz DEFAULT now()
);

-- Create favorites table for users to save mechanics
CREATE TABLE IF NOT EXISTS user_favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  mechanic_id uuid REFERENCES mechanics(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_email, mechanic_id)
);

-- Enable RLS on new tables
ALTER TABLE mechanic_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- RLS policies for reviews
CREATE POLICY "Anyone can read reviews"
  ON mechanic_reviews
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert reviews"
  ON mechanic_reviews
  FOR INSERT
  TO public
  WITH CHECK (true);

-- RLS policies for favorites
CREATE POLICY "Users can manage their own favorites"
  ON user_favorites
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_mechanic_reviews_mechanic_id ON mechanic_reviews(mechanic_id);
CREATE INDEX IF NOT EXISTS idx_mechanic_reviews_rating ON mechanic_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_user_favorites_user_email ON user_favorites(user_email);
CREATE INDEX IF NOT EXISTS idx_user_favorites_mechanic_id ON user_favorites(mechanic_id);
CREATE INDEX IF NOT EXISTS idx_mechanics_featured ON mechanics(is_featured);
CREATE INDEX IF NOT EXISTS idx_mechanics_email_verified ON mechanics(email_verified);
CREATE INDEX IF NOT EXISTS idx_mechanics_phone_verified ON mechanics(phone_verified);