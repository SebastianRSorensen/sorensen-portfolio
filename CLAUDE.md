# CLAUDE.md - Portfolio Project Instructions

## Project Overview

This is Sebastian Rosnes Sørensen's personal portfolio website. A story-driven, animated portfolio inspired by landonorris.com - bold, cinematic, and memorable.

**Owner:** Sebastian Rosnes Sørensen
**Role:** System Developer at Stacc AS, Co-founder of Rosengrip
**Location:** Bergen, Norway

## Tech Stack (STRICT - Do not deviate)

- **Framework:** Next.js 16+ (App Router, NO src/ directory)
- **Styling:** Tailwind CSS 4+ (CSS-first configuration)
- **UI Components:** shadcn/ui
- **Package Manager:** pnpm
- **Animations:** Framer Motion
- **i18n:** next-intl (Norwegian + English)
- **Deployment:** Vercel

### Critical Technical Rules

1. **NO `src/` directory** - All code lives in root: `app/`, `components/`, `lib/`, etc.
2. **Use `proxy.ts`** instead of `middleware.ts` (Next.js 16+ naming)
3. **Tailwind CSS 4+** - Use CSS-first config with `@theme inline` in globals.css (hex colors, not HSL)
4. **pnpm only** - Never use npm or yarn commands
5. **Server Components by default** - Only use 'use client' when necessary

## Design Philosophy

### What We're Building
A cinematic, scroll-driven storytelling experience that presents Sebastian's journey as a developer and builder. Development experience and skills come first, followed by education and other background. NOT a typical developer portfolio with cards and grids.

### Inspiration: landonorris.com
- Full-viewport sections
- Bold typography with motion
- Personal quotes woven throughout
- Dark, confident aesthetic
- Scroll-triggered animations

### What to AVOID (AI Slop)
- Purple gradients on white backgrounds
- Generic Inter/Roboto fonts
- Floating cards with shadows
- "Hi, I'm a passionate developer" copy
- Icon grids for skills
- Generic timeline components
- Cookie-cutter layouts

## Color Palette: Nordic Night

```css
:root {
  --background: #0a0f14;
  --foreground: #e8e4df;
  --accent: #3b82f6;
  --accent-hover: #2563eb;
  --muted: #1e293b;
  --muted-foreground: #94a3b8;
  --border: #334155;
  --card: #0f172a;
}
```

## Typography

- **Display/Headings:** Instrument Serif (with Playfair Display fallback)
- **Body:** Geist
- **Mono/Code:** Geist Mono

## Project Structure

```
/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── template.tsx
│   │   ├── not-found.tsx
│   │   └── design-system/
│   │       └── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                    # shadcn components
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── hero-name.tsx
│   │   ├── story-section.tsx
│   │   ├── section-experience.tsx
│   │   ├── section-drive.tsx
│   │   ├── tech-stack.tsx
│   │   ├── section-education.tsx
│   │   ├── section-other-experience.tsx
│   │   └── contact.tsx
│   ├── design-system/
│   │   └── showcase.tsx (+ sub-components)
│   ├── navigation.tsx
│   ├── footer.tsx
│   ├── language-toggle.tsx
│   ├── scroll-progress.tsx
│   └── animated-text.tsx
├── lib/
│   ├── utils.ts
│   ├── fonts.ts
│   ├── animations.ts
│   └── motion-config.tsx
├── i18n/
│   ├── config.ts
│   ├── routing.ts
│   ├── request.ts
│   └── messages/
│       ├── en.json
│       └── no.json
├── public/
│   ├── noise.svg
│   └── images/
├── docs/                      # Documentation (reference only)
├── proxy.ts                   # next-intl middleware
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── components.json
├── tsconfig.json
└── package.json
```

## Content Structure

See `docs/CONTENT.md` for all text content in both languages.

## Key Sections (in page order)

### 1. Hero
- Full viewport
- Name reveal animation (staggered letters): SEBASTIAN / ROSNES / SØRENSEN
- Tagline: "Ikke en typisk utvikler." / "Not your typical developer."
- Scroll indicator
- Background: subtle noise texture overlay

### 2. KODE (Code) — Chapter 01
- **Stacc AS** (Jan 2024 - Present)
  - System Developer
  - Consumer & sales finance solutions
  - React, Next.js, TypeScript fullstack
  - CI/CD with GitHub Actions
- **Rosengrip** (Co-founder)
  - Web agency
  - Link to rosengrip.no

### 3. DRIV (Drive) — Chapter 02
- The key differentiator section
- Intro: "Koding stopper ikke klokken fire." / "Coding doesn't stop at four."
- Builds in spare time because he loves it
- Private projects mentioned (not shown):
  - Event planning platform
  - Recruitment tool with Anthropic AI
  - Lottery system
  - "...and whatever comes next"
- Heavy Claude Code user
- GitHub presence

### 4. Tech Stack — Chapter 03
- Categorized grid with hover badges
- Categories:
  - Frontend: React, Next.js, TypeScript, Tailwind CSS
  - Backend: Node.js, NestJS, PostgreSQL, MongoDB
  - Cloud & Deploy: Azure, Vercel
  - DevOps: Docker, Kubernetes, GitHub Actions
  - Testing: Jest, Playwright, Storybook
  - Tools: Claude Code, Bruno, Postman, REST/OpenAPI, Kosli, Snyk, Wiz

### 5. UTDANNING (Education) — Chapter 04
- UiB Bachelor in Informatikk (2021-2023)
- Software Engineering Master courses (2024, completed — not full degree)

### 6. ANNEN ERFARING (Other Experience) — Chapter 05
- Three cards, most-recent-first:
  - **Hjemmesykepleien Bergen** — Assistent (Oct 2022–May 2025)
  - **Coop Norge SA** — Lagerfunksjonær (Aug 2019–Dec 2022)
  - **Military** — Grensejeger/Ranger at Jegerkompaniet, GSV (Jan 2020–Jan 2021)

### 7. Contact — Chapter 06
- Email
- Phone
- GitHub (prominent)
- LinkedIn
- Rosengrip.no

## Navigation

Nav links (in order):
- Erfaring/Experience → `#kode`
- Kompetanse/Skills → `#tech-stack`
- Utdanning/Education → `#utdanning`
- Kontakt/Contact → `#contact`

## Animation Guidelines

See `docs/ANIMATIONS.md` for detailed animation specifications.

Key principles:
- Use Framer Motion for all animations
- Scroll-triggered reveals (useInView)
- Staggered children animations
- Smooth, confident easing (not bouncy)
- Text reveal animations for headings
- MotionConfig with `reducedMotion="user"`

## i18n Setup

Default locale: `no` (Norwegian)
Supported: `no`, `en`

Use next-intl with:
- URL prefix strategy: `/en/...` for English, `/...` for Norwegian (localePrefix: 'as-needed')
- Messages in JSON files
- useTranslations hook in client components

## Commands

```bash
# Install dependencies
pnpm install

# Development
pnpm dev

# Build
pnpm build

# Add shadcn component
pnpm dlx shadcn@latest add [component]
```

## Important Notes

- Focus on the "builder" identity — someone who codes for fun
- Military background is a differentiator — use it
- Claude Code expertise is notable — highlight it
- Coop Norge SA shows work ethic — warehouse work alongside studies
- Home nursing shows character but isn't the focus
- Master's courses were completed but the full degree was not — title accordingly
- All Rosengrip projects are from co-founder — only mention rosengrip.no itself, not specific projects
- Name is spelled **Sørensen** (with ø)
- Military role: **Grensejeger** (NO) / **Ranger** (EN) — NOT "Border Hunter"
- Military unit: **Jegerkompaniet, GSV** — keep Norwegian name in English too

## Reference Documents

- `docs/ARCHITECTURE.md` - Technical architecture details
- `docs/DESIGN.md` - Visual design system
- `docs/CONTENT.md` - All text content (NO/EN)
- `docs/COMPONENTS.md` - Component specifications
- `docs/ANIMATIONS.md` - Animation specifications

## Claude Skills

The following skills in `.claude/skills/` enforce project standards and MUST be followed:

- **`unique-web-design`** — Ensures every page, component, and layout is distinctive, conversion-optimized, and tailored to this portfolio. Combats generic AI aesthetics. **Mandatory** for all page, component, and layout creation. Includes anti-AI-slop checklist, typography/color systems, conversion optimization rules, and component design principles.

- **`nextjs-architecture`** — Enforces modern Next.js 2025 best practices: React Server Components, hybrid rendering (SSG/SSR/ISR/CSR), and file organization. Use when creating or refactoring pages, layouts, route handlers, or components. Key rules: keep `page.tsx`/`layout.tsx` as server components, isolate client logic into separate `"use client"` files, and follow the project file structure.
