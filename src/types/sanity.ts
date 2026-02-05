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
