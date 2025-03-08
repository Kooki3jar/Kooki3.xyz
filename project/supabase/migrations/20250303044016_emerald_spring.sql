/*
  # Add Store Items Table and Fix Relationships

  1. New Tables
    - `store_items` - Stores product/item information for each store
      - `id` (uuid, primary key)
      - `store_id` (uuid, foreign key to stores)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `category` (text)
      - `images` (text[])
      - `in_stock` (boolean)
      - `quantity` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on store_items table
    - Add policies for public viewing and owner management
*/

-- Create store_items table
CREATE TABLE public.store_items (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    store_id uuid REFERENCES public.stores(id) ON DELETE CASCADE NOT NULL,
    name text NOT NULL,
    description text,
    price numeric(10,2) NOT NULL CHECK (price >= 0),
    category text NOT NULL,
    images text[] DEFAULT '{}',
    in_stock boolean DEFAULT true,
    quantity integer DEFAULT 0 CHECK (quantity >= 0),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.store_items ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for store_items
CREATE POLICY "Public can view items from active stores"
    ON public.store_items
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.stores s
            WHERE s.id = store_id
            AND s.status = 'active'
            AND s.is_open = true
        )
    );

CREATE POLICY "Store owners can manage their items"
    ON public.store_items
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.stores s
            WHERE s.id = store_id
            AND s.owner_id = auth.uid()
        )
    );

-- Create updated_at trigger
CREATE TRIGGER handle_store_items_updated_at
    BEFORE UPDATE ON public.store_items
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

-- Create indexes
CREATE INDEX idx_store_items_store ON public.store_items(store_id);
CREATE INDEX idx_store_items_category ON public.store_items(category);
CREATE INDEX idx_store_items_in_stock ON public.store_items(in_stock);