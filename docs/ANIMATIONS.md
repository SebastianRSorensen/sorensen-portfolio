# Animation Documentation

Detailed animation specifications for creating a cinematic, Lando Norris-inspired scroll experience.

## Animation Philosophy

### Principles

1. **Purpose over decoration** - Every animation should enhance understanding or guide attention
2. **Confidence, not bounce** - Smooth, elegant easing; no playful bouncing
3. **Scroll-driven narrative** - Animations reveal the story as you scroll
4. **Performance first** - Prefer transform/opacity; use `will-change` sparingly
5. **Respect user preferences** - Honor `prefers-reduced-motion`

### Reference: landonorris.com

Key animation patterns from the inspiration site:
- Full-viewport sections that snap or flow
- Text reveals with staggered timing
- Parallax images
- Horizontal scroll galleries
- Hover effects on interactive elements
- Signature/personal elements that animate

---

## Framer Motion Setup

### Installation

```bash
pnpm add framer-motion
```

### Global Configuration

Create a motion config provider if needed:

```tsx
// lib/motion-config.tsx
'use client'

import { MotionConfig } from 'framer-motion'

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  )
}
```

---

## Easing Functions

### Standard Easings

```typescript
// lib/animations.ts

export const easings = {
  // Smooth, confident ease-out
  smooth: [0.25, 0.1, 0.25, 1],
  
  // Slightly more dramatic
  dramatic: [0.16, 1, 0.3, 1],
  
  // Quick start, slow end
  snappy: [0.34, 1.56, 0.64, 1],
  
  // Very smooth for long animations
  gentle: [0.4, 0, 0.2, 1],
}

export const durations = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  verySlow: 0.8,
  dramatic: 1.2,
}
```

---

## Animation Variants

### Fade Up (Default reveal)

```typescript
export const fadeUp = {
  initial: { 
    opacity: 0, 
    y: 30 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}
```

### Fade In

```typescript
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
}
```

### Slide In From Left

```typescript
export const slideInLeft = {
  initial: { 
    opacity: 0, 
    x: -50 
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}
```

### Slide In From Right

```typescript
export const slideInRight = {
  initial: { 
    opacity: 0, 
    x: 50 
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}
```

### Scale Up

```typescript
export const scaleUp = {
  initial: { 
    opacity: 0, 
    scale: 0.95 
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}
```

### Stagger Container

```typescript
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}
```

---

## Section-Specific Animations

### Hero Section

**Name reveal (letter by letter):**

```tsx
'use client'

import { motion } from 'framer-motion'

const letterAnimation = {
  initial: { opacity: 0, y: 50 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  })
}

export function HeroName({ name }: { name: string }) {
  const letters = name.split('')
  
  return (
    <h1 className="text-display">
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterAnimation}
          initial="initial"
          animate="animate"
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </h1>
  )
}
```

**Tagline fade up (after name):**

```tsx
<motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ 
    delay: name.length * 0.04 + 0.3, // After name animation
    duration: 0.6 
  }}
>
  {tagline}
</motion.p>
```

**Scroll indicator pulse:**

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.5 }}
  className="absolute bottom-8 left-1/2 -translate-x-1/2"
>
  <motion.div
    animate={{ y: [0, 8, 0] }}
    transition={{ 
      duration: 1.5, 
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <ArrowDown className="w-6 h-6 text-muted-foreground" />
  </motion.div>
</motion.div>
```

### Story Sections

**Scroll-triggered reveal:**

```tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function StorySection({ children }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: '-100px',
    amount: 0.3
  })
  
  return (
    <section ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </section>
  )
}
```

**Chapter number animation:**

```tsx
<motion.span
  initial={{ opacity: 0, x: -20 }}
  animate={isInView ? { opacity: 1, x: 0 } : {}}
  transition={{ duration: 0.5, delay: 0.1 }}
  className="text-accent font-mono text-sm"
>
  {chapter}
</motion.span>
```

**Title with underline draw:**

```tsx
<div className="relative inline-block">
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="text-display text-4xl md:text-6xl"
  >
    {title}
  </motion.h2>
  <motion.div
    initial={{ scaleX: 0 }}
    animate={isInView ? { scaleX: 1 } : {}}
    transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    className="absolute -bottom-2 left-0 h-0.5 w-full bg-accent origin-left"
  />
</div>
```

### Tech Stack

**Staggered badge reveal:**

```tsx
<motion.div
  variants={staggerContainer}
  initial="initial"
  whileInView="animate"
  viewport={{ once: true, margin: '-50px' }}
  className="flex flex-wrap gap-2"
>
  {technologies.map((tech) => (
    <motion.span
      key={tech}
      variants={staggerItem}
      whileHover={{ scale: 1.05, backgroundColor: 'hsl(var(--accent))' }}
      className="px-3 py-1.5 rounded-full bg-muted text-sm font-mono"
    >
      {tech}
    </motion.span>
  ))}
</motion.div>
```

### Contact

**Link hover animation:**

```tsx
<motion.a
  href={url}
  whileHover={{ x: 5 }}
  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
>
  {icon}
  {label}
  <motion.span
    initial={{ opacity: 0, x: -5 }}
    whileHover={{ opacity: 1, x: 0 }}
  >
    →
  </motion.span>
</motion.a>
```

---

## Scroll-Based Animations

### Parallax Images

```tsx
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function ParallaxImage({ src, alt }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50])
  
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="w-full h-full object-cover"
      />
    </div>
  )
}
```

### Scroll Progress Indicator

```tsx
'use client'

import { motion, useScroll } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
```

### Section Progress (for navigation highlighting)

```tsx
'use client'

import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function useScrollProgress(sectionRef: RefObject<HTMLElement>) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })
  
  return scrollYProgress
}
```

---

## Hover & Interaction Animations

### Button Hover

```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
  className="..."
>
  {children}
</motion.button>
```

### Card Hover

```tsx
<motion.div
  whileHover={{ y: -4 }}
  transition={{ duration: 0.2 }}
  className="..."
>
  {children}
</motion.div>
```

### Link Arrow

```tsx
<motion.a
  href={url}
  className="group flex items-center gap-2"
>
  {label}
  <motion.span
    initial={{ x: 0 }}
    whileHover={{ x: 4 }}
    className="inline-block"
  >
    →
  </motion.span>
</motion.a>
```

---

## Page Transitions

### Route Change Animation (Optional)

If implementing page transitions:

```tsx
// app/[locale]/template.tsx
'use client'

import { motion } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
```

---

## Performance Guidelines

### Do's

- Use `transform` and `opacity` for animations (GPU accelerated)
- Use `useInView` with `once: true` for reveal animations
- Batch animations with `staggerChildren`
- Use CSS animations for simple effects
- Test on low-end devices

### Don'ts

- Don't animate `width`, `height`, `top`, `left` directly
- Don't use `will-change` on many elements
- Don't create layout thrashing animations
- Don't animate during scroll (except with `useScroll`)

### Reduced Motion

```tsx
import { useReducedMotion } from 'framer-motion'

export function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion()
  
  if (prefersReducedMotion) {
    return <StaticVersion />
  }
  
  return <AnimatedVersion />
}
```

Or use MotionConfig:

```tsx
<MotionConfig reducedMotion="user">
  {/* Components will automatically respect preference */}
</MotionConfig>
```

---

## Animation Timing Reference

| Element | Delay | Duration | Easing |
|---------|-------|----------|--------|
| Hero name letters | i * 0.04s | 0.5s | smooth |
| Hero tagline | name + 0.3s | 0.6s | smooth |
| Hero scroll hint | 1.5s | - | - |
| Section reveal | 0s | 0.8s | smooth |
| Chapter number | 0.1s | 0.5s | smooth |
| Section title | 0.2s | 0.5s | smooth |
| Title underline | 0.5s | 0.6s | smooth |
| Stagger children | i * 0.1s | 0.5s | smooth |
| Hover effects | 0s | 0.2s | default |
| Scroll indicator | ∞ loop | 1.5s | easeInOut |

---

## CSS Fallback Animations

For elements that don't need Framer Motion:

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out forwards;
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}
```

Add to Tailwind config:

```typescript
// tailwind.config.ts
animation: {
  'fade-in': 'fadeIn 0.5s ease-out forwards',
  'slide-up': 'slideUp 0.5s ease-out forwards',
}
```
