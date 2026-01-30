# Next.js 2025 Architecture Reference

This file summarizes key practices for modern Next.js projects.

## Tech Stack

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

## Rendering

- Mix SSR, SSG, ISR, and CSR per page (hybrid rendering).
- Use SSG for static pages (services, about, contact info).
- Use ISR for dynamic content like testimonials or blog posts.
- Use CSR for interactive forms and UI state.

## Server vs Client Components

- `app/**/page.tsx` and `app/**/layout.tsx` are server components.
- Client components live in `components/**` with `"use client"` and can use hooks.

## State

- Start with `useState`, `useReducer` for local UI state.
- Use URL search params for shareable state (filters, tabs).
- No external state libraries needed for most marketing sites.
- Consider `@tanstack/react-query` only if dynamic data fetching is added later.

## Performance

- Keep most content server-rendered for fast initial load.
- Use `next/image` for all images with proper optimization.
- Use `next/font` for font loading.
- Avoid unnecessary client bundles for static/marketing content.

## Folder Conventions

```
project-root/
├── app/                      # Routing and page composition
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── about/                # About page
│   │   └── page.tsx
│   ├── services/             # Services section
│   │   ├── page.tsx          # Services overview
│   │   └── [slug]/           # Individual service pages
│   │       └── page.tsx
│   ├── contact/              # Contact page
│   │   └── page.tsx
│   └── api/                  # API routes
│       └── contact/
│           └── route.ts
├── components/               # Reusable UI components
│   ├── ui/                   # shadcn/ui base components
│   ├── layout/               # Header, footer, navigation
│   ├── sections/             # Page sections (hero, features, etc.)
│   └── forms/                # Form components
├── lib/                      # Utilities and configuration
│   ├── utils.ts              # Utility functions (cn, formatters)
│   └── constants.ts          # Site configuration and navigation
├── types/                    # TypeScript type definitions
├── public/                   # Static assets
│   └── images/
├── proxy.ts                  # Edge proxy (formerly middleware)
└── package.json
```

## Site Configuration

Use `siteConfig` from `@/lib/constants` for:
- Company name and description
- Contact information (phone, email, address)
- Social media links
- SEO metadata defaults

## Navigation

Use `navigation` from `@/lib/constants` for:
- Main navigation structure
- Footer links
- Service definitions (if applicable)

## Localization

Configure locale in `@/lib/constants`:

```typescript
// For Norwegian projects
export const localeConfig = {
  locale: 'nb_NO',
  lang: 'nb',
  dateFormat: (date: Date) => date.toLocaleDateString('nb-NO'),
  numberFormat: (num: number) => num.toLocaleString('nb-NO'),
  currencyFormat: (num: number) => num.toLocaleString('nb-NO', { style: 'currency', currency: 'NOK' }),
};

// For English projects
export const localeConfig = {
  locale: 'en_US',
  lang: 'en',
  dateFormat: (date: Date) => date.toLocaleDateString('en-US'),
  numberFormat: (num: number) => num.toLocaleString('en-US'),
  currencyFormat: (num: number) => num.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
};
```

## Getting Started

1. Copy templates to your project
2. Update `lib/constants.ts` with project-specific configuration
3. Adjust locale settings as needed
4. Replace placeholder content with actual content

For scaffolding, see the templates in `templates/`.
