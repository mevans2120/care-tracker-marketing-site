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
