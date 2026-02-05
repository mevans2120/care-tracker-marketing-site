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
