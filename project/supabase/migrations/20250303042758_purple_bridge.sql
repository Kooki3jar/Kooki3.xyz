/*
  # Store Marketplace Schema

  1. New Tables
    - `stores`
      - `id` (uuid, primary key)
      - `owner_id` (uuid, references auth.users)
      - `name` (text)
      - `description` (text)
      - `status` (enum: active, inactive, vacation)
      - `is_open` (boolean)
      - `is_physical` (boolean) 
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `store_settings`
      - `store_id` (uuid, references stores)
      - `vacation_start` (timestamptz)
      - `vacation_end` (timestamptz)
      - `show_location` (boolean)
      - `show_hours` (boolean)
      - `show_policies` (boolean)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for store owners
    - Add policies for public marketplace access
*/

-- Create store status enum
CREATE TYPE store_status AS ENUM ('active', 'inactive', 'vacation');

-- Create stores table
CREATE TABLE public.stores (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name text NOT NULL,
    description text,
    status store_status DEFAULT 'inactive',
    is_open boolean DEFAULT false,
    is_physical boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create store settings table
CREATE TABLE public.store_settings (
    store_id uuid PRIMARY KEY REFERENCES public.stores(id) ON DELETE CASCADE,
    vacation_start timestamptz,
    vacation_end timestamptz,
    show_location boolean DEFAULT true,
    show_hours boolean DEFAULT true,
    show_policies boolean DEFAULT true,
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT valid_vacation_dates CHECK (
        (vacation_start IS NULL AND vacation_end IS NULL) OR
        (vacation_start IS NOT NULL AND vacation_end IS NOT NULL AND vacation_end > vacation_start)
    )
);

-- Enable RLS
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for stores
CREATE POLICY "Public can view active and open stores"
    ON public.stores
    FOR SELECT
    USING (
        status = 'active' 
        AND is_open = true 
        AND (
            SELECT s.vacation_start IS NULL 
            FROM public.store_settings s 
            WHERE s.store_id = id
        )
    );

CREATE POLICY "Store owners can view their own stores"
    ON public.stores
    FOR SELECT
    USING (auth.uid() = owner_id);

CREATE POLICY "Store owners can update their own stores"
    ON public.stores
    FOR UPDATE
    USING (auth.uid() = owner_id);

CREATE POLICY "Store owners can delete their own stores"
    ON public.stores
    FOR DELETE
    USING (auth.uid() = owner_id);

CREATE POLICY "Authenticated users can create stores"
    ON public.stores
    FOR INSERT
    WITH CHECK (auth.uid() = owner_id);

-- Create RLS Policies for store settings
CREATE POLICY "Public can view settings of active stores"
    ON public.store_settings
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.stores s
            WHERE s.id = store_id
            AND s.status = 'active'
            AND s.is_open = true
        )
    );

CREATE POLICY "Store owners can manage their store settings"
    ON public.store_settings
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.stores s
            WHERE s.id = store_id
            AND s.owner_id = auth.uid()
        )
    );

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER handle_stores_updated_at
    BEFORE UPDATE ON public.stores
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_store_settings_updated_at
    BEFORE UPDATE ON public.store_settings
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

-- Create function to handle new store creation
CREATE OR REPLACE FUNCTION handle_new_store()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.store_settings (store_id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for new store settings
CREATE TRIGGER on_store_created
    AFTER INSERT ON public.stores
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_store();

-- Create indexes
CREATE INDEX idx_stores_owner ON public.stores(owner_id);
CREATE INDEX idx_stores_status ON public.stores(status);
CREATE INDEX idx_stores_is_open ON public.stores(is_open);
CREATE INDEX idx_store_settings_vacation ON public.store_settings(vacation_start, vacation_end);