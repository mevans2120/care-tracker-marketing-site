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
