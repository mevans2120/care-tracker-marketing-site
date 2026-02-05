import { FeatureIcon } from "./icons"
import type { HomepageSettings, Feature } from "@/types/sanity"

interface FeaturesProps {
  settings: HomepageSettings
  features: Feature[]
}

const iconThemes: Record<string, string> = {
  primary: "bg-gradient-to-br from-primary/[0.12] to-primary/[0.06] text-primary",
  healing: "bg-gradient-to-br from-healing/[0.12] to-healing/[0.06] text-healing",
  accent: "bg-gradient-to-br from-accent/20 to-accent/[0.08] text-[#c97a4a]",
  error: "bg-gradient-to-br from-error/[0.12] to-error/[0.06] text-error",
}

export function Features({ settings, features }: FeaturesProps) {
  return (
    <section id="features" className="py-[100px] max-md:py-[60px]">
      <div className="container-main">
        {/* Header */}
        <div className="fade-up text-center mb-16">
          <p className="font-sans text-[13px] font-bold tracking-[0.12em] uppercase text-primary mb-3">
            {settings.featuresEyebrow}
          </p>
          <h2 className="text-[clamp(30px,3.5vw,44px)] font-semibold text-navy tracking-[-0.02em]">
            {settings.featuresHeadline}
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1 max-md:gap-5">
          {features.map((feature, index) => (
            <div
              key={feature._id}
              className={`fade-up fade-up-delay-${index + 1} bg-white rounded-3xl p-11 px-10 shadow-[0_2px_12px_rgba(43,58,74,0.04)] hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(43,58,74,0.1)] transition-all duration-300 max-sm:p-8 max-sm:px-6`}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${iconThemes[feature.colorTheme] || iconThemes.primary}`}>
                <FeatureIcon type={feature.iconType} className="w-7 h-7" />
              </div>

              {/* Title */}
              <h3 className="font-serif text-[22px] font-semibold text-navy mb-2.5">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-[16px] leading-relaxed text-navy/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
