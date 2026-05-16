# Shamim Forever

A luxury e-commerce platform for perfumes, cosmetics, and jewelry — black/gold aesthetic, Pakistani market, manual payment via EasyPaisa and UBL bank transfer.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080, served at `/api`)
- `pnpm --filter @workspace/shamim-forever run dev` — run the frontend Vite dev server
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run typecheck:libs` — build composite lib packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/scripts run seed` — seed the DB with products, categories, boutiques, admin user
- `pnpm --filter @workspace/db run push` — push DB schema changes using drizzle-kit push

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19 + Vite, Tailwind CSS, Framer Motion, React Query
- API: Express 5 with pino logging
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec in `lib/api-spec/openapi.yaml`)
- Build: esbuild (CJS bundle for API server)

## Where things live

- `artifacts/shamim-forever/` — React + Vite frontend (20+ pages)
- `artifacts/api-server/src/routes/` — all Express API route handlers
- `lib/db/src/schema/` — Drizzle ORM schema (source of truth for DB shape)
- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for API contract)
- `lib/api-client-react/src/generated/` — React Query hooks (generated, do not edit)
- `lib/api-zod/src/generated/` — Zod validation schemas (generated, do not edit)
- `scripts/src/seed.ts` — database seed data
- `lib/db/drizzle/` — generated SQL migrations

## Architecture decisions

- Contract-first API: define endpoints in OpenAPI YAML, then run codegen to get hooks + Zod schemas. Never hand-write hooks or validators.
- DB in dev uses Replit's built-in `DATABASE_URL`; in production uses `SUPABASE_DB_URL` (with auto pooler conversion for environments that can't reach port 5432 directly).
- Manual payment flow: customers submit EasyPaisa/UBL transfer proof; admin reviews via `/admin` panel and marks orders paid.
- Cookie-based session auth: server sets `userId` cookie on login; API routes read it; frontend uses `useGetProfile` hook.
- Cart is client-side (localStorage via `CartContext`) — no server-side cart table needed.

## Product

- Shop page with filtering by category, price, search
- Scent Finder quiz → personalized fragrance recommendations
- Product detail with engraving option, reviews, related products
- Checkout with EasyPaisa / UBL IBAN payment details + proof upload
- User account: order history, profile, wishlist
- Admin panel: orders, products, customers, analytics dashboard
- Boutique locator with Mapbox map
- Concierge booking form
- The Atelier brand story page

## User preferences

- Admin email: faisalorakzaiofficial@gmail.com
- EasyPaisa: 03367970004 | UBL IBAN: PK13UNIL0109000318870498
- Target market: Pakistan (PKR currency)
- Deploy: GitHub (faisalorakzai-lab/shamimforever) + Vercel (pointing at artifacts/shamim-forever)

## Gotchas

- Run `pnpm run typecheck:libs` before `pnpm run typecheck` when lib schemas change (composite build order matters).
- After editing `openapi.yaml`, always run `pnpm --filter @workspace/api-spec run codegen` before typechecking.
- Supabase direct port 5432 (`db.*.supabase.co`) is blocked from Replit; DB auto-falls back to `DATABASE_URL` in dev (`NODE_ENV !== 'production'`).
- API server must be built (`pnpm --filter @workspace/api-server run build`) before restart_workflow takes effect — the workflow runs `dist/index.mjs`.
- Never use `pnpm dev` at workspace root — individual artifacts are started via Replit workflows.
- `inArray()` from drizzle-orm must be used instead of `sql\`= ANY(...)\`` for array membership queries.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
