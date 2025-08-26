/*
  # Create mechanics table with authentication

  1. New Tables
    - `mechanics`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `username` (text, unique)
      - `name` (text)
      - `category` (text)
      - `state` (text)
      - `district` (text)
      - `village` (text)
      - `per_day_cost` (integer)
      - `contact_number` (text)
      - `email` (text)
      - `experience` (integer)
      - `description` (text)
      - `availability` (text)
      - `rating` (numeric)
      - `completed_jobs` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `mechanics` table
    - Add policies for authenticated users to manage their own data
    - Add policy for public read access to find mechanics
*/

CREATE TABLE IF NOT EXISTS mechanics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  state text NOT NULL,
  district text NOT NULL,
  village text NOT NULL,
  per_day_cost integer NOT NULL,
  contact_number text NOT NULL,
  email text NOT NULL,
  experience integer NOT NULL DEFAULT 0,
  description text NOT NULL,
  availability text NOT NULL DEFAULT 'available',
  rating numeric DEFAULT 0,
  completed_jobs integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE mechanics ENABLE ROW LEVEL SECURITY;

-- Policy for public read access (anyone can view mechanics)
CREATE POLICY "Anyone can view mechanics"
  ON mechanics
  FOR SELECT
  TO public
  USING (true);

-- Policy for authenticated users to insert their own data
CREATE POLICY "Users can insert their own mechanic profile"
  ON mechanics
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own data
CREATE POLICY "Users can update their own mechanic profile"
  ON mechanics
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to delete their own data
CREATE POLICY "Users can delete their own mechanic profile"
  ON mechanics
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_mechanics_user_id ON mechanics(user_id);
CREATE INDEX IF NOT EXISTS idx_mechanics_username ON mechanics(username);
CREATE INDEX IF NOT EXISTS idx_mechanics_state_district ON mechanics(state, district);
CREATE INDEX IF NOT EXISTS idx_mechanics_category ON mechanics(category);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_mechanics_updated_at
  BEFORE UPDATE ON mechanics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();