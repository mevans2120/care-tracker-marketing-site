# Post Pal Marketing Site

Marketing website for Post Pal - an AI-powered companion for smoother, less stressful medical recovery.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **Tailwind CSS v4** - Utility-first CSS with CSS-based configuration
- **Sanity CMS** - Headless CMS with embedded studio
- **TypeScript** - Type-safe development

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/mevans2120/care-tracker-marketing-site.git
cd care-tracker-marketing-site

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### Environment Variables

Edit `.env.local` with your Sanity project details:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=vtck6b2g
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Required for seeding content (get from sanity.io/manage)
SANITY_WRITE_TOKEN=
```

### Seed Content

Before running the site, seed the initial content:

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select the project and create an API token with Editor permissions
3. Add the token to `.env.local` as `SANITY_WRITE_TOKEN`
4. Run the seed script:

```bash
npm run seed
```

### Development

```bash
npm run dev
```

- **Site:** http://localhost:3000
- **Sanity Studio:** http://localhost:3000/studio

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
├── sanity/
│   ├── schemaTypes/     # Sanity document schemas
│   ├── lib/             # Sanity client and queries
│   └── deskStructure.ts # Studio UI organization
├── src/
│   ├── app/
│   │   ├── page.tsx     # Homepage (server component)
│   │   ├── layout.tsx   # Root layout
│   │   ├── globals.css  # Tailwind v4 theme & styles
│   │   └── studio/      # Embedded Sanity Studio
│   ├── components/      # React components
│   ├── hooks/           # Custom React hooks
│   └── types/           # TypeScript definitions
├── scripts/
│   └── seed-content.ts  # Content seeding script
└── docs/
    ├── design/          # Design concepts
    └── plans/           # Implementation plans
```

## Content Management

### Sanity Studio

Access the CMS at `/studio` to edit:

- **Site Settings** - Site name, tagline, contact email
- **Homepage Settings** - Section headlines and CTAs
- **Pain Points** - "Sound familiar?" section items
- **How It Works Steps** - Provider-initiated flow
- **Features** - Feature grid items
- **Testimonials** - Patient quotes
- **Provider Features** - Provider section checklist

### Content Types

| Type | Description |
|------|-------------|
| `siteSettings` | Global site configuration (singleton) |
| `homepageSettings` | Homepage section content (singleton) |
| `painPoint` | Pain point cards with icons |
| `howItWorksStep` | Onboarding flow steps |
| `feature` | Feature cards with icons and colors |
| `testimonial` | Patient testimonials |
| `providerFeature` | Provider feature list items |

## Design

Based on the "Warm Editorial" design concept:

- **Typography:** Fraunces (serif headlines) + DM Sans (body)
- **Colors:** Cream background, navy text, blue/teal/peach accents
- **Style:** Magazine-quality aesthetic with empathy-first messaging

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

The site uses ISR with 5-minute revalidation for optimal performance.

### Environment Variables for Production

```
NEXT_PUBLIC_SANITY_PROJECT_ID=vtck6b2g
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run seed` | Seed Sanity with initial content |

## License

Private - All rights reserved.
