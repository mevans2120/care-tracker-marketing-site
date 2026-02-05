# Sanity Presentation Mode Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add Sanity Presentation Mode for live visual editing with click-to-edit overlays

**Architecture:** Enable draft mode API route, add VisualEditing component, configure presentation tool in Sanity Studio

**Tech Stack:** next-sanity, @sanity/client, Sanity Presentation Tool

---

## Prerequisites

Current setup already includes:
- ✅ Next.js 16 with App Router
- ✅ Embedded Sanity Studio at `/studio`
- ✅ `next-sanity` package installed
- ✅ Sanity client configured

Need to add:
- API token with Viewer permissions
- Draft mode API route
- VisualEditing component
- Presentation tool configuration

---

## Task 1: Create Sanity Viewer Token

**Files:**
- Modify: `.env.local`
- Modify: `.env.example`

**Step 1: Generate token in Sanity**

Go to [sanity.io/manage](https://sanity.io/manage) → Project `vtck6b2g` → API → Tokens → Add API token

- Name: `Viewer Token (Presentation Mode)`
- Permissions: `Viewer`
- Copy the generated token

**Step 2: Add to environment files**

Add to `.env.local`:
```
SANITY_VIEWER_TOKEN=<paste-token-here>
```

Add placeholder to `.env.example`:
```
SANITY_VIEWER_TOKEN=
```

**Step 3: Verify token is set**

Run: `grep SANITY_VIEWER_TOKEN .env.local`
Expected: Line with the token value

---

## Task 2: Create Draft Mode Enable Route

**Files:**
- Create: `src/app/api/draft-mode/enable/route.ts`

**Step 1: Create the API route**

```typescript
import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "../../../../../sanity/lib/client";

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    token: process.env.SANITY_VIEWER_TOKEN,
  }),
});
```

**Step 2: Verify file exists**

Run: `ls -la src/app/api/draft-mode/enable/route.ts`
Expected: File exists

---

## Task 3: Create Draft Mode Disable Route

**Files:**
- Create: `src/app/api/draft-mode/disable/route.ts`

**Step 1: Create the disable route**

```typescript
import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  (await draftMode()).disable();
  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_SITE_URL));
}
```

**Step 2: Verify file exists**

Run: `ls -la src/app/api/draft-mode/disable/route.ts`
Expected: File exists

---

## Task 4: Update Root Layout with VisualEditing

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Read current layout**

Read the current layout file to understand its structure.

**Step 2: Add VisualEditing component**

Update the layout to conditionally include VisualEditing:

```typescript
import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Post Pal - Your AI Recovery Companion",
  description:
    "Post Pal transforms your hospital discharge instructions into a simple, day-by-day recovery timeline. Powered by AI. Guided by your doctor's instructions.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
```

**Step 3: Verify build passes**

Run: `npm run build`
Expected: Build succeeds with no errors

---

## Task 5: Update Sanity Client for Stega

**Files:**
- Modify: `sanity/lib/client.ts`

**Step 1: Read current client**

Read the current client configuration.

**Step 2: Add stega configuration**

Update to enable stega encoding for visual editing overlays:

```typescript
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: process.env.NODE_ENV === "production",
  stega: {
    studioUrl: "/studio",
  },
});
```

**Step 3: Verify no TypeScript errors**

Run: `npx tsc --noEmit`
Expected: No errors

---

## Task 6: Add Presentation Tool to Studio

**Files:**
- Modify: `sanity.config.ts`

**Step 1: Read current config**

Read the current Sanity config.

**Step 2: Add presentation tool**

Update to include the presentation tool:

```typescript
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from "./sanity/schemaTypes";
import { deskStructure } from "./sanity/deskStructure";

export default defineConfig({
  name: "default",
  title: "Post Pal",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    presentationTool({
      previewUrl: {
        origin: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable",
        },
      },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
```

**Step 3: Verify studio loads**

Run: `npm run dev`
Navigate to: http://localhost:3000/studio
Expected: Studio loads with new "Presentation" tab

---

## Task 7: Update Data Fetching for Draft Mode

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Read current page**

Read the current homepage data fetching.

**Step 2: Update to use draft-aware fetching**

Update the data fetching to respect draft mode:

```typescript
import { client } from "../../sanity/lib/client";
import { HOMEPAGE_DATA_QUERY } from "../../sanity/lib/queries";
import { HomePage } from "@/components/HomePage";
import { draftMode } from "next/headers";
import type { HomepageData, SiteSettings, HomepageSettings } from "@/types/sanity";

// Revalidate every 5 minutes (only in non-draft mode)
export const revalidate = 300;

// Default values for when Sanity content is not yet seeded
const defaultSiteSettings: SiteSettings = {
  siteName: "Post Pal",
  tagline: "Your AI-powered companion for a smoother, less stressful medical recovery.",
  contactEmail: "hello@postpal.health",
  privacyText: "Your health data is encrypted and private.",
};

const defaultHomepageSettings: HomepageSettings = {
  heroBadge: "Currently in Beta",
  heroHeadline: "Recovery is hard enough. Your care plan shouldn't be.",
  heroSubheadline: "Post Pal transforms your hospital discharge instructions into a simple, day-by-day recovery timeline. Powered by AI. Guided by your doctor's instructions.",
  heroCtaText: "Learn More",
  heroSecondaryCtaText: "See How It Works",
  painPointsHeadline: "Sound familiar?",
  howItWorksEyebrow: "How It Works",
  howItWorksHeadline: "Your provider sets you up for success",
  howItWorksSubheadline: "No complicated setup. Your healthcare team gets you started, and Post Pal guides you through recovery.",
  featuresEyebrow: "Features",
  featuresHeadline: "Everything you need for a smoother recovery",
  providersEyebrow: "For Providers",
  providersHeadline: "Designed for patients. Built for providers.",
  providersDescription: "Give your patients the best post-discharge experience. QR-code onboarding, institutional dashboards, and real-time recovery monitoring.",
  providersCtaText: "Learn More for Providers",
  finalCtaHeadline: "Interested in Post Pal?",
  finalCtaSubheadline: "We're currently in beta and working with select healthcare providers. Get in touch to learn more.",
  finalCtaButtonText: "Get in Touch",
};

async function getHomepageData(): Promise<HomepageData> {
  const isDraftMode = (await draftMode()).isEnabled;

  const data = await client.fetch(
    HOMEPAGE_DATA_QUERY,
    {},
    {
      perspective: isDraftMode ? "drafts" : "published",
      stega: isDraftMode,
    }
  );

  // Merge with defaults to handle missing Sanity content
  return {
    siteSettings: data?.siteSettings ?? defaultSiteSettings,
    homepage: data?.homepage ?? defaultHomepageSettings,
    painPoints: data?.painPoints ?? [],
    howItWorksSteps: data?.howItWorksSteps ?? [],
    features: data?.features ?? [],
    testimonial: data?.testimonial ?? null,
    providerFeatures: data?.providerFeatures ?? [],
  };
}

export default async function Home() {
  const data = await getHomepageData();

  return <HomePage data={data} />;
}
```

**Step 3: Verify page loads**

Run: `npm run dev`
Navigate to: http://localhost:3000
Expected: Page loads normally

---

## Task 8: Test Presentation Mode

**Step 1: Start dev server**

Run: `npm run dev`

**Step 2: Open studio**

Navigate to: http://localhost:3000/studio

**Step 3: Click Presentation tab**

Click on "Presentation" in the studio navigation.
Expected: The site loads in an iframe with the editor panel on the left.

**Step 4: Test click-to-edit**

Click on editable text in the preview.
Expected: The corresponding field highlights in the editor.

**Step 5: Test live updates**

Edit a field in the editor.
Expected: The preview updates in real-time.

---

## Task 9: Commit and Push

**Step 1: Check git status**

Run: `git status`
Expected: Shows modified files

**Step 2: Add and commit**

```bash
git add .
git commit -m "feat: add Sanity Presentation Mode for live visual editing

- Add draft mode enable/disable API routes
- Configure VisualEditing component in layout
- Add presentationTool to Sanity Studio
- Update data fetching for draft-aware content
- Enable stega encoding for click-to-edit overlays"
```

**Step 3: Push to remote**

Run: `git push origin main`
Expected: Changes pushed successfully

---

## Task 10: Update Vercel Environment Variables

**Step 1: Add SANITY_VIEWER_TOKEN to Vercel**

Go to Vercel → Project → Settings → Environment Variables
Add: `SANITY_VIEWER_TOKEN` with the viewer token value

**Step 2: Redeploy**

Trigger a new deployment or wait for automatic deploy after push.

**Step 3: Verify production**

Navigate to production studio and test Presentation mode.
Expected: Visual editing works in production.

---

## Summary

After completing these tasks:
- Editors can click on any text in the preview to jump to its field
- Changes appear instantly without page reload
- Draft content is visible in Presentation mode
- Published content is served to regular visitors

**Sources:**
- [Visual Editing with Next.js App Router | Sanity Docs](https://www.sanity.io/docs/visual-editing/visual-editing-with-next-js-app-router)
- [The Presentation tool | Sanity Docs](https://www.sanity.io/docs/visual-editing/configuring-the-presentation-tool)
- [GitHub - sanity-io/next-sanity](https://github.com/sanity-io/next-sanity)
