# Ashika Ramesh Portfolio

## Overview

A portfolio website for Ashika Ramesh — Learning, Service & UX Research designer based in Melbourne/NAARM.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Wouter (routing)
- **Styling**: Tailwind CSS v4 with Space Mono font
- **Animations**: Framer Motion (scroll reveal, stagger)
- **SEO**: react-helmet-async (per-page meta), robots.txt, sitemap.xml, JSON-LD Person schema
- **API framework**: Express 5 (api-server, currently unused by portfolio)
- **Database**: PostgreSQL + Drizzle ORM (not used by portfolio)
- **Build**: Vite (static, frontend-only)

## Portfolio Structure

### Pages
- `/` — Home: logo hero, tagline, "What Drives the Work" (Creativity, Empathy, Rigor)
- `/work` — Projects list: 4 projects (2 with full pages, 2 placeholder)
- `/work/memory-in-a-scent` — Full case study: Memory in a Scent
- `/work/riverrenew-mataniko` — Full case study: RiverRenew Mataniko
- `/about` — About placeholder (user to fill)
- `/contact` — Contact with email placeholder

### Projects
1. **DICARE** — Learning Designer · Health Education · Service Design (placeholder)
2. **Memory in a Scent** — Speculative Design · Health · Arduino (full case study)
3. **River Renew Mataniko** — Sustainable Systems · Nature-Based Solutions (full case study)
4. **Third Space** — Service Design · Co-Design (placeholder)

### Design System
- Background: deep maroon (HSL 350 60% 20%)
- Text: cream (HSL 40 33% 93%)
- Accent: teal/cyan (HSL 178 60% 50%)
- Font: Space Mono (monospace throughout)
- Logo: attached_assets/logo_transparent.png (transparent background)

## Key Files

- `artifacts/portfolio/src/App.tsx` — router and layout shell
- `artifacts/portfolio/src/index.css` — theme variables and global styles
- `artifacts/portfolio/index.html` — HTML shell with JSON-LD, meta tags
- `artifacts/portfolio/public/robots.txt` — SEO crawl config
- `artifacts/portfolio/public/sitemap.xml` — sitemap for all public routes
- `artifacts/portfolio/src/components/Header.tsx` — sticky nav with logo
- `artifacts/portfolio/src/components/Footer.tsx` — Melbourne/NAARM footer
- `artifacts/portfolio/src/pages/` — all page components

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks (not needed for portfolio)

## SEO Setup

- `react-helmet-async` — dynamic per-page title/meta tags
- JSON-LD `Person` schema in index.html
- `public/robots.txt` — allows all, references sitemap
- `public/sitemap.xml` — all public routes with priorities

## Adding More Projects

1. Add a new page file in `src/pages/`
2. Register the route in `src/App.tsx`
3. Add the project entry to the `projects` array in `src/pages/Work.tsx`
4. Update `public/sitemap.xml` with the new URL
