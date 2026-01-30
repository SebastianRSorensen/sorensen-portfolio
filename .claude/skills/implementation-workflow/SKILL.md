# Implementation Workflow Skill

## Purpose

This skill provides a structured, phase-by-phase workflow for implementing complete client websites based on `docs/DESCRIPTION.md`. It orchestrates the existing `unique-web-design` and `nextjs-architecture` skills to ensure consistent quality, proper optimization, and comprehensive verification at each stage.

## Trigger Patterns

Activate this skill when the user says:
- "Implement according to docs/DESCRIPTION.md"
- "Build the website from DESCRIPTION.md"
- "Create the website based on the client description"
- "Implement the client website"
- "/implement"

---

## NOTE: Claude Code Plan Mode vs Implementation Plan

These are TWO DIFFERENT things:

| Claude Code Plan Mode | Implementation Plan |
|----------------------|---------------------|
| `.claude/plans/*.md` | `docs/IMPLEMENTATION_PLAN.md` |
| AI exploration & approach planning | User-facing progress tracker |
| Created automatically by plan mode | Created in Phase 1.5 |
| Used for AI to plan its work | Used to track checkbox progress |

**IMPORTANT:** Even if Claude Code's plan mode was used at the start of the project:
1. You MUST still create `docs/IMPLEMENTATION_PLAN.md` in Phase 1.5
2. The implementation plan serves as the **live progress tracker** with checkboxes
3. Update checkboxes in `docs/IMPLEMENTATION_PLAN.md` as you complete each task
4. The `.claude/plans/` file is separate and serves a different purpose

**After plan mode approval:** Continue with Phase 0 → Phase 1 → Phase 1.5 (create IMPLEMENTATION_PLAN.md) → etc.

---

## CRITICAL: Implementation Plan Requirement

**BEFORE writing ANY code, you MUST:**

1. Complete Phase 0 (Pre-Flight Validation)
2. Complete Phase 1 (Company Analysis)
3. Create `docs/IMPLEMENTATION_PLAN.md` with all tasks as checkboxes
4. Ask user to review the plan at `docs/IMPLEMENTATION_PLAN.md`
5. **WAIT for explicit user approval before proceeding**
6. As you complete each task, **UPDATE the checkboxes in the plan file**

This is NON-NEGOTIABLE. Never start implementation without an approved plan.

### Plan Update Rules

- Mark checkbox as complete `[x]` immediately after finishing each task
- Update the plan file BEFORE moving to the next task
- If a task requires changes, update the plan to reflect actual work done
- Keep the plan as the single source of truth for progress

---

## CRITICAL: Phase Verification Requirement

**After completing EACH phase, you MUST:**

1. Present a completion summary to the user
2. List all files created/modified
3. Explain what was accomplished
4. **WAIT for explicit user approval before proceeding**

This applies to ALL phases (0-9), not just Phase 1.5.

### Verification Template

After completing any phase, present:

```
Phase [X] Complete: [Phase Name]

Completed:
- [List what was done]

Files created/modified:
- [List files]

Please verify and respond:
- "approved" or "continue" → Proceed to Phase [X+1]
- "changes needed" → Tell me what to modify
```

### Accepted Approval Responses

- "approved", "approve"
- "continue", "proceed", "next"
- "looks good", "lgtm"
- "yes", "ok", "okay"

Any other response should be treated as a change request.

---

## PHASE 0: Pre-Flight Validation

### Purpose
Verify all prerequisites are met before beginning implementation.

### 0.1 Required Files Check

```
[ ] docs/DESCRIPTION.md exists
[ ] CLAUDE.md is present in project root
[ ] .claude/skills/unique-web-design/SKILL.md is accessible
[ ] .claude/skills/nextjs-architecture/SKILL.md is accessible
```

### 0.2 DESCRIPTION.md Completeness Check

Read `docs/DESCRIPTION.md` and verify these sections contain meaningful content:

| Section | Required | Minimum Content |
|---------|----------|-----------------|
| Company Overview | Yes | Name, Location, Industry |
| Services/Products | Yes | At least 2 items |
| Target Audience | Yes | Demographics + Pain Points |
| Brand Personality | Yes | At least 3 descriptors |
| Unique Value Proposition | Yes | 1-2 sentences |
| Trust Signals | Recommended | At least 2 signals |
| Website Goals | Yes | Primary conversion goal |
| Pages Needed | Yes | At least Home + Contact |

### 0.3 Missing Information Protocol

If DESCRIPTION.md is incomplete, STOP and request missing information:

```
Before implementing, I need the following information:

MISSING FROM DESCRIPTION.md:
1. [List specific missing sections]
2. [For each, explain what's needed]

Options:
A) I'll ask you these questions now
B) I'll suggest reasonable defaults based on your industry
C) Please update docs/DESCRIPTION.md and tell me when ready
```

### 0.4 Technical Environment Check

```
[ ] package.json has Next.js 16+
[ ] pnpm-lock.yaml exists
[ ] No src/ directory (Next.js 16+ pattern)
[ ] Tailwind CSS 4+ configured
```

### Gate
All checks must pass. If any fail, STOP and address with user before proceeding.

### User Verification Required

**STOP HERE.** Present completion summary to user:

```
Phase 0 Complete: Pre-Flight Validation

Completed:
- Verified docs/DESCRIPTION.md exists and is complete
- Confirmed all required skills are accessible
- Validated technical environment (Next.js 16+, Tailwind 4+, pnpm)

Files verified:
- docs/DESCRIPTION.md
- CLAUDE.md
- .claude/skills/unique-web-design/SKILL.md
- .claude/skills/nextjs-architecture/SKILL.md

Please verify and respond:
- "approved" or "continue" → Proceed to Phase 1: Company Analysis
- "changes needed" → Tell me what to modify
```

**DO NOT proceed to Phase 1 until user explicitly approves.**

---

## PHASE 1: Company Analysis

### Purpose
Extract company DNA and derive design direction.

### Integration
**READ**: `.claude/skills/unique-web-design/SKILL.md` Part 2: Company Analysis Protocol

### 1.1 Extract Company DNA

Create structured analysis from DESCRIPTION.md:

```
COMPANY PROFILE
===============
Name: [From DESCRIPTION.md]
Industry: [From DESCRIPTION.md]
Location: [From DESCRIPTION.md]

Services/Products:
- [List all from DESCRIPTION.md]

Target Audience:
- Demographics: [From DESCRIPTION.md]
- Pain Points: [From DESCRIPTION.md]
- Decision Factors: [Infer or from DESCRIPTION.md]

Unique Value Proposition: [From DESCRIPTION.md]

Brand Personality: [From DESCRIPTION.md checkboxes]
- Primary trait: [strongest]
- Secondary traits: [others]

Trust Signals:
- [List all from DESCRIPTION.md]

Competitors: [From DESCRIPTION.md]
```

### 1.2 Derive Design Direction

Based on company DNA, determine:

```
DESIGN DIRECTION
================
Primary Aesthetic: [Select from unique-web-design palette]
  Options: Warm/Approachable | Bold/Confident | Premium/Refined |
           Modern/Technical | Distinctive/Memorable

Color Strategy:
  - Primary: [specific color family with hex]
  - Neutral: [warm or cool tinted, NOT pure gray]
  - Accent: [high-contrast for CTAs]

Typography:
  - Display font: [specific Google Font]
  - Body font: [specific Google Font]
  - Hierarchy: [dramatic or subtle]

Visual Tone: [Professional | Friendly | Authoritative | Approachable]

Motion Philosophy: [Energetic | Calm | Precise | Playful]

Imagery Style: [Photography | Illustration | Icons | Mixed]
```

### 1.3 Industry-Specific Adjustments

Reference unique-web-design skill's industry defaults:

| Industry | Suggested Aesthetic | Color Direction |
|----------|---------------------|-----------------|
| Trades/Construction | Industrial/Raw | Earth tones, high-vis accents |
| Healthcare | Clean/Trustworthy | Blues, greens, whites |
| Legal/Financial | Premium/Refined | Navy, gold, conservative |
| Food/Restaurant | Warm/Inviting | Warm colors, appetite-inducing |
| Technology | Modern/Technical | Cool colors, gradients okay |
| Creative | Distinctive/Bold | Unexpected combinations |
| Local Services | Friendly/Approachable | Warm, community colors |
| E-commerce | Conversion-focused | High contrast CTAs |
| Real Estate | Premium/Aspirational | Neutral luxury tones |

### 1.4 Uniqueness Verification

Before proceeding, answer:

```
[ ] Does this aesthetic match industry expectations?
[ ] Would target audience find this appropriate?
[ ] Does it differentiate from competitors?
[ ] Would this design work ONLY for THIS company?
    (If "any company" could use it → redesign)
```

### Gate
Design direction documented. Ready to create implementation plan.

### User Verification Required

**STOP HERE.** Present completion summary to user:

```
Phase 1 Complete: Company Analysis

Completed:
- Extracted company DNA from DESCRIPTION.md
- Derived design direction (aesthetic, colors, typography)
- Verified uniqueness criteria

Design Direction Summary:
- Primary Aesthetic: [Selected aesthetic]
- Color Strategy: [Primary, Neutral, Accent]
- Typography: [Display font, Body font]
- Visual Tone: [Selected tone]

Please verify the design direction and respond:
- "approved" or "continue" → Proceed to Phase 1.5: Create Implementation Plan
- "changes needed" → Tell me what to modify
```

**DO NOT proceed to Phase 1.5 until user explicitly approves the design direction.**

---

## PHASE 1.5: Create Implementation Plan

### Purpose
Create a comprehensive implementation plan with checkboxes for user approval.

### MANDATORY: Create docs/IMPLEMENTATION_PLAN.md

After completing Phase 0 and Phase 1, you MUST create `docs/IMPLEMENTATION_PLAN.md` using this template:

```markdown
# Implementation Plan: [Company Name]

> Generated: [Date]
> Status: **Awaiting Approval**

## Overview

- **Company**: [Name from DESCRIPTION.md]
- **Industry**: [Industry]
- **Primary Goal**: [Main conversion goal]
- **Aesthetic Direction**: [Selected aesthetic from Phase 1]

---

## Phase 2: Technical Setup

- [ ] Initialize shadcn/ui
- [ ] Install essential components (button, input, textarea, label, card, sheet, select)
- [ ] Install utilities (lucide-react, clsx, tailwind-merge)
- [ ] Create folder structure (components/, lib/, types/)
- [ ] Create `lib/constants.ts` with site configuration
- [ ] Create `lib/utils.ts` with cn() helper
- [ ] Verify `pnpm dev` runs without errors

## Phase 3: Design System

- [ ] Configure color palette in globals.css
  - Primary: [specific colors from Phase 1]
  - Neutral: [warm/cool tinted]
  - Accent: [CTA color]
- [ ] Configure typography scale (fluid sizing)
- [ ] Configure spacing system
- [ ] Configure animation tokens
- [ ] Set up fonts in layout.tsx ([Display Font], [Body Font])
- [ ] Add prefers-reduced-motion support

## Phase 4: Components

### Layout
- [ ] Create Header (client component)
  - [ ] Logo/company name
  - [ ] Navigation menu
  - [ ] Mobile hamburger menu
  - [ ] CTA button
  - [ ] Scroll-based styling
- [ ] Create Footer (server component)
  - [ ] Contact information
  - [ ] Navigation links
  - [ ] Copyright

### Sections
- [ ] Create Hero section
  - [ ] Value proposition headline
  - [ ] Supporting description
  - [ ] Primary CTA
  - [ ] Trust signal
- [ ] Create Services section
- [ ] Create Trust Signals section
- [ ] Create Testimonials section (if testimonials available)
- [ ] Create CTA Banner section
- [ ] Create Contact section

### Forms
- [ ] Create Contact Form (client component)
  - [ ] Name field
  - [ ] Email/phone field
  - [ ] Message field
  - [ ] Service selection (if applicable)
  - [ ] Loading states
  - [ ] Success/error handling

## Phase 4: Pages

- [ ] Update Root Layout (app/layout.tsx)
  - [ ] Configure fonts
  - [ ] Add metadata
  - [ ] Include Header/Footer
- [ ] Create Homepage (app/page.tsx)
  - [ ] Hero section
  - [ ] Services overview
  - [ ] Trust signals
  - [ ] Testimonials
  - [ ] CTA section
- [ ] Create Services page (app/services/page.tsx)
- [ ] Create Service detail pages (app/services/[slug]/page.tsx)
- [ ] Create About page (app/about/page.tsx)
- [ ] Create Contact page (app/contact/page.tsx)

## Phase 5: SEO

- [ ] Configure root metadata (title, description, OpenGraph)
- [ ] Add page-specific metadata to each page
- [ ] Create sitemap.ts
- [ ] Create robots.ts
- [ ] Add JSON-LD structured data (LocalBusiness schema)

## Phase 6: Performance

- [ ] Verify all images use next/image
- [ ] Add priority to above-fold images
- [ ] Verify fonts use next/font with display: swap
- [ ] Check for unnecessary client components
- [ ] Run `pnpm build` - no warnings
- [ ] Lighthouse performance score > 90

## Phase 7: Accessibility

- [ ] Verify heading hierarchy (one h1, logical h2/h3)
- [ ] Check color contrast (>= 4.5:1)
- [ ] Verify all interactive elements have focus states
- [ ] Verify all form inputs have labels
- [ ] Add skip link to main content
- [ ] Test keyboard navigation
- [ ] Verify prefers-reduced-motion works

## Phase 8: Mobile

- [ ] Test at 320px (small phones)
- [ ] Test at 375px (standard phones)
- [ ] Test at 768px (tablets)
- [ ] Test at 1024px+ (desktop)
- [ ] Verify touch targets >= 44x44px
- [ ] Verify no horizontal scrolling
- [ ] Verify phone numbers are tel: links

## Phase 9: Final QA

- [ ] All links work (no 404s)
- [ ] Contact form submits successfully
- [ ] No placeholder text remaining
- [ ] All content accurate
- [ ] No console errors
- [ ] Build succeeds: `pnpm build`
- [ ] Production test: `pnpm start`
- [ ] Uniqueness check passed

---

## Design Decisions (from Phase 1)

### Color Palette
- **Primary**: [hex codes]
- **Neutral**: [hex codes]
- **Accent**: [hex codes]

### Typography
- **Display**: [Font name]
- **Body**: [Font name]

### Aesthetic Direction
[Brief description of chosen aesthetic and why it fits the client]

---

## Notes

[Any additional notes, edge cases, or special requirements]
```

### User Verification Required

**STOP HERE.** Present completion summary to user:

```
Phase 1.5 Complete: Implementation Plan Created

Completed:
- Created docs/IMPLEMENTATION_PLAN.md with all phase tasks
- Documented design decisions from Phase 1
- Listed all components, pages, and features to build

Files created:
- docs/IMPLEMENTATION_PLAN.md

Please review the implementation plan at docs/IMPLEMENTATION_PLAN.md and respond:
- "approved" or "proceed" → Begin Phase 2: Technical Setup
- "changes needed" → Tell me what to modify

I will NOT start any code implementation until you approve the plan.
```

**DO NOT proceed to Phase 2 until user explicitly approves the implementation plan.**

### After Approval

Update the plan status in `docs/IMPLEMENTATION_PLAN.md`:
```markdown
> Status: **Approved - Implementation In Progress**
```

### During Implementation

**CRITICAL**: After completing EACH checkbox item:
1. Edit `docs/IMPLEMENTATION_PLAN.md`
2. Change `[ ]` to `[x]` for the completed item
3. Only then proceed to the next task

This keeps the plan as a live progress tracker.

---

## PHASE 2: Technical Setup

### Purpose
Configure project foundation with proper dependencies and structure.

### Integration
**READ**: `.claude/skills/nextjs-architecture/SKILL.md` for patterns

### 2.1 Install Dependencies

```bash
# Initialize shadcn/ui
pnpm dlx shadcn@latest init

# Install essential components
pnpm dlx shadcn@latest add button input textarea label card sheet select

# Additional utilities
pnpm add lucide-react clsx tailwind-merge
```

### 2.2 Create Folder Structure

```
project-root/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── about/page.tsx
│   ├── services/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── contact/page.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   └── api/contact/route.ts
├── components/
│   ├── ui/                    # shadcn/ui (auto-generated)
│   ├── layout/
│   │   ├── header.tsx         # Client component
│   │   └── footer.tsx         # Server component
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── services-grid.tsx
│   │   ├── testimonials.tsx
│   │   ├── cta-banner.tsx
│   │   ├── trust-signals.tsx
│   │   └── contact-section.tsx
│   └── forms/
│       └── contact-form.tsx   # Client component
├── lib/
│   ├── utils.ts
│   └── constants.ts
├── types/
│   └── index.ts
└── public/
    └── images/
```

### 2.3 Create Site Configuration

Create `lib/constants.ts` from DESCRIPTION.md:

```typescript
export const siteConfig = {
  name: '[Company Name]',
  description: '[UVP or company description]',
  url: '[Domain or https://example.com]',
  locale: '[e.g., nb_NO or en_US]',
  lang: '[e.g., nb or en]',
  phone: '[Phone number]',
  email: '[Email]',
  address: {
    street: '[Street]',
    city: '[City]',
    postalCode: '[Postal code]',
    country: '[Country code]',
  },
  keywords: ['[SEO keywords from services]'],
} as const;

export const navigation = {
  main: [
    { name: 'Hjem', href: '/' },
    { name: 'Tjenester', href: '/services' },
    { name: 'Om oss', href: '/about' },
    { name: 'Kontakt', href: '/contact' },
  ],
} as const;

export const services = [
  // From DESCRIPTION.md services
  { name: '[Service 1]', slug: '[slug]', description: '[brief]' },
] as const;

export type Service = typeof services[number];
```

### 2.4 Create Utilities

Create `lib/utils.ts`:

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Gate
Run `pnpm dev` and verify no errors before proceeding.

### User Verification Required

**STOP HERE.** Present completion summary to user:

```
Phase 2 Complete: Technical Setup

Completed:
- Initialized shadcn/ui
- Installed essential components (button, input, textarea, label, card, sheet, select)
- Installed utilities (lucide-react, clsx, tailwind-merge)
- Created folder structure (components/, lib/, types/)
- Created lib/constants.ts with site configuration
- Created lib/utils.ts with cn() helper

Files created/modified:
- components/ui/* (shadcn components)
- lib/constants.ts
- lib/utils.ts
- package.json (updated dependencies)

Verification:
- ✓ `pnpm dev` runs without errors

Please verify the setup and respond:
- "approved" or "continue" → Proceed to Phase 3: Design System Creation
- "changes needed" → Tell me what to modify
```

**DO NOT proceed to Phase 3 until user explicitly approves.**

---

## PHASE 3: Design System Creation

### Purpose
Build foundational design system ensuring consistency.

### Integration
**READ**: `.claude/skills/unique-web-design/SKILL.md` Parts 5-7

### 3.1 Color Palette

Update `app/globals.css` with colors from Phase 1:

```css
@import "tailwindcss";

:root {
  /* Primary palette */
  --color-primary-50: [lightest];
  --color-primary-100: [value];
  --color-primary-200: [value];
  --color-primary-300: [value];
  --color-primary-400: [value];
  --color-primary-500: [main];
  --color-primary-600: [value];
  --color-primary-700: [value];
  --color-primary-800: [value];
  --color-primary-900: [darkest];

  /* Neutral palette (warm or cool tinted, NOT pure gray) */
  --color-neutral-50: [lightest];
  --color-neutral-100: [value];
  --color-neutral-200: [value];
  --color-neutral-300: [value];
  --color-neutral-400: [value];
  --color-neutral-500: [mid];
  --color-neutral-600: [value];
  --color-neutral-700: [value];
  --color-neutral-800: [value];
  --color-neutral-900: [darkest];

  /* Accent (for CTAs - high contrast) */
  --color-accent: [value];
  --color-accent-hover: [darker];

  /* Semantic */
  --color-success: [green];
  --color-warning: [amber];
  --color-error: [red];
  --color-info: [blue];
}

@theme inline {
  --color-background: var(--color-neutral-50);
  --color-foreground: var(--color-neutral-900);
  --color-primary: var(--color-primary-500);
  --color-muted: var(--color-neutral-100);
  --color-muted-foreground: var(--color-neutral-500);
  --color-border: var(--color-neutral-200);
}
```

### 3.2 Typography Scale

```css
:root {
  /* Fluid typography */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
  --text-xl: clamp(1.25rem, 1rem + 1.25vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
  --text-3xl: clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem);
  --text-4xl: clamp(2.25rem, 1.75rem + 2.5vw, 3.5rem);
  --text-5xl: clamp(3rem, 2rem + 5vw, 5rem);

  /* Font families */
  --font-display: '[Display Font]', system-ui, sans-serif;
  --font-body: '[Body Font]', system-ui, sans-serif;
}
```

### 3.3 Spacing System

```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;

  --section-padding-y: clamp(4rem, 8vw, 8rem);
  --section-padding-x: clamp(1rem, 5vw, 4rem);
  --container-max: 1280px;
  --content-max: 720px;
}
```

### 3.4 Animation Tokens

```css
:root {
  --duration-instant: 100ms;
  --duration-fast: 200ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;

  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 3.5 Configure Fonts

Update `app/layout.tsx`:

```typescript
import { [DisplayFont], [BodyFont] } from 'next/font/google';

const displayFont = [DisplayFont]({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['700', '800'],
});

const bodyFont = [BodyFont]({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600'],
});

export default function RootLayout({ children }) {
  return (
    <html lang={siteConfig.lang} className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### 3.6 Design System Verification Checklist

**CRITICAL:** Before proceeding to Phase 4 (Component Development), ALL design tokens must be defined.

| Token Type | Required Variables | Status |
|------------|-------------------|--------|
| **Colors** | `--color-primary-{50-900}`, `--color-neutral-{50-900}`, `--color-accent`, `--color-accent-hover` | [ ] |
| **Semantic** | `--color-success`, `--color-warning`, `--color-error`, `--color-info` | [ ] |
| **Typography** | `--text-{xs,sm,base,lg,xl,2xl,3xl,4xl,5xl}` | [ ] |
| **Fonts** | `--font-display`, `--font-body` (configured in layout.tsx) | [ ] |
| **Spacing** | `--space-{1,2,3,4,6,8,12,16,20,24}` | [ ] |
| **Sections** | `--section-padding-y`, `--section-padding-x` | [ ] |
| **Container** | `--container-max`, `--content-max` | [ ] |
| **Animation** | `--duration-{instant,fast,normal,slow}`, `--ease-{out,in,in-out}` | [ ] |
| **Motion** | `prefers-reduced-motion` media query | [ ] |

**Verification Method:** Open browser DevTools → Elements → Select `:root` → Computed → Filter for `--` to see all CSS variables.

### Gate
Design system must be complete. Components CANNOT be created without a verified design system.

### User Verification Required

**STOP HERE.** Present completion summary to user:

```
Phase 3 Complete: Design System Creation

⚠️ BLOCKING PHASE: Components cannot be built until design system is verified.

Completed:
- Configured color palette (primary, neutral, accent, semantic)
- Set up typography scale with fluid sizing
- Defined spacing system
- Created animation tokens
- Configured fonts in layout.tsx
- Added prefers-reduced-motion support

Files modified:
- app/globals.css (design tokens)
- app/layout.tsx (font configuration)

Design System Summary:
- Primary Color: [hex]
- Display Font: [font name]
- Body Font: [font name]

Verification:
- [ ] All CSS variables defined in :root
- [ ] Fonts loading correctly
- [ ] `pnpm dev` runs without errors

Please verify the design system in your browser and respond:
- "approved" or "continue" → Proceed to Phase 4: Component Development
- "changes needed" → Tell me what to modify
```

**DO NOT proceed to Phase 4 until user explicitly approves the design system.**

---

## PHASE 4: Component Development

### Purpose
Systematically build all required components and pages.

### Integration
**READ**: `.claude/skills/unique-web-design/SKILL.md` Part 9
**READ**: `.claude/skills/nextjs-architecture/SKILL.md` Templates

### 4.1 Layout Components

#### Header (`components/layout/header.tsx`)
Must be client component (needs scroll detection, mobile menu):

```
[ ] "use client" directive at top
[ ] Logo/company name from constants
[ ] Navigation from constants
[ ] Mobile menu using Sheet component
[ ] CTA button visible on desktop
[ ] Phone number click-to-call on mobile
[ ] Scroll-based background change
[ ] Proper semantic HTML (nav, ul, li)
```

#### Footer (`components/layout/footer.tsx`)
Server component (static content):

```
[ ] No "use client" directive
[ ] Contact info from constants
[ ] Navigation links
[ ] Service areas if applicable
[ ] Copyright with current year
[ ] Semantic HTML (footer, address)
```

### 4.2 Section Components

**General requirements for all sections:**
```
[ ] Server component unless interactivity required
[ ] Follows selected aesthetic direction
[ ] Passes "would this work for any company?" test
[ ] Mobile-first responsive design
[ ] Semantic HTML
[ ] Accessible (proper headings, contrast)
```

#### Hero Section (`components/sections/hero.tsx`)

**Requirements:**
```
[ ] Clear value proposition headline
    Formula: [Outcome] + [For Who] + [Differentiator]
[ ] Supporting description (1-2 sentences)
[ ] Primary CTA (above fold, high contrast)
[ ] Trust signal visible (one credibility indicator)
[ ] Visual element appropriate to brand
[ ] Works on mobile without scrolling to see CTA
```

**Anti-slop check:**
```
[ ] NOT generic "Welcome to..." headline
[ ] NOT "Get Started" or "Learn More" CTA text
[ ] NOT standard Hero → Features layout
[ ] CTA is specific action: "Ring oss", "Få tilbud", "Book time"
```

#### Services Grid (`components/sections/services-grid.tsx`)

```
[ ] Services from constants
[ ] Links to individual service pages
[ ] Icons appropriate to service type
[ ] Brief descriptions
[ ] NOT generic 3-column card grid
[ ] Varied layout matching aesthetic
```

#### Testimonials (`components/sections/testimonials.tsx`)

```
[ ] Real testimonials from DESCRIPTION.md
[ ] Names and context (role, company, location)
[ ] Photos if available
[ ] Star ratings if applicable
[ ] NOT generic testimonial cards
[ ] Presentation matches aesthetic
```

#### Trust Signals (`components/sections/trust-signals.tsx`)

```
[ ] Years in business
[ ] Projects/customers count
[ ] Certifications displayed
[ ] Review ratings
[ ] Guarantees if applicable
[ ] Visually integrated, not generic badges
```

#### CTA Banner (`components/sections/cta-banner.tsx`)

```
[ ] High contrast section
[ ] Clear, specific call to action
[ ] Phone number visible and clickable
[ ] Multiple contact options
[ ] Urgency without being pushy
```

#### Contact Section (`components/sections/contact-section.tsx`)

```
[ ] Contact form or link to contact page
[ ] Phone number (click-to-call)
[ ] Email address
[ ] Physical address if relevant
[ ] Business hours if relevant
[ ] Map embed if appropriate
```

### 4.3 Form Components

#### Contact Form (`components/forms/contact-form.tsx`)

Must be client component:

```
[ ] "use client" directive
[ ] Minimum fields: name, email/phone, message
[ ] Service selection dropdown if applicable
[ ] Loading states during submission
[ ] Success confirmation message
[ ] Error handling with clear messages
[ ] All inputs have labels
[ ] Proper input types (tel, email)
[ ] Focus states visible
[ ] Keyboard navigable
```

### 4.4 Page Implementation Order

Build pages in this order:

**1. Root Layout (`app/layout.tsx`)**
```
[ ] Server component (no "use client")
[ ] Fonts configured with variables
[ ] Metadata from constants
[ ] Header and Footer imported
[ ] Main wrapper with min-h-screen
```

**2. Homepage (`app/page.tsx`)**
```
[ ] Server component
[ ] Hero section
[ ] Services overview
[ ] Trust signals
[ ] Testimonials if available
[ ] CTA section
[ ] Page-specific metadata
```

**3. Services Overview (`app/services/page.tsx`)**
```
[ ] All services listed
[ ] Links to individual pages
[ ] Page-specific metadata
```

**4. Service Detail (`app/services/[slug]/page.tsx`)**
```
[ ] Dynamic routing from constants
[ ] generateStaticParams for SSG
[ ] Service-specific content
[ ] Related services
[ ] CTA to contact
```

**5. About Page (`app/about/page.tsx`)**
```
[ ] Company story
[ ] Team section if photos available
[ ] Values/mission
[ ] Trust signals
```

**6. Contact Page (`app/contact/page.tsx`)**
```
[ ] Contact form (client component)
[ ] All contact information
[ ] Business hours
[ ] Map if relevant
```

### 4.5 Component Verification Checklist

For EACH component, verify:

| Check | Requirement |
|-------|-------------|
| [ ] | No AI slop patterns (reference unique-web-design) |
| [ ] | Correct server/client separation |
| [ ] | Mobile-first responsive |
| [ ] | Touch targets min 44x44px |
| [ ] | Color contrast WCAG AA |
| [ ] | Semantic HTML elements |
| [ ] | Proper heading hierarchy |
| [ ] | Images use next/image |

### Gate
All components pass verification. No TypeScript or ESLint errors.

### User Verification Required

**STOP HERE.** Present completion summary to user:

```
Phase 4 Complete: Component Development

Completed:
- Created layout components (Header, Footer)
- Built section components (Hero, Services, Testimonials, Trust Signals, CTA, Contact)
- Implemented form components (Contact Form)
- Built all pages (Homepage, Services, About, Contact)

Files created:
- components/layout/header.tsx
- components/layout/footer.tsx
- components/sections/*.tsx
- components/forms/contact-form.tsx
- app/page.tsx (updated)
- app/services/page.tsx
- app/services/[slug]/page.tsx
- app/about/page.tsx
- app/contact/page.tsx

Verification:
- ✓ No TypeScript errors
- ✓ No ESLint errors
- ✓ All components follow server/client separation
- ✓ Anti-slop checks passed

Please review the components and pages, then respond:
- "approved" or "continue" → Proceed to Phase 5: SEO Optimization
- "changes needed" → Tell me what to modify
```

**DO NOT proceed to Phase 5 until user explicitly approves.**

---

## PHASE 5: SEO Optimization

### Purpose
Ensure full search engine optimization.

### 5.1 Root Metadata (`app/layout.tsx`)

```typescript
import { Metadata } from 'next';
import { siteConfig } from '@/lib/constants';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### 5.2 Page-Specific Metadata

Each page needs:
```
[ ] Unique title (under 60 characters)
[ ] Unique description (under 160 characters)
[ ] Keywords relevant to page content
[ ] OpenGraph image if available
```

### 5.3 Sitemap (`app/sitemap.ts`)

```typescript
import { MetadataRoute } from 'next';
import { siteConfig, services } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.8 },
  ];

  const servicePages = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages];
}
```

### 5.4 Robots (`app/robots.ts`)

```typescript
import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
```

### 5.5 Structured Data (JSON-LD)

Add to root layout or relevant pages:

```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  },
};

// In layout.tsx or page.tsx:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

### 5.6 SEO Checklist

```
[ ] All pages have unique titles
[ ] All pages have unique descriptions
[ ] Descriptions under 160 characters
[ ] sitemap.xml accessible at /sitemap.xml
[ ] robots.txt accessible at /robots.txt
[ ] JSON-LD structured data implemented
[ ] Canonical URLs implicit (Next.js handles)
[ ] No duplicate content issues
```

### User Verification Required

**STOP HERE.** Present completion summary to user:

```
Phase 5 Complete: SEO Optimization

Completed:
- Configured root metadata (title, description, OpenGraph)
- Added page-specific metadata to all pages
- Created sitemap.ts
- Created robots.ts
- Implemented JSON-LD structured data

Files created/modified:
- app/layout.tsx (metadata)
- app/sitemap.ts
- app/robots.ts
- All page files (page-specific metadata)

Verification:
- [ ] /sitemap.xml accessible in browser
- [ ] /robots.txt accessible in browser
- [ ] JSON-LD visible in page source

Please verify SEO configuration and respond:
- "approved" or "continue" → Proceed to Phase 6: Performance Optimization
- "changes needed" → Tell me what to modify
```

**DO NOT proceed to Phase 6 until user explicitly approves.**

---

## PHASE 6: Performance Optimization

### Purpose
Meet Core Web Vitals standards.

### 6.1 Image Optimization

```
[ ] All images use next/image component
[ ] Width and height always specified
[ ] priority={true} for above-fold images only
[ ] Descriptive alt text on all images
[ ] Images in /public/images/ directory
[ ] Consider WebP source images for smaller size
```

Example:
```typescript
import Image from 'next/image';

<Image
  src="/images/hero.jpg"
  alt="[Descriptive alt text]"
  width={800}
  height={600}
  priority  // Only above-fold
  className="object-cover"
/>
```

### 6.2 Font Optimization

```
[ ] All fonts via next/font
[ ] display: 'swap' to prevent FOIT
[ ] Only needed weights loaded
[ ] CSS variables for font families
[ ] Subsets limited to needed characters
```

### 6.3 Component Loading

```
[ ] Server components by default
[ ] Client components only where necessary
[ ] Heavy components use dynamic import if needed
[ ] No unnecessary client-side JavaScript
```

Dynamic import example:
```typescript
import dynamic from 'next/dynamic';

const HeavyMap = dynamic(
  () => import('@/components/map'),
  { ssr: false, loading: () => <div>Loading map...</div> }
);
```

### 6.4 Core Web Vitals Targets

| Metric | Target | How to Achieve |
|--------|--------|----------------|
| LCP | < 2.5s | Priority images, fast server, optimized fonts |
| FID | < 100ms | Minimal client JS, server components |
| CLS | < 0.1 | Image dimensions, font display swap |
| TTFB | < 800ms | Static generation, edge deployment |

### 6.5 Build Verification

```bash
pnpm build
```

Check for:
```
[ ] No build warnings
[ ] Bundle sizes reasonable
[ ] Static pages generated
[ ] No "opting out of static generation" for static content
```

### Gate
Lighthouse performance score > 90.

### User Verification Required

**STOP HERE.** Present completion summary to user:

```
Phase 6 Complete: Performance Optimization

Completed:
- Verified all images use next/image with proper sizing
- Configured fonts with next/font and display: swap
- Reviewed component loading strategy (server-first)
- Built and verified bundle sizes

Verification Results:
- Build: ✓ No warnings
- Bundle sizes: [list sizes]
- Static pages: [list generated pages]

Performance Target:
- Lighthouse Score: [actual score] (target: > 90)

Please verify performance in Lighthouse and respond:
- "approved" or "continue" → Proceed to Phase 7: Accessibility Compliance
- "changes needed" → Tell me what to modify
```

**DO NOT proceed to Phase 7 until user explicitly approves.**

---

## PHASE 7: Accessibility Compliance

### Purpose
Ensure WCAG AA compliance.

### 7.1 Semantic HTML

```
[ ] One h1 per page
[ ] Heading hierarchy (h1 → h2 → h3, no skips)
[ ] Semantic elements: nav, main, article, section, aside, footer
[ ] Lists use ul/ol appropriately
[ ] Buttons for actions, links for navigation
```

### 7.2 Color and Contrast

```
[ ] Text contrast >= 4.5:1 (normal text)
[ ] Large text contrast >= 3:1
[ ] Focus states visible on all interactive elements
[ ] Color not sole indicator of information
[ ] Works in high contrast mode
```

### 7.3 Interactive Elements

```
[ ] All buttons have accessible names
[ ] Links have descriptive text (not "click here")
[ ] Focus visible on all elements
[ ] Tab order logical
[ ] Skip link to main content at top
```

### 7.4 Forms

```
[ ] All inputs have associated labels
[ ] Required fields indicated (not just with color)
[ ] Error messages clear and associated with field
[ ] Form completable with keyboard only
[ ] Input types appropriate (tel, email, etc.)
```

### 7.5 Images and Media

```
[ ] All meaningful images have alt text
[ ] Decorative images have alt=""
[ ] Complex images have extended description
```

### 7.6 Motion

```
[ ] prefers-reduced-motion respected
[ ] No content only accessible via animation
[ ] No auto-playing media with sound
```

### 7.7 Testing

```
[ ] Tab through entire site with keyboard
[ ] Test with screen reader if possible
[ ] Run axe DevTools browser extension
[ ] Check with browser accessibility tools
```

### Gate
No WCAG AA violations. axe DevTools shows no critical issues.

### User Verification Required

**STOP HERE.** Present completion summary to user:

```
Phase 7 Complete: Accessibility Compliance

Completed:
- Verified semantic HTML structure (headings, landmarks)
- Checked color contrast (>= 4.5:1)
- Ensured all interactive elements have focus states
- Verified form accessibility (labels, error messages)
- Confirmed image alt text
- Added prefers-reduced-motion support

Accessibility Checklist:
- [ ] Heading hierarchy correct (h1 → h2 → h3)
- [ ] Color contrast passes WCAG AA
- [ ] Keyboard navigation works
- [ ] Skip link to main content present
- [ ] axe DevTools shows no critical issues

Please test accessibility (keyboard nav, axe DevTools) and respond:
- "approved" or "continue" → Proceed to Phase 8: Mobile Responsiveness
- "changes needed" → Tell me what to modify
```

**DO NOT proceed to Phase 8 until user explicitly approves.**

---

## PHASE 8: Mobile Responsiveness

### Purpose
Excellent experience on all devices.

### 8.1 Breakpoint Testing

Test at:
```
[ ] 320px  (small phones)
[ ] 375px  (standard phones)
[ ] 414px  (large phones)
[ ] 768px  (tablets)
[ ] 1024px (small laptops)
[ ] 1280px (desktops)
[ ] 1536px (large screens)
```

### 8.2 Mobile-Specific Checks

```
[ ] Touch targets minimum 44x44px
[ ] No horizontal scrolling
[ ] Body text minimum 16px
[ ] Images scale properly
[ ] Navigation mobile-friendly (hamburger menu)
[ ] CTA visible without scrolling
[ ] Phone numbers are tel: links
[ ] Forms use correct mobile keyboards
```

### 8.3 Layout Checks

```
[ ] Hero works on mobile
[ ] Grids collapse to single column
[ ] Cards stack properly
[ ] Footer usable on mobile
[ ] No content cut off
[ ] No overlapping elements
```

### 8.4 Mobile Performance

```
[ ] Acceptable on 3G connection
[ ] Images load progressively
[ ] Interactions feel responsive
[ ] No layout shift during load
```

### Gate
All breakpoints work correctly. No mobile-specific bugs.

### User Verification Required

**STOP HERE.** Present completion summary to user:

```
Phase 8 Complete: Mobile Responsiveness

Completed:
- Tested all breakpoints (320px, 375px, 414px, 768px, 1024px, 1280px, 1536px)
- Verified touch targets >= 44x44px
- Confirmed no horizontal scrolling
- Ensured mobile menu works correctly
- Verified phone numbers are tel: links

Mobile Checklist:
- [ ] 320px (small phones) - works
- [ ] 375px (standard phones) - works
- [ ] 768px (tablets) - works
- [ ] 1024px+ (desktop) - works
- [ ] No horizontal overflow
- [ ] Touch targets accessible

Please test on mobile device or DevTools responsive mode and respond:
- "approved" or "continue" → Proceed to Phase 9: Final QA
- "changes needed" → Tell me what to modify
```

**DO NOT proceed to Phase 9 until user explicitly approves.**

---

## PHASE 9: Final QA and Verification

### Purpose
Comprehensive final check before delivery.

### 9.1 Functional Testing

```
[ ] All internal links work
[ ] All external links work and open in new tab
[ ] Contact form submits successfully
[ ] Navigation works on all pages
[ ] Mobile menu opens and closes
[ ] All CTAs function correctly
[ ] No JavaScript console errors
```

### 9.2 Content Review

```
[ ] No placeholder text ("Lorem ipsum", "[Company Name]")
[ ] Company information accurate
[ ] Phone number correct and callable
[ ] Email address correct
[ ] Physical address correct
[ ] Services accurately listed
[ ] Trust signals verifiable
```

### 9.3 Browser Testing

```
[ ] Chrome (latest)
[ ] Firefox (latest)
[ ] Safari (latest)
[ ] Edge (latest)
[ ] Chrome Mobile
[ ] Safari iOS
```

### 9.4 Build and Deploy Verification

```bash
pnpm build
pnpm start
```

```
[ ] Build completes without errors
[ ] Production server starts
[ ] All pages render correctly
[ ] No console errors in production
[ ] Environment variables not exposed
```

### 9.5 Final Uniqueness Check

From unique-web-design skill Implementation Checklist:

```
[ ] Does this look different from typical AI sites?
[ ] Is aesthetic direction clear and intentional?
[ ] Does design reflect THIS specific company?
[ ] Would competitor content look wrong here?
[ ] Are typography choices distinctive?
[ ] Is color palette memorable?
[ ] Would you know it's [Company Name] without the logo?
```

### 9.6 Phase Completion Summary

| Phase | Status |
|-------|--------|
| Phase 0: Pre-Flight | [ ] Complete |
| Phase 1: Company Analysis | [ ] Complete |
| Phase 2: Technical Setup | [ ] Complete |
| Phase 3: Design System | [ ] Complete |
| Phase 4: Component Development | [ ] Complete |
| Phase 5: SEO Optimization | [ ] Complete |
| Phase 6: Performance | [ ] Complete |
| Phase 7: Accessibility | [ ] Complete |
| Phase 8: Mobile Responsiveness | [ ] Complete |
| Phase 9: Final QA | [ ] Complete |

### User Verification Required - FINAL

**STOP HERE.** Present final completion summary to user:

```
🎉 Phase 9 Complete: Final QA and Verification

ALL PHASES COMPLETE!

Final Verification Summary:
- ✓ All links work (no 404s)
- ✓ Contact form submits successfully
- ✓ No placeholder text remaining
- ✓ All content accurate
- ✓ No console errors
- ✓ Build succeeds
- ✓ Production server runs
- ✓ Uniqueness check passed

Phase Status:
- Phase 0: Pre-Flight ✓
- Phase 1: Company Analysis ✓
- Phase 2: Technical Setup ✓
- Phase 3: Design System ✓
- Phase 4: Components ✓
- Phase 5: SEO ✓
- Phase 6: Performance ✓
- Phase 7: Accessibility ✓
- Phase 8: Mobile ✓
- Phase 9: Final QA ✓

The website is ready for deployment!

Please do a final review and respond:
- "approved" or "complete" → Website implementation finished
- "changes needed" → Tell me what to modify
```

**Website is NOT complete until user gives final approval.**

---

## Workflow Summary

```
"Implement according to docs/DESCRIPTION.md"
                    │
                    ▼
┌─────────────────────────────────────┐
│ PHASE 0: Pre-Flight Validation      │
│ Check files, completeness, env      │
└───────────────────┬─────────────────┘
                    │ ⏸️ USER VERIFICATION
                    ▼
┌─────────────────────────────────────┐
│ PHASE 1: Company Analysis           │
│ Extract DNA, derive design          │
└───────────────────┬─────────────────┘
                    │ ⏸️ USER VERIFICATION
                    ▼
┌─────────────────────────────────────┐
│ PHASE 1.5: Create Implementation    │
│ Plan at docs/IMPLEMENTATION_PLAN.md │
└───────────────────┬─────────────────┘
                    │ ⏸️ USER VERIFICATION (plan approval)
                    ▼
┌─────────────────────────────────────┐
│ PHASE 2: Technical Setup            │
│ Dependencies, folders, constants    │
└───────────────────┬─────────────────┘
                    │ ⏸️ USER VERIFICATION
                    ▼
┌─────────────────────────────────────┐
│ PHASE 3: Design System ⚠️ BLOCKING  │
│ Colors, typography, spacing, motion │
└───────────────────┬─────────────────┘
                    │ ⏸️ USER VERIFICATION (design system)
                    ▼
┌─────────────────────────────────────┐
│ PHASE 4: Component Development      │
│ Layout, sections, forms, pages      │
└───────────────────┬─────────────────┘
                    │ ⏸️ USER VERIFICATION
                    ▼
┌─────────────────────────────────────┐
│ PHASE 5: SEO Optimization           │
│ Metadata, sitemap, robots, JSON-LD  │
└───────────────────┬─────────────────┘
                    │ ⏸️ USER VERIFICATION
                    ▼
┌─────────────────────────────────────┐
│ PHASE 6: Performance Optimization   │
│ Images, fonts, bundle, Core Web V.  │
└───────────────────┬─────────────────┘
                    │ ⏸️ USER VERIFICATION (Lighthouse > 90)
                    ▼
┌─────────────────────────────────────┐
│ PHASE 7: Accessibility Compliance   │
│ Semantic, contrast, keyboard, ARIA  │
└───────────────────┬─────────────────┘
                    │ ⏸️ USER VERIFICATION (WCAG AA)
                    ▼
┌─────────────────────────────────────┐
│ PHASE 8: Mobile Responsiveness      │
│ Breakpoints, touch, performance     │
└───────────────────┬─────────────────┘
                    │ ⏸️ USER VERIFICATION
                    ▼
┌─────────────────────────────────────┐
│ PHASE 9: Final QA                   │
│ Functional, browser, uniqueness     │
└───────────────────┬─────────────────┘
                    │ ⏸️ FINAL USER VERIFICATION
                    ▼
            WEBSITE COMPLETE
```

**Legend:** ⏸️ = STOP and wait for user approval before proceeding

---

## Quick Reference

### Commands

```bash
# Phase 2 Setup
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button input textarea label card sheet select
pnpm add lucide-react clsx tailwind-merge

# Development
pnpm dev

# Verification
pnpm lint
pnpm build
pnpm start
```

### Skill Integration

| Phase | Skill | Section |
|-------|-------|---------|
| 1 | unique-web-design | Part 2: Company Analysis |
| 1 | unique-web-design | Part 3: Aesthetic Palette |
| 3 | unique-web-design | Parts 5-7: Design Systems |
| 4 | unique-web-design | Part 9: Components |
| 4 | nextjs-architecture | Templates, Rules |
| 9 | unique-web-design | Part 10: Checklist |

### Anti-Slop Quick Check

Before any design decision:
```
[ ] Not using Inter, Roboto, or generic fonts
[ ] Not using purple/indigo color scheme
[ ] Not using Hero → Features → Testimonials → CTA layout
[ ] Not using generic card grids
[ ] Not using "Get Started" or "Learn More" CTAs
[ ] Not using fade-in-up on everything
```
