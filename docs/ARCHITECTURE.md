# Architecture Documentation

## Overview

This portfolio uses Next.js 16 with the App Router, configured for bilingual support (Norwegian/English) with scroll-driven animations.

## Directory Structure

```
/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx         # Locale-specific layout (providers, nav, footer)
│   │   ├── page.tsx           # Main portfolio page
│   │   ├── template.tsx       # Page transition (fade-in)
│   │   ├── not-found.tsx      # 404 page
│   │   └── design-system/
│   │       └── page.tsx       # Design system showcase (noindex)
│   ├── globals.css            # Global styles + Tailwind theme (@theme inline)
│   ├── layout.tsx             # Root HTML layout (fonts, noise overlay)
│   └── not-found.tsx          # Root 404
├── components/
│   ├── ui/                    # shadcn/ui primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   └── tooltip.tsx
│   ├── sections/              # Page sections
│   │   ├── hero.tsx                    # Hero with name reveal
│   │   ├── hero-name.tsx              # Letter-by-letter name animation
│   │   ├── story-section.tsx          # Reusable section wrapper
│   │   ├── section-experience.tsx     # KODE — Chapter 01
│   │   ├── section-drive.tsx          # DRIV — Chapter 02
│   │   ├── tech-stack.tsx             # Tech Stack — Chapter 03
│   │   ├── section-education.tsx      # UTDANNING — Chapter 04
│   │   ├── section-other-experience.tsx # ANNEN ERFARING — Chapter 05
│   │   └── contact.tsx                # Contact — Chapter 06
│   ├── design-system/         # Design system showcase components
│   │   ├── showcase.tsx
│   │   ├── color-palette.tsx
│   │   ├── typography-scale.tsx
│   │   ├── spacing-system.tsx
│   │   ├── button-styles.tsx
│   │   ├── badge-styles.tsx
│   │   ├── card-styles.tsx
│   │   ├── animation-previews.tsx
│   │   └── interactive-states.tsx
│   ├── navigation.tsx         # Fixed header with nav links + mobile menu
│   ├── footer.tsx             # Minimal footer
│   ├── language-toggle.tsx    # NO/EN switcher
│   ├── scroll-progress.tsx    # Progress indicator
│   └── animated-text.tsx      # Reusable text animations
├── lib/
│   ├── utils.ts               # cn() utility (clsx + tailwind-merge)
│   ├── fonts.ts               # Font definitions (Instrument Serif, Geist, Geist Mono)
│   ├── animations.ts          # Framer Motion variants and easings
│   └── motion-config.tsx      # MotionConfig provider with reducedMotion="user"
├── i18n/
│   ├── config.ts              # Locale config (no, en)
│   ├── routing.ts             # defineRouting + createNavigation exports
│   ├── request.ts             # next-intl request handler
│   └── messages/
│       ├── en.json            # English translations
│       └── no.json            # Norwegian translations
├── public/
│   ├── noise.svg              # SVG noise texture for overlay
│   └── images/
├── docs/                      # Documentation (reference only)
├── proxy.ts                   # next-intl middleware (NOT middleware.ts)
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── components.json            # shadcn config
├── tsconfig.json
└── package.json
```

## Key Configuration Files

### next.config.ts

```typescript
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  // No experimental flags needed for Next.js 16
}

export default withNextIntl(nextConfig)
```

### proxy.ts (NOT middleware.ts)

```typescript
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: ['/', '/(no|en)/:path*']
}
```

### globals.css (Tailwind CSS 4+ with @theme inline)

Theme uses hex colors directly (not HSL wrappers). All colors, fonts, and typography utility classes are defined in `globals.css` via `@theme inline`:

```css
@import "tailwindcss";

@theme inline {
  --color-background: #0a0f14;
  --color-foreground: #e8e4df;
  --color-accent: #3b82f6;
  --color-accent-hover: #2563eb;
  --color-accent-foreground: #0a0f14;
  --color-muted: #1e293b;
  --color-muted-foreground: #94a3b8;
  --color-border: #334155;
  --color-card: #0f172a;
  --color-card-foreground: #e8e4df;
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;

  --font-display: var(--font-instrument-serif), "Playfair Display", Georgia, serif;
  --font-sans: var(--font-geist-sans), system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), "JetBrains Mono", monospace;
}
```

Typography utility classes: `.text-display`, `.text-heading`, `.text-body`, `.text-mono`

## i18n Setup

### i18n/config.ts

```typescript
export const locales = ['no', 'en'] as const
export const defaultLocale = 'no' as const

export type Locale = (typeof locales)[number]
```

### i18n/routing.ts

```typescript
import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  locales: ['no', 'en'],
  defaultLocale: 'no',
  localePrefix: 'as-needed'
})

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
```

### i18n/request.ts

```typescript
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  }
})
```

## Component Architecture

### Server vs Client Components

**Server Components (default):**
- `app/layout.tsx` — Root layout
- `app/[locale]/layout.tsx` — Locale layout
- `app/[locale]/page.tsx` — Main page
- SEO metadata generation

**Client Components ('use client'):**
- All section components (Framer Motion animations)
- Navigation (scroll detection)
- Language toggle
- Footer (translations hook)
- Design system showcase components

### Section Component Pattern

Each story section uses the `StorySection` wrapper and follows this pattern:

```typescript
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { StorySection } from './story-section'
import { staggerContainer, staggerItem } from '@/lib/animations'

export function SectionName() {
  const t = useTranslations('translationKey')
  const cardsRef = useRef(null)
  const cardsInView = useInView(cardsRef, { once: true, margin: '-50px' })

  return (
    <StorySection id="section-id" chapter={t('chapter')} title={t('title')}>
      <motion.div
        ref={cardsRef}
        variants={staggerContainer}
        initial="initial"
        animate={cardsInView ? 'animate' : 'initial'}
      >
        {/* Stagger-animated cards */}
      </motion.div>
    </StorySection>
  )
}
```

### Page Section Order

```tsx
// app/[locale]/page.tsx
<>
  <Hero />
  <SectionExperience />   {/* Chapter 01 — KODE */}
  <SectionDrive />        {/* Chapter 02 — DRIV */}
  <TechStack />           {/* Chapter 03 — Teknologi */}
  <SectionEducation />    {/* Chapter 04 — UTDANNING */}
  <SectionOtherExperience /> {/* Chapter 05 — ANNEN ERFARING */}
  <Contact />             {/* Chapter 06 — Kontakt */}
</>
```

## Dependencies

### Required packages

```json
{
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next-intl": "^4.0.0",
    "framer-motion": "^11.0.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "class-variance-authority": "^0.7.0",
    "lucide-react": "^0.400.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.7.0",
    "tailwindcss": "^4.0.0",
    "postcss": "^8.4.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^16.0.0"
  }
}
```

## Performance Considerations

1. **Images:** Use Next.js Image component with proper sizing
2. **Fonts:** Preload display fonts, use `font-display: swap`
3. **Animations:** Use `will-change` sparingly, prefer transform/opacity
4. **Code Splitting:** Sections lazy-load with `useInView`
5. **Bundle Size:** Only import needed Framer Motion features
6. **Reduced Motion:** MotionConfig with `reducedMotion="user"` wraps all content

## SEO

- Proper meta tags in layout.tsx (Open Graph, Twitter cards)
- Structured data (Person schema)
- robots: noindex on design-system page
- Sitemap generation
- robots.txt

## Deployment

Optimized for Vercel:
- Automatic builds on push
- Edge middleware for i18n (proxy.ts)
- Image optimization
- Analytics integration ready
