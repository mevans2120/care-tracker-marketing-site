import { PhoneMockup } from "./PhoneMockup"
import type { HomepageSettings } from "@/types/sanity"

interface HeroProps {
  settings: HomepageSettings
}

export function Hero({ settings }: HeroProps) {
  return (
    <section className="pt-[140px] pb-[100px] min-h-[90vh] flex items-center max-md:pt-[120px] max-md:pb-[60px] max-md:min-h-auto">
      <div className="container-main">
        <div className="grid grid-cols-2 gap-16 items-center max-lg:gap-10 max-md:grid-cols-1 max-md:gap-12">
          {/* Content */}
          <div className="max-w-[560px] max-md:text-center max-md:max-w-full">
            {/* Badge */}
            <div className="fade-up inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-healing/10 text-healing text-[13px] font-semibold rounded-full mb-5 max-md:mx-auto">
              <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5">
                <circle cx="7" cy="7" r="3" fill="currentColor"/>
              </svg>
              {settings.heroBadge}
            </div>

            {/* Headline */}
            <h1 className="fade-up fade-up-delay-1 text-[clamp(36px,4.5vw,56px)] font-bold text-navy mb-6 tracking-[-0.02em]">
              {settings.heroHeadline.split('.').map((part, i, arr) => (
                <span key={i}>
                  {part.trim()}
                  {i < arr.length - 1 && part.trim() && <><br /></>}
                </span>
              ))}
            </h1>

            {/* Subheadline */}
            <p className="fade-up fade-up-delay-2 text-[19px] leading-relaxed text-navy/[0.78] mb-10">
              {settings.heroSubheadline}
            </p>

            {/* Actions */}
            <div className="fade-up fade-up-delay-3 flex items-center gap-7 flex-wrap max-md:justify-center max-sm:flex-col max-sm:gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-9 py-[18px] bg-primary text-white font-semibold text-[17px] rounded-full hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(19,144,255,0.3)] transition-all duration-300 max-sm:w-full max-sm:justify-center"
              >
                {settings.heroCtaText}
              </a>
              <a
                href="#how-it-works"
                className="group inline-flex items-center gap-1.5 text-[16px] font-semibold text-primary hover:gap-3 transition-all duration-300"
              >
                {settings.heroSecondaryCtaText}
                <svg viewBox="0 0 18 18" fill="none" className="w-[18px] h-[18px] group-hover:translate-x-1 transition-transform duration-300">
                  <path d="M3.75 9H14.25M14.25 9L9.75 4.5M14.25 9L9.75 13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Phone Visual */}
          <div className="fade-up fade-up-delay-2 flex justify-center items-center max-md:order-first">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
