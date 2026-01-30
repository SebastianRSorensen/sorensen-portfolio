---
name: unique-web-design
description: Create distinctive, high-converting websites that avoid generic AI aesthetics. This skill ensures every website is uniquely tailored to the client described in /docs, optimized for lead generation and user conversion. MANDATORY for all page, component, and layout creation.
version: 1.0.0
triggers: [page, component, layout, hero, section, landing, website, design, style, UI, UX]
---

# Unique Web Design Skill

This skill ensures every website built is **distinctive, conversion-optimized, and tailored to the specific client**. It combats "AI slop" — the generic, forgettable aesthetic that plagues AI-generated websites.

**CRITICAL**: Before creating ANY page, component, or layout, you MUST:
1. Read the company description in `/docs/` folder
2. Analyze the company's industry, audience, and unique value proposition
3. Select an aesthetic direction that authentically represents THIS specific business
4. NEVER default to common AI patterns

---

## Part 1: AI Slop — What to AVOID

AI-generated websites suffer from "distributional convergence" — they gravitate toward the most common patterns in training data. The result is websites that all look the same: generic, safe, forgettable, with no personality or brand identity.

### The AI Slop Checklist — NEVER DO THESE:

#### Typography Sins
- ❌ Inter, Roboto, Open Sans, Lato, Montserrat (overused AI defaults)
- ❌ Arial, Helvetica, system-ui as primary fonts
- ❌ Space Grotesk, Poppins (becoming AI clichés in 2024-2025)
- ❌ Same font weight throughout (no hierarchy)
- ❌ Generic 16px/1.5 body text with no character
- ❌ Predictable heading sizes (48px → 32px → 24px → 18px)

#### Color & Theme Sins
- ❌ Purple-to-blue gradients (THE defining AI aesthetic)
- ❌ Indigo (#6366f1) as primary color
- ❌ Violet/purple accent colors
- ❌ Generic blue (#3B82F6) call-to-action buttons
- ❌ Gray-100 to Gray-900 scale as the entire palette
- ❌ White background with a single accent color
- ❌ Timid, evenly-distributed color palettes
- ❌ No dark mode consideration OR generic dark mode toggle

#### Layout & Structure Sins
- ❌ Hero → Features (3-column grid) → Testimonials → CTA → Footer (THE template)
- ❌ Perfectly centered everything
- ❌ 12-column grid used predictably
- ❌ Cards with rounded-lg corners everywhere
- ❌ Identical padding/margin on all sections
- ❌ "Bento grid" layouts used without purpose
- ❌ Symmetrical layouts with no visual tension
- ❌ Generic icon + heading + paragraph feature blocks
- ❌ Stock photo hero images with gradient overlays

#### Component & Pattern Sins
- ❌ Lucide/Heroicons used generically without context
- ❌ Generic "Get Started" or "Learn More" CTAs
- ❌ Testimonial cards that all look identical
- ❌ Pricing tables with the "popular" badge
- ❌ FAQ accordions with no visual character
- ❌ Newsletter signup: email input + generic button
- ❌ Cookie banners that feel copy-pasted
- ❌ Chatbot widgets with default styling

#### Animation & Interaction Sins
- ❌ Fade-in-up on scroll for everything
- ❌ Generic 300ms ease transitions
- ❌ Hover:scale-105 on every card
- ❌ No purposeful motion (animations that don't guide the user)
- ❌ Parallax scrolling used arbitrarily
- ❌ Loading spinners instead of skeleton states

#### Content & Copy Sins
- ❌ "Welcome to [Company]" as hero headline
- ❌ Generic value propositions ("Fast, Reliable, Affordable")
- ❌ Bullet points instead of prose
- ❌ Lorem ipsum or clearly AI-generated placeholder text
- ❌ Stock phrases: "leverage", "streamline", "cutting-edge", "solutions"
- ❌ Benefits that could apply to any company

---

## Part 2: Company Analysis Protocol

**MANDATORY**: Before ANY design work, complete this analysis using `docs/DESCRIPTION.md`.

### Step 1: Extract Company DNA

Read `docs/DESCRIPTION.md` and identify:

```
COMPANY PROFILE:
├── Name: [Exact company name]
├── Industry: [Specific industry/niche]
├── Location: [City/Region/Country — important for cultural context]
├── Services/Products: [List all offerings]
├── Target Audience: [Who are their customers?]
│   ├── Demographics: [Age, profession, location]
│   ├── Pain Points: [What problems do they solve?]
│   └── Decision Factors: [What makes customers choose them?]
├── Unique Value Proposition: [What makes them different?]
├── Brand Personality: [Formal/casual, traditional/modern, local/global]
├── Trust Signals: [Certifications, awards, years in business, reviews]
└── Competitors: [Who else serves this audience?]
```

### Step 2: Derive Design Direction

Based on company DNA, determine:

```
DESIGN DIRECTION:
├── Primary Aesthetic: [One clear direction from the palette below]
├── Color Strategy: [Based on industry & personality]
├── Typography Personality: [What should text "feel" like?]
├── Visual Tone: [Professional, friendly, authoritative, approachable?]
├── Motion Philosophy: [Energetic, calm, precise, playful?]
├── Imagery Style: [Photography, illustration, icons, mixed?]
└── Cultural Considerations: [Local expectations, industry norms]
```

### Step 3: Industry-Specific Defaults

Use these as STARTING POINTS, then customize:

| Industry | Suggested Aesthetics | Avoid |
|----------|---------------------|-------|
| **Trades/Construction** | Industrial, honest, bold, practical | Overly polished, corporate, delicate |
| **Healthcare/Medical** | Clean, trustworthy, calming, accessible | Trendy, playful, dark themes |
| **Legal/Finance** | Refined, authoritative, traditional touches | Casual, experimental, loud |
| **Food/Restaurant** | Warm, appetizing, textural, inviting | Cold, minimal, corporate |
| **Tech/SaaS** | Modern, efficient, purposeful, innovative | Generic startup aesthetic |
| **Creative/Agency** | Bold, expressive, distinctive, confident | Templated, predictable |
| **Local Services** | Approachable, trustworthy, community-focused | Impersonal, overly modern |
| **E-commerce** | Clear, scannable, conversion-focused | Cluttered, distracting |
| **Real Estate** | Aspirational, premium, spacious, visual | Cramped, text-heavy |
| **Education** | Clear, engaging, organized, welcoming | Childish (unless for children), boring |

---

## Part 3: Aesthetic Direction Palette

Choose ONE primary aesthetic for each project. Mix sparingly.

### Warm & Approachable
- **Earthy/Organic**: Warm neutrals, textured backgrounds, natural imagery, serif accents
- **Friendly/Playful**: Rounded shapes, vibrant but soft colors, casual typography, illustrations
- **Cozy/Inviting**: Warm lighting effects, rich colors, layered textures, homey feel

### Bold & Confident
- **Industrial/Raw**: Exposed grids, monospace type, high contrast, utilitarian
- **Brutalist**: Stark, system fonts used dramatically, raw HTML aesthetic, no decoration
- **Editorial/Magazine**: Strong typography hierarchy, generous whitespace, pull quotes, columns
- **Maximalist**: Dense information, layered visuals, rich color, controlled chaos

### Premium & Refined
- **Luxury/Minimal**: Extreme whitespace, thin serifs, subtle animations, restraint
- **Art Deco**: Geometric patterns, gold accents, elegant type, symmetric layouts
- **Scandinavian**: Light woods, soft shadows, functional beauty, calm colors

### Modern & Technical
- **Neo-Brutalism**: Bold shadows, stark borders, bright accents on neutral base
- **Glassmorphism**: Transparency, blur effects, layered depth, futuristic
- **Dark Mode Native**: Deep blacks/grays, neon accents, dramatic contrast

### Distinctive & Memorable
- **Retro/Nostalgic**: Period-specific typography, vintage colors, analog textures
- **Hand-crafted**: Illustrated elements, imperfect lines, human touches
- **Kinetic/Dynamic**: Motion-first design, animated typography, scroll-driven narrative

---

## Part 4: Conversion Optimization Rules

Every design decision should support user conversion. These are non-negotiable:

### Hero Section (First 5 Seconds)

```
HERO REQUIREMENTS:
├── Clear Value Proposition: What do you do? For whom? What's the benefit?
├── Primary CTA: Above the fold, high contrast, action-oriented text
├── Trust Signal: One credibility indicator (reviews, years, certifications)
├── Visual Focus: Direct attention to CTA
└── Mobile-First: Hero must work perfectly on phones
```

**Hero Headline Formula**: [Outcome] + [For Who] + [Differentiator]
- ❌ "Welcome to Nordic Electric — Your Trusted Electrician"
- ✅ "Safe, Code-Compliant Electrical Work — Bergen Homeowners Trust Us Since 2015"

### Call-to-Action Design

```
CTA REQUIREMENTS:
├── Placement: Above fold, after value props, sticky on mobile
├── Contrast: Button must pop against background (check contrast ratio)
├── Text: Specific action, not generic ("Get Free Quote" not "Submit")
├── Size: Large enough to tap easily (min 44x44px touch target)
├── Repetition: Primary CTA appears 3-4 times per page
└── Urgency: When appropriate, add time/scarcity element
```

**CTA Copy Examples by Industry**:
- Trades: "Request Free Inspection" / "Get Quote in 24hrs"
- Services: "Book Consultation" / "See Availability"
- E-commerce: "Add to Cart" / "Buy Now — Free Shipping"
- SaaS: "Start Free Trial" / "See Demo"

### Trust Building Elements

```
TRUST SIGNALS (include 3-5 per page):
├── Social Proof: Real testimonials with names/photos/companies
├── Credentials: Certifications, licenses, awards, partnerships
├── Numbers: Years in business, customers served, projects completed
├── Reviews: Star ratings, Google/Trustpilot integration
├── Guarantees: Money-back, satisfaction, warranty information
├── Media: "As seen in" logos, press mentions
├── Process: Show how you work (reduces uncertainty)
└── Team: Real photos of real people (especially for local businesses)
```

### Friction Reduction

```
REMOVE FRICTION:
├── Forms: Minimum fields (name, email/phone, message for contact)
├── Navigation: Max 5-6 top-level items
├── Phone Numbers: Click-to-call on mobile, prominently displayed
├── Loading: Skeleton states, optimized images, lazy loading
├── Information: Answer objections before they arise
└── Choices: Don't overwhelm with options
```

### Mobile Optimization (70%+ of traffic)

```
MOBILE REQUIREMENTS:
├── Touch Targets: Minimum 44x44px
├── Font Size: Minimum 16px for body text
├── CTA Visibility: Primary CTA visible without scrolling
├── Phone Integration: Click-to-call links
├── Form Optimization: Appropriate input types (tel, email)
├── Speed: Core Web Vitals passing scores
└── Thumb Zone: Important actions in easy reach
```

---

## Part 5: Typography System

### Font Selection Strategy

**Step 1**: Match font personality to brand:

| Brand Personality | Font Characteristics | Example Pairings |
|-------------------|---------------------|------------------|
| Traditional/Trusted | Serif headlines, clean sans body | Playfair Display + Source Sans 3 |
| Modern/Innovative | Geometric sans, sharp terminals | Outfit + DM Sans |
| Friendly/Approachable | Rounded sans, open letterforms | Nunito + Quicksand |
| Premium/Luxury | Thin serifs, elegant spacing | Cormorant Garamond + Jost |
| Bold/Industrial | Heavy weights, condensed options | Oswald + Barlow |
| Creative/Unique | Display fonts, custom touches | Space Grotesk + Libre Baskerville |
| Technical/Precise | Monospace accents, clean sans | JetBrains Mono + Inter |

**Step 2**: Create typographic hierarchy:

```css
/* Example Typography Scale — Adapt to aesthetic */
:root {
  /* Font Families */
  --font-display: 'Your Display Font', serif;
  --font-body: 'Your Body Font', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Font Sizes — Using fluid typography */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
  --text-xl: clamp(1.25rem, 1rem + 1.25vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
  --text-3xl: clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem);
  --text-4xl: clamp(2.25rem, 1.75rem + 2.5vw, 3.5rem);
  --text-5xl: clamp(3rem, 2rem + 5vw, 5rem);
  
  /* Line Heights */
  --leading-tight: 1.1;
  --leading-snug: 1.3;
  --leading-normal: 1.5;
  --leading-relaxed: 1.7;
  
  /* Letter Spacing */
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
}
```

### Typography Don'ts
- ❌ More than 3 font families
- ❌ Inconsistent hierarchy
- ❌ Small text on mobile (under 16px for body)
- ❌ Low contrast text
- ❌ Overly decorative fonts for body text
- ❌ All caps for long text blocks

---

## Part 6: Color System

### Color Selection Process

**Step 1**: Determine color psychology fit:

| Industry/Goal | Primary Colors | Accent Options |
|--------------|----------------|----------------|
| Trust/Security | Deep blue, navy, dark green | Gold, silver, white |
| Energy/Action | Orange, red, bright yellow | Black, charcoal |
| Growth/Health | Green, teal, earth tones | Warm cream, soft blue |
| Premium/Luxury | Black, gold, deep purple | Cream, silver |
| Friendly/Fun | Coral, teal, warm yellow | Pink, purple |
| Clean/Medical | White, light blue, soft green | Professional gray |
| Creative/Bold | Any distinctive choice | High contrast accents |

**Step 2**: Build a complete palette:

```css
:root {
  /* Primary — Your brand color */
  --color-primary-50: /* Lightest tint */;
  --color-primary-100: ;
  --color-primary-200: ;
  --color-primary-300: ;
  --color-primary-400: ;
  --color-primary-500: /* Base color */;
  --color-primary-600: ;
  --color-primary-700: ;
  --color-primary-800: ;
  --color-primary-900: /* Darkest shade */;
  
  /* Neutral — NOT just gray */
  --color-neutral-50: /* Warm or cool tinted */;
  --color-neutral-100: ;
  /* ... */
  --color-neutral-900: ;
  
  /* Accent — For CTAs and highlights */
  --color-accent: ;
  --color-accent-hover: ;
  
  /* Semantic */
  --color-success: ;
  --color-warning: ;
  --color-error: ;
  --color-info: ;
  
  /* Background variations */
  --bg-primary: ;
  --bg-secondary: ;
  --bg-tertiary: ;
  
  /* Text variations */
  --text-primary: ;
  --text-secondary: ;
  --text-muted: ;
}
```

### Color Don'ts
- ❌ Pure black (#000000) for text — use very dark gray
- ❌ Pure white (#ffffff) for large backgrounds — add subtle warmth/coolth
- ❌ Clashing colors without intention
- ❌ Low contrast text (check WCAG AA minimum)
- ❌ Purple/indigo as default accent (AI aesthetic)
- ❌ Rainbow gradients without purpose

---

## Part 7: Layout & Spacing

### Grid System Philosophy

Don't use the 12-column grid predictably. Instead:

```
LAYOUT PRINCIPLES:
├── Asymmetry: 60/40 splits, 70/30 divisions, odd columns
├── Tension: Create visual interest through imbalance
├── Whitespace: Generous padding creates premium feel
├── Flow: Guide eye through content deliberately
├── Rhythm: Vary section heights and densities
└── Breakpoints: Design for mobile first, enhance for desktop
```

### Spacing Scale

```css
:root {
  /* Spacing — Use consistently */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */
  
  /* Section spacing */
  --section-padding-y: clamp(4rem, 8vw, 8rem);
  --section-padding-x: clamp(1rem, 5vw, 4rem);
  
  /* Container */
  --container-max: 1280px;
  --content-max: 720px; /* For text-heavy content */
}
```

### Section Variation

Don't make every section identical. Vary:

```
SECTION VARIETY:
├── Full-width vs contained
├── Light vs dark background
├── Dense vs spacious
├── Image-heavy vs text-focused
├── Grid vs single column
├── Horizontal vs diagonal flow
└── Static vs animated
```

---

## Part 8: Motion & Interaction

### Animation Philosophy

Motion should be **purposeful**, not decorative:

```
MOTION PURPOSES:
├── Guide Attention: Direct user to important elements
├── Provide Feedback: Confirm actions (button clicks, form submits)
├── Show Relationships: Connect related content
├── Create Hierarchy: Staggered reveals show importance order
├── Add Delight: Surprise moments (use sparingly)
└── Reduce Perceived Latency: Loading states, skeleton screens
```

### Animation Guidelines

```css
:root {
  /* Timing — Faster for interactions, slower for reveals */
  --duration-instant: 100ms;
  --duration-fast: 200ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 700ms;
  
  /* Easing — Match brand personality */
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Hover states — Subtle but noticeable */
.interactive-element {
  transition: transform var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out);
}

.interactive-element:hover {
  transform: translateY(-2px); /* Subtle lift */
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.15);
}

/* Page load reveals — Staggered */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  animation: reveal var(--duration-slow) var(--ease-out) forwards;
}

.reveal:nth-child(1) { animation-delay: 0ms; }
.reveal:nth-child(2) { animation-delay: 100ms; }
.reveal:nth-child(3) { animation-delay: 200ms; }

@keyframes reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Interaction Patterns

```
MEANINGFUL INTERACTIONS:
├── Buttons: Subtle scale + shadow on hover, clear pressed state
├── Cards: Lift effect, border/shadow change
├── Links: Underline animation, color shift
├── Forms: Focus states, validation feedback
├── Navigation: Active states, smooth transitions
├── Images: Subtle zoom on hover (for galleries)
└── Scroll: Parallax only when it adds to narrative
```

---

## Part 9: Component Design Principles

### Hero Section Variations

Don't use the same hero template. Options:

1. **Split Hero**: Content left, visual right (or vice versa)
2. **Full-Bleed Visual**: Text overlaid on full-width image/video
3. **Animated Hero**: Kinetic typography, animated illustrations
4. **Minimalist Hero**: Text-only, powerful typography
5. **Interactive Hero**: 3D elements, hover effects
6. **Video Background**: Looping video with overlay
7. **Illustrated Hero**: Custom artwork, brand mascots
8. **Asymmetric Hero**: Grid-breaking layout

### Feature/Service Sections

Beyond the 3-column grid:

1. **Alternating Rows**: Image/text, text/image pattern
2. **Large Feature Cards**: One feature per full-width section
3. **Interactive Tabs**: Category switching
4. **Scroll-Triggered**: Features reveal as user scrolls
5. **Timeline Layout**: For process-oriented services
6. **Comparison Style**: Side-by-side with competitor
7. **Numbers-Focused**: Large statistics with context

### Testimonial Presentations

Beyond generic cards:

1. **Quote Pullout**: Large quote, small attribution
2. **Video Testimonials**: Embedded customer videos
3. **Case Study Cards**: Problem → Solution → Result
4. **Carousel with Context**: Rotating with background change
5. **Grid of Faces**: Photo-forward, short quotes
6. **Single Spotlight**: One powerful testimonial featured

### Contact/CTA Sections

Make them convert:

1. **Split Contact**: Form + contact info side-by-side
2. **Full-Width CTA Band**: High contrast, single action
3. **Floating Contact**: Sticky button/bar
4. **Contextual CTAs**: Different per service page
5. **Multi-Channel**: Form, phone, chat, map

---

## Part 10: Implementation Checklist

Before finalizing any design:

### Uniqueness Check
- [ ] Does this look different from typical AI-generated sites?
- [ ] Is the aesthetic direction clear and intentional?
- [ ] Does the design reflect THIS specific company's personality?
- [ ] Would a competitor's content look wrong in this design?
- [ ] Are typography choices distinctive?
- [ ] Is the color palette memorable?

### Conversion Check
- [ ] Is the value proposition immediately clear?
- [ ] Is the primary CTA visible above the fold?
- [ ] Are there trust signals visible?
- [ ] Is the phone number/contact prominent?
- [ ] Can users take action in minimal steps?
- [ ] Does every section guide toward conversion?

### Technical Check
- [ ] Is the design mobile-first?
- [ ] Do all touch targets meet minimum size?
- [ ] Is contrast ratio WCAG AA compliant?
- [ ] Are images optimized (WebP, lazy loading)?
- [ ] Is animation respecting prefers-reduced-motion?
- [ ] Are fonts loaded efficiently?

### Client-Specific Check
- [ ] Have you read `docs/DESCRIPTION.md`?
- [ ] Does design match stated brand personality?
- [ ] Are industry expectations met/exceeded?
- [ ] Are local/cultural considerations addressed?
- [ ] Would the target audience feel "this is for me"?

---

## Quick Reference: The Anti-AI Checklist

When in doubt, check against these patterns:

```
❌ AI DEFAULT              →  ✅ DO INSTEAD
─────────────────────────────────────────────────────
Inter font                 →  Distinctive font pairing
Purple/indigo accent       →  Industry-appropriate color
3-column feature grid      →  Varied layout per section
White background           →  Textured/layered backgrounds
rounded-lg everywhere      →  Intentional border radius
Generic stock photos       →  Authentic imagery or illustration
"Get Started" CTA          →  Specific action language
Fade-in-up animations      →  Purposeful, varied motion
Same section padding       →  Varied rhythm and density
Hero → Features → CTA      →  Unique page flow
```

---

## Remember

> "A website that could belong to any company belongs to no company."

Every design decision should answer: **"Why this choice for THIS client?"**

If you can't answer that, the choice is wrong.
