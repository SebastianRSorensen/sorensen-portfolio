# Project Instructions

This is a Next.js website template for creating client websites. Every website must be unique, conversion-optimized, and tailored to the specific client.

## Quick Start

To implement a complete website, simply say:

```
Implement according to docs/DESCRIPTION.md
```

This triggers the implementation workflow skill which:

1. Validates `docs/DESCRIPTION.md` is complete
2. Analyzes the company and derives design direction
3. **Creates `docs/IMPLEMENTATION_PLAN.md` with checkboxes**
4. **Waits for your approval before writing any code**
5. Implements through 10 phases, updating checkboxes as tasks complete

The implementation plan serves as a live progress tracker you can review at any time.

## Tech Stack (MANDATORY)

- **Framework**: Next.js 16+ (NO src directory, use `proxy.ts` instead of middleware)
- **Styling**: Tailwind CSS 4+ (CSS-first configuration)
- **Components**: Shadcn/ui
- **Package Manager**: pnpm

Do not use older versions. Do not use the src directory pattern.

## CRITICAL: Read Skills Before Any Design Work

**BEFORE creating ANY page, component, section, or layout, you MUST:**

1. Read the workflow skill at `.claude/skills/implementation-workflow/SKILL.md`
2. Read the design skill at `.claude/skills/unique-web-design/SKILL.md`
3. Read the architecture skill at `.claude/skills/nextjs-architecture/SKILL.md`
4. Read the client description at `docs/DESCRIPTION.md`
5. Complete the Company Analysis Protocol from the design skill
6. Select a distinctive aesthetic direction that fits THIS specific client

**Recommended:** Use "Implement according to docs/DESCRIPTION.md" to follow the complete workflow automatically.

This is non-negotiable. Generic AI-looking websites are not acceptable.

## Design Requirements

Every website must:

- **Look unique** — Not like typical AI-generated sites
- **Convert visitors** — Clear CTAs, trust signals, minimal friction
- **Match the client** — Reflect their industry, personality, and audience
- **Be mobile-first** — 70%+ of traffic is mobile

## What to Avoid (AI Slop)

Never use these without explicit justification:

- Inter, Roboto, or other overused fonts
- Purple/indigo color schemes
- The standard Hero → Features → Testimonials → CTA layout
- Generic rounded-lg cards everywhere
- "Get Started" or "Learn More" as CTA text
- Fade-in-up animations on everything

## File Structure

```
/
├── .claude/
│   └── skills/
│       ├── implementation-workflow/SKILL.md  ← Master workflow (10 phases)
│       ├── unique-web-design/SKILL.md        ← Design principles
│       └── nextjs-architecture/SKILL.md      ← Architecture patterns
├── docs/
│   ├── DESCRIPTION.md              ← Client info (you create this)
│   ├── DESCRIPTION.template.md     ← Reference template
│   └── IMPLEMENTATION_PLAN.md      ← Auto-generated progress tracker
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── [routes]/
├── components/
├── lib/
├── public/
├── tailwind.config.ts
└── package.json
```

## Quick Reference

When starting design work, always ask:

1. "What makes THIS client unique?"
2. "What aesthetic direction fits their industry and personality?"
3. "Would this design work for any company, or specifically THIS one?"

If the answer to #3 is "any company" — the design is wrong.
