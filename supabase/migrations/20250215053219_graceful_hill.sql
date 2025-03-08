-- Function to check if a policy exists
CREATE OR REPLACE FUNCTION policy_exists(
  policy_name text,
  table_name text
) RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE policyname = policy_name
    AND tablename = table_name
  );
END;
$$ LANGUAGE plpgsql;

-- Drop policies only if they exist
DO $$ 
BEGIN
  -- Drop old policies if they exist
  IF policy_exists('Public profiles are viewable by everyone', 'profiles') THEN
    DROP POLICY "Public profiles are viewable by everyone" ON public.profiles;
  END IF;
  
  IF policy_exists('Users can update their own profile', 'profiles') THEN
    DROP POLICY "Users can update their own profile" ON public.profiles;
  END IF;
  
  IF policy_exists('Users can delete their own profile', 'profiles') THEN
    DROP POLICY "Users can delete their own profile" ON public.profiles;
  END IF;
  
  -- Drop new policy names if they exist
  IF policy_exists('Profiles are viewable by everyone', 'profiles') THEN
    DROP POLICY "Profiles are viewable by everyone" ON public.profiles;
  END IF;
  
  IF policy_exists('Users can insert their own profile', 'profiles') THEN
    DROP POLICY "Users can insert their own profile" ON public.profiles;
  END IF;
  
  IF policy_exists('Users can update own profile', 'profiles') THEN
    DROP POLICY "Users can update own profile" ON public.profiles;
  END IF;
  
  IF policy_exists('Users can delete own profile', 'profiles') THEN
    DROP POLICY "Users can delete own profile" ON public.profiles;
  END IF;
END $$;

-- Create new policies
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