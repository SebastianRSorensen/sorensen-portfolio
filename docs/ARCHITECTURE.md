# Architecture Documentation

## Overview

This portfolio uses Next.js 16 with the App Router, configured for bilingual support (Norwegian/English) with scroll-driven animations.

## Directory Structure

```
/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx         # Locale-specific layout
│   │   ├── page.tsx           # Main portfolio page
│   │   └── not-found.tsx      # 404 page
│   ├── globals.css            # Global styles + Tailwind theme
│   ├── layout.tsx             # Root HTML layout
│   └── not-found.tsx          # Root 404
├── components/
│   ├── ui/                    # shadcn/ui primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── sections/              # Page sections
│   │   ├── hero.tsx
│   │   ├── story-grense.tsx
│   │   ├── story-kunnskap.tsx
│   │   ├── story-kode.tsx
│   │   ├── story-bygger.tsx
│   │   ├── tech-stack.tsx
│   │   ├── projects.tsx
│   │   └── contact.tsx
│   ├── navigation.tsx         # Header/nav component
│   ├── footer.tsx
│   ├── language-toggle.tsx    # NO/EN switcher
│   ├── scroll-progress.tsx    # Progress indicator
│   └── animated-text.tsx      # Reusable text animations
├── lib/
│   ├── utils.ts               # cn() and utilities
│   └── fonts.ts               # Font definitions
├── i18n/
│   ├── config.ts              # Locale config
│   ├── request.ts             # next-intl request handler
│   └── messages/
│       ├── en.json            # English translations
│       └── no.json            # Norwegian translations
├── hooks/
│   ├── use-scroll-progress.ts
│   └── use-active-section.ts
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── grense/
│   │   └── ...
│   └── fonts/                 # Local fonts if used
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

### tailwind.config.ts (Tailwind CSS 4+)

```typescript
import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        border: 'hsl(var(--border))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
```

### globals.css (Tailwind CSS 4+ with @theme)

```css
@import 'tailwindcss';

@theme {
  --color-background: 210 50% 6%;
  --color-foreground: 36 16% 90%;
  --color-accent: 217 91% 60%;
  --color-accent-foreground: 210 50% 6%;
  --color-muted: 217 33% 17%;
  --color-muted-foreground: 215 20% 65%;
  --color-card: 222 47% 11%;
  --color-card-foreground: 36 16% 90%;
  --color-border: 217 33% 28%;
  
  --font-display: 'Instrument Serif', serif;
  --font-sans: 'Geist', sans-serif;
  --font-mono: 'Geist Mono', monospace;
}

@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
  
  ::selection {
    @apply bg-accent text-accent-foreground;
  }
}
```

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
- Layout components
- Static content sections
- SEO metadata

**Client Components ('use client'):**
- Navigation (scroll detection)
- Language toggle
- Animated sections (Framer Motion)
- Interactive elements

### Section Component Pattern

Each story section follows this pattern:

```typescript
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'

export function StorySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const t = useTranslations('section-name')
  
  return (
    <section ref={ref} className="min-h-screen ...">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Content */}
      </motion.div>
    </section>
  )
}
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
    "tailwindcss-animate": "^1.0.0",
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

## SEO

- Proper meta tags in layout.tsx
- Open Graph images
- Structured data for Person schema
- Sitemap generation
- robots.txt

## Deployment

Optimized for Vercel:
- Automatic builds on push
- Edge middleware for i18n
- Image optimization
- Analytics integration ready
