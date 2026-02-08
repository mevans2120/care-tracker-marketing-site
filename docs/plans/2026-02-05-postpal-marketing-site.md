# Post Pal Marketing Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a Next.js + Tailwind + Sanity CMS marketing site based on the Warm Editorial design concept (Concept 1)

**Architecture:** Next.js 14 App Router with Tailwind CSS and embedded Sanity Studio. Content managed via Sanity CMS with singleton documents for page settings and collections for testimonials/features. Server-side data fetching with ISR. Visual editing support.

**Tech Stack:** Next.js 14, Tailwind CSS, Sanity CMS, TypeScript, Google Fonts (Fraunces + DM Sans)

---

## Design Tokens Reference

From the approved concept:

**Colors:**
- Background: `#FBF7F3` (cream)
- Text: `#2B3A4A` (navy)
- Primary: `#1390FF` (blue)
- Primary Hover: `#0b7de6`
- Healing: `#1DB584` (teal)
- Accent: `#E8A87C` (warm peach)
- Error: `#ef5350`

**Typography:**
- Headlines: Fraunces (serif), weights 400-700
- Body: DM Sans (sans-serif), weights 300-700

**Spacing:**
- Container max-width: 1200px
- Container narrow: 900px
- Container padding: 24px
- Section padding: 100px vertical (60px on mobile)

**Breakpoints:**
- Desktop: 1024px+
- Tablet: 768px-1023px
- Mobile: 480px-767px
- Small mobile: <480px

---

## Sanity Content Model

### Singleton Documents (Settings)

**siteSettings:**
- siteName (string)
- tagline (string)
- contactEmail (string)
- privacyText (string)

**homepageSettings:**
- heroSection: { badge, headline, subheadline, ctaText, ctaLink }
- painPointsSection: { headline }
- howItWorksSection: { eyebrow, headline, subheadline }
- featuresSection: { eyebrow, headline }
- testimonialSection: { quotemark }
- providersSection: { eyebrow, headline, description, ctaText }
- finalCtaSection: { headline, subheadline, ctaText, ctaLink, trustText }

### Collection Documents

**testimonial:**
- quote (text)
- authorName (string)
- authorInitial (string)
- detail (string) - e.g., "Knee replacement recovery"
- featured (boolean)
- order (number)

**feature:**
- title (string)
- description (text)
- iconType (string - timeline, milestones, reminders, emergency)
- colorTheme (string - primary, healing, accent, error)
- order (number)

**painPoint:**
- text (string)
- iconType (string - papers, uncertain, worried)
- order (number)

**howItWorksStep:**
- stepNumber (number)
- title (string)
- description (text)
- visualType (string - scan, download, follow)
- visualLabel (string)
- order (number)

**providerFeature:**
- text (string)
- order (number)

---

## Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`
- Create: `next.config.js`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`

**Step 1: Create Next.js project with Tailwind**

Run:
```bash
cd /Users/michaelevans/repos/care-tracker-marketing-site
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

When prompted, accept defaults. If directory not empty, allow overwriting.

Expected: Project initialized with Next.js 14, TypeScript, Tailwind CSS

**Step 2: Verify project structure**

Run: `ls -la src/app/`

Expected: `layout.tsx`, `page.tsx`, `globals.css` exist

**Step 3: Start dev server to verify setup**

Run: `npm run dev`

Expected: Server starts on localhost:3000 without errors

**Step 4: Commit**

```bash
git add .
git commit -m "feat: initialize Next.js project with Tailwind

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 2: Configure Design Tokens in Tailwind

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Step 1: Update Tailwind config with design tokens**

Replace `tailwind.config.ts` with:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FBF7F3",
        navy: "#2B3A4A",
        primary: {
          DEFAULT: "#1390FF",
          hover: "#0b7de6",
        },
        healing: "#1DB584",
        accent: "#E8A87C",
        error: "#ef5350",
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
        narrow: "900px",
      },
      spacing: {
        section: "100px",
        "section-mobile": "60px",
      },
    },
  },
  plugins: [],
};

export default config;
```

**Step 2: Update globals.css with base styles and fonts**

Replace `src/app/globals.css` with:

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400;1,9..40,500&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500;1,9..144,600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    @apply font-sans text-[17px] leading-relaxed text-navy bg-cream;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-serif leading-tight font-semibold;
  }
}

@layer components {
  .container-main {
    @apply max-w-container mx-auto px-6;
  }

  .container-narrow {
    @apply max-w-narrow mx-auto px-6;
  }
}

/* Scroll animations */
.fade-up {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 600ms ease-out, transform 600ms ease-out;
}

.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}

.fade-up-delay-1 { transition-delay: 100ms; }
.fade-up-delay-2 { transition-delay: 200ms; }
.fade-up-delay-3 { transition-delay: 300ms; }
.fade-up-delay-4 { transition-delay: 400ms; }
```

**Step 3: Update layout.tsx with fonts and metadata**

Replace `src/app/layout.tsx` with:

```typescript
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Post Pal - Recovery is hard enough. Your care plan shouldn't be.",
  description:
    "Post Pal transforms your hospital discharge instructions into a simple, day-by-day recovery timeline. Powered by AI. Guided by your doctor's instructions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

**Step 4: Verify fonts and colors load**

Run: `npm run dev`

Open browser, verify page loads with cream background

**Step 5: Commit**

```bash
git add .
git commit -m "feat: configure Tailwind with Post Pal design tokens

- Add color palette (cream, navy, primary, healing, accent)
- Configure Fraunces and DM Sans fonts
- Add base styles and scroll animation classes

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 3: Install and Configure Sanity CMS

**Files:**
- Modify: `package.json`
- Create: `sanity.config.ts`
- Create: `sanity.cli.ts`
- Create: `.env.local`
- Create: `.env.example`
- Create: `src/app/studio/[[...tool]]/page.tsx`

**Step 1: Install Sanity dependencies**

Run:
```bash
cd /Users/michaelevans/repos/care-tracker-marketing-site
npm install sanity @sanity/vision @sanity/image-url next-sanity
```

Expected: Packages installed successfully

**Step 2: Create environment files**

Create `.env.example`:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Visual Editing (optional)
SANITY_API_TOKEN=

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Create `.env.local` with actual values (get project ID from sanity.io/manage or create new project):

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=<your_project_id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Step 3: Create Sanity CLI config**

Create `sanity.cli.ts`:

```typescript
import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: 'postpal',
})
```

**Step 4: Create Sanity main config (placeholder - will add schemas later)**

Create `sanity.config.ts`:

```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: 'postpal',
  title: 'Post Pal CMS',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: [], // Will add schema types in next task
  },
})
```

**Step 5: Create embedded studio route**

Create directory: `mkdir -p src/app/studio/[[...tool]]`

Create `src/app/studio/[[...tool]]/page.tsx`:

```typescript
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

**Step 6: Update next.config to handle Sanity**

Replace `next.config.ts` (or `next.config.js`) with:

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Silence warnings about Sanity packages
  transpilePackages: ['sanity'],
}

export default nextConfig
```

**Step 7: Verify studio loads**

Run: `npm run dev`

Open browser to `http://localhost:3000/studio`

Expected: Sanity Studio loads (may show empty schema warning - that's ok)

**Step 8: Commit**

```bash
git add .
git commit -m "feat: install and configure Sanity CMS

- Add Sanity dependencies
- Create embedded studio at /studio
- Configure environment variables
- Set up next.config for Sanity images

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 4: Create Sanity Schema Types

**Files:**
- Create: `sanity/schemaTypes/index.ts`
- Create: `sanity/schemaTypes/siteSettings.ts`
- Create: `sanity/schemaTypes/homepageSettings.ts`
- Create: `sanity/schemaTypes/testimonial.ts`
- Create: `sanity/schemaTypes/feature.ts`
- Create: `sanity/schemaTypes/painPoint.ts`
- Create: `sanity/schemaTypes/howItWorksStep.ts`
- Create: `sanity/schemaTypes/providerFeature.ts`
- Modify: `sanity.config.ts`

**Step 1: Create schema directory**

Run: `mkdir -p /Users/michaelevans/repos/care-tracker-marketing-site/sanity/schemaTypes`

**Step 2: Create siteSettings schema (singleton)**

Create `sanity/schemaTypes/siteSettings.ts`:

```typescript
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'Post Pal',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Your AI-powered companion for a smoother, less stressful medical recovery.',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'hello@postpal.health',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'privacyText',
      title: 'Privacy Trust Text',
      type: 'string',
      initialValue: 'Your health data is encrypted and private.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
```

**Step 3: Create homepageSettings schema (singleton)**

Create `sanity/schemaTypes/homepageSettings.ts`:

```typescript
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepageSettings',
  title: 'Homepage Settings',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section', default: true },
    { name: 'painPoints', title: 'Pain Points' },
    { name: 'howItWorks', title: 'How It Works' },
    { name: 'features', title: 'Features' },
    { name: 'providers', title: 'For Providers' },
    { name: 'finalCta', title: 'Final CTA' },
  ],
  fields: [
    // Hero Section
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge Text',
      type: 'string',
      initialValue: 'Currently in Beta',
      group: 'hero',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      initialValue: 'Recovery is hard enough. Your care plan shouldn\'t be.',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      rows: 3,
      initialValue: 'Post Pal transforms your hospital discharge instructions into a simple, day-by-day recovery timeline. Powered by AI. Guided by your doctor\'s instructions.',
      group: 'hero',
    }),
    defineField({
      name: 'heroCtaText',
      title: 'Hero CTA Text',
      type: 'string',
      initialValue: 'Learn More',
      group: 'hero',
    }),
    defineField({
      name: 'heroSecondaryCtaText',
      title: 'Hero Secondary CTA Text',
      type: 'string',
      initialValue: 'See How It Works',
      group: 'hero',
    }),

    // Pain Points Section
    defineField({
      name: 'painPointsHeadline',
      title: 'Pain Points Headline',
      type: 'string',
      initialValue: 'Sound familiar?',
      group: 'painPoints',
    }),

    // How It Works Section
    defineField({
      name: 'howItWorksEyebrow',
      title: 'How It Works Eyebrow',
      type: 'string',
      initialValue: 'How It Works',
      group: 'howItWorks',
    }),
    defineField({
      name: 'howItWorksHeadline',
      title: 'How It Works Headline',
      type: 'string',
      initialValue: 'Your provider sets you up for success',
      group: 'howItWorks',
    }),
    defineField({
      name: 'howItWorksSubheadline',
      title: 'How It Works Subheadline',
      type: 'text',
      rows: 2,
      initialValue: 'No complicated setup. Your healthcare team gets you started, and Post Pal guides you through recovery.',
      group: 'howItWorks',
    }),

    // Features Section
    defineField({
      name: 'featuresEyebrow',
      title: 'Features Eyebrow',
      type: 'string',
      initialValue: 'Features',
      group: 'features',
    }),
    defineField({
      name: 'featuresHeadline',
      title: 'Features Headline',
      type: 'string',
      initialValue: 'Everything you need for a smoother recovery',
      group: 'features',
    }),

    // Providers Section
    defineField({
      name: 'providersEyebrow',
      title: 'Providers Eyebrow',
      type: 'string',
      initialValue: 'For Providers',
      group: 'providers',
    }),
    defineField({
      name: 'providersHeadline',
      title: 'Providers Headline',
      type: 'string',
      initialValue: 'Designed for patients. Built for providers.',
      group: 'providers',
    }),
    defineField({
      name: 'providersDescription',
      title: 'Providers Description',
      type: 'text',
      rows: 3,
      initialValue: 'Give your patients the best post-discharge experience. QR-code onboarding, institutional dashboards, and real-time recovery monitoring.',
      group: 'providers',
    }),
    defineField({
      name: 'providersCtaText',
      title: 'Providers CTA Text',
      type: 'string',
      initialValue: 'Learn More for Providers',
      group: 'providers',
    }),

    // Final CTA Section
    defineField({
      name: 'finalCtaHeadline',
      title: 'Final CTA Headline',
      type: 'string',
      initialValue: 'Interested in Post Pal?',
      group: 'finalCta',
    }),
    defineField({
      name: 'finalCtaSubheadline',
      title: 'Final CTA Subheadline',
      type: 'text',
      rows: 2,
      initialValue: 'We\'re currently in beta and working with select healthcare providers. Get in touch to learn more.',
      group: 'finalCta',
    }),
    defineField({
      name: 'finalCtaButtonText',
      title: 'Final CTA Button Text',
      type: 'string',
      initialValue: 'Get in Touch',
      group: 'finalCta',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Homepage Settings' }
    },
  },
})
```

**Step 4: Create testimonial schema**

Create `sanity/schemaTypes/testimonial.ts`:

```typescript
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorInitial',
      title: 'Author Initial (for avatar)',
      type: 'string',
      validation: (Rule) => Rule.required().max(2),
    }),
    defineField({
      name: 'detail',
      title: 'Detail (e.g., procedure type)',
      type: 'string',
      description: 'E.g., "Knee replacement recovery"',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'authorName',
      subtitle: 'detail',
      featured: 'featured',
      order: 'order',
    },
    prepare({ title, subtitle, featured, order }) {
      return {
        title: featured ? `⭐ ${order}. ${title}` : `${order}. ${title}`,
        subtitle,
      }
    },
  },
})
```

**Step 5: Create feature schema**

Create `sanity/schemaTypes/feature.ts`:

```typescript
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'feature',
  title: 'Feature',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'iconType',
      title: 'Icon Type',
      type: 'string',
      options: {
        list: [
          { title: 'Timeline (Calendar)', value: 'timeline' },
          { title: 'Milestones (Star)', value: 'milestones' },
          { title: 'Reminders (Bell)', value: 'reminders' },
          { title: 'Emergency (Heart Alert)', value: 'emergency' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'colorTheme',
      title: 'Color Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Primary (Blue)', value: 'primary' },
          { title: 'Healing (Teal)', value: 'healing' },
          { title: 'Accent (Peach)', value: 'accent' },
          { title: 'Error (Red)', value: 'error' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
      iconType: 'iconType',
    },
    prepare({ title, order, iconType }) {
      const icons: Record<string, string> = {
        timeline: '📅',
        milestones: '⭐',
        reminders: '🔔',
        emergency: '❤️',
      }
      return {
        title: `${order}. ${title}`,
        subtitle: icons[iconType] || iconType,
      }
    },
  },
})
```

**Step 6: Create painPoint schema**

Create `sanity/schemaTypes/painPoint.ts`:

```typescript
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'painPoint',
  title: 'Pain Point',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'iconType',
      title: 'Icon Type',
      type: 'string',
      options: {
        list: [
          { title: 'Papers (Stack)', value: 'papers' },
          { title: 'Uncertain (Question)', value: 'uncertain' },
          { title: 'Worried (Clock)', value: 'worried' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'text',
      order: 'order',
    },
    prepare({ title, order }) {
      return {
        title: `${order}. ${title}`,
      }
    },
  },
})
```

**Step 7: Create howItWorksStep schema**

Create `sanity/schemaTypes/howItWorksStep.ts`:

```typescript
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'howItWorksStep',
  title: 'How It Works Step',
  type: 'document',
  fields: [
    defineField({
      name: 'stepNumber',
      title: 'Step Number',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'visualType',
      title: 'Visual Type',
      type: 'string',
      options: {
        list: [
          { title: 'QR Code / Scan', value: 'scan' },
          { title: 'Download', value: 'download' },
          { title: 'Follow / Checklist', value: 'follow' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'visualLabel',
      title: 'Visual Label',
      type: 'string',
      description: 'Text shown below the icon in the visual area',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Step Number',
      name: 'stepAsc',
      by: [{ field: 'stepNumber', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      stepNumber: 'stepNumber',
    },
    prepare({ title, stepNumber }) {
      return {
        title: `Step ${stepNumber}: ${title}`,
      }
    },
  },
})
```

**Step 8: Create providerFeature schema**

Create `sanity/schemaTypes/providerFeature.ts`:

```typescript
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'providerFeature',
  title: 'Provider Feature',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'text',
      order: 'order',
    },
    prepare({ title, order }) {
      return {
        title: `${order}. ${title}`,
      }
    },
  },
})
```

**Step 9: Create schema index**

Create `sanity/schemaTypes/index.ts`:

```typescript
import siteSettings from './siteSettings'
import homepageSettings from './homepageSettings'
import testimonial from './testimonial'
import feature from './feature'
import painPoint from './painPoint'
import howItWorksStep from './howItWorksStep'
import providerFeature from './providerFeature'

export const schemaTypes = [
  // Singletons
  siteSettings,
  homepageSettings,
  // Collections
  testimonial,
  feature,
  painPoint,
  howItWorksStep,
  providerFeature,
]
```

**Step 10: Update sanity.config.ts to use schemas**

Replace `sanity.config.ts`:

```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'
import { structure } from './sanity/deskStructure'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: 'postpal',
  title: 'Post Pal CMS',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
```

**Step 11: Commit**

```bash
git add .
git commit -m "feat: add Sanity schema types

- siteSettings singleton for global config
- homepageSettings singleton for page content
- testimonial, feature, painPoint collections
- howItWorksStep, providerFeature collections
- Order-based sorting for all collections

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 5: Create Sanity Desk Structure

**Files:**
- Create: `sanity/deskStructure.ts`

**Step 1: Create desk structure for organized admin UI**

Create `sanity/deskStructure.ts`:

```typescript
import { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Settings Group
      S.listItem()
        .title('Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('Site Settings')
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                ),
              S.listItem()
                .title('Homepage Settings')
                .child(
                  S.document()
                    .schemaType('homepageSettings')
                    .documentId('homepageSettings')
                ),
            ])
        ),

      S.divider(),

      // Homepage Content
      S.listItem()
        .title('Pain Points')
        .child(
          S.documentTypeList('painPoint')
            .title('Pain Points')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.listItem()
        .title('How It Works Steps')
        .child(
          S.documentTypeList('howItWorksStep')
            .title('How It Works Steps')
            .defaultOrdering([{ field: 'stepNumber', direction: 'asc' }])
        ),

      S.listItem()
        .title('Features')
        .child(
          S.documentTypeList('feature')
            .title('Features')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.listItem()
        .title('Testimonials')
        .child(
          S.documentTypeList('testimonial')
            .title('Testimonials')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.listItem()
        .title('Provider Features')
        .child(
          S.documentTypeList('providerFeature')
            .title('Provider Features')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),
    ])
```

**Step 2: Verify studio loads with structure**

Run: `npm run dev`

Open `http://localhost:3000/studio`

Expected: Studio shows organized sidebar with Settings group and content collections

**Step 3: Commit**

```bash
git add .
git commit -m "feat: add Sanity desk structure for organized admin UI

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 6: Create Sanity Client and Query Utilities

**Files:**
- Create: `sanity/lib/client.ts`
- Create: `sanity/lib/queries.ts`
- Create: `sanity/lib/image.ts`

**Step 1: Create Sanity client**

Create directory: `mkdir -p /Users/michaelevans/repos/care-tracker-marketing-site/sanity/lib`

Create `sanity/lib/client.ts`:

```typescript
import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
})
```

**Step 2: Create GROQ queries**

Create `sanity/lib/queries.ts`:

```typescript
import { groq } from 'next-sanity'

// ============================================
// SINGLETON QUERIES
// ============================================

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    contactEmail,
    privacyText
  }
`

export const HOMEPAGE_SETTINGS_QUERY = groq`
  *[_type == "homepageSettings"][0] {
    heroBadge,
    heroHeadline,
    heroSubheadline,
    heroCtaText,
    heroSecondaryCtaText,
    painPointsHeadline,
    howItWorksEyebrow,
    howItWorksHeadline,
    howItWorksSubheadline,
    featuresEyebrow,
    featuresHeadline,
    providersEyebrow,
    providersHeadline,
    providersDescription,
    providersCtaText,
    finalCtaHeadline,
    finalCtaSubheadline,
    finalCtaButtonText
  }
`

// ============================================
// COLLECTION QUERIES
// ============================================

export const PAIN_POINTS_QUERY = groq`
  *[_type == "painPoint"] | order(order asc) {
    _id,
    text,
    iconType,
    order
  }
`

export const HOW_IT_WORKS_STEPS_QUERY = groq`
  *[_type == "howItWorksStep"] | order(stepNumber asc) {
    _id,
    stepNumber,
    title,
    description,
    visualType,
    visualLabel,
    order
  }
`

export const FEATURES_QUERY = groq`
  *[_type == "feature"] | order(order asc) {
    _id,
    title,
    description,
    iconType,
    colorTheme,
    order
  }
`

export const FEATURED_TESTIMONIAL_QUERY = groq`
  *[_type == "testimonial" && featured == true] | order(order asc)[0] {
    _id,
    quote,
    authorName,
    authorInitial,
    detail
  }
`

export const ALL_TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    quote,
    authorName,
    authorInitial,
    detail,
    featured
  }
`

export const PROVIDER_FEATURES_QUERY = groq`
  *[_type == "providerFeature"] | order(order asc) {
    _id,
    text,
    order
  }
`

// ============================================
// COMBINED HOMEPAGE QUERY (for performance)
// ============================================

export const HOMEPAGE_DATA_QUERY = groq`
{
  "siteSettings": *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    contactEmail,
    privacyText
  },
  "homepage": *[_type == "homepageSettings"][0] {
    heroBadge,
    heroHeadline,
    heroSubheadline,
    heroCtaText,
    heroSecondaryCtaText,
    painPointsHeadline,
    howItWorksEyebrow,
    howItWorksHeadline,
    howItWorksSubheadline,
    featuresEyebrow,
    featuresHeadline,
    providersEyebrow,
    providersHeadline,
    providersDescription,
    providersCtaText,
    finalCtaHeadline,
    finalCtaSubheadline,
    finalCtaButtonText
  },
  "painPoints": *[_type == "painPoint"] | order(order asc) {
    _id,
    text,
    iconType
  },
  "howItWorksSteps": *[_type == "howItWorksStep"] | order(stepNumber asc) {
    _id,
    stepNumber,
    title,
    description,
    visualType,
    visualLabel
  },
  "features": *[_type == "feature"] | order(order asc) {
    _id,
    title,
    description,
    iconType,
    colorTheme
  },
  "testimonial": *[_type == "testimonial" && featured == true] | order(order asc)[0] {
    _id,
    quote,
    authorName,
    authorInitial,
    detail
  },
  "providerFeatures": *[_type == "providerFeature"] | order(order asc) {
    _id,
    text
  }
}
`
```

**Step 3: Create image URL builder utility**

Create `sanity/lib/image.ts`:

```typescript
import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
```

**Step 4: Commit**

```bash
git add .
git commit -m "feat: add Sanity client and GROQ queries

- Client with CDN in production
- Individual queries for each content type
- Combined HOMEPAGE_DATA_QUERY for performance
- Image URL builder utility

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 7: Create TypeScript Types for Sanity Data

**Files:**
- Create: `src/types/sanity.ts`

**Step 1: Create type definitions**

Create directory: `mkdir -p /Users/michaelevans/repos/care-tracker-marketing-site/src/types`

Create `src/types/sanity.ts`:

```typescript
// Site Settings
export interface SiteSettings {
  siteName: string
  tagline: string
  contactEmail: string
  privacyText: string
}

// Homepage Settings
export interface HomepageSettings {
  heroBadge: string
  heroHeadline: string
  heroSubheadline: string
  heroCtaText: string
  heroSecondaryCtaText: string
  painPointsHeadline: string
  howItWorksEyebrow: string
  howItWorksHeadline: string
  howItWorksSubheadline: string
  featuresEyebrow: string
  featuresHeadline: string
  providersEyebrow: string
  providersHeadline: string
  providersDescription: string
  providersCtaText: string
  finalCtaHeadline: string
  finalCtaSubheadline: string
  finalCtaButtonText: string
}

// Pain Point
export interface PainPoint {
  _id: string
  text: string
  iconType: 'papers' | 'uncertain' | 'worried'
}

// How It Works Step
export interface HowItWorksStep {
  _id: string
  stepNumber: number
  title: string
  description: string
  visualType: 'scan' | 'download' | 'follow'
  visualLabel: string
}

// Feature
export interface Feature {
  _id: string
  title: string
  description: string
  iconType: 'timeline' | 'milestones' | 'reminders' | 'emergency'
  colorTheme: 'primary' | 'healing' | 'accent' | 'error'
}

// Testimonial
export interface Testimonial {
  _id: string
  quote: string
  authorName: string
  authorInitial: string
  detail: string
}

// Provider Feature
export interface ProviderFeature {
  _id: string
  text: string
}

// Combined Homepage Data
export interface HomepageData {
  siteSettings: SiteSettings
  homepage: HomepageSettings
  painPoints: PainPoint[]
  howItWorksSteps: HowItWorksStep[]
  features: Feature[]
  testimonial: Testimonial | null
  providerFeatures: ProviderFeature[]
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add TypeScript types for Sanity data

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 8: Create SVG Icon Components

**Files:**
- Create: `src/components/icons/Logo.tsx`
- Create: `src/components/icons/PainPointIcons.tsx`
- Create: `src/components/icons/StepIcons.tsx`
- Create: `src/components/icons/FeatureIcons.tsx`
- Create: `src/components/icons/index.ts`

**Step 1: Create icons directory**

Run: `mkdir -p /Users/michaelevans/repos/care-tracker-marketing-site/src/components/icons`

**Step 2: Create Logo component**

Create `src/components/icons/Logo.tsx`:

```typescript
export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16 28C16 28 4 20 4 12C4 8 7 5 10.5 5C13 5 15 6.5 16 8.5C17 6.5 19 5 21.5 5C25 5 28 8 28 12C28 20 16 28 16 28Z"
        fill="#E8A87C"
        stroke="#E8A87C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 14L14 18L22 10"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
```

**Step 3: Create PainPointIcons component**

Create `src/components/icons/PainPointIcons.tsx`:

```typescript
interface IconProps {
  className?: string
}

export function PapersIcon({ className = "w-10 h-10" }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <rect x="6" y="8" width="24" height="28" rx="2" stroke="currentColor" strokeWidth="2.5" />
      <rect x="10" y="4" width="24" height="28" rx="2" fill="#FBF7F3" stroke="currentColor" strokeWidth="2.5" />
      <line x1="15" y1="12" x2="29" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="15" y1="18" x2="29" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="15" y1="24" x2="23" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function UncertainIcon({ className = "w-10 h-10" }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2.5" />
      <path d="M15 15C15 12.5 17.5 11 20 11C22.5 11 25 12.5 25 15C25 17 23 18 21 19C20 19.5 20 20.5 20 21.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="20" cy="27" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function WorriedIcon({ className = "w-10 h-10" }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="22" r="13" stroke="currentColor" strokeWidth="2.5" />
      <path d="M20 14V22L25 25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 6L20 10L26 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PainPointIcon({ type, className }: { type: string; className?: string }) {
  switch (type) {
    case 'papers':
      return <PapersIcon className={className} />
    case 'uncertain':
      return <UncertainIcon className={className} />
    case 'worried':
      return <WorriedIcon className={className} />
    default:
      return <PapersIcon className={className} />
  }
}
```

**Step 4: Create StepIcons component**

Create `src/components/icons/StepIcons.tsx`:

```typescript
interface IconProps {
  className?: string
}

export function ScanIcon({ className = "w-12 h-12" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="6" y="6" width="14" height="14" rx="2" stroke="#3d8bd4" strokeWidth="2.5" />
      <rect x="10" y="10" width="6" height="6" fill="#3d8bd4" />
      <rect x="28" y="6" width="14" height="14" rx="2" stroke="#3d8bd4" strokeWidth="2.5" />
      <rect x="32" y="10" width="6" height="6" fill="#3d8bd4" />
      <rect x="6" y="28" width="14" height="14" rx="2" stroke="#3d8bd4" strokeWidth="2.5" />
      <rect x="10" y="32" width="6" height="6" fill="#3d8bd4" />
      <rect x="28" y="28" width="6" height="6" fill="#3d8bd4" />
      <rect x="36" y="28" width="6" height="6" fill="#3d8bd4" />
      <rect x="28" y="36" width="6" height="6" fill="#3d8bd4" />
      <rect x="36" y="36" width="6" height="6" fill="#3d8bd4" />
    </svg>
  )
}

export function DownloadIcon({ className = "w-12 h-12" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="12" y="4" width="24" height="40" rx="4" stroke="#2a9d6e" strokeWidth="2.5" />
      <line x1="20" y1="38" x2="28" y2="38" stroke="#2a9d6e" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 14V26M24 26L19 21M24 26L29 21" stroke="#2a9d6e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function FollowIcon({ className = "w-12 h-12" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="8" y="8" width="32" height="32" rx="4" stroke="#c97a4a" strokeWidth="2.5" />
      <path d="M15 20L19 24L27 16" stroke="#c97a4a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="15" y1="32" x2="27" y2="32" stroke="#c97a4a" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="35" cy="35" r="8" fill="#FBF7F3" stroke="#c97a4a" strokeWidth="2.5" />
      <path d="M35 31V35L37.5 37.5" stroke="#c97a4a" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function StepIcon({ type, className }: { type: string; className?: string }) {
  switch (type) {
    case 'scan':
      return <ScanIcon className={className} />
    case 'download':
      return <DownloadIcon className={className} />
    case 'follow':
      return <FollowIcon className={className} />
    default:
      return <ScanIcon className={className} />
  }
}
```

**Step 5: Create FeatureIcons component**

Create `src/components/icons/FeatureIcons.tsx`:

```typescript
interface IconProps {
  className?: string
}

export function TimelineIcon({ className = "w-7 h-7" }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className}>
      <rect x="3" y="5" width="22" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
      <line x1="3" y1="11" x2="25" y2="11" stroke="currentColor" strokeWidth="2" />
      <line x1="9" y1="5" x2="9" y2="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="19" y1="5" x2="19" y2="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="7" y="15" width="4" height="3" rx="0.5" fill="currentColor" />
      <rect x="12" y="15" width="4" height="3" rx="0.5" fill="currentColor" />
      <rect x="17" y="15" width="4" height="3" rx="0.5" fill="currentColor" />
    </svg>
  )
}

export function MilestonesIcon({ className = "w-7 h-7" }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className}>
      <path d="M14 3L17.09 9.26L24 10.27L19 15.14L20.18 22.02L14 18.77L7.82 22.02L9 15.14L4 10.27L10.91 9.26L14 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

export function RemindersIcon({ className = "w-7 h-7" }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className}>
      <path d="M11 21C11 22.66 12.34 24 14 24C15.66 24 17 22.66 17 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 4C14 4 14 3 14 3C12.34 3 11 4.34 11 6V7C7.5 8 5 11 5 14.5V17L3 20H25L23 17V14.5C23 11 20.5 8 17 7V6C17 4.34 15.66 3 14 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function EmergencyIcon({ className = "w-7 h-7" }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className}>
      <path d="M14 24C14 24 4 18 4 11C4 7.5 6.5 5 9.5 5C11.5 5 13 6 14 7.5C15 6 16.5 5 18.5 5C21.5 5 24 7.5 24 11C24 18 14 24 14 24Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="14" y1="10" x2="14" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="14" cy="18" r="1" fill="currentColor" />
    </svg>
  )
}

export function FeatureIcon({ type, className }: { type: string; className?: string }) {
  switch (type) {
    case 'timeline':
      return <TimelineIcon className={className} />
    case 'milestones':
      return <MilestonesIcon className={className} />
    case 'reminders':
      return <RemindersIcon className={className} />
    case 'emergency':
      return <EmergencyIcon className={className} />
    default:
      return <TimelineIcon className={className} />
  }
}
```

**Step 6: Create icons index**

Create `src/components/icons/index.ts`:

```typescript
export { Logo } from './Logo'
export { PainPointIcon, PapersIcon, UncertainIcon, WorriedIcon } from './PainPointIcons'
export { StepIcon, ScanIcon, DownloadIcon, FollowIcon } from './StepIcons'
export { FeatureIcon, TimelineIcon, MilestonesIcon, RemindersIcon, EmergencyIcon } from './FeatureIcons'
```

**Step 7: Commit**

```bash
git add .
git commit -m "feat: add SVG icon components

- Logo icon
- Pain point icons (papers, uncertain, worried)
- Step icons (scan, download, follow)
- Feature icons (timeline, milestones, reminders, emergency)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 9: Create Navigation Component

**Files:**
- Create: `src/components/Navigation.tsx`

**Step 1: Create Navigation component**

Create `src/components/Navigation.tsx`:

```typescript
"use client"

import { useState } from "react"
import { Logo } from "./icons"
import type { SiteSettings } from "@/types/sanity"

interface NavigationProps {
  siteSettings: SiteSettings
}

const navLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#features", label: "Features" },
  { href: "#providers", label: "For Providers" },
  { href: "#about", label: "About" },
]

export function Navigation({ siteSettings }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/[0.92] backdrop-blur-[12px] border-b border-navy/[0.06]">
      <div className="container-main flex items-center justify-between h-[72px]">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 font-serif text-2xl font-bold text-navy">
          <Logo className="w-9 h-9" />
          {siteSettings.siteName}
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-navy/75 hover:text-navy transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-2.5 bg-primary text-white text-[15px] font-semibold rounded-full hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(19,144,255,0.3)] transition-all duration-300"
          >
            Learn More
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="flex md:hidden flex-col gap-[5px] p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="block w-6 h-0.5 bg-navy rounded-sm" />
          <span className="block w-6 h-0.5 bg-navy rounded-sm" />
          <span className="block w-6 h-0.5 bg-navy rounded-sm" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[72px] left-0 right-0 bottom-0 bg-cream/[0.98] backdrop-blur-[12px] flex flex-col items-center pt-[60px] gap-8 z-[99]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              className="text-xl font-medium text-navy"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMobileMenu}
            className="inline-flex items-center px-6 py-2.5 bg-primary text-white text-[15px] font-semibold rounded-full mt-2"
          >
            Learn More
          </a>
        </div>
      )}
    </nav>
  )
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add Navigation component with Sanity integration

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 10: Create Section Components (Hero, PainPoints, HowItWorks, Features, Testimonial, Providers, FinalCTA, Footer)

This task creates all the section components. Due to the length, I'll provide the key pattern and you should create each file following the same approach.

**Files:**
- Create: `src/components/Hero.tsx`
- Create: `src/components/PhoneMockup.tsx`
- Create: `src/components/PainPoints.tsx`
- Create: `src/components/HowItWorks.tsx`
- Create: `src/components/Features.tsx`
- Create: `src/components/Testimonial.tsx`
- Create: `src/components/Providers.tsx`
- Create: `src/components/FinalCTA.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/components/index.ts`

**Pattern for all section components:**

Each component receives its data as props from the page-level data fetch:

```typescript
// Example: Features.tsx
import { FeatureIcon } from "./icons"
import type { HomepageSettings, Feature } from "@/types/sanity"

interface FeaturesProps {
  settings: HomepageSettings
  features: Feature[]
}

export function Features({ settings, features }: FeaturesProps) {
  // Use settings.featuresEyebrow, settings.featuresHeadline
  // Map over features array to render cards
}
```

**Step 1: Create all section component files**

Create each component file following the patterns established in Tasks 5-12 of the original plan, but now accepting Sanity data as props.

See the original concept HTML at `/Users/michaelevans/repos/care-tracker-marketing-site/docs/design/homepage-concepts-020526/homepage-concept-1-warm-editorial.html` for the exact markup and styling.

**Step 2: Create components index**

Create `src/components/index.ts`:

```typescript
export { Navigation } from "./Navigation"
export { Hero } from "./Hero"
export { PhoneMockup } from "./PhoneMockup"
export { PainPoints } from "./PainPoints"
export { HowItWorks } from "./HowItWorks"
export { Features } from "./Features"
export { Testimonial } from "./Testimonial"
export { Providers } from "./Providers"
export { FinalCTA } from "./FinalCTA"
export { Footer } from "./Footer"
```

**Step 3: Commit**

```bash
git add .
git commit -m "feat: add all section components with Sanity data props

- Hero with PhoneMockup
- PainPoints, HowItWorks, Features
- Testimonial, Providers, FinalCTA
- Footer

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 11: Create Scroll Animation Hook

**Files:**
- Create: `src/hooks/useScrollAnimation.ts`

**Step 1: Create hooks directory and useScrollAnimation hook**

Run: `mkdir -p /Users/michaelevans/repos/care-tracker-marketing-site/src/hooks`

Create `src/hooks/useScrollAnimation.ts`:

```typescript
"use client"

import { useEffect } from "react"

export function useScrollAnimation() {
  useEffect(() => {
    const fadeElements = document.querySelectorAll(".fade-up")

    if (!("IntersectionObserver" in window)) {
      fadeElements.forEach((el) => el.classList.add("visible"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    )

    fadeElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add useScrollAnimation hook

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 12: Assemble Main Page with Server-Side Data Fetching

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/HomePage.tsx`

**Step 1: Create HomePage client component**

Create `src/components/HomePage.tsx`:

```typescript
"use client"

import {
  Navigation,
  Hero,
  PainPoints,
  HowItWorks,
  Features,
  Testimonial,
  Providers,
  FinalCTA,
  Footer,
} from "@/components"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import type { HomepageData } from "@/types/sanity"

interface HomePageProps {
  data: HomepageData
}

export function HomePage({ data }: HomePageProps) {
  useScrollAnimation()

  const {
    siteSettings,
    homepage,
    painPoints,
    howItWorksSteps,
    features,
    testimonial,
    providerFeatures,
  } = data

  return (
    <>
      <Navigation siteSettings={siteSettings} />
      <main>
        <Hero settings={homepage} />
        <PainPoints settings={homepage} painPoints={painPoints} />
        <HowItWorks settings={homepage} steps={howItWorksSteps} />
        <Features settings={homepage} features={features} />
        {testimonial && <Testimonial testimonial={testimonial} />}
        <Providers
          settings={homepage}
          providerFeatures={providerFeatures}
          contactEmail={siteSettings.contactEmail}
        />
        <FinalCTA
          settings={homepage}
          contactEmail={siteSettings.contactEmail}
          privacyText={siteSettings.privacyText}
        />
      </main>
      <Footer siteSettings={siteSettings} />
    </>
  )
}
```

**Step 2: Update page.tsx with server-side data fetching**

Replace `src/app/page.tsx`:

```typescript
import { client } from "@/sanity/lib/client"
import { HOMEPAGE_DATA_QUERY } from "@/sanity/lib/queries"
import { HomePage } from "@/components/HomePage"
import type { HomepageData } from "@/types/sanity"

// Revalidate every 5 minutes
export const revalidate = 300

async function getHomepageData(): Promise<HomepageData> {
  return await client.fetch(HOMEPAGE_DATA_QUERY)
}

export default async function Home() {
  const data = await getHomepageData()

  return <HomePage data={data} />
}
```

**Step 3: Update components index to include HomePage**

Update `src/components/index.ts` to add:

```typescript
export { HomePage } from "./HomePage"
```

**Step 4: Commit**

```bash
git add .
git commit -m "feat: assemble main page with server-side Sanity data fetching

- Server component fetches all homepage data
- HomePage client component handles scroll animations
- ISR with 5-minute revalidation

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 13: Seed Initial Content in Sanity

**Files:**
- Create: `scripts/seed-content.ts`
- Modify: `package.json`

**Step 1: Create seed script**

Create directory: `mkdir -p /Users/michaelevans/repos/care-tracker-marketing-site/scripts`

Create `scripts/seed-content.ts`:

```typescript
import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN, // Need write token for this
})

async function seedContent() {
  console.log('Seeding Sanity content...')

  // Site Settings
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: 'Post Pal',
    tagline: 'Your AI-powered companion for a smoother, less stressful medical recovery.',
    contactEmail: 'hello@postpal.health',
    privacyText: 'Your health data is encrypted and private.',
  })
  console.log('✓ Site Settings')

  // Homepage Settings
  await client.createOrReplace({
    _id: 'homepageSettings',
    _type: 'homepageSettings',
    heroBadge: 'Currently in Beta',
    heroHeadline: 'Recovery is hard enough. Your care plan shouldn\'t be.',
    heroSubheadline: 'Post Pal transforms your hospital discharge instructions into a simple, day-by-day recovery timeline. Powered by AI. Guided by your doctor\'s instructions.',
    heroCtaText: 'Learn More',
    heroSecondaryCtaText: 'See How It Works',
    painPointsHeadline: 'Sound familiar?',
    howItWorksEyebrow: 'How It Works',
    howItWorksHeadline: 'Your provider sets you up for success',
    howItWorksSubheadline: 'No complicated setup. Your healthcare team gets you started, and Post Pal guides you through recovery.',
    featuresEyebrow: 'Features',
    featuresHeadline: 'Everything you need for a smoother recovery',
    providersEyebrow: 'For Providers',
    providersHeadline: 'Designed for patients. Built for providers.',
    providersDescription: 'Give your patients the best post-discharge experience. QR-code onboarding, institutional dashboards, and real-time recovery monitoring.',
    providersCtaText: 'Learn More for Providers',
    finalCtaHeadline: 'Interested in Post Pal?',
    finalCtaSubheadline: 'We\'re currently in beta and working with select healthcare providers. Get in touch to learn more.',
    finalCtaButtonText: 'Get in Touch',
  })
  console.log('✓ Homepage Settings')

  // Pain Points
  const painPoints = [
    { text: 'Discharged with a stack of papers you can barely read', iconType: 'papers', order: 0 },
    { text: 'Unsure when you can drive, lift, or return to work', iconType: 'uncertain', order: 1 },
    { text: 'Worrying you\'ll miss a medication or follow-up appointment', iconType: 'worried', order: 2 },
  ]
  for (const pp of painPoints) {
    await client.create({ _type: 'painPoint', ...pp })
  }
  console.log('✓ Pain Points')

  // How It Works Steps
  const steps = [
    { stepNumber: 1, title: 'Your provider enrolls you', description: 'Before you leave, your healthcare team scans a QR code or sends you a link to get started.', visualType: 'scan', visualLabel: 'QR code or secure link', order: 0 },
    { stepNumber: 2, title: 'Download and sign in', description: 'Download the app and sign in with the info your provider gave you. Your personalized plan is already waiting.', visualType: 'download', visualLabel: 'Your plan is ready', order: 1 },
    { stepNumber: 3, title: 'Follow your recovery timeline', description: 'Check off daily tasks, track milestones, and know exactly what comes next. Post Pal keeps you on track.', visualType: 'follow', visualLabel: 'Daily checklist & milestones', order: 2 },
  ]
  for (const step of steps) {
    await client.create({ _type: 'howItWorksStep', ...step })
  }
  console.log('✓ How It Works Steps')

  // Features
  const features = [
    { title: 'Your Timeline, Your Way', description: 'Daily, weekly, and hourly views that adapt to your recovery phase. See what matters now and what\'s coming next.', iconType: 'timeline', colorTheme: 'primary', order: 0 },
    { title: 'Milestone Celebrations', description: 'Track your progress and celebrate recovery wins along the way. Every small step forward deserves recognition.', iconType: 'milestones', colorTheme: 'healing', order: 1 },
    { title: 'Smart Reminders', description: 'Never miss a medication, appointment, or care task. Gentle nudges that keep your recovery on track.', iconType: 'reminders', colorTheme: 'accent', order: 2 },
    { title: 'Emergency Info at Your Fingertips', description: 'Critical warning signs and emergency contacts, always one tap away. Peace of mind when you need it most.', iconType: 'emergency', colorTheme: 'error', order: 3 },
  ]
  for (const feature of features) {
    await client.create({ _type: 'feature', ...feature })
  }
  console.log('✓ Features')

  // Testimonial
  await client.create({
    _type: 'testimonial',
    quote: 'After my knee replacement, I was overwhelmed by the discharge instructions. Post Pal turned 12 pages into a simple daily checklist. I actually understood what I needed to do each day.',
    authorName: 'Sarah M.',
    authorInitial: 'S',
    detail: 'Knee replacement recovery',
    featured: true,
    order: 0,
  })
  console.log('✓ Testimonial')

  // Provider Features
  const providerFeatures = [
    { text: 'QR-code patient onboarding', order: 0 },
    { text: 'Institutional dashboards & analytics', order: 1 },
    { text: 'Real-time recovery monitoring', order: 2 },
    { text: 'HIPAA-compliant infrastructure', order: 3 },
    { text: 'Custom branding for your institution', order: 4 },
  ]
  for (const pf of providerFeatures) {
    await client.create({ _type: 'providerFeature', ...pf })
  }
  console.log('✓ Provider Features')

  console.log('\n✅ Content seeding complete!')
}

seedContent().catch(console.error)
```

**Step 2: Add seed script to package.json**

Add to `package.json` scripts:

```json
{
  "scripts": {
    "seed": "npx tsx scripts/seed-content.ts"
  }
}
```

**Step 3: Install tsx for running TypeScript scripts**

Run: `npm install -D tsx dotenv`

**Step 4: Run seed script (requires SANITY_WRITE_TOKEN)**

Note: You'll need to create a write token in Sanity manage console and add to `.env.local`:

```
SANITY_WRITE_TOKEN=sk...
```

Then run: `npm run seed`

**Step 5: Commit**

```bash
git add .
git commit -m "feat: add content seeding script

- Seeds all initial homepage content
- Requires SANITY_WRITE_TOKEN for write access

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 14: Final Testing and Build Verification

**Files:**
- None (testing only)

**Step 1: Run TypeScript type check**

Run: `npm run build`

Expected: Build completes successfully with no errors

**Step 2: Verify Sanity Studio**

Open `http://localhost:3000/studio`

Expected: Can view and edit all content types

**Step 3: Verify frontend**

Open `http://localhost:3000`

Expected: All sections render with Sanity content

**Step 4: Test content editing**

1. Edit hero headline in Sanity Studio
2. Wait 5 minutes (or restart dev server)
3. Verify change appears on frontend

**Step 5: Test responsive behavior**

Open browser DevTools, test at:
- Desktop (1200px+)
- Tablet (768px)
- Mobile (375px)

**Step 6: Final commit**

```bash
git add .
git commit -m "feat: complete Post Pal marketing site with Sanity CMS

- Next.js 14 + Tailwind CSS + Sanity CMS
- Warm Editorial design (Concept 1)
- Server-side data fetching with ISR
- Embedded Sanity Studio at /studio
- All content editable via CMS

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Summary

This plan creates a complete Post Pal marketing site with Sanity CMS:

| Task | Component | Description |
|------|-----------|-------------|
| 1 | Project Setup | Next.js 14 + Tailwind + TypeScript |
| 2 | Design Tokens | Colors, fonts, spacing in Tailwind config |
| 3 | Sanity Install | Dependencies + embedded studio |
| 4 | Sanity Schemas | 7 schema types (2 singletons, 5 collections) |
| 5 | Desk Structure | Organized admin UI |
| 6 | Client & Queries | Sanity client + GROQ queries |
| 7 | TypeScript Types | Type definitions for Sanity data |
| 8 | Icons | Logo + all section icons |
| 9 | Navigation | Fixed nav with CMS data |
| 10 | Section Components | All 8 sections with Sanity props |
| 11 | Animations | IntersectionObserver hook |
| 12 | Page Assembly | Server-side fetch + client render |
| 13 | Content Seeding | Initial content script |
| 14 | Verification | Build and testing |

**Key Patterns from opalcreekv2:**
- Singleton documents for settings (siteSettings, homepageSettings)
- Order-based sorting for collections
- Field groups for organized schemas
- Smart preview with emojis
- Centralized GROQ queries
- Combined query for performance
- Server-side data fetching with ISR
- Type-safe component props

---

**Plan complete and saved to `docs/plans/2026-02-05-postpal-marketing-site.md`.**

Two execution options:

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

Which approach?
