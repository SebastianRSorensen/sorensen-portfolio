# Loreprint Section — Codebase Inspection Report

## 1. Framework & Routing

- **Next.js 16+ App Router** with `app/[locale]/` dynamic segment for i18n
- **No `src/` directory** — everything at project root: `app/`, `components/`, `lib/`, `i18n/`
- `proxy.ts` used instead of `middleware.ts` (Next.js 16+ convention)
- Single-page scrolling portfolio — all sections rendered in `app/[locale]/page.tsx`

### Page composition (`app/[locale]/page.tsx`)
```tsx
<Hero />
<SectionExperience />   // Chapter 01 — "KODE" / "CODE"
<SectionDrive />        // Chapter 02 — "DRIV" / "DRIVE"
<TechStack />           // Chapter 03
<SectionEducation />    // Chapter 04
<SectionOtherExperience /> // Chapter 05
<Contact />             // Chapter 06
```

All sections are server-imported but the components themselves are `"use client"` (Framer Motion needs client).

---

## 2. Section Architecture — The `StorySection` Pattern

Every content section wraps itself in `<StorySection>`, which provides:

### Props
```ts
interface StorySectionProps {
  id: string;        // anchor id (e.g. "kode", "bygger")
  chapter: string;   // "01", "02", etc.
  title: string;     // Large display heading
  children: ReactNode;
  className?: string;
}
```

### What it renders
1. **Section divider line** — gradient `h-px` at top, animated `scaleX` on view
2. **Chapter number** — `<span>` with accent color, mono font, `tracking-[0.3em]`, plus a short accent line
3. **Title** — Massive `text-display text-5xl md:text-7xl lg:text-8xl` with clip-path reveal animation
4. **Accent underline** — `h-[2px] bg-accent max-w-[160px]`
5. **Children** — fade-up with 0.7s delay

### UFO reveal system
StorySection has an elaborate UFO-based scroll reveal system (desktop only). Sections stay hidden until "illuminated" by a flying UFO beam, with fallback to `useInView` when UFO is disabled. There's also a warp-navigation system for instant scroll.

### Container sizing
- `max-w-7xl mx-auto px-6 md:px-8`
- Section padding: `py-28 md:py-40`

---

## 3. Existing "DRIV" Section (Hobby Projects)

**File:** `components/sections/section-drive.tsx`
**i18n namespace:** `"bygger"`

### Structure
1. **Big cinematic quote** — `text-display text-3xl md:text-5xl lg:text-6xl` ("Koding stopper ikke klokken fire.")
2. **Description paragraph** — `text-body text-lg text-muted-foreground max-w-2xl`
3. **Project list** — minimalist rows with `border-b border-border/30`, numbered `01`–`04`:
   - Event planner
   - Recruitment tool (AI/Anthropic)
   - Lottery system
   - "...and whatever comes next"
   - Each row: index number (mono, accent), project name, description (hidden on mobile)
   - Staggered `x: -20 → 0` animation via `useInView`
4. **Claude Code highlight** — terminal-style card (`bg-card/50 border border-border/50 rounded-xl p-8 md:p-10`) with terminal dots
5. **GitHub CTA** — `Magnetic`-wrapped button, pill-shaped (`rounded-full bg-accent`)

### Key: This is for small, private hobby projects — NOT production platforms.

---

## 4. i18n Implementation

- **Library:** `next-intl`
- **Locales:** `no` (default), `en`
- **Message files:** `i18n/messages/no.json`, `i18n/messages/en.json`
- **URL strategy:** `as-needed` — Norwegian at `/`, English at `/en/...`
- **Usage pattern:**
  - Each section imports `useTranslations` from `next-intl`
  - Calls `useTranslations("namespace")` with a section-specific namespace
  - All text accessed via `t("key")` or `t("nested.key")`
- **Nested object pattern** for arrays: `t("projects.0.name")`, `t("highlights.0")`
- Each section has its own namespace: `"hero"`, `"kode"`, `"bygger"`, `"techStack"`, `"kunnskap"`, `"grense"`, `"contact"`

### Adding a new section requires:
1. Add a new namespace to both `no.json` and `en.json`
2. Use `useTranslations("newNamespace")` in the component

---

## 5. Design Language

### Color palette (CSS variables)
| Token | Hex | Usage |
|-------|-----|-------|
| `--background` | `#0a0f14` | Page bg, ultra-dark |
| `--foreground` | `#e8e4df` | Primary text, warm white |
| `--accent` | `#3b82f6` | Blue highlights, links, CTAs |
| `--accent-hover` | `#2563eb` | Darker blue on hover |
| `--muted` | `#1e293b` | Subtle backgrounds |
| `--muted-foreground` | `#94a3b8` | Secondary text |
| `--border` | `#334155` | Lines, card borders |
| `--card` | `#0f172a` | Card backgrounds |

### Typography
- **Display/Headings:** `Instrument Serif` (`--font-display`) — `.text-display` utility
- **Body/UI:** `Geist Sans` (`--font-sans`) — `.text-body`, `.text-heading` utilities
- **Mono/Code:** `Geist Mono` (`--font-mono`) — `.text-mono` utility
- Type scale for section titles: `text-5xl md:text-7xl lg:text-8xl`
- Chapter labels: `text-xs tracking-[0.2em] uppercase` in mono
- Period/date text: `text-mono text-xs text-accent/70`

### Card pattern (used everywhere)
```
bg-card/50 border border-border/50 rounded-xl p-8 md:p-10
hover:border-accent/30 transition-colors duration-500
```
With inner glow overlay: `bg-accent/[0.02] opacity-0 group-hover:opacity-100`

### Highlight badges (tags/pills)
```
px-3 py-1.5 rounded-full border border-border/50 text-muted-foreground
text-xs font-mono hover:border-accent/50 hover:text-accent
```

### CTA buttons
```
px-7 py-3.5 rounded-full bg-accent text-accent-foreground font-medium text-sm
```
Wrapped in `<Magnetic strength={0.1}>` for hover effect.

### Noise overlay
Global `::before` pseudo-element with `noise.svg` at `opacity: 0.03`, `z-index: 9999`, fixed position.

---

## 6. Animation Patterns

### Library: Framer Motion
- All sections use `"use client"` for Framer Motion
- Wrapped in `<MotionConfig reducedMotion="user">`

### Shared easings (`lib/animations.ts`)
```ts
smooth: [0.25, 0.1, 0.25, 1]
dramatic: [0.16, 1, 0.3, 1]    // Most commonly used
snappy: [0.34, 1.56, 0.64, 1]
gentle: [0.4, 0, 0.2, 1]
```

### Common animation patterns
1. **Scroll-triggered reveal** — `useInView(ref, { once: true, margin: "-50px" })` + conditional `animate`
2. **Staggered cards** — `cardVariants` with `custom={index}` for stagger delay (`i * 0.15`)
3. **Fade-up** — `initial={{ opacity: 0, y: 30 }}` → `animate={{ opacity: 1, y: 0 }}`
4. **Slide-in-left** — `initial={{ opacity: 0, x: -20 }}` → `animate={{ opacity: 1, x: 0 }}`
5. **Scale line** — `scaleX: 0 → 1` for accent lines
6. **whileHover** — `scale: 1.02` on CTAs, `scale: 1.05` on tech badges
7. **whileTap** — `scale: 0.98` on interactive elements
8. **Magnetic** — Custom spring-based hover displacement component

### Typical durations
- Fast reveals: `0.5–0.6s`
- Card animations: `0.7s`
- Line animations: `0.8–1.2s`
- Portrait fade: `2.5s`

---

## 7. Navigation

**File:** `components/navigation.tsx`

Current nav links:
```ts
const navLinks = [
  { key: "experience", href: "#kode" },
  { key: "skills", href: "#tech-stack" },
  { key: "education", href: "#utdanning" },
  { key: "contact", href: "#contact" },
];
```

No nav link currently points to the DRIV/hobby section. A Loreprint section would likely need its own nav entry.

---

## 8. Component Dependencies

### Shared components used across sections
- `StorySection` — section wrapper (chapter + title + animation)
- `Magnetic` — hover displacement effect
- `easings` from `lib/animations.ts`
- `useTranslations` from `next-intl`
- `motion`, `useInView`, `useScroll` from `framer-motion`
- `lucide-react` icons

### Layout wrappers (`app/[locale]/layout.tsx`)
- `NextIntlClientProvider` (i18n)
- `MotionProvider` (reduced motion)
- `UFOProvider` (UFO reveal system)
- `SmoothScroll` (Lenis smooth scrolling)
- `Navigation` (fixed header)
- `Footer`
- `ShootingStars` (background effect)

---

## 9. Key Differences: Hobby Projects vs. Loreprint

| | DRIV Hobby Projects | Loreprint |
|---|---|---|
| **Status** | Private, unfinished | Production-ready platform |
| **Business** | None | Registered company (Loreprint AS) |
| **Scale** | Small side projects | 15+ integrated services |
| **Presentation** | Simple text rows | Needs featured case study treatment |
| **Link** | None (private) | loreprint.com |
| **Position** | Chapter 02 (after experience) | Should be its own featured section |

---

## 10. Recommendations for Loreprint Section Placement

The new section should sit **between SectionExperience (Chapter 01) and SectionDrive (Chapter 02)**, or right after SectionDrive, to establish the hierarchy: professional work → flagship project → hobby projects. This would require renumbering chapters.

Alternatively, it could replace the current Chapter 02 slot and push DRIV to Chapter 03, bumping all subsequent chapters.

### Suggested page order:
```
Hero
SectionExperience     — Chapter 01 (KODE/CODE)
SectionLoreprint      — Chapter 02 (new — featured project)
SectionDrive          — Chapter 03 (renumbered)
TechStack             — Chapter 04 (renumbered)
SectionEducation      — Chapter 05 (renumbered)
SectionOtherExperience — Chapter 06 (renumbered)
Contact               — Chapter 07 (renumbered)
```

### Files to create/modify:
1. **Create:** `components/sections/section-loreprint.tsx`
2. **Modify:** `app/[locale]/page.tsx` — add import and component
3. **Modify:** `i18n/messages/no.json` — add `"loreprint"` namespace
4. **Modify:** `i18n/messages/en.json` — add `"loreprint"` namespace
5. **Modify:** `components/navigation.tsx` — optionally add nav link
6. **Modify:** All existing sections' chapter numbers in i18n files (bump by 1)
7. **Modify:** Contact section hardcoded chapter `"06"` → `"07"`
8. **Modify:** TechStack section hardcoded chapter `"03"` → `"04"`
