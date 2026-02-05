import { client } from "../../sanity/lib/client"
import { HOMEPAGE_DATA_QUERY } from "../../sanity/lib/queries"
import { HomePage } from "@/components/HomePage"
import { draftMode } from "next/headers"
import type { HomepageData, SiteSettings, HomepageSettings } from "@/types/sanity"

// Revalidate every 5 minutes
export const revalidate = 300

// Default values for when Sanity content is not yet seeded
const defaultSiteSettings: SiteSettings = {
  siteName: "Post Pal",
  tagline: "Your AI-powered companion for a smoother, less stressful medical recovery.",
  contactEmail: "hello@postpal.health",
  privacyText: "Your health data is encrypted and private.",
}

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
}

async function getHomepageData(): Promise<HomepageData> {
  const isDraftMode = (await draftMode()).isEnabled

  const data = await client.fetch(
    HOMEPAGE_DATA_QUERY,
    {},
    {
      perspective: isDraftMode ? "drafts" : "published",
      stega: isDraftMode,
    }
  )

  // Merge with defaults to handle missing Sanity content
  return {
    siteSettings: data?.siteSettings ?? defaultSiteSettings,
    homepage: data?.homepage ?? defaultHomepageSettings,
    painPoints: data?.painPoints ?? [],
    howItWorksSteps: data?.howItWorksSteps ?? [],
    features: data?.features ?? [],
    testimonial: data?.testimonial ?? null,
    providerFeatures: data?.providerFeatures ?? [],
  }
}

export default async function Home() {
  const data = await getHomepageData()

  return <HomePage data={data} />
}
