---
name: nextjs-architecture
description: >
  Enforce modern Next.js 2025 best practices for React Server Components, hybrid rendering,
  and file organization. Use when creating or refactoring pages, layouts, route handlers,
  or components in any Next.js app, especially to keep page.tsx and layout.tsx as server
  components and move client logic into separate files.
allowed-tools: Read, Write, Glob, Grep
version: 3.0.0
---

# Next.js Architecture 2025 Skill

## Purpose

You are working in a modern Next.js (App Router) codebase. This skill applies to **any Next.js project** including marketing websites, web applications, e-commerce sites, dashboards, and more.

Your job is to:

- Keep **pages and layouts as React Server Components** (no "use client" in `page.tsx` or `layout.tsx`).
- Isolate **client components** (hooks, browser-only APIs, event-heavy UI) into their own files with `"use client"` at the top.
- Apply **hybrid rendering**: choose between SSR, SSG, ISR, and CSR per use-case instead of defaulting to one.
- Optimize performance and bundle size by moving logic to the server whenever possible.
- Follow project-specific configuration from `@/lib/constants` when available.

Use this Skill whenever the user asks you to:

- Create or refactor a page, layout, route handler, or component in the `app/` or `components/` directories.
- Decide where to put new UI, hooks, or data-fetching logic.
- Improve performance, SSR behavior, or code structure.

## Tech Stack Requirements

This skill assumes the following stack (do not deviate without explicit justification):

| Tool | Version | Notes |
|------|---------|-------|
| **Next.js** | 16+ | App Router, Turbopack |
| **Tailwind CSS** | 4+ | CSS-first configuration |
| **shadcn/ui** | Latest | Component library |
| **pnpm** | Latest | Package manager |

**Important Next.js 16+ changes:**
- Do NOT use `src/` directory — place `app/` and `components/` at project root.
- Middleware is renamed to `proxy.ts` (not `middleware.ts`).
- Use Turbopack for development (`next dev --turbopack`).

## Global rules for this project

When editing or adding files in this repo:

### 1. Server Components by default

- Assume `app/**/page.tsx` and `app/**/layout.tsx` are **server components**.
- Do NOT add `"use client"` to these files.
- Do NOT introduce `useState`, `useEffect`, or browser APIs directly in `page.tsx` or `layout.tsx`.
- Instead, create a separate client component file and import it.

### 2. Client components in separate files

Any component that:
- uses React hooks (`useState`, `useEffect`, `useMemo`, etc.),
- accesses `window`, `document`, or browser-only APIs,
- handles interactive UI (forms, modals, complex client-side state)

**must** live in its own file with `"use client"` at the very top.

- Place these in `components/**`, not in `app/**/page.tsx`.
- Example structure:
  - `app/page.tsx` → server component (homepage)
  - `app/contact/page.tsx` → server component (contact page)
  - `components/layout/header.tsx` → client component with `"use client"` (interactive navigation)
  - `components/forms/contact-form.tsx` → client component with `"use client"` (form handling)
  - `components/sections/hero.tsx` → can be server component (no interactivity)
  - `components/sections/services-grid.tsx` → can be server component (static content)

### 3. Localization

Handle localization based on project requirements:

**For single-language projects:**
- Hardcode strings directly in components (no i18n library needed).
- Configure locale formatting in `@/lib/constants` or use directly:
  ```typescript
  // Date formatting
  date.toLocaleDateString("nb-NO") // Norwegian
  date.toLocaleDateString("en-US") // English US
  
  // Number formatting
  number.toLocaleString("nb-NO")
  
  // Currency formatting
  number.toLocaleString("nb-NO", { style: "currency", currency: "NOK" })
  number.toLocaleString("en-US", { style: "currency", currency: "USD" })
  ```

**For multi-language projects:**
- Consider `next-intl` or `next-i18next`.
- Store translations in `/messages/` or `/locales/`.
- Use `useTranslations` hook in client components.

### 4. Rendering strategy selection

Choose the appropriate strategy per page:

| Strategy | When to use | Example |
|----------|-------------|---------|
| **SSG** (Static) | Content rarely changes, SEO important | Service pages, about, landing pages |
| **ISR** (Incremental) | Content changes occasionally | Blog posts, testimonials, product listings |
| **SSR** (Server) | Data must be fresh per request | User dashboards, personalized content |
| **CSR** (Client) | Interactive UI, no SEO needed | Forms, modals, admin panels |

**Default to SSG** for marketing/content sites. Document your choice in comments when using other strategies:

```typescript
// Using ISR: testimonials update weekly, revalidate daily
export const revalidate = 86400; // 24 hours

// Using SSR: user-specific content
export const dynamic = 'force-dynamic';
```

### 5. Data fetching and caching

**Static/marketing sites:**
- Most pages can be statically generated at build time.
- Use constants from `@/lib/constants` for site configuration.
- Fetch data directly in server components when needed.

**Dynamic sites:**
- Use `next: { revalidate: N }` for periodic updates.
- Use `cache: 'no-store'` for always-fresh data.
- Consider ISR for content that changes periodically.

**Avoid:**
- `useEffect` for data that could be fetched server-side.
- Client-side fetching for SEO-important content.

### 6. State management

Start simple and add complexity only when needed:

| Use Case | Solution |
|----------|----------|
| Local UI state | `useState`, `useReducer` |
| Shareable state (filters, tabs) | URL search params |
| Simple forms | `useState` for values and submission |
| Complex forms | React Hook Form |
| Server state / caching | `@tanstack/react-query` |
| Global client state | Zustand, Jotai (only if truly needed) |

**Note:** Most marketing sites don't need external state libraries.

### 7. Performance & bundle size

- **Server components by default** — avoid sending unnecessary JavaScript.
- **Image optimization** — always use `next/image`:
  ```tsx
  import Image from 'next/image';
  <Image src="/hero.jpg" alt="Description" width={800} height={600} priority />
  ```
- **Font optimization** — always use `next/font`:
  ```typescript
  import { Inter } from 'next/font/google';
  const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });
  ```
- **Dynamic imports** — lazy load heavy client components:
  ```typescript
  import dynamic from 'next/dynamic';
  const HeavyChart = dynamic(() => import('@/components/charts/heavy-chart'), { ssr: false });
  ```
- **Avoid premature optimization** — don't add `useMemo`/`useCallback` without identified performance issues.

### 8. File and folder organization

```
project-root/
├── app/                      # Routing and page composition (mostly server)
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── [feature]/            # Feature routes
│   │   └── page.tsx
│   └── api/                  # API routes
│       └── [endpoint]/
│           └── route.ts
├── components/               # Reusable UI (mix of server/client)
│   ├── ui/                   # shadcn/ui base components
│   ├── layout/               # Header, footer, navigation
│   ├── sections/             # Page sections (hero, features, etc.)
│   └── forms/                # Form components
├── lib/                      # Utilities and configuration
│   ├── utils.ts              # Utility functions (cn, formatters)
│   └── constants.ts          # Site configuration
├── types/                    # TypeScript definitions
├── public/                   # Static assets
│   └── images/
├── proxy.ts                  # Edge proxy (formerly middleware)
└── package.json
```

**Naming conventions:**
- Filenames: `kebab-case.tsx` (e.g., `contact-form.tsx`)
- Components: `PascalCase` (e.g., `ContactForm`)
- Co-locate types near components when reasonable.

## How to change code in this repo

When the user asks you to modify code:

1. **Identify the file type**
   - If it's a `page.tsx` or `layout.tsx`, keep it server-only and move any interactive logic out.
   - If it requires client behavior, create or update a client component in `components/**`.

2. **Explain your decisions**
   - Why something is a server vs client component.
   - Which rendering strategy you chose (SSR, SSG, ISR, CSR).
   - Any performance implications.

## Templates

### Root Layout Template

```tsx
// app/layout.tsx — Server component (no "use client")
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { siteConfig } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={siteConfig.lang} className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

### Server Page Template

```tsx
// app/[feature]/page.tsx — Server component (no "use client")
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
// Import client components only where interactivity is needed
// import { SomeClientComponent } from '@/components/some-client-component';

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description for SEO.',
};

const benefits = [
  'Benefit one',
  'Benefit two',
  'Benefit three',
];

export default function FeaturePage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Feature Title
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Feature description explaining the value proposition.
            </p>

            <ul className="space-y-3 mb-8">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-success shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <Button asChild size="lg">
              <Link href="/contact">
                Get started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image
              src="/images/feature.jpg"
              alt="Feature image"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Client Component Template

```tsx
// components/forms/contact-form.tsx — Client component
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle, Loader2 } from 'lucide-react';

interface ContactFormProps {
  onSuccess?: () => void;
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      // Submit to API route
      // await fetch('/api/contact', { method: 'POST', body: formData });
      
      // Simulate API call for demo
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSubmitted(true);
      onSuccess?.();
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
        <p className="text-muted-foreground">
          We'll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" name="name" required placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" required placeholder="your@email.com" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="How can we help?"
          rows={5}
        />
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          'Send message'
        )}
      </Button>
    </form>
  );
}
```

### Interactive Header Template

```tsx
// components/layout/header.tsx — Client component (needs scroll detection, mobile menu)
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { siteConfig, navigation } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-bold text-xl">
            {siteConfig.name}
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button asChild>
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>

          {/* Mobile menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {navigation.main.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
```

### Site Configuration Template

```typescript
// lib/constants.ts — Central configuration

export const siteConfig = {
  name: 'Company Name',
  description: 'Company description for SEO and meta tags.',
  url: 'https://example.com',
  locale: 'en_US',  // OpenGraph locale
  lang: 'en',       // HTML lang attribute
  
  // Contact information
  phone: '+1 555 123 4567',
  email: 'hello@example.com',
  address: {
    street: '123 Main Street',
    city: 'City',
    state: 'State',
    postalCode: '12345',
    country: 'Country',
  },
  
  // Social links
  social: {
    twitter: 'https://twitter.com/company',
    linkedin: 'https://linkedin.com/company/company',
    github: 'https://github.com/company',
  },
} as const;

export const navigation = {
  main: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  footer: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
} as const;

// Add project-specific constants as needed:
// export const services = [...];
// export const serviceAreas = [...];
// export const testimonials = [...];
```

## Checklist for new features

When implementing a new feature, verify:

- [ ] All pages/layouts are server components (no `"use client"`)
- [ ] Client logic extracted to `components/**` with `"use client"`
- [ ] Rendering strategy documented if not default SSG
- [ ] Static content defined as constants or fetched server-side
- [ ] Forms and interactive UI in client components
- [ ] Images use `next/image` for optimization
- [ ] Fonts use `next/font` for performance
- [ ] Site config used from `@/lib/constants`

## Refactoring guide

If you see hooks or browser APIs inside `page.tsx` or `layout.tsx`:

1. Extract that logic into a new client component under `components/**`.
2. Mark the new component with `"use client"`.
3. Import and render it within the server component.
4. Keep static content and data fetching on the server.

## Common patterns

### Server page with client form

```tsx
// app/contact/page.tsx (server)
import { ContactForm } from '@/components/forms/contact-form';

export default function ContactPage() {
  return (
    <div className="container">
      <h1>Contact Us</h1>
      <ContactForm />  {/* Client component handles interactivity */}
    </div>
  );
}
```

### Dynamic route with ISR

```tsx
// app/blog/[slug]/page.tsx
export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  // Pre-generate popular posts at build time
  return [{ slug: 'first-post' }, { slug: 'second-post' }];
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  return <article>{/* ... */}</article>;
}
```

### Search params for state

```tsx
// app/products/page.tsx (server)
export default function ProductsPage({ searchParams }: { searchParams: { category?: string } }) {
  const category = searchParams.category || 'all';
  // Filter products based on URL params — shareable and SEO-friendly
  return <ProductGrid category={category} />;
}
```

## Version history

- v3.0.0 (2026-01): Generic version for any Next.js project
- v2.0.0 (2026-01): Adapted for KLUND ELEKTRO electrical services website
- v1.0.0 (2025-01): Initial version for Servtech Personell
