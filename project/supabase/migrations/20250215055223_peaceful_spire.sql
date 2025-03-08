/*
  # Fix Profiles RLS Policies

  1. Changes
    - Drop existing RLS policies
    - Create new policies with proper public access
    - Add insert policy for auth users
  
  2. Security
    - Enable RLS
    - Allow public read access
    - Restrict write operations to authenticated users
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can delete own profile" ON public.profiles;

-- Create new policies with proper access control
CREATE POLICY "Allow public read access"
  ON public.profiles
  FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated users to insert their own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update their own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Allow users to delete their own profile"
  ON public.profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Ensure RLS is enabled
ALTER TABLE public.profiles FORCE ROW LEVEL SECURITY;