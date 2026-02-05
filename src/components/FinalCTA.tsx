import type { HomepageSettings } from "@/types/sanity"

interface FinalCTAProps {
  settings: HomepageSettings
  contactEmail: string
  privacyText: string
}

export function FinalCTA({ settings, contactEmail, privacyText }: FinalCTAProps) {
  return (
    <section id="contact" className="py-[120px] text-center bg-gradient-to-b from-cream to-[#f0e9e0] max-md:py-20">
      <div className="container-narrow">
        {/* Headline */}
        <h2 className="fade-up text-[clamp(32px,4vw,52px)] font-bold text-navy mb-4 tracking-[-0.02em]">
          {settings.finalCtaHeadline}
        </h2>

        {/* Subheadline */}
        <p className="fade-up fade-up-delay-1 text-[19px] text-navy/70 mb-10">
          {settings.finalCtaSubheadline}
        </p>

        {/* Button */}
        <div className="fade-up fade-up-delay-2 mb-5">
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex items-center gap-2 px-11 py-5 bg-primary text-white font-semibold text-[19px] rounded-full hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(19,144,255,0.3)] transition-all duration-300"
          >
            {settings.finalCtaButtonText}
          </a>
        </div>

        {/* Trust Text */}
        <div className="fade-up fade-up-delay-3 flex items-center justify-center gap-2 text-[14px] text-navy/50">
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 opacity-60">
            <path d="M8 1.5L2 4V7.5C2 11.09 4.56 14.41 8 15.5C11.44 14.41 14 11.09 14 7.5V4L8 1.5Z" stroke="#2B3A4A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5.5 8L7 9.5L10.5 6" stroke="#2B3A4A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {privacyText}
        </div>
      </div>
    </section>
  )
}
