# Sebastian Rosnes Sørensen - Portfolio

A cinematic, scroll-driven portfolio website. Full-viewport sections, bold typography, scroll-triggered animations, and a dark Nordic aesthetic.

**Live:** [sebastiansorensen.no](https://sebastiansorensen.no)

## Tech Stack

- **Framework:** Next.js 16+ (App Router)
- **Styling:** Tailwind CSS 4+
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **i18n:** next-intl (NO/EN)
- **Deployment:** Vercel
- **Package Manager:** pnpm

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

```bash
pnpm build    # Production build
pnpm start    # Start production server
```

## Project Structure

```
/
├── app/
│   ├── [locale]/          # Locale-based routing
│   │   ├── layout.tsx     # Root layout with providers
│   │   ├── page.tsx       # Home page
│   │   └── design-system/ # Design system showcase
│   ├── layout.tsx         # Base layout with metadata
│   └── globals.css        # Global styles + theme
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── sections/          # Page sections (hero, experience, etc.)
│   └── ...                # Shared components
├── i18n/
│   ├── config.ts          # Locale configuration
│   ├── messages/          # Translation files (en.json, no.json)
│   └── request.ts         # next-intl request config
├── lib/
│   ├── utils.ts           # Utility functions
│   ├── fonts.ts           # Font configuration
│   └── animations.ts      # Animation presets
├── public/
│   └── images/            # Static images
├── docs/                  # Project documentation
└── proxy.ts               # next-intl middleware
```

## Languages

- **Norwegian (default):** `/`
- **English:** `/en`

## Author

**Sebastian Rosnes Sørensen**
- Full-stack developer at Stacc AS
- Founder of Loreprint AS
- Co-founder at Rosengrip
- Bergen, Norway

## License

Private - All rights reserved
