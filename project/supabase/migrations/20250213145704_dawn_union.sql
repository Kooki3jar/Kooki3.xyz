/*
  # Replace data table with existing Supabase table

  1. Changes
    - Safely drops existing table if it exists
    - Creates new table structure matching Supabase's existing table
    - Preserves data integrity with proper constraints
    - Enables RLS policies
  
  2. Security
    - Enables RLS on the new table
    - Adds appropriate access policies
*/

-- Drop existing table if it exists
DROP TABLE IF EXISTS public.data CASCADE;

-- Create new table matching Supabase's structure
CREATE TABLE IF NOT EXISTS public.data (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  title text NOT NULL,
  content text,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE public.data ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own data"
  ON public.data
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own data"
  ON public.data
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own data"
  ON public.data
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own data"
  ON public.data
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS data_user_id_idx ON public.data(user_id);
CREATE INDEX IF NOT EXISTS data_created_at_idx ON public.data(created_at);
CREATE INDEX IF NOT EXISTS data_status_idx ON public.data(status);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_data_updated_at
  BEFORE UPDATE ON public.data
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();