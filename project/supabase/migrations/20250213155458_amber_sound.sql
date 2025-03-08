/*
  # Fix Profile Permissions

  1. Changes
    - Add INSERT policy for profiles table
    - Update SELECT policy to allow anonymous access
    - Add explicit policies for authenticated users

  2. Security
    - Maintains RLS
    - Adds proper policies for all operations
    - Ensures anonymous access for public profiles
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON public.profiles;

-- Create comprehensive policies for profiles table
CREATE POLICY "Profiles are viewable by everyone" 
  ON public.profiles FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own profile" 
  ON public.profiles FOR DELETE 
  USING (auth.uid() = user_id);

-- Ensure RLS is enabled
ALTER TABLE public.profiles FORCE ROW LEVEL SECURITY;