# Next.js Website Template

A template for creating unique, conversion-optimized client websites that avoid generic AI aesthetics.

## How Claude Code Uses This Template

### Automatic Instruction Loading

Claude Code automatically reads these files at the start of every conversation:

1. **`CLAUDE.md`** (project root) — Main instructions that tell Claude Code to read the skill before any design work
2. **`.claude/skills/unique-web-design.md`** — Comprehensive design skill with anti-AI-slop guidelines
3. **`.claude/settings.json`** — Configuration for auto-loading skills

### The Flow

```
You add docs/DESCRIPTION.md with client info
         ↓
User requests a page/component
         ↓
Claude Code reads CLAUDE.md automatically
         ↓
CLAUDE.md instructs: "Read the skill file first"
         ↓
Claude reads .claude/skills/unique-web-design.md
         ↓
Claude reads docs/DESCRIPTION.md
         ↓
Claude applies Company Analysis Protocol
         ↓
Claude creates unique, tailored design
```

## Setup for New Project

1. **Copy the template** (or use as base for new project)

2. **Create `docs/DESCRIPTION.md`** with client info:
   - Use `docs/DESCRIPTION.template.md` as reference
   - Fill in company details, services, audience, personality, trust signals

3. **Start building** — Claude Code will automatically:
   - Read the skill file
   - Analyze the DESCRIPTION.md
   - Select appropriate aesthetic direction
   - Create unique, conversion-optimized designs

That's it. One file, then let Claude Code work.

## Tech Stack

| Technology | Version | Notes |
|------------|---------|-------|
| Next.js | 16+ | No src directory, use `proxy.ts` not middleware |
| Tailwind CSS | 4+ | CSS-first configuration |
| Shadcn/ui | Latest | Component library |
| pnpm | Latest | Package manager |

## File Structure

```
/
├── CLAUDE.md                           # Auto-read by Claude Code
├── .claude/
│   ├── settings.json                   # Claude Code configuration
│   └── skills/
│       └── unique-web-design.md        # Design skill (auto-loaded)
├── docs/
│   ├── DESCRIPTION.md                  # Client info (YOU CREATE THIS)
│   └── DESCRIPTION.template.md         # Reference template
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── [routes]/
├── components/
│   ├── ui/                             # Shadcn components
│   └── [custom]/                       # Custom components
├── lib/
│   └── utils.ts
├── public/
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── pnpm-lock.yaml
```

## Example DESCRIPTION.md

Create `docs/DESCRIPTION.md` (use the template as reference):

```markdown
# ACME Electric

## Company Overview
- **Name**: ACME Electric AS
- **Location**: Bergen, Norway
- **Founded**: 2015
- **Industry**: Electrical services (residential & commercial)

## Services
- Electrical installations
- Safety inspections
- Smart home systems
- EV charger installation
- Emergency repairs

## Target Audience
- Homeowners in Bergen area
- Property managers
- Small businesses
- Age: 30-60
- Value: reliability, safety, fair pricing

## Brand Personality
- Professional but approachable
- Local and trustworthy
- Modern (embraces new technology)
- Straightforward communication

## Unique Value Proposition
"Bergen's most responsive electrician — same-day service, transparent pricing, 
certified for all modern installations including EV chargers and smart homes."

## Trust Signals
- 8 years in business
- 500+ completed projects
- 4.9 rating on Google (127 reviews)
- Certified by Nelfo
- Licensed and insured

## Competitors
- Bergen Elektro
- Vestland Elektriker
- Local independent electricians
```

## Tips for Best Results

1. **Be specific in DESCRIPTION.md** — The more detail, the more unique the design
2. **Include real trust signals** — Reviews, certifications, years in business
3. **Describe the audience** — Who are their customers? What do they care about?
4. **Note any preferences** — If client has color preferences, mention them
5. **List competitors** — Helps Claude understand differentiation needs

## Troubleshooting

### Claude Code using generic designs?
- Ensure `CLAUDE.md` is in project root
- Check that `docs/DESCRIPTION.md` exists and has content
- Explicitly ask Claude to "read the skill file first"

### Wrong tech stack?
- The `CLAUDE.md` file specifies Next.js 16+, Tailwind 4+, etc.
- If Claude uses old patterns, remind it to check CLAUDE.md

### Missing skill file?
- Ensure `.claude/skills/unique-web-design.md` exists
- The skill file must be readable (check permissions)

## License

[Your license here]
