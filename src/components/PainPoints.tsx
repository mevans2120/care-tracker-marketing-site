import { PainPointIcon } from "./icons"
import type { HomepageSettings, PainPoint } from "@/types/sanity"

interface PainPointsProps {
  settings: HomepageSettings
  painPoints: PainPoint[]
}

const iconBackgrounds: Record<string, string> = {
  papers: "bg-gradient-to-br from-[#fde8d8] to-[#f5d0b3] text-[#c97a4a]",
  uncertain: "bg-gradient-to-br from-[#dbeeff] to-[#b9d9f7] text-[#3d8bd4]",
  worried: "bg-gradient-to-br from-[#d4f5e8] to-[#b1e8d1] text-[#2a9d6e]",
}

export function PainPoints({ settings, painPoints }: PainPointsProps) {
  return (
    <section className="py-[100px] max-md:py-[60px]">
      <div className="container-main">
        {/* Question */}
        <h2 className="fade-up text-center font-serif italic text-[clamp(28px,3.5vw,42px)] font-medium text-navy mb-[60px]">
          {settings.painPointsHeadline}
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-3 gap-10 max-md:grid-cols-1 max-md:gap-6">
          {painPoints.map((point, index) => (
            <div
              key={point._id}
              className={`fade-up fade-up-delay-${index + 1} text-center p-12 px-8 bg-white rounded-3xl shadow-[0_2px_12px_rgba(43,58,74,0.04)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(43,58,74,0.08)] transition-all duration-300 max-sm:p-9 max-sm:px-6`}
            >
              {/* Icon */}
              <div className={`w-20 h-20 mx-auto mb-6 rounded-[20px] flex items-center justify-center ${iconBackgrounds[point.iconType] || iconBackgrounds.papers}`}>
                <PainPointIcon type={point.iconType} className="w-10 h-10" />
              </div>

              {/* Text */}
              <p className="text-[18px] font-medium leading-relaxed text-navy">
                {point.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
