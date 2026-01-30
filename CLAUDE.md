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
3. **Tailwind CSS 4+** - Use CSS-first config with `@theme` in globals.css
4. **pnpm only** - Never use npm or yarn commands
5. **Server Components by default** - Only use 'use client' when necessary

## Design Philosophy

### What We're Building
A cinematic, scroll-driven storytelling experience that presents Sebastian's journey from military service to fintech developer. NOT a typical developer portfolio with cards and grids.

### Inspiration: landonorris.com
- Horizontal scroll galleries
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

- **Display/Headings:** A distinctive serif or display font (suggest: Instrument Serif, Playfair Display, or similar)
- **Body:** Clean sans-serif (suggest: Geist, Satoshi, or similar)
- **Mono/Code:** JetBrains Mono or Geist Mono

## Project Structure

```
/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                    # shadcn components
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── story-grense.tsx
│   │   ├── story-kunnskap.tsx
│   │   ├── story-kode.tsx
│   │   ├── story-bygger.tsx
│   │   ├── tech-stack.tsx
│   │   ├── projects.tsx
│   │   └── contact.tsx
│   ├── navigation.tsx
│   ├── footer.tsx
│   ├── language-toggle.tsx
│   └── scroll-progress.tsx
├── lib/
│   ├── utils.ts
│   └── fonts.ts
├── i18n/
│   ├── config.ts
│   ├── request.ts
│   └── messages/
│       ├── en.json
│       └── no.json
├── public/
│   └── images/
├── docs/                      # Documentation (reference only)
├── proxy.ts                   # next-intl middleware
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
└── pnpm-workspace.yaml
```

## Content Structure

See `docs/CONTENT.md` for all text content in both languages.

## Key Sections

### 1. Hero
- Full viewport
- Name reveal animation (staggered letters)
- Subtitle: "Developer. Builder. From the Russian border to fintech."
- Scroll indicator
- Background: subtle gradient or noise texture

### 2. Story: GRENSE (Border)
- Military service at GSV (Grensevakten)
- January 2020 - January 2021
- Grensejeger (Border Hunter) at Jegerkompaniet
- Operations on Russian border
- Mood: disciplined, stark, high-stakes

### 3. Story: KUNNSKAP (Knowledge)
- UiB Bachelor in Informatikk (2021-2023)
- Master courses in Software Engineering (evening studies)
- Continued learning while working

### 4. Story: KODE (Code)
- **Stacc AS** (Jan 2024 - Present)
  - System Developer
  - Consumer & sales finance solutions
  - React, Next.js, TypeScript fullstack
  - CI/CD with GitHub Actions
- **Rosengrip** (Co-founder)
  - Web agency
  - Link to rosengrip.no

### 5. Story: BYGGER (Builder)
- The key differentiator section
- Builds in spare time because he loves it
- Private projects mentioned (not shown):
  - Event planning platform
  - Recruitment tool with Anthropic AI
  - Lottery system
  - "...and whatever comes next"
- Heavy Claude Code user
- GitHub presence

### 6. Tech Stack
Visual, not a boring list. Ideas:
- Floating/orbiting icons
- Interactive hover states
- Grouped by category

Categories:
- Frontend: React, Next.js, TypeScript, Tailwind CSS
- Backend: Node.js, PostgreSQL, MongoDB
- Cloud: AWS, Azure, Vercel
- DevOps: Docker, Kubernetes, GitHub Actions
- Testing: Jest, Playwright, Storybook
- Tools: Claude Code, Kosli, Snyk, Wiz

### 7. Contact
- Email
- GitHub (prominent)
- LinkedIn
- Rosengrip.no

## Animation Guidelines

See `docs/ANIMATIONS.md` for detailed animation specifications.

Key principles:
- Use Framer Motion for all animations
- Scroll-triggered reveals (useInView)
- Staggered children animations
- Smooth, confident easing (not bouncy)
- Parallax effects on images
- Text reveal animations for headings

## i18n Setup

Default locale: `no` (Norwegian)
Supported: `no`, `en`

Use next-intl with:
- URL prefix strategy: `/en/...` for English, `/...` for Norwegian
- Messages in JSON files
- useTranslations hook in components

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

## Implementation Order

1. Set up base Next.js 16 config (no src/, proxy.ts)
2. Configure Tailwind CSS 4 with theme
3. Set up next-intl for i18n
4. Install and configure Framer Motion
5. Add fonts (Google Fonts or local)
6. Create base layout with navigation
7. Build Hero section
8. Build Story sections (one by one)
9. Build Tech Stack section
10. Build Contact section
11. Add scroll progress indicator
12. Polish animations and transitions
13. Test both languages
14. Optimize for performance

## Important Notes

- The Security & Compliance Manager title can be mentioned briefly but don't emphasize it
- Focus on the "builder" identity - someone who codes for fun
- Military background is a differentiator - use it
- Claude Code expertise is notable - highlight it
- Keep the Hjemmesykepleien (home care) section brief - it shows character but isn't the focus
- All Rosengrip projects are from co-founder - only mention rosengrip.no itself, not specific projects

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
