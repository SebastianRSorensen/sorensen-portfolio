# UFO Scroll Reveal Implementation Plan

## Overview
Create an interactive UFO that follows the user's scroll, flies to each section title, and illuminates it with a spotlight beam. Section titles are **invisible by default** and only become visible when the UFO hovers above them and shines its light.

## Tech Stack
- Next.js 16+ (no src directory)
- Tailwind CSS 4+
- Framer Motion (already installed)
- No additional dependencies needed

---

## Architecture

### 1. Context: `UFOContext` (`lib/ufo-context.tsx`)

Create a context to manage UFO state across components:

```tsx
"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface SectionTarget {
  id: string;
  element: HTMLElement | null;
  titleElement: HTMLElement | null;
}

interface UFOContextType {
  activeSection: string | null;
  setActiveSection: (id: string | null) => void;
  registerSection: (id: string, element: HTMLElement, titleElement: HTMLElement) => void;
  unregisterSection: (id: string) => void;
  sections: Map<string, SectionTarget>;
  ufoPosition: { x: number; y: number } | null;
  setUfoPosition: (pos: { x: number; y: number } | null) => void;
}

const UFOContext = createContext<UFOContextType | null>(null);

export function UFOProvider({ children }: { children: React.ReactNode }) {
  // Implementation here
}

export function useUFO() {
  const context = useContext(UFOContext);
  if (!context) throw new Error("useUFO must be used within UFOProvider");
  return context;
}
```

---

### 2. Update: `components/icons/ufo.tsx`

Modify the existing UFO component to accept these additional props:

```tsx
interface UFOProps extends ComponentProps<typeof motion.svg> {
  size?: number;
  beamActive?: boolean;
  beamIntensity?: number; // 0-1, for smooth transitions
  floating?: boolean;
}
```

Add a more dramatic beam effect with blur/glow that can illuminate content below:

- Beam should have a `clipPath` or mask that can be used by titles
- Add CSS custom property `--ufo-beam-x` and `--ufo-beam-y` for positioning

---

### 3. New Component: `components/ufo-controller.tsx`

This is the main orchestrator component:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, animate } from "framer-motion";
import { UFO } from "@/components/icons";
import { useUFO } from "@/lib/ufo-context";

export function UFOController() {
  const { activeSection, sections, setActiveSection } = useUFO();
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [isBeamActive, setIsBeamActive] = useState(false);
  const ufoRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();

  // Determine which section is in the "spotlight zone" (e.g., top 30% of viewport)
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Find section whose title is in the target zone
    // Update activeSection accordingly
  });

  // Animate UFO to target position when activeSection changes
  useEffect(() => {
    if (!activeSection) return;
    
    const section = sections.get(activeSection);
    if (!section?.titleElement) return;

    const rect = section.titleElement.getBoundingClientRect();
    const targetX = rect.left + rect.width / 2;
    const targetY = rect.top - 80; // Hover above title

    // Use spring animation for natural movement
    // Add slight overshoot and settle
  }, [activeSection, sections]);

  return (
    <motion.div
      ref={ufoRef}
      className="fixed pointer-events-none z-50"
      style={{ x: targetPosition.x, y: targetPosition.y }}
      // Natural flying animation with slight wobble
    >
      <UFO 
        size={100} 
        beamActive={isBeamActive}
        floating={true}
      />
    </motion.div>
  );
}
```

**Key behaviors:**
- UFO starts off-screen or at hero
- When scrolling into a new section, UFO flies to that section's title
- Movement should have:
  - Anticipation (slight movement opposite direction first)
  - Overshoot (go past target, then settle back)
  - Easing that feels like flight, not linear
- While moving, beam is off
- When settled on title, beam turns on with fade-in
- UFO has subtle idle animation (gentle bob/rotate) when stationary

---

### 4. Update: `components/sections/story-section.tsx`

Modify to work with UFO reveal system:

```tsx
"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useUFO } from "@/lib/ufo-context";
import { easings } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface StorySectionProps {
  id: string;
  chapter: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function StorySection({
  id,
  chapter,
  title,
  children,
  className,
}: StorySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { registerSection, unregisterSection, activeSection } = useUFO();

  // Register this section with the UFO context
  useEffect(() => {
    if (sectionRef.current && titleRef.current) {
      registerSection(id, sectionRef.current, titleRef.current);
    }
    return () => unregisterSection(id);
  }, [id, registerSection, unregisterSection]);

  const isIlluminated = activeSection === id;

  // ... rest of component

  return (
    <section id={id} ref={sectionRef} className={cn("...", className)}>
      {/* Title with UFO reveal effect */}
      <div className="relative mb-14 md:mb-20">
        {/* Hidden title - revealed by UFO beam */}
        <motion.h2
          ref={titleRef}
          className="text-display text-5xl md:text-7xl lg:text-8xl"
          style={{
            // Title is invisible by default
            opacity: 0,
            // Or use mask/clip-path for spotlight effect
          }}
          animate={{
            opacity: isIlluminated ? 1 : 0,
            // Can also animate scale, y position for dramatic reveal
          }}
          transition={{
            duration: 0.6,
            ease: easings.smooth,
          }}
        >
          {title}
        </motion.h2>
        
        {/* Optional: Ghosted/placeholder text so layout doesn't shift */}
        <span 
          className="text-display text-5xl md:text-7xl lg:text-8xl text-transparent select-none"
          aria-hidden="true"
        >
          {title}
        </span>
      </div>
      
      {/* Rest of content */}
    </section>
  );
}
```

---

### 5. Spotlight/Mask Effect Options

**Option A: Simple opacity fade (easiest)**
- Title starts at `opacity: 0`
- When UFO arrives and beam activates, fade to `opacity: 1`
- Clean and performant

**Option B: Radial gradient mask (more dramatic)**
```tsx
// On the title element
style={{
  maskImage: `radial-gradient(circle 200px at ${beamX}px ${beamY}px, black 0%, transparent 70%)`,
  WebkitMaskImage: `radial-gradient(circle 200px at ${beamX}px ${beamY}px, black 0%, transparent 70%)`,
}}
```
- Title is masked by a radial gradient centered on UFO beam
- As UFO approaches, mask reveals the text
- More complex but looks like actual spotlight

**Option C: SVG clip-path (most control)**
- Use SVG `<clipPath>` that matches the beam cone shape
- Animate the clip-path position to follow UFO

**Recommendation:** Start with Option A, upgrade to Option B if time permits.

---

### 6. Integration in Layout

Update `app/[locale]/layout.tsx` or `template.tsx`:

```tsx
import { UFOProvider } from "@/lib/ufo-context";
import { UFOController } from "@/components/ufo-controller";

export default function LocaleLayout({ children }) {
  return (
    <UFOProvider>
      {children}
      <UFOController />
    </UFOProvider>
  );
}
```

---

## Animation Specifications

### UFO Flight Animation
```ts
const flightTransition = {
  type: "spring",
  stiffness: 50,
  damping: 15,
  mass: 1.5,
  // This creates a floaty, spaceship-like movement
};
```

### UFO Idle Animation (when hovering over title)
```ts
const idleAnimation = {
  y: [0, -8, 0],
  rotate: [0, 1, -1, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};
```

### Beam Activation
```ts
const beamTransition = {
  opacity: { duration: 0.4, ease: "easeOut" },
  scale: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }, // Slight overshoot
};
```

### Title Reveal
```ts
const titleReveal = {
  opacity: { duration: 0.8, ease: "easeOut" },
  y: { from: 20, to: 0, duration: 0.6 },
  filter: { from: "blur(8px)", to: "blur(0px)", duration: 0.5 },
};
```

---

## Scroll Detection Logic

```ts
// In UFOController
const SPOTLIGHT_ZONE_TOP = 0.15; // 15% from top of viewport
const SPOTLIGHT_ZONE_BOTTOM = 0.4; // 40% from top of viewport

function findActiveSectionTitle(): string | null {
  const viewportHeight = window.innerHeight;
  const zoneTop = viewportHeight * SPOTLIGHT_ZONE_TOP;
  const zoneBottom = viewportHeight * SPOTLIGHT_ZONE_BOTTOM;

  for (const [id, section] of sections) {
    if (!section.titleElement) continue;
    
    const rect = section.titleElement.getBoundingClientRect();
    const titleCenter = rect.top + rect.height / 2;
    
    if (titleCenter >= zoneTop && titleCenter <= zoneBottom) {
      return id;
    }
  }
  
  return null;
}
```

---

## Edge Cases to Handle

1. **First load**: UFO should animate in from off-screen after page load (delay 1-2s)
2. **Fast scrolling**: Don't try to illuminate every section, skip to current
3. **Scroll direction change**: UFO should smoothly reverse course
4. **Mobile/reduced motion**: Either disable UFO or simplify to static reveals
5. **No sections in view**: UFO should float to a neutral position (top corner?)
6. **Resize**: Recalculate positions on window resize

---

## File Structure After Implementation

```
lib/
  ufo-context.tsx          # NEW: UFO state management
  animations.ts            # UPDATE: Add UFO-specific easings

components/
  icons/
    ufo.tsx                # UPDATE: Enhanced beam, new props
    index.ts
  ufo-controller.tsx       # NEW: Main UFO orchestrator
  sections/
    story-section.tsx      # UPDATE: Register with UFO, reveal effect
  flying-ufo.tsx           # DELETE: Replaced by ufo-controller

app/
  [locale]/
    layout.tsx             # UPDATE: Add UFOProvider
```

---

## Testing Checklist

- [ ] UFO appears after initial page load delay
- [ ] UFO flies to first section title when scrolling begins
- [ ] Beam activates after UFO settles on title
- [ ] Title fades in when beam is active
- [ ] UFO moves to next section title when scrolling continues
- [ ] Previous title fades out when UFO leaves
- [ ] Movement feels natural (spring physics, not linear)
- [ ] Works when scrolling up (revisiting sections)
- [ ] Handles fast scrolling gracefully
- [ ] Respects prefers-reduced-motion
- [ ] No layout shift from hidden titles
- [ ] Performance is smooth (60fps)

---

## Prompt for Claude Code CLI

Copy everything below this line:

---

```
Read the implementation plan in docs/UFO_SCROLL_REVEAL_PLAN.md (or I'll paste it).

Implement the UFO scroll reveal system with these steps:

1. Create `lib/ufo-context.tsx` - Context for managing UFO state and section registration

2. Update `components/icons/ufo.tsx` - Add beamIntensity prop and enhance the beam visual with glow effect

3. Create `components/ufo-controller.tsx` - Main component that:
   - Tracks scroll position
   - Determines which section title is in the "spotlight zone" (15-40% from viewport top)
   - Animates UFO position to hover above active section's title
   - Uses spring physics for natural flight movement
   - Controls beam activation (off while moving, on when settled)

4. Update `components/sections/story-section.tsx` - Modify to:
   - Register section and title refs with UFO context
   - Make title invisible by default (opacity: 0)
   - Reveal title with fade + slight blur when UFO illuminates it
   - Keep a transparent placeholder to prevent layout shift

5. Update `app/[locale]/layout.tsx` - Wrap content in UFOProvider and add UFOController

6. Delete `components/flying-ufo.tsx` - No longer needed

Key animation specs:
- UFO flight: spring with stiffness: 50, damping: 15, mass: 1.5
- UFO idle bob: y: [0, -8, 0] over 3s, infinite
- Beam fade-in: 0.4s ease-out
- Title reveal: 0.8s opacity + 0.5s blur clear

Handle edge cases:
- Delay UFO appearance 2s after page load
- Skip sections during fast scroll
- Respect prefers-reduced-motion (disable UFO, use simple fade reveals instead)
- Recalculate on window resize

Test by scrolling through the page - titles should only appear when UFO hovers and shines its beam.
```
