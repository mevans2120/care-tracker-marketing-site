import { StepIcon } from "./icons"
import type { HomepageSettings, HowItWorksStep } from "@/types/sanity"

interface HowItWorksProps {
  settings: HomepageSettings
  steps: HowItWorksStep[]
}

const visualBackgrounds: Record<string, string> = {
  scan: "bg-gradient-to-br from-[#dbeeff] to-[#eaf3ff]",
  download: "bg-gradient-to-br from-[#d4f5e8] to-[#e5faf2]",
  follow: "bg-gradient-to-br from-[#fde8d8] to-[#faf0e8]",
}

export function HowItWorks({ settings, steps }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="py-[100px] bg-white max-md:py-[60px]">
      <div className="container-main">
        {/* Header */}
        <div className="fade-up text-center mb-20">
          <p className="font-sans text-[13px] font-bold tracking-[0.12em] uppercase text-primary mb-3">
            {settings.howItWorksEyebrow}
          </p>
          <h2 className="text-[clamp(30px,3.5vw,44px)] font-semibold text-navy mb-4 tracking-[-0.02em]">
            {settings.howItWorksHeadline}
          </h2>
          <p className="text-[18px] text-navy/70 max-w-[600px] mx-auto leading-relaxed">
            {settings.howItWorksSubheadline}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-3 gap-12 relative max-md:grid-cols-1 max-md:gap-12">
          {/* Connecting dots line - hidden on mobile */}
          <div className="absolute top-12 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-[3px] bg-[repeating-linear-gradient(90deg,#E8A87C_0px,#E8A87C_6px,transparent_6px,transparent_14px)] max-md:hidden" />

          {steps.map((step, index) => (
            <div
              key={step._id}
              className={`fade-up fade-up-delay-${index + 1} text-center relative z-10`}
            >
              {/* Number Circle */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-hover text-white font-serif text-4xl font-bold flex items-center justify-center mx-auto mb-7 shadow-[0_8px_30px_rgba(19,144,255,0.2)] max-sm:w-[72px] max-sm:h-[72px] max-sm:text-[28px]">
                {step.stepNumber}
              </div>

              {/* Title */}
              <h3 className="font-serif text-[22px] font-semibold text-navy mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[16px] leading-relaxed text-navy/70 max-w-[300px] mx-auto mb-6">
                {step.description}
              </p>

              {/* Visual */}
              <div className={`w-full h-[180px] rounded-2xl flex items-center justify-center p-5 ${visualBackgrounds[step.visualType] || visualBackgrounds.scan}`}>
                <div className="flex flex-col items-center gap-3">
                  <StepIcon type={step.visualType} className="w-12 h-12" />
                  <span className="text-[13px] font-medium text-navy/60">
                    {step.visualLabel}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
