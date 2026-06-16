# BARTI Knowledge & Library Management Platform

A modern, institutional-grade web platform for the **BARTI Knowledge & Library Management Platform (KLMP)** — designed to digitize, preserve, organize and democratize access to Ambedkarite literature, constitutional studies, social justice resources and public knowledge archives.

Built for **Dr. Babasaheb Ambedkar Research and Training Institute (BARTI)**, Government of Maharashtra.

---

## Overview

**Mission:** Preserve Maharashtra's knowledge heritage and make it accessible to every citizen.

**Target Audience:** BARTI Leadership, Government Officers, Researchers, Scholars, Students, Librarians, Public Readers

**Emotional Response:** "This platform protects knowledge and makes it accessible to everyone."

---

## Design Philosophy

This platform follows a strict **institutional, knowledge-first design** language. It is deliberately _not_ a startup SaaS website.

| Inspired By | Avoid |
|-------------|-------|
| Google Books | Stripe |
| JSTOR | Linear |
| Harvard Library | Vercel |
| British Library Digital Collections | Generic SaaS templates |
| Government Knowledge Portals | CRM dashboards |

---

## Brand System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Navy | `#0B1F3A` | Headings, navbar, footer, primary CTA |
| Heritage Gold | `#C89B3C` | Highlights, statistics, section accents |
| Teal | `#0D9488` | Technology, innovation, digital transformation |
| Background | `#FAFAF8` | Primary page background (parchment) |
| Background Alt | `#F3F2EE` | Alternating section backgrounds |
| Text Primary | `#0B1F3A` | Body text |
| Text Secondary | `#5E6573` | Supporting text |

### Typography

| Role | Font | Weight | Source |
|------|------|--------|--------|
| **Headings** | Instrument Serif | 400 (normal), 400 (italic) | Google Fonts (`next/font/google`) |
| **Body** | Inter | 400, 500, 600, 700, 900 | Google Fonts (`next/font/google`) |
| **UI Labels** | Inter (bold, uppercase, tracked) | 700, 800, 900 | — |

Fonts are loaded via `next/font/google` as CSS variables:
- `--font-inter` → `var(--font-sans)` → applied globally
- `--font-instrument-serif` → `var(--font-heading)` → used on `.hero-heading` and `.section-heading-custom`

### Spacing & Layout

- Section padding: `py-16 md:py-20` (80px mobile / 96px desktop)
- Content max-width: `1280px` (centered via `<Container>`)
- Outer wrapper max-width: `1440px`
- Card border radius: `rounded-[24px]` (24px)
- Card border: `1px solid #E4E7EC`
- Card shadow: `0 12px 30px rgba(11,31,58,0.04)`

---

## Tech Stack

| Category | Choice |
|----------|--------|
| Framework | Next.js 16.2.9 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (with `@tailwindcss/postcss`) |
| UI Library | shadcn/ui |
| Animation | Framer Motion 12.40.0 |
| Icons | Lucide React |
| Fonts | Inter + Instrument Serif (via `next/font/google`) |
| Backend | Supabase (SSR client + middleware) |
| State Management | Zustand |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Tables | TanStack React Table |
| Barcode | html5-qrcode, qrcode |
| PDF | jsPDF |
| Spreadsheets | xlsx |
| Package Manager | npm |

---

## Project Structure

```
barti-klmp/
├── public/
│   └── images/
│       ├── discovery/                  # 6 discovery category background images
│       ├── library_hero_bg.png         # Hero section background
│       ├── parliament_sketch_clean.png # Stats + Why This Matters watermark
│       ├── ambedkar_books_sketch_clean.png  # CTA section sketch
│       ├── readers_sketch_clean.png    # Benefits section sketch
│       └── ...sketch variants
├── src/
│   ├── app/
│   │   ├── globals.css                 # Design tokens, theme, font classes
│   │   ├── layout.tsx                  # Root layout (fonts, metadata)
│   │   ├── page.tsx                    # Landing page section composition
│   │   ├── middleware.ts               # Supabase auth middleware
│   │   ├── (public)/                   # Public route group
│   │   │   ├── layout.tsx             # Navbar + Footer wrapper
│   │   │   ├── about/page.tsx
│   │   │   ├── catalog/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   └── book/[id]/page.tsx
│   │   ├── (dashboard)/               # Dashboard route group
│   │   │   ├── layout.tsx             # Sidebar + TopNavbar layout
│   │   │   ├── page.tsx
│   │   │   ├── books/page.tsx
│   │   │   ├── members/page.tsx
│   │   │   ├── users/page.tsx
│   │   │   ├── visitors/page.tsx
│   │   │   ├── issues/page.tsx
│   │   │   ├── reservations/page.tsx
│   │   │   ├── repository/page.tsx
│   │   │   ├── reports/page.tsx
│   │   │   ├── settings/page.tsx
│   │   │   └── ai/page.tsx
│   │   └── auth/
│   │       ├── login/page.tsx
│   │       └── callback/route.ts
│   ├── components/
│   │   ├── ui/                        # shadcn/ui primitives
│   │   │   └── button.tsx
│   │   ├── shared/                    # Shared app components
│   │   │   ├── modal.tsx
│   │   │   ├── confirm-dialog.tsx
│   │   │   ├── error-state.tsx
│   │   │   ├── empty-state.tsx
│   │   │   ├── loading-skeleton.tsx
│   │   │   ├── kpi-card.tsx
│   │   │   ├── search-input.tsx
│   │   │   ├── page-header.tsx
│   │   │   └── role-guard.tsx
│   │   ├── dashboard/                 # Dashboard-specific components
│   │   │   ├── sidebar.tsx
│   │   │   ├── top-navbar.tsx
│   │   │   ├── breadcrumbs.tsx
│   │   │   └── demo-mode-guard.tsx
│   │   ├── navbar.tsx                 # Fixed scroll-aware navbar
│   │   ├── hero.tsx                   # Two-column hero with preview card
│   │   ├── why-this-matters-section.tsx
│   │   ├── problem-section.tsx        # 3 challenge cards
│   │   ├── vision-section.tsx         # 3-step transformation journey
│   │   ├── modules-section.tsx        # 4 capability cards with mockups
│   │   ├── discovery-section.tsx      # 6-category knowledge grid
│   │   ├── benefits-barti-section.tsx # Org cards + benefits card
│   │   ├── stats-section.tsx          # 4 impact metrics
│   │   ├── cta-section.tsx            # Call-to-action
│   │   ├── section-heading.tsx        # Reusable animated heading
│   │   ├── section-wrapper.tsx        # Consistent section padding
│   │   ├── container.tsx              # Max-width wrapper (1280px)
│   │   └── footer.tsx                 # 5-column institutional footer
│   └── lib/
│       ├── animations.ts              # Framer Motion variants
│       ├── constants.ts               # All site content and data
│       ├── types.ts                   # TypeScript interfaces
│       ├── utils.ts                   # cn() utility
│       └── stores/                    # Zustand state stores
├── .env.example
├── next.config.ts
├── package.json
├── tsconfig.json
├── postcss.config.mjs
└── components.json                    # shadcn/ui config
```

---

## Sections (Landing Page)

The page follows a mandatory section order defined in `src/app/page.tsx`:

| # | Component | ID | Description |
|---|-----------|----|-------------|
| 1 | **Navbar** | — | Fixed top bar with logo, navigation links, CTA button |
| 2 | **Hero** | — | Two-column layout (35/65). Left: tagline, headline, CTAs. Right: library background with curved divider + interactive repository card (search, collections grid, recent publications) |
| 3 | **Why This Matters** | `#why-this-matters` | Mission statement with parliament sketch watermark |
| 4 | **Problem / Challenges** | `#challenges` | 3 equal-height cards: Operational Gaps, Reader Experience, Management Blind Spots |
| 5 | **Vision / Transformation Journey** | `#journey` | 3-stage horizontal flow: Traditional Library → Digital Repository → Knowledge Intelligence |
| 6 | **Core Platform Capabilities** | `#capabilities` | 4-column grid: Library Operations, Digital Repository, Knowledge Discovery, AI Intelligence — each with interactive UI mockup |
| 7 | **Knowledge Discovery** | `#discovery` | 3x2 grid of 6 knowledge categories (Google Books aesthetic) with background images |
| 8 | **Benefits for BARTI & Readers** | `#benefits` | Two-column: 4 organization-type cards + benefits card with checklist |
| 9 | **Platform Impact** | — | 4 large statistics with gold metrics (books, members, availability, uptime) |
| 10 | **CTA** | `#cta` | Join the Movement section with primary action button |
| 11 | **Footer** | — | 5-column layout: Platform, Collections, Resources, Government, Contact |

---

## Animation System

All animations use `framer-motion` with variants defined in `src/lib/animations.ts`:

| Variant | Effect | Duration | Easing |
|---------|--------|----------|--------|
| `fadeUp` | opacity 0→1, y 30→0 | 0.6s | easeOut |
| `staggerContainer` | staggers children by 0.1s | — | — |
| `cardItem` | opacity 0→1, y 20→0 | 0.4s | easeOut |
| `slideIn` | opacity 0→1, x -40→0 | 0.6s | easeOut |
| `scaleIn` | opacity 0→1, scale 0.9→1 | 0.5s | easeOut |
| `countUpVariants` | opacity 0→1 | 0.5s | — |

**Scroll-triggered card grids** (problem, vision, modules, discovery, benefits, stats sections):
- Container uses `staggerContainer` + `whileInView`
- Child cards use `cardItem`
- Fires once on first scroll (`viewport: { once: true, margin: "-80px" }`)

**Prohibited:** Continuous floating animations, parallax effects, scroll hijacking, heavy transforms.

---

## Image Assets

### Hero & Sketches

| File | Usage | Position |
|------|-------|----------|
| `library_hero_bg.png` | Hero section library background | Right column, `object-right` |
| `parliament_sketch_clean.png` | Stats section watermark + Why This Matters background | Bottom-right, 20-40% opacity |
| `ambedkar_books_sketch_clean.png` | CTA section background | Bottom-right, 40% opacity |
| `readers_sketch_clean.png` | Benefits card watermark | Bottom-right, 40% opacity |

### Discovery Categories

| File | Category |
|------|----------|
| `discovery/ambedkar_literature.png` | Ambedkar Literature |
| `discovery/constitutional_studies.png` | Constitutional Studies |
| `discovery/social_justice.png` | Social Justice |
| `discovery/research_papers.png` | Research Papers |
| `discovery/archives.png` | Archives & Documents |
| `discovery/government_publications.png` | Government Publications |

---

## Design Specification

This project is built from the **BARTI_KLMP_Design.md** specification — the single source of truth governing all design decisions, layout rules, and content. Refer to it for detailed section-by-section requirements.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server (uses Webpack for platform compatibility)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

---

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |

---

## License

Proprietary — BARTI (Dr. Babasaheb Ambedkar Research and Training Institute), Government of Maharashtra.
