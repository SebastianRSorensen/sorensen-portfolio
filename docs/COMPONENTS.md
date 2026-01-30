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

Server component. Sets up HTML structure, fonts, and base styles.

```tsx
// Server Component
import { Geist, Geist_Mono } from 'next/font/google'
// Or local fonts from lib/fonts.ts

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body className={`${fontClasses} antialiased`}>
        {children}
      </body>
    </html>
  )
}
```

### LocaleLayout (`app/[locale]/layout.tsx`)

Server component. Wraps content with next-intl provider.

```tsx
// Server Component
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params
  const messages = await getMessages()
  
  return (
    <NextIntlClientProvider messages={messages}>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </NextIntlClientProvider>
  )
}
```

---

## Navigation Component

### `components/navigation.tsx`

Client component for scroll detection and language toggle.

**Features:**
- Fixed position header
- Transparent → solid on scroll
- Language toggle (NO/EN)
- Mobile menu (hamburger)
- Scroll progress indicator

**Props:** None (uses translations internally)

**Structure:**

```tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { LanguageToggle } from './language-toggle'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const t = useTranslations('nav')
  
  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-background/90 backdrop-blur-md' : 'bg-transparent'
    )}>
      {/* Logo */}
      {/* Nav links (desktop) */}
      {/* Language toggle */}
      {/* Mobile menu button */}
      
      {/* Scroll progress bar */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] bg-accent"
        style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
      />
    </header>
  )
}
```

**Styling:**
- Height: `h-16` (64px)
- Padding: `px-6 md:px-8`
- Background transition on scroll
- Blur effect when scrolled

---

## Section Components

### Base Section Pattern

All story sections follow this pattern:

```tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'

interface SectionProps {
  id?: string
  className?: string
}

export function StorySection({ id, className }: SectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const t = useTranslations('sectionKey')
  
  return (
    <section 
      id={id}
      ref={ref}
      className={cn('min-h-screen py-24 md:py-32', className)}
    >
      <div className="container mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Section content */}
        </motion.div>
      </div>
    </section>
  )
}
```

### Hero Section (`components/sections/hero.tsx`)

**Features:**
- Full viewport height
- Animated name reveal (letter by letter)
- Subtitle fade in
- Scroll indicator
- Background effect (subtle gradient or noise)

**Layout:**
```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│     SEBASTIAN                       │
│     ROSNES                          │
│     SØRENSEN                        │
│                                     │
│     Utvikler. Bygger.               │
│     Fra russergrensen til fintech.  │
│                                     │
│              ↓                      │
│         scroll to explore           │
└─────────────────────────────────────┘
```

**Animation sequence:**
1. Name letters stagger in (0.05s delay each)
2. Underline draws from left
3. Tagline fades up
4. Scroll indicator pulses

**Key styles:**
```css
.hero-name {
  font-family: var(--font-display);
  font-size: clamp(3rem, 10vw, 8rem);
  line-height: 1;
  letter-spacing: -0.02em;
}
```

### Story: Grense (`components/sections/story-grense.tsx`)

**Features:**
- Chapter number ("01")
- Title "GRENSE"
- Image (military/border themed if available)
- Description text
- Highlight points

**Layout (desktop):**
```
┌─────────────────────────────────────┐
│                                     │
│  ┌─────────────┐      01            │
│  │             │      ────────      │
│  │   IMAGE     │      GRENSE        │
│  │  (optional) │                    │
│  │             │      Grensejeger   │
│  └─────────────┘      GSV, 2020-21  │
│                                     │
│       Description text here...      │
│                                     │
└─────────────────────────────────────┘
```

### Story: Kunnskap (`components/sections/story-kunnskap.tsx`)

**Features:**
- Chapter number ("02")
- Education details
- Two degree cards (Bachelor, Master)

**Layout:**
```
┌─────────────────────────────────────┐
│              02                     │
│           ────────                  │
│           KUNNSKAP                  │
│                                     │
│   ┌─────────────┐ ┌─────────────┐   │
│   │ Bachelor    │ │ Master      │   │
│   │ 2021-2023   │ │ Pågående    │   │
│   │             │ │             │   │
│   └─────────────┘ └─────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

### Story: Kode (`components/sections/story-kode.tsx`)

**Features:**
- Chapter number ("03")
- Two position cards: Stacc and Rosengrip
- Links to Rosengrip
- Brief mention of previous experience

**Layout:**
```
┌─────────────────────────────────────┐
│              03                     │
│           ────────                  │
│            KODE                     │
│                                     │
│   ┌─────────────────────────────┐   │
│   │ STACC AS                    │   │
│   │ Systemutvikler, 2024-       │   │
│   │ Consumer & sales finance    │   │
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

### Story: Bygger (`components/sections/story-bygger.tsx`)

**Features:**
- Chapter number ("04")
- Intro text about building for fun
- List of hobby projects (no links, just mentions)
- Claude Code highlight
- GitHub CTA

**This is the differentiator section** - emphasize the "builder" identity.

**Layout:**
```
┌─────────────────────────────────────┐
│              04                     │
│           ────────                  │
│           BYGGER                    │
│                                     │
│   "Jeg koder ikke bare på jobb.    │
│    Jeg bygger fordi jeg liker det." │
│                                     │
│   • Event-planlegger               │
│   • Rekrutteringsverktøy med AI    │
│   • Lotterisystem                  │
│   • ...og det som kommer neste     │
│                                     │
│   ┌─────────────────────────────┐   │
│   │ 🤖 Erfaren Claude Code-     │   │
│   │    bruker                    │   │
│   └─────────────────────────────┘   │
│                                     │
│        [Se GitHub-profilen →]       │
│                                     │
└─────────────────────────────────────┘
```

### Tech Stack (`components/sections/tech-stack.tsx`)

**Features:**
- Grid of technology icons/badges
- Grouped by category
- Hover effects
- NOT a boring list

**Layout options:**

Option A: Floating/orbiting icons
Option B: Categorized grid with subtle animations
Option C: Interactive cloud/constellation

**Recommended: Categorized grid**

```
┌─────────────────────────────────────┐
│           TEKNOLOGI                 │
│                                     │
│   Frontend                          │
│   [React] [Next.js] [TS] [Tailwind] │
│                                     │
│   Backend                           │
│   [Node] [PostgreSQL] [MongoDB]     │
│                                     │
│   Cloud & DevOps                    │
│   [AWS] [Azure] [Docker] [K8s]      │
│                                     │
│   Testing & Tools                   │
│   [Jest] [Playwright] [Claude Code] │
│                                     │
└─────────────────────────────────────┘
```

**Tech badge styling:**
```tsx
<span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
  bg-muted text-muted-foreground text-sm font-mono
  hover:bg-accent hover:text-accent-foreground transition-colors">
  {icon && <Icon className="w-4 h-4" />}
  {name}
</span>
```

### Contact (`components/sections/contact.tsx`)

**Features:**
- Simple, direct
- Email (mailto link)
- Phone (tel link)
- Social links (GitHub, LinkedIn)
- Rosengrip link

**Layout:**
```
┌─────────────────────────────────────┐
│            KONTAKT                  │
│         La oss snakke               │
│                                     │
│   sebastian.rosnes.sorensen@...     │
│   +47 472 78 212                    │
│                                     │
│   [GitHub]  [LinkedIn]  [Rosengrip] │
│                                     │
│          Bergen, Norge              │
│                                     │
└─────────────────────────────────────┘
```

---

## Utility Components

### Language Toggle (`components/language-toggle.tsx`)

```tsx
'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/routing'

export function LanguageToggle() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  
  const toggleLocale = () => {
    const newLocale = locale === 'no' ? 'en' : 'no'
    router.replace(pathname, { locale: newLocale })
  }
  
  return (
    <button 
      onClick={toggleLocale}
      className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
    >
      {locale === 'no' ? 'EN' : 'NO'}
    </button>
  )
}
```

### Scroll Progress (`components/scroll-progress.tsx`)

```tsx
'use client'

import { motion, useScroll } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
```

### Animated Text (`components/animated-text.tsx`)

Reusable text reveal animation component.

```tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  splitBy?: 'letter' | 'word'
}

export function AnimatedText({ 
  text, 
  className, 
  delay = 0,
  splitBy = 'word' 
}: AnimatedTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  const items = splitBy === 'letter' ? text.split('') : text.split(' ')
  
  return (
    <span ref={ref} className={className}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.5, 
            delay: delay + i * (splitBy === 'letter' ? 0.03 : 0.1),
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="inline-block"
        >
          {item}{splitBy === 'word' ? '\u00A0' : ''}
        </motion.span>
      ))}
    </span>
  )
}
```

---

## Footer Component

### `components/footer.tsx`

Simple, minimal footer.

```tsx
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')
  
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {t('copyright')}
          </p>
          <p className="text-sm text-muted-foreground">
            {t('location')}
          </p>
        </div>
      </div>
    </footer>
  )
}
```

---

## shadcn/ui Components to Install

```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add badge
pnpm dlx shadcn@latest add separator
pnpm dlx shadcn@latest add sheet        # For mobile menu
pnpm dlx shadcn@latest add tooltip      # For tech stack
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
│   ├── hero.tsx           ○ Custom
│   ├── story-grense.tsx   ○ Custom
│   ├── story-kunnskap.tsx ○ Custom
│   ├── story-kode.tsx     ○ Custom
│   ├── story-bygger.tsx   ○ Custom
│   ├── tech-stack.tsx     ○ Custom
│   ├── projects.tsx       ○ Custom (maybe merge with kode)
│   └── contact.tsx        ○ Custom
├── navigation.tsx         ○ Custom
├── footer.tsx             ○ Custom
├── language-toggle.tsx    ○ Custom
├── scroll-progress.tsx    ○ Custom
└── animated-text.tsx      ○ Custom
```
