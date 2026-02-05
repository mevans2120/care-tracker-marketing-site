import type { Testimonial as TestimonialType } from "@/types/sanity"

interface TestimonialProps {
  testimonial: TestimonialType
}

export function Testimonial({ testimonial }: TestimonialProps) {
  return (
    <section className="py-[100px] bg-gradient-to-br from-[#f5ede5] to-[#f9f2eb] max-md:py-[60px]">
      <div className="container-main">
        <div className="fade-up text-center max-w-[800px] mx-auto">
          {/* Quote Mark */}
          <div className="font-serif text-[72px] text-accent leading-none mb-2">
            &ldquo;
          </div>

          {/* Quote */}
          <blockquote className="font-serif italic text-[clamp(22px,2.8vw,30px)] font-normal leading-relaxed text-navy mb-10">
            {testimonial.quote}
          </blockquote>

          {/* Attribution */}
          <div className="flex items-center justify-center gap-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-[#d9967a] flex items-center justify-center text-white font-serif text-[20px] font-semibold">
              {testimonial.authorInitial}
            </div>

            {/* Name & Detail */}
            <div className="text-left">
              <div className="font-semibold text-[17px] text-navy">
                {testimonial.authorName}
              </div>
              <div className="text-[15px] text-navy/60">
                {testimonial.detail}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
