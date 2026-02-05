import type { HomepageSettings, ProviderFeature } from "@/types/sanity"

interface ProvidersProps {
  settings: HomepageSettings
  providerFeatures: ProviderFeature[]
  contactEmail: string
}

export function Providers({ settings, providerFeatures, contactEmail }: ProvidersProps) {
  return (
    <section id="providers" className="py-[100px] bg-white max-md:py-[60px]">
      <div className="container-main">
        <div className="grid grid-cols-2 gap-16 items-center max-lg:gap-10 max-md:grid-cols-1 max-md:gap-10">
          {/* Content */}
          <div className="fade-up max-w-[500px]">
            <p className="font-sans text-[13px] font-bold tracking-[0.12em] uppercase text-healing mb-3">
              {settings.providersEyebrow}
            </p>
            <h2 className="text-[clamp(28px,3vw,40px)] font-semibold text-navy mb-5">
              {settings.providersHeadline}
            </h2>
            <p className="text-[18px] leading-relaxed text-navy/75 mb-8">
              {settings.providersDescription}
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-healing font-semibold text-[17px] rounded-full border-2 border-healing hover:bg-healing hover:text-white hover:-translate-y-0.5 transition-all duration-300"
            >
              {settings.providersCtaText}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3.75 9H14.25M14.25 9L9.75 4.5M14.25 9L9.75 13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Features Card */}
          <div className="fade-up fade-up-delay-1 flex justify-center">
            <div className="w-full max-w-[420px] p-12 px-10 bg-gradient-to-br from-healing/[0.06] to-healing/[0.02] border border-healing/15 rounded-3xl">
              {providerFeatures.map((feature, index) => (
                <div
                  key={feature._id}
                  className={`flex items-start gap-3.5 py-3.5 ${index < providerFeatures.length - 1 ? 'border-b border-healing/10' : ''}`}
                >
                  {/* Checkmark */}
                  <div className="w-6 h-6 rounded-lg bg-healing flex items-center justify-center shrink-0 mt-0.5">
                    <svg viewBox="0 0 14 14" className="w-3.5 h-3.5 stroke-white stroke-[3] fill-none">
                      <polyline points="2,7 5.5,10.5 12,4" />
                    </svg>
                  </div>

                  {/* Text */}
                  <span className="text-[16px] font-medium text-navy">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
