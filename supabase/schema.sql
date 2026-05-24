-- SHAMIM FOREVER — SOVEREIGN DATABASE SCHEMA
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================
-- COLLECTIONS
-- ========================
CREATE TABLE IF NOT EXISTS collections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  cover_image TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- MAIN CATEGORIES
-- ========================
CREATE TABLE IF NOT EXISTS main_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- SUB CATEGORIES
-- ========================
CREATE TABLE IF NOT EXISTS sub_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  main_category_id UUID REFERENCES main_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- PRODUCTS
-- ========================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  collection_id UUID REFERENCES collections(id) ON DELETE SET NULL,
  main_category_id UUID REFERENCES main_categories(id) ON DELETE SET NULL,
  sub_category_id UUID REFERENCES sub_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  story TEXT,
  price_pkr NUMERIC(12, 2) NOT NULL DEFAULT 0,
  price_usd NUMERIC(10, 2) NOT NULL DEFAULT 0,
  inventory INTEGER NOT NULL DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- PRODUCT AUTHENTICATION (NFT + Sovereign Passport)
-- ========================
CREATE TABLE IF NOT EXISTS product_authentication (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  serial_number TEXT UNIQUE NOT NULL,
  nft_token_id TEXT,
  blockchain_hash TEXT,
  owner_wallet TEXT,
  owner_name TEXT,
  is_claimed BOOLEAN DEFAULT FALSE,
  verification_status BOOLEAN DEFAULT FALSE,
  authenticity_score INTEGER DEFAULT 100,
  activation_date TIMESTAMPTZ,
  nft_metadata JSONB DEFAULT '{}',
  manufacture_date TIMESTAMPTZ DEFAULT NOW(),
  provenance TEXT DEFAULT 'Karachi Sovereign Atelier',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- SHIPMENTS (Private Delivery Tracking)
-- ========================
CREATE TABLE IF NOT EXISTS shipments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tracking_id TEXT UNIQUE NOT NULL,
  customer_name TEXT,
  customer_email TEXT,
  status TEXT NOT NULL DEFAULT 'vault_prepared',
  -- statuses: vault_prepared, identity_verified, route_secured, chauffeur_assigned, transit_active, arrival_confirmed
  current_location TEXT DEFAULT 'Karachi Sovereign Vault',
  destination TEXT,
  chauffeur_name TEXT,
  vehicle TEXT,
  eta TIMESTAMPTZ,
  latitude NUMERIC(10, 7),
  longitude NUMERIC(10, 7),
  notes TEXT,
  payment_method TEXT,
  payment_tx_hash TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- USERS (extended profile)
-- ========================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  membership_tier TEXT DEFAULT 'Standard',
  okbond_balance NUMERIC(12, 2) DEFAULT 0,
  order_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- ADDRESSES
-- ========================
CREATE TABLE IF NOT EXISTS addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  label TEXT DEFAULT 'Home',
  name TEXT NOT NULL,
  phone TEXT,
  line1 TEXT NOT NULL,
  line2 TEXT,
  city TEXT NOT NULL,
  province TEXT,
  country TEXT NOT NULL DEFAULT 'Pakistan',
  postal_code TEXT,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- ORDERS
-- ========================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  payment_method TEXT NOT NULL DEFAULT 'pkr',
  payment_status TEXT DEFAULT 'pending',
  total_pkr NUMERIC(12, 2) NOT NULL DEFAULT 0,
  total_usd NUMERIC(10, 2) DEFAULT 0,
  discount_applied NUMERIC(5, 2) DEFAULT 0,
  shipping_address JSONB,
  notes TEXT,
  tracking_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- ORDER ITEMS
-- ========================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price_pkr NUMERIC(12, 2) NOT NULL DEFAULT 0,
  price_usd NUMERIC(10, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- WISHLISTS
-- ========================
CREATE TABLE IF NOT EXISTS wishlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- ========================
-- JOURNAL POSTS
-- ========================
CREATE TABLE IF NOT EXISTS journal_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  category TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- BOUTIQUES
-- ========================
CREATE TABLE IF NOT EXISTS boutiques (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  coordinates JSONB NOT NULL DEFAULT '{"lat": 0, "lng": 0}',
  image TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- INNER CIRCLE REQUESTS
-- ========================
CREATE TABLE IF NOT EXISTS inner_circle_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  tier TEXT DEFAULT 'Sovereign',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- PRIVATE DELIVERIES (legacy concierge requests)
-- ========================
CREATE TABLE IF NOT EXISTS private_deliveries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT,
  current_city TEXT,
  estimated_arrival TEXT,
  delivery_status TEXT DEFAULT 'Vault Prepared',
  tracking_code TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- RLS POLICIES
-- ========================
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE main_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE sub_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_authentication ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE boutiques ENABLE ROW LEVEL SECURITY;
ALTER TABLE inner_circle_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_deliveries ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read collections" ON collections FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public read categories" ON main_categories FOR SELECT USING (TRUE);
CREATE POLICY "Public read sub categories" ON sub_categories FOR SELECT USING (TRUE);
CREATE POLICY "Public read active products" ON products FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public read published journal" ON journal_posts FOR SELECT USING (published = TRUE);
CREATE POLICY "Public read active boutiques" ON boutiques FOR SELECT USING (is_active = TRUE);

-- Product authentication: public read (for QR/NFC verification)
CREATE POLICY "Public read product_authentication" ON product_authentication FOR SELECT USING (TRUE);
CREATE POLICY "Public update product_authentication" ON product_authentication FOR UPDATE USING (TRUE);

-- Shipments: public read by tracking_id (for tracking page)
CREATE POLICY "Public read shipments by tracking" ON shipments FOR SELECT USING (TRUE);
CREATE POLICY "Public insert private_deliveries" ON private_deliveries FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public read private_deliveries" ON private_deliveries FOR SELECT USING (TRUE);

-- Users
CREATE POLICY "Users read own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own data" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users own addresses" ON addresses FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users read own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users read own order items" ON order_items
  FOR SELECT USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));
CREATE POLICY "Users manage wishlist" ON wishlists FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Anyone can submit inner circle request" ON inner_circle_requests FOR INSERT WITH CHECK (TRUE);

-- ========================
-- SEED DATA
-- ========================
INSERT INTO collections (name, slug, description) VALUES
  ('Sovereign Oud', 'sovereign-oud', 'A collection of rare oud compositions, sourced from the ancient forests of Assam and Oman.'),
  ('Heritage Musk', 'heritage-musk', 'White and black musk expressions, rooted in Pashtun olfactory traditions.'),
  ('Imperial Rose', 'imperial-rose', 'The most prized Taif roses, elevated to sovereign luxury.')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO boutiques (name, address, city, country, phone, email, coordinates) VALUES
  ('Lahore Sovereign Node', 'DHA Phase VI, Sector C', 'Lahore', 'Pakistan', '+92 42 3000 0001', 'lahore@shamimf.com', '{"lat": 31.4504, "lng": 74.3587}'),
  ('Karachi Sovereign Node', 'Clifton Block 5', 'Karachi', 'Pakistan', '+92 21 3000 0002', 'karachi@shamimf.com', '{"lat": 24.8260, "lng": 67.0187}'),
  ('Dubai Sovereign Node', 'DIFC, Gate Village', 'Dubai', 'UAE', '+971 4 300 0003', 'dubai@shamimf.com', '{"lat": 25.2105, "lng": 55.2749}')
ON CONFLICT DO NOTHING;

-- Seed demo shipment for testing
INSERT INTO shipments (tracking_id, customer_name, status, current_location, destination, chauffeur_name, vehicle, latitude, longitude)
VALUES (
  'SF-TRK-2025-00001',
  'Demo Client',
  'transit_active',
  'DHA Phase VI, Lahore',
  'Gulberg III, Lahore',
  'Sovereign Operative A-7',
  'Mercedes S-Class (Armoured)',
  31.4699,
  74.4078
) ON CONFLICT (tracking_id) DO NOTHING;

-- Function to auto-create user profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();
