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
