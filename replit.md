# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.8
- **Database**: PostgreSQL — Drizzle ORM (contacts/legacy) + Payload CMS v3 (content, `payload` schema)
- **CMS**: Payload CMS v3 (`@payloadcms/next`, `@payloadcms/db-postgres`, `@payloadcms/richtext-lexical`)
- **Primary Frontend**: Next.js 15 App Router (SSR) — `artifacts/nextjs-app`

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── nextjs-app/         # PRIMARY: Next.js 15 + Payload CMS (at /)
│   ├── api-server/         # Express API server (legacy)
│   ├── admin/              # Legacy admin (separate artifact)
│   └── mockup-sandbox/     # Component preview server (canvas)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection (contacts/legacy)
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── package.json
```

## Next.js App (`artifacts/nextjs-app`) — PRIMARY

Port: 4321 | Path: `/` | Serves all public + admin routes.

### Architecture
- **Framework**: Next.js 15 App Router with SSR (TypeScript)
- **CMS**: Payload CMS v3 — unified backend embedded at `/admin`
- **Rich Text**: Lexical editor (`@payloadcms/richtext-lexical`) with `RichText` component for frontend rendering
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/postcss`)
- **Fonts**: Montserrat (display) + Poppins (body) via Google Fonts
- **DB Access**: Payload local API (`getPayload()` from `src/lib/payload.ts`) for content; Drizzle for contacts
- **Local API helper**: `src/lib/payload.ts` — cached `getPayload()` for server components

### Route Groups
- `(public)/` — public-facing pages (SSR server components, Payload local API)
- `(payload)/admin/` — Payload CMS admin panel (full-featured, at `/admin`)
- `(payload)/api/` — Payload REST + GraphQL API (at `/api`)

### Layout Structure
- `app/layout.tsx` — Root pass-through (no `<html>` tag)
- `app/(public)/layout.tsx` — `<html><body>` + Navbar + Footer for public site
- `app/(payload)/layout.tsx` — `RootLayout` from `@payloadcms/next/layouts` for admin

### Public Pages
- `/` — Home (Hero, Stats, Services, CTA, Industries, WhyChooseUs, Testimonials, Pricing, CaseStudies, Blog, GrowthCTA, FAQ, GetStarted)
- `/about` — Company story, team, values
- `/services` — Detailed SEO services overview
- `/blog` — SSR blog listing (fetched from Payload Posts collection)
- `/blog/[slug]` — SSR blog post detail (ToC, author bio, FAQs, related posts, JSON-LD schemas)
- `/contact` — Contact form (saves to Drizzle `contacts` table)
- `/robots.txt` — Auto-generated (blocks /admin/, /api/)
- `/sitemap.xml` — Dynamic from Payload posts + service pages + static routes

### Admin (`/admin` — Payload CMS)
Full Payload CMS admin panel. First-time setup creates an admin user at `/admin/create-first-user`.

### Payload Collections
- **Posts** — Blog posts with Lexical content, SEO fields, FAQs array, relatedPosts relationship
- **Authors** — Author profiles with avatar, bio, social links
- **Categories** — Blog categories
- **Media** — File uploads (images, docs)
- **Users** — Admin users
- **ServicePages** — CMS-managed service pages

### Payload Globals
- **SiteSettings** — Site name, logo, contact info, social links, footer text

### SEO Infrastructure
- **JSON-LD on blog posts**: Article, FAQPage, BreadcrumbList schemas
- **generateMetadata**: Per-post from Payload SEO fields (metaTitle, metaDescription, canonicalUrl, ogImage, noIndex)
- **sitemap.ts**: Dynamic, revalidates every hour
- **robots.ts**: Disallows /admin/ and /api/

### Payload Config
- File: `src/payload.config.ts`
- DB schema: `schemaName: "payload"` (separate PostgreSQL schema from Drizzle's `public`)
- Import map: `src/app/(payload)/admin/importMap.js` (auto-generated at runtime — do NOT create importMap.ts)
- Next.js: wrapped with `withPayload()` in `next.config.ts`

### Environment Variables
- `DATABASE_URL` — PostgreSQL connection string (required for both Drizzle and Payload)
- `PAYLOAD_SECRET` — Payload CMS secret key (required for admin auth)
- `NEXT_PUBLIC_SITE_URL` — Production site URL (used in sitemap, robots, JSON-LD; defaults to https://topseoservices.com)
- `ADMIN_SECRET` — Legacy HMAC signing secret for old API routes
- `PORT` — Dev server port (set by artifact system)

## Database

### Payload schema (PostgreSQL `payload` schema)
All Payload CMS tables live here — managed automatically by Payload migrations.

### Public schema (Drizzle ORM)
- `contacts` — Contact form submissions
- `blog_posts` — Legacy blog posts (no longer used for frontend; kept for data migration)
- `seo_settings` — Legacy SEO settings

## Key Files

- `artifacts/nextjs-app/src/lib/payload.ts` — Cached `getPayload()` helper for server components
- `artifacts/nextjs-app/src/payload.config.ts` — Payload CMS configuration
- `artifacts/nextjs-app/src/collections/` — Posts, Authors, Categories, Media, ServicePages, Users
- `artifacts/nextjs-app/src/globals/SiteSettings.ts` — Site-wide settings global
- `artifacts/nextjs-app/src/app/(payload)/layout.tsx` — MUST use `RootLayout` from `@payloadcms/next/layouts`
- `artifacts/nextjs-app/src/app/(payload)/admin/importMap.js` — Auto-generated; do not hand-edit

## Critical Notes

- **importMap**: Payload auto-generates `importMap.js` at runtime. Never create a static `importMap.ts` — it overrides the generated file and breaks the admin.
- **RootLayout**: `(payload)/layout.tsx` MUST import and use `RootLayout` from `@payloadcms/next/layouts`. Without it, `useConfig()` returns `undefined` everywhere in admin.
- **Next.js version**: Pinned to `15.4.11` — Payload 3.81.0 peer dep range is `>=15.4.11 <15.5.0`
- **Payload schema isolation**: Uses `schemaName: "payload"` to avoid conflicts with Drizzle's `public` schema tables.
- **pnpm-workspace.yaml**: `@payloadcms/*`, `payload`, `qs-esm` are excluded from hoisting.
