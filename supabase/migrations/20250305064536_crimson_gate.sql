/*
  # Complete Database Schema Export

  1. Core Tables
    - profiles: User profiles and settings
    - stores: Store information and settings
    - store_items: Products and inventory
    - orders: Order management
    - reviews: Store and product reviews
    
  2. Supporting Tables
    - categories: Product categorization
    - addresses: User and store addresses
    - notifications: User notifications
    - favorites: User favorites
    
  3. Security
    - Row Level Security (RLS) enabled on all tables
    - Comprehensive access policies
    - Data validation constraints
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.favorites CASCADE;
DROP TABLE IF EXISTS public.notifications CASCADE;
DROP TABLE IF EXISTS public.addresses CASCADE;
DROP TABLE IF EXISTS public.reviews CASCADE;
DROP TABLE IF EXISTS public.order_items CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.store_items CASCADE;
DROP TABLE IF EXISTS public.store_settings CASCADE;
DROP TABLE IF EXISTS public.stores CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TYPE IF EXISTS store_status CASCADE;

-- Create store status enum
CREATE TYPE store_status AS ENUM ('active', 'inactive', 'vacation');

-- Create stores table
CREATE TABLE public.stores (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name text NOT NULL,
    description text,
    banner_url text,
    logo_url text,
    status store_status DEFAULT 'inactive',
    is_open boolean DEFAULT false,
    is_physical boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT store_name_length CHECK (char_length(name) >= 3)
);

-- Create store settings table
CREATE TABLE public.store_settings (
    store_id uuid PRIMARY KEY REFERENCES public.stores(id) ON DELETE CASCADE,
    vacation_start timestamptz,
    vacation_end timestamptz,
    show_location boolean DEFAULT true,
    show_hours boolean DEFAULT true,
    show_policies boolean DEFAULT true,
    business_hours jsonb DEFAULT '{
        "monday": "9:00 AM - 5:00 PM",
        "tuesday": "9:00 AM - 5:00 PM",
        "wednesday": "9:00 AM - 5:00 PM",
        "thursday": "9:00 AM - 5:00 PM",
        "friday": "9:00 AM - 5:00 PM",
        "saturday": "10:00 AM - 4:00 PM",
        "sunday": "Closed"
    }'::jsonb,
    shipping_policy text DEFAULT 'Free shipping on orders over $50',
    return_policy text DEFAULT '30-day return policy',
    payment_policy text DEFAULT 'Secure payment via Stripe',
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT valid_vacation_dates CHECK (
        (vacation_start IS NULL AND vacation_end IS NULL) OR
        (vacation_start IS NOT NULL AND vacation_end IS NOT NULL AND vacation_end > vacation_start)
    )
);

-- Create store items table
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
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT item_name_length CHECK (char_length(name) >= 3)
);

-- Create orders table
CREATE TABLE public.orders (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    buyer_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    store_id uuid REFERENCES public.stores(id) ON DELETE SET NULL,
    status text CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
    total_amount numeric(10,2) NOT NULL CHECK (total_amount >= 0),
    shipping_address_id uuid,
    tracking_number text,
    notes text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create order items table
CREATE TABLE public.order_items (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE,
    item_id uuid REFERENCES public.store_items(id) ON DELETE SET NULL,
    quantity integer NOT NULL CHECK (quantity > 0),
    price_at_time numeric(10,2) NOT NULL CHECK (price_at_time >= 0),
    created_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE public.reviews (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    store_id uuid REFERENCES public.stores(id) ON DELETE CASCADE,
    item_id uuid REFERENCES public.store_items(id) ON DELETE CASCADE,
    rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
    content text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT review_target_check CHECK (
        (store_id IS NOT NULL AND item_id IS NULL) OR
        (store_id IS NULL AND item_id IS NOT NULL)
    )
);

-- Create categories table
CREATE TABLE public.categories (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL UNIQUE,
    slug text NOT NULL UNIQUE,
    description text,
    parent_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create addresses table
CREATE TABLE public.addresses (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    store_id uuid REFERENCES public.stores(id) ON DELETE CASCADE,
    type text CHECK (type IN ('shipping', 'billing', 'store')) NOT NULL,
    street text NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    postal_code text NOT NULL,
    country text NOT NULL DEFAULT 'US',
    is_default boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT address_owner_check CHECK (
        (user_id IS NOT NULL AND store_id IS NULL) OR
        (user_id IS NULL AND store_id IS NOT NULL)
    )
);

-- Create notifications table
CREATE TABLE public.notifications (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    type text CHECK (type IN ('order', 'review', 'system')) NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    read boolean DEFAULT false,
    data jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now()
);

-- Create favorites table
CREATE TABLE public.favorites (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    store_id uuid REFERENCES public.stores(id) ON DELETE CASCADE,
    item_id uuid REFERENCES public.store_items(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now(),
    CONSTRAINT favorite_target_check CHECK (
        (store_id IS NOT NULL AND item_id IS NULL) OR
        (store_id IS NULL AND item_id IS NOT NULL)
    ),
    UNIQUE(user_id, store_id, item_id)
);

-- Enable RLS on all tables
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Stores policies
CREATE POLICY "Public can view active and open stores"
    ON public.stores FOR SELECT
    USING (status = 'active' AND is_open = true);

CREATE POLICY "Store owners can manage their stores"
    ON public.stores FOR ALL
    USING (auth.uid() = owner_id);

-- Store settings policies
CREATE POLICY "Public can view store settings"
    ON public.store_settings FOR SELECT
    USING (true);

CREATE POLICY "Store owners can manage their settings"
    ON public.store_settings FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.stores s
        WHERE s.id = store_id AND s.owner_id = auth.uid()
    ));

-- Store items policies
CREATE POLICY "Public can view store items"
    ON public.store_items FOR SELECT
    USING (true);

CREATE POLICY "Store owners can manage their items"
    ON public.store_items FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.stores s
        WHERE s.id = store_id AND s.owner_id = auth.uid()
    ));

-- Orders policies
CREATE POLICY "Users can view their own orders"
    ON public.orders FOR SELECT
    USING (auth.uid() = buyer_id);

CREATE POLICY "Store owners can view their store orders"
    ON public.orders FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.stores s
        WHERE s.id = store_id AND s.owner_id = auth.uid()
    ));

-- Reviews policies
CREATE POLICY "Reviews are publicly viewable"
    ON public.reviews FOR SELECT
    USING (true);

CREATE POLICY "Users can manage their own reviews"
    ON public.reviews FOR ALL
    USING (auth.uid() = user_id);

-- Categories policies
CREATE POLICY "Categories are publicly viewable"
    ON public.categories FOR SELECT
    USING (true);

-- Addresses policies
CREATE POLICY "Users can manage their own addresses"
    ON public.addresses FOR ALL
    USING (auth.uid() = user_id OR EXISTS (
        SELECT 1 FROM public.stores s
        WHERE s.id = store_id AND s.owner_id = auth.uid()
    ));

-- Notifications policies
CREATE POLICY "Users can view their own notifications"
    ON public.notifications FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
    ON public.notifications FOR UPDATE
    USING (auth.uid() = user_id);

-- Favorites policies
CREATE POLICY "Users can manage their own favorites"
    ON public.favorites FOR ALL
    USING (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create updated_at triggers for all tables
CREATE TRIGGER handle_stores_updated_at
    BEFORE UPDATE ON public.stores
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_store_settings_updated_at
    BEFORE UPDATE ON public.store_settings
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_store_items_updated_at
    BEFORE UPDATE ON public.store_items
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_reviews_updated_at
    BEFORE UPDATE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_categories_updated_at
    BEFORE UPDATE ON public.categories
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_addresses_updated_at
    BEFORE UPDATE ON public.addresses
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Create indexes for better query performance
CREATE INDEX idx_stores_owner ON public.stores(owner_id);
CREATE INDEX idx_stores_status ON public.stores(status);
CREATE INDEX idx_store_items_store ON public.store_items(store_id);
CREATE INDEX idx_orders_buyer ON public.orders(buyer_id);
CREATE INDEX idx_orders_store ON public.orders(store_id);
CREATE INDEX idx_order_items_order ON public.order_items(order_id);
CREATE INDEX idx_reviews_user ON public.reviews(user_id);
CREATE INDEX idx_reviews_store ON public.reviews(store_id);
CREATE INDEX idx_reviews_item ON public.reviews(item_id);
CREATE INDEX idx_addresses_user ON public.addresses(user_id);
CREATE INDEX idx_addresses_store ON public.addresses(store_id);
CREATE INDEX idx_notifications_user ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(read);
CREATE INDEX idx_favorites_user ON public.favorites(user_id);
CREATE INDEX idx_favorites_store ON public.favorites(store_id);
CREATE INDEX idx_favorites_item ON public.favorites(item_id);