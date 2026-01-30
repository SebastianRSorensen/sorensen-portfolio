# Design System Documentation

## Design Philosophy

This portfolio is inspired by landonorris.com - a cinematic, story-driven experience that feels like scrolling through a high-end magazine or film. It should feel **bold**, **confident**, and **memorable**.

### Core Principles

1. **Story over structure** - The site tells a journey, not a list of facts
2. **Cinematic scale** - Full viewport sections, dramatic typography
3. **Confident restraint** - Dark palette, strategic use of color
4. **Motion with purpose** - Every animation serves the narrative
5. **Anti-AI-slop** - No generic gradients, floating cards, or template aesthetics

## Color Palette: Nordic Night

### Primary Colors

| Name | HSL | Hex | Usage |
|------|-----|-----|-------|
| Background | 210 50% 6% | #0a0f14 | Page background |
| Foreground | 36 16% 90% | #e8e4df | Primary text |
| Accent | 217 91% 60% | #3b82f6 | Links, highlights, CTAs |
| Accent Hover | 217 91% 50% | #2563eb | Hover states |

### Secondary Colors

| Name | HSL | Hex | Usage |
|------|-----|-----|-------|
| Muted | 217 33% 17% | #1e293b | Card backgrounds, sections |
| Muted Foreground | 215 20% 65% | #94a3b8 | Secondary text, captions |
| Border | 217 33% 28% | #334155 | Subtle borders, dividers |
| Card | 222 47% 11% | #0f172a | Elevated surfaces |

### Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| Success | #22c55e | Positive states |
| Warning | #f59e0b | Attention states |
| Error | #ef4444 | Error states |

### CSS Variables

```css
:root {
  --background: 210 50% 6%;
  --foreground: 36 16% 90%;
  --accent: 217 91% 60%;
  --accent-hover: 217 91% 50%;
  --accent-foreground: 210 50% 6%;
  --muted: 217 33% 17%;
  --muted-foreground: 215 20% 65%;
  --border: 217 33% 28%;
  --card: 222 47% 11%;
  --card-foreground: 36 16% 90%;
  
  --radius: 0.5rem;
}
```

## Typography

### Font Stack

| Role | Font | Fallback | Usage |
|------|------|----------|-------|
| Display | Instrument Serif | Georgia, serif | H1, Hero text, Section titles |
| Sans | Geist | system-ui, sans-serif | Body, UI elements |
| Mono | Geist Mono | monospace | Code, technical details |

**Alternative options if Instrument Serif unavailable:**
- Playfair Display
- Cormorant Garamond
- Libre Baskerville

### Type Scale

| Element | Size (Desktop) | Size (Mobile) | Weight | Font |
|---------|---------------|---------------|--------|------|
| Hero Title | 6rem / 96px | 3rem / 48px | 400 | Display |
| Section Title | 4rem / 64px | 2.5rem / 40px | 400 | Display |
| H2 | 2.5rem / 40px | 1.75rem / 28px | 400 | Display |
| H3 | 1.5rem / 24px | 1.25rem / 20px | 500 | Sans |
| Body Large | 1.25rem / 20px | 1.125rem / 18px | 400 | Sans |
| Body | 1rem / 16px | 1rem / 16px | 400 | Sans |
| Small | 0.875rem / 14px | 0.875rem / 14px | 400 | Sans |
| Caption | 0.75rem / 12px | 0.75rem / 12px | 500 | Mono |

### Typography Classes

```css
.text-display {
  font-family: var(--font-display);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.text-heading {
  font-family: var(--font-sans);
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.text-body {
  font-family: var(--font-sans);
  font-weight: 400;
  line-height: 1.6;
}

.text-mono {
  font-family: var(--font-mono);
  font-weight: 400;
  font-size: 0.9em;
}
```

## Spacing System

Based on 4px grid with Tailwind defaults:

| Name | Value | Usage |
|------|-------|-------|
| xs | 4px | Tight gaps |
| sm | 8px | Small gaps |
| md | 16px | Default spacing |
| lg | 24px | Section padding (mobile) |
| xl | 32px | Component gaps |
| 2xl | 48px | Section padding |
| 3xl | 64px | Large gaps |
| 4xl | 96px | Section spacing |
| 5xl | 128px | Hero spacing |

### Section Spacing

- Each section: `min-h-screen` with `py-24 md:py-32 lg:py-40`
- Container max-width: `max-w-7xl` with `px-6 md:px-8`
- Between sections: `gap-0` (full-bleed sections)

## Layout Principles

### Grid System

- 12-column grid on desktop
- Single column on mobile with full-bleed elements
- Asymmetric layouts encouraged
- Break the grid intentionally for visual interest

### Section Patterns

**Full Bleed Hero:**
```
┌─────────────────────────────────┐
│                                 │
│     SEBASTIAN                   │
│     ROSNES                      │
│     SØRENSEN                    │
│                                 │
│     Developer. Builder.         │
│     From the Russian border     │
│     to fintech.                 │
│                                 │
│           ↓ scroll              │
└─────────────────────────────────┘
```

**Story Section (Image + Text):**
```
┌─────────────────────────────────┐
│  ┌─────────────┐                │
│  │             │    CHAPTER 01  │
│  │   IMAGE     │    ──────────  │
│  │             │    GRENSE      │
│  │             │                │
│  └─────────────┘    Body text   │
│                     continues   │
│                     here...     │
└─────────────────────────────────┘
```

**Tech Stack (Grid):**
```
┌─────────────────────────────────┐
│         TECH STACK              │
│                                 │
│   ┌───┐ ┌───┐ ┌───┐ ┌───┐      │
│   │ R │ │ N │ │TS │ │TW │      │
│   └───┘ └───┘ └───┘ └───┘      │
│   ┌───┐ ┌───┐ ┌───┐ ┌───┐      │
│   │PG │ │MG │ │DK │ │K8 │      │
│   └───┘ └───┘ └───┘ └───┘      │
└─────────────────────────────────┘
```

## Visual Elements

### Backgrounds

**Do:**
- Solid dark colors
- Subtle noise/grain texture overlay
- Gradient meshes (very subtle, dark)
- Horizontal lines for visual rhythm

**Don't:**
- Bright gradient blobs
- Pattern backgrounds
- Busy textures

### Noise Texture Overlay

```css
.noise-overlay::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url('/noise.svg');
  opacity: 0.03;
  pointer-events: none;
  z-index: 9999;
}
```

### Borders & Dividers

- Use sparingly
- Color: `border` (#334155)
- Width: 1px
- Style: solid
- Consider using space instead of lines

### Cards & Surfaces

- Background: `card` color
- Border: 1px `border` color or none
- Border radius: `0.5rem` or `0` for sharp edges
- No heavy shadows - use subtle borders instead

## Iconography

### Style
- Use Lucide icons
- Stroke width: 1.5 or 2
- Size: 20-24px for inline, 32-48px for featured

### Common Icons
- GitHub: `<Github />`
- LinkedIn: `<Linkedin />`
- Email: `<Mail />`
- External Link: `<ExternalLink />`
- Arrow: `<ArrowRight />`, `<ArrowDown />`
- Menu: `<Menu />`
- Close: `<X />`

## Interactive States

### Links

```css
a {
  color: hsl(var(--foreground));
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: hsl(var(--accent));
}

/* Underline variant */
.link-underline {
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-color: hsl(var(--border));
}

.link-underline:hover {
  text-decoration-color: hsl(var(--accent));
}
```

### Buttons

**Primary:**
- Background: `accent`
- Text: `accent-foreground`
- Hover: `accent-hover`
- Padding: `px-6 py-3`
- Border radius: `rounded-full` or `rounded-md`

**Ghost:**
- Background: transparent
- Text: `foreground`
- Border: 1px `border`
- Hover: background `muted`

### Focus States

```css
:focus-visible {
  outline: 2px solid hsl(var(--accent));
  outline-offset: 2px;
}
```

## Responsive Breakpoints

| Name | Min Width | Usage |
|------|-----------|-------|
| sm | 640px | Large phones |
| md | 768px | Tablets |
| lg | 1024px | Small laptops |
| xl | 1280px | Desktops |
| 2xl | 1536px | Large screens |

### Mobile-First Approach

- Design for mobile first
- Add complexity at larger breakpoints
- Reduce animation complexity on mobile
- Ensure touch targets are 44px minimum

## Accessibility

### Color Contrast
- All text meets WCAG AA (4.5:1 for body, 3:1 for large text)
- Accent color on dark background: ✓ passes
- Muted foreground on dark: ✓ passes (use for secondary text only)

### Motion
- Respect `prefers-reduced-motion`
- Provide static alternatives
- No autoplaying video/animation that can't be paused

### Keyboard Navigation
- All interactive elements focusable
- Visible focus indicators
- Logical tab order

## Anti-Patterns to Avoid

### The "AI Slop" Checklist

❌ **Don't use:**
- Purple-to-blue gradients
- Inter, Roboto, or Arial as primary fonts
- Generic hero with circle avatar
- "Hi, I'm a passionate developer" text
- Bento grid layouts
- Floating cards with heavy shadows
- Icon grids for skills
- Testimonial carousels
- Generic stock photos
- Overused animations (bounce, wiggle)
- Progress bars for skills
- Timeline with dots and lines

✅ **Do use:**
- Bold, confident typography
- Strategic restraint with color
- Meaningful, original imagery
- Story-driven copywriting
- Full-bleed sections
- Subtle, purposeful animation
- Unique visual language
- Personal photography
