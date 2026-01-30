# Components Documentation

Detailed specifications for each component in the portfolio.

## Component Architecture

### Principles

1. **Server Components by default** - Only use `'use client'` when necessary
2. **Composition over configuration** - Small, composable components
3. **Co-located styles** - Tailwind classes inline, CSS variables for theme
4. **Translations via props or hooks** - Use `useTranslations` in client components

### When to use Client Components

- Animations with Framer Motion
- Scroll detection
- Interactive elements (toggles, menus)
- Browser APIs (window, localStorage)

---

## Layout Components

### RootLayout (`app/layout.tsx`)

Server component. Sets up HTML structure, fonts, and base styles. Includes noise texture overlay for subtle grain effect.

```tsx
// Server Component
import { instrumentSerif, geistSans, geistMono } from '@/lib/fonts'

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body className={`${instrumentSerif.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="noise-overlay">{children}</div>
      </body>
    </html>
  )
}
```

### LocaleLayout (`app/[locale]/layout.tsx`)

Server component. Wraps content with next-intl provider, MotionProvider, Navigation, and Footer.

```tsx
// Server Component
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { MotionProvider } from '@/lib/motion-config'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <MotionProvider>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </MotionProvider>
    </NextIntlClientProvider>
  )
}
```

---

## Navigation Component

### `components/navigation.tsx`

Client component for scroll detection, nav links, and language toggle.

**Features:**
- Fixed position header
- Transparent → solid on scroll (bg-background/90 backdrop-blur-md after 50px)
- Language toggle (NO/EN)
- Mobile menu (hamburger via shadcn Sheet)
- Scroll progress indicator integrated

**Nav Links:**
```tsx
const navLinks = [
  { key: "experience", href: "#kode" },
  { key: "skills", href: "#tech-stack" },
  { key: "education", href: "#utdanning" },
  { key: "contact", href: "#contact" },
];
```

**Styling:**
- Height: `h-16` (64px)
- Padding: `px-6 md:px-8`
- Background transition on scroll
- Blur effect when scrolled

---

## Section Components

### Page Order

Sections render in this order in `app/[locale]/page.tsx`:

1. **Hero** — Full viewport name reveal
2. **SectionExperience** (KODE) — Chapter 01, professional experience
3. **SectionDrive** (DRIV) — Chapter 02, builder identity
4. **TechStack** — Chapter 03, technology badges
5. **SectionEducation** (UTDANNING) — Chapter 04, education
6. **SectionOtherExperience** (ANNEN ERFARING) — Chapter 05, other experience
7. **Contact** — Chapter 06, contact info

### Base Section Pattern: StorySection

All story sections use the `StorySection` wrapper (`components/sections/story-section.tsx`).

```tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface StorySectionProps {
  id: string
  chapter: string
  title: string
  children: React.ReactNode
}

// Provides: scroll-triggered chapter number, title with underline draw, children reveal
```

### Hero Section (`components/sections/hero.tsx`)

**Features:**
- Full viewport height
- Animated name reveal (letter by letter) via `hero-name.tsx`
- Tagline fade in: "Ikke en typisk utvikler." / "Not your typical developer."
- Scroll indicator
- Background: subtle noise texture overlay

**Layout:**
```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│     SEBASTIAN                       │
│     ROSNES                          │
│     SØRENSEN                        │
│                                     │
│     Ikke en typisk utvikler.        │
│                                     │
│              ↓                      │
│         scroll to explore           │
└─────────────────────────────────────┘
```

**Animation sequence:**
1. Name letters stagger in (0.04s delay each)
2. Underline draws from left
3. Tagline fades up
4. Scroll indicator pulses

### SectionExperience (`components/sections/section-experience.tsx`)

**Features:**
- Chapter "01", title "KODE"
- Two position cards: Stacc AS and Rosengrip
- Tech highlight badges per card
- External link to rosengrip.no
- Uses `useTranslations('kode')`

**Layout:**
```
┌─────────────────────────────────────┐
│              01                     │
│           ────────                  │
│            KODE                     │
│                                     │
│   ┌─────────────────────────────┐   │
│   │ STACC AS                    │   │
│   │ Systemutvikler, 2024-       │   │
│   │ Consumer & sales finance    │   │
│   │ [React] [Next.js] [CI/CD]   │   │
│   └─────────────────────────────┘   │
│                                     │
│   ┌─────────────────────────────┐   │
│   │ ROSENGRIP                   │   │
│   │ Medgründer, 2024-           │   │
│   │ rosengrip.no →              │   │
│   └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

### SectionDrive (`components/sections/section-drive.tsx`)

**Features:**
- Chapter "02", title "DRIV" / "DRIVE"
- Large intro quote: "Koding stopper ikke klokken fire."
- Staggered project list (no cards, just mentions)
- Claude Code highlight callout card
- GitHub CTA button
- Uses `useTranslations('bygger')`

**This is the differentiator section** — emphasizes the "builder" identity.

**Layout:**
```
┌─────────────────────────────────────┐
│              02                     │
│           ────────                  │
│            DRIV                     │
│                                     │
│   "Koding stopper ikke             │
│    klokken fire."                  │
│                                     │
│   — Event-planlegger               │
│   — Rekrutteringsverktøy med AI    │
│   — Lotterisystem                  │
│   — ...og det som kommer neste     │
│                                     │
│   ┌─────────────────────────────┐   │
│   │ ⌨ Erfaren Claude Code-     │   │
│   │    bruker                    │   │
│   └─────────────────────────────┘   │
│                                     │
│        [Se GitHub-profilen →]       │
│                                     │
└─────────────────────────────────────┘
```

### TechStack (`components/sections/tech-stack.tsx`)

**Features:**
- Chapter "03", title from i18n
- 6 categories in 2-3 column grid
- Category titles: uppercase, mono, muted-foreground
- Tech items as hover-transition badges
- Stagger reveal per category
- Uses `useTranslations('techStack')`

**Categories:**
- Frontend: React, Next.js, TypeScript, Tailwind CSS
- Backend: Node.js, NestJS, PostgreSQL, MongoDB
- Cloud & Deploy: Azure, Vercel
- DevOps: Docker, Kubernetes, GitHub Actions
- Testing: Jest, Playwright, Storybook
- Tools: Claude Code, Bruno, Postman, REST/OpenAPI, Kosli, Snyk, Wiz

**Badge styling:**
```tsx
<span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-mono
  hover:bg-accent hover:text-accent-foreground transition-colors">
  {name}
</span>
```

### SectionEducation (`components/sections/section-education.tsx`)

**Features:**
- Chapter "04", title "UTDANNING" / "EDUCATION"
- Section id: `utdanning`
- Two cards side-by-side on desktop (grid md:grid-cols-2)
- Bachelor in Computer Science (2021-2023)
- Software Engineering Master courses (evening studies, completed)
- Uses `useTranslations('kunnskap')`

**Note:** Master card is titled "Fag fra master i programvareutvikling" / "Software Engineering Master courses" — Sebastian took the required courses but did not complete the full master's degree.

**Layout:**
```
┌─────────────────────────────────────┐
│              04                     │
│           ────────                  │
│          UTDANNING                  │
│                                     │
│   ┌─────────────┐ ┌─────────────┐   │
│   │ Bachelor    │ │ Master-fag  │   │
│   │ 2021-2023   │ │ Kveldsstud. │   │
│   │             │ │             │   │
│   └─────────────┘ └─────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

### SectionOtherExperience (`components/sections/section-other-experience.tsx`)

**Features:**
- Chapter "05", title "ANNEN ERFARING" / "OTHER EXPERIENCE"
- Three experience cards, ordered most-recent-first:
  1. Home Nursing (Assistent, Oct 2022–May 2025)
  2. Coop Norge SA (Lagerfunksjonær, Aug 2019–Dec 2022)
  3. Military (Grensejeger/Ranger, Jan 2020–Jan 2021) — includes highlights list
- Uses `useTranslations('grense')`

**Layout:**
```
┌─────────────────────────────────────┐
│              05                     │
│           ────────                  │
│       ANNEN ERFARING                │
│                                     │
│   ┌─────────────────────────────┐   │
│   │ Assistent                   │   │
│   │ Hjemmesykepleien Bergen     │   │
│   └─────────────────────────────┘   │
│                                     │
│   ┌─────────────────────────────┐   │
│   │ Lagerfunksjonær             │   │
│   │ Coop Norge SA               │   │
│   └─────────────────────────────┘   │
│                                     │
│   ┌─────────────────────────────┐   │
│   │ Grensejeger / Ranger        │   │
│   │ Jegerkompaniet, GSV         │   │
│   │ — Highlights...             │   │
│   └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

### Contact (`components/sections/contact.tsx`)

**Features:**
- Chapter "06"
- Simple, centered layout
- Email (mailto link), Phone (tel link), Location
- Social links: GitHub, LinkedIn, Rosengrip (with Lucide icons)
- Hover animation on each link (x: +5, color transition)
- Uses `useTranslations('contact')`

---

## Utility Components

### Language Toggle (`components/language-toggle.tsx`)

```tsx
'use client'
// Shows "EN" when locale is 'no', "NO" when locale is 'en'
// Uses useLocale() and useRouter/usePathname from @/i18n/routing
```

### Scroll Progress (`components/scroll-progress.tsx`)

```tsx
'use client'
// Thin accent bar at top of viewport, integrated into navigation
// Uses motion.div with scaleX: scrollYProgress
```

### Animated Text (`components/animated-text.tsx`)

Reusable text reveal animation component.

```tsx
'use client'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  splitBy?: 'letter' | 'word'
}

// useInView for scroll trigger, staggered animation per letter or word
```

### Hero Name (`components/sections/hero-name.tsx`)

Dedicated letter-by-letter name animation for the hero section.

```tsx
'use client'
// Splits "SEBASTIAN", "ROSNES", "SØRENSEN" into three lines
// Each letter is a motion.span with staggered delay
```

---

## Footer Component

### `components/footer.tsx`

Client component. Minimal footer with copyright and location.

```tsx
'use client'
// py-12 border-t border-border
// Uses useTranslations('footer')
```

---

## shadcn/ui Components Installed

```bash
pnpm dlx shadcn@latest add button card badge separator sheet tooltip
```

---

## Component File Checklist

```
components/
├── ui/
│   ├── button.tsx         ✓ shadcn
│   ├── card.tsx           ✓ shadcn
│   ├── badge.tsx          ✓ shadcn
│   ├── separator.tsx      ✓ shadcn
│   ├── sheet.tsx          ✓ shadcn
│   └── tooltip.tsx        ✓ shadcn
├── sections/
│   ├── hero.tsx               ✓ Custom — Hero section
│   ├── hero-name.tsx          ✓ Custom — Letter-by-letter name animation
│   ├── story-section.tsx      ✓ Custom — Reusable section wrapper
│   ├── section-experience.tsx ✓ Custom — KODE (Chapter 01)
│   ├── section-drive.tsx      ✓ Custom — DRIV (Chapter 02)
│   ├── tech-stack.tsx         ✓ Custom — Tech Stack (Chapter 03)
│   ├── section-education.tsx  ✓ Custom — UTDANNING (Chapter 04)
│   ├── section-other-experience.tsx ✓ Custom — ANNEN ERFARING (Chapter 05)
│   └── contact.tsx            ✓ Custom — Contact (Chapter 06)
├── design-system/
│   ├── showcase.tsx           ✓ Custom — Design system overview
│   ├── color-palette.tsx      ✓ Custom
│   ├── typography-scale.tsx   ✓ Custom
│   ├── spacing-system.tsx     ✓ Custom
│   ├── button-styles.tsx      ✓ Custom
│   ├── badge-styles.tsx       ✓ Custom
│   ├── card-styles.tsx        ✓ Custom
│   ├── animation-previews.tsx ✓ Custom
│   └── interactive-states.tsx ✓ Custom
├── navigation.tsx         ✓ Custom
├── footer.tsx             ✓ Custom
├── language-toggle.tsx    ✓ Custom
├── scroll-progress.tsx    ✓ Custom
└── animated-text.tsx      ✓ Custom
```
