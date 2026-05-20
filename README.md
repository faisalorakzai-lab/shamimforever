# Shamim Forever — Sovereign Luxury Commerce

A production-grade ultra-luxury commerce ecosystem. Built with Next.js App Router, Supabase, Cloudinary, and Mapbox.

## Stack

- **Frontend**: Next.js 14 App Router + TypeScript
- **Styling**: Tailwind CSS + Framer Motion + GSAP
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Images**: Cloudinary
- **Maps**: Mapbox GL
- **Deployment**: Vercel

## Pages

| Route | Page |
|-------|------|
| `/` | Home — Cinematic luxury homepage |
| `/shop` | Shop — Editorial product catalogue |
| `/collections` | Collections — Curated universes |
| `/collections/[id]` | Collection Detail |
| `/products/[id]` | Product Detail — Immersive experience |
| `/atelier` | Atelier — Craftsmanship documentary |
| `/inner-circle` | Inner Circle — Sovereign membership |
| `/journal` | Journal — Elite editorial publication |
| `/boutiques` | Boutiques — Global sovereign nodes (Mapbox) |
| `/auth` | Authentication — Supabase auth |
| `/admin` | Admin Panel — Sovereign executive panel |
| `/admin/products` | Product CRUD + Cloudinary upload |
| `/admin/orders` | Order management |
| `/admin/customers` | Customer management |

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and fill in your keys
4. Run the database schema: paste `supabase/schema.sql` into your Supabase SQL Editor
5. Run: `npm run dev`

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_MAPBOX_TOKEN=
NEXT_PUBLIC_MAPBOX_STYLE=
```

## Database Setup

Run `supabase/schema.sql` in your Supabase project SQL Editor. This creates:
- `collections` — Product collections
- `main_categories` — Main categories per collection
- `sub_categories` — Sub categories
- `products` — All products with multi-currency pricing
- `orders` + `order_items` — Full order management
- `users` — Extended user profiles with membership tiers
- `addresses` — Saved addresses
- `wishlists` — User wishlists
- `journal_posts` — Editorial journal
- `boutiques` — Global boutique locations
- `inner_circle_requests` — Membership applications

## Payment Methods

| Method | Currency |
|--------|----------|
| PKR | Pakistani Rupee |
| USD | US Dollar |
| USDT | Tether |
| USDC | USD Coin |
| OKBOND | Sovereign loyalty currency (auto 10% discount) |

## Admin Access

Navigate to `/admin` — requires Supabase authentication.

Admin email: `faisalorakzaiofficial@gmail.com`

## Design System

- **Background**: `#050505` / `#0a0a0a`
- **Gold Accent**: `#c9a054`
- **Typography**: Cormorant Garamond (headings) + Inter (body)
- **Motion**: Framer Motion with luxury easing `[0.16, 1, 0.3, 1]`
