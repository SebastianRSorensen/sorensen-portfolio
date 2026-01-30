# Sebastian Rosnes Sørensen - Portfolio

Personal portfolio website built with Next.js 16, Tailwind CSS 4, and Framer Motion.

## Tech Stack

- **Framework:** Next.js 16+ (App Router)
- **Styling:** Tailwind CSS 4+
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **i18n:** next-intl (NO/EN)
- **Package Manager:** pnpm

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
/
├── app/
│   ├── [locale]/          # Locale-based routing
│   │   ├── layout.tsx     # Root layout with providers
│   │   ├── page.tsx       # Home page
│   │   └── globals.css    # Global styles + theme
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── sections/          # Page sections
│   └── ...                # Shared components
├── i18n/
│   ├── config.ts          # Locale configuration
│   ├── messages/          # Translation files (en.json, no.json)
│   └── request.ts         # next-intl request config
├── lib/
│   ├── utils.ts           # Utility functions
│   └── fonts.ts           # Font configuration
├── public/
│   └── images/            # Static images
├── docs/                  # Project documentation
├── proxy.ts               # next-intl middleware
└── CLAUDE.md              # AI assistant instructions
```

## Languages

- **Norwegian (default):** `/`
- **English:** `/en`

## Development

### Adding shadcn/ui Components

```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card
# etc.
```

### Fonts

Fonts are configured in `lib/fonts.ts` and imported in the root layout.

### Animations

All animations use Framer Motion. See `docs/ANIMATIONS.md` for specifications.

## Deployment

Optimized for Vercel deployment. Push to main branch for automatic deployment.

## Documentation

- `CLAUDE.md` - AI assistant instructions
- `docs/ARCHITECTURE.md` - Technical architecture
- `docs/DESIGN.md` - Visual design system
- `docs/CONTENT.md` - All text content
- `docs/COMPONENTS.md` - Component specifications
- `docs/ANIMATIONS.md` - Animation guidelines

## Author

**Sebastian Rosnes Sørensen**
- System Developer at Stacc AS
- Co-founder at Rosengrip
- Bergen, Norway

## License

Private - All rights reserved
