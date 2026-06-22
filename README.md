# BARTI Knowledge & Library Management Platform

<p align="center">
  <img src="public/images/feature/Smart%20Book%20Discovery.jpg" alt="BARTI KLMP Platform Screenshot" width="800" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" alt="Netlify" />
  <img src="https://img.shields.io/badge/License-Proprietary-0B1F3A?style=for-the-badge" alt="License: Proprietary" />
</p>

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
| Package Manager | npm |

---

## Project Structure

```
barti-klmp/
├── public/
│   └── images/
│       ├── discovery/                  # 6 discovery category background images
│       ├── feature/                    # 6 feature screenshots (Barcode, QR, Smart Discovery, etc.)
│       ├── why-choose/                 # 6 why-choose illustrations
│       ├── library_hero_bg.png         # Hero section background
│       ├── parliament_sketch_clean.png # Stats + Why This Matters watermark
│       ├── ambedkar_books_sketch_clean.png  # CTA section sketch
│       ├── readers_sketch_clean.png    # Benefits section sketch
│       ├── page_turn.webm              # Hero section video asset
│       └── ...sketch variants
├── src/
│   ├── app/
│   │   ├── globals.css                 # Design tokens, theme, font classes (Tailwind v4)
│   │   ├── layout.tsx                  # Root layout (fonts, metadata, SEO)
│   │   ├── page.tsx                    # Landing page section composition
│   │   ├── icon.tsx                    # Dynamic SVG favicon (navy + gold)
│   │   └── (public)/                   # Public route group (other routes handled separately)
│   │       ├── layout.tsx             # Navbar + Footer wrapper
│   │       └── contact/page.tsx
│   ├── components/
│   │   ├── ui/                        # shadcn/ui primitives (base-nova style)
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
│   │   ├── navbar.tsx                 # Fixed scroll-aware navbar
│   │   ├── hero.tsx                   # Two-column hero with preview card
│   │   ├── why-this-matters-section.tsx
│   │   ├── problem-section.tsx        # 3 challenge cards
│   │   ├── objectives-section.tsx     # 3-stage transformation journey
│   │   ├── modules-section.tsx        # 4 capability cards with feature mockups
│   │   ├── why-choose-section.tsx     # 6 value proposition cards
│   │   ├── discovery-section.tsx      # 6-category knowledge discovery grid
│   │   ├── benefits-barti-section.tsx # Org cards + benefits card
│   │   ├── stats-section.tsx          # 4 impact metrics
│   │   ├── cta-section.tsx            # Call-to-action
│   │   ├── section-heading.tsx        # Reusable animated heading
│   │   ├── section-wrapper.tsx        # Consistent section padding
│   │   ├── container.tsx              # Max-width wrapper (1280px)
│   │   └── footer.tsx                 # 5-column institutional footer
│   └── lib/
│       ├── animations.ts              # Framer Motion variants
│       ├── constants.ts               # All site content and data (deprecated → features.ts)
│       ├── features.ts                # Centralized content and feature data
│       ├── types.ts                   # TypeScript interfaces
│       └── utils.ts                   # cn() utility (clsx + tailwind-merge)
├── .env.example
├── next.config.ts
├── postcss.config.mjs                 # Tailwind v4 PostCSS plugin
├── components.json                    # shadcn/ui config (base-nova)
├── netlify.toml                       # Netlify deployment config
├── eslint.config.mjs                  # ESLint config (Next.js + TypeScript)
├── package.json
└── tsconfig.json
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
| 5 | **Objectives / Transformation Journey** | `#objectives` | 3-stage horizontal flow: Traditional Library → Digital Repository → Knowledge Intelligence |
| 6 | **Core Platform Capabilities** | `#capabilities` | 4-column grid: Library Operations, Digital Repository, Knowledge Discovery, AI Intelligence — each with interactive UI mockup |
| 7 | **Why Choose BARTI KLMP** | `#why-choose` | 6 value proposition cards: AI Intelligence, Ambedkar Heritage, Citizen Access, Data-Driven Decisions, Government Institution, Scalable Network |
| 8 | **Knowledge Discovery** | `#discovery` | 3x2 grid of 6 knowledge categories (Google Books aesthetic) with background images |
| 9 | **Benefits for BARTI & Readers** | `#benefits` | Two-column: 4 organization-type cards + benefits card with checklist |
| 10 | **Platform Impact** | — | 4 large statistics with gold metrics (books, members, availability, uptime) |
| 11 | **CTA** | `#cta` | Join the Movement section with primary action button |
| 12 | **Footer** | — | 5-column layout: Platform, Collections, Resources, Government, Contact |

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

**Scroll-triggered card grids** (problem, objectives, modules, discovery, benefits, stats sections):
- Container uses `staggerContainer` + `whileInView`
- Child cards use `cardItem`
- Fires once on first scroll (`viewport: { once: true, margin: "-80px" }`)

**Prohibited:** Continuous floating animations, parallax effects, scroll hijacking, heavy transforms.

---

## Feature Screenshots

| Feature | Screenshot |
|---------|-----------|
| **Smart Book Discovery** — Advanced search and browse interface with faceted filters | <img src="public/images/feature/Smart%20Book%20Discovery.jpg" alt="Smart Book Discovery" width="400" /> |
| **Barcode-Driven Cataloging** — Scan and catalog books using barcode technology | <img src="public/images/feature/Barcode-Driven%20Cataloging.jpg" alt="Barcode-Driven Cataloging" width="400" /> |
| **QR-Based Issue & Return** — Quick book issue and return via QR code scanning | <img src="public/images/feature/QR-Based%20Issue%20&%20Return.webp" alt="QR-Based Issue & Return" width="400" /> |
| **Digital Membership Cards** — Paperless membership with digital card generation | <img src="public/images/feature/Digital%20Membership%20Cards.jpg" alt="Digital Membership Cards" width="400" /> |
| **Configurable Rules Engine** — Flexible borrowing rules, fine policies, and access control | <img src="public/images/feature/Configurable%20Rules%20Engine.png" alt="Configurable Rules Engine" width="400" /> |
| **Government-Grade Reporting** — Comprehensive reports and analytics dashboard | <img src="public/images/feature/Government-Grade%20Reporting.webp" alt="Government-Grade Reporting" width="400" /> |

---

## Image Assets

All image assets are stored in `public/images/`.

### Sketches & Backgrounds

| File | Usage | Position |
|------|-------|----------|
| `library_hero_bg.png` | Hero section library background | Right column, `object-right` |
| `parliament_sketch_clean.png` | Stats section watermark + Why This Matters background | Bottom-right, 20-40% opacity |
| `ambedkar_books_sketch_clean.png` | CTA section background | Bottom-right, 40% opacity |
| `readers_sketch_clean.png` | Benefits card watermark | Bottom-right, 40% opacity |
| `library_footer_bg.png` | Footer background | Full width |
| `page_turn.webm` | Hero section video animation | Right column overlay |

### Discovery Categories

| File | Category |
|------|----------|
| `discovery/ambedkar_literature.png` | Ambedkar Literature |
| `discovery/constitutional_studies.png` | Constitutional Studies |
| `discovery/social_justice.png` | Social Justice |
| `discovery/research_papers.png` | Research Papers |
| `discovery/archives.png` | Archives & Documents |
| `discovery/government_publications.png` | Government Publications |

### Why Choose Illustrations

| File | Card Title |
|------|-----------|
| `why-choose/ai_intelligence.png` | AI-Powered Intelligence |
| `why-choose/ambedkar_heritage.png` | Ambedkarite Heritage |
| `why-choose/citizen_access.png` | Citizen Access |
| `why-choose/data_decisions.png` | Data-Driven Decisions |
| `why-choose/gov_institution.png` | Government Institution |
| `why-choose/scalable_network.png` | Scalable Network |

---

## Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** (ships with Node.js)

---

## Getting Started

```bash
# Clone the repository
git clone <repo-url>
cd barti-klmp

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

## Deployment

The project is configured for **Netlify** deployment via `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"
  plugins = ["@netlify/plugin-nextjs"]
```

Deploy by linking your Netlify project to the repository — the build settings are auto-detected from `netlify.toml`.

---

## License

Proprietary — BARTI (Dr. Babasaheb Ambedkar Research and Training Institute), Government of Maharashtra.
