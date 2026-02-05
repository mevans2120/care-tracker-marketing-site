export function PhoneMockup() {
  return (
    <div className="w-[320px] h-[620px] bg-white rounded-[40px] shadow-[0_24px_80px_rgba(43,58,74,0.12),0_2px_8px_rgba(43,58,74,0.06)] p-4 relative overflow-hidden max-md:w-[260px] max-md:h-[500px] max-md:rounded-[32px] max-md:p-3">
      {/* Notch */}
      <div className="w-[120px] h-7 bg-cream rounded-b-[20px] mx-auto mb-4" />

      {/* Screen */}
      <div className="bg-cream rounded-[28px] h-[calc(100%-44px)] p-5 px-4 overflow-hidden max-md:rounded-[24px] max-md:p-4 max-md:px-3">
        {/* Header */}
        <div className="font-serif text-[16px] font-semibold text-navy mb-1">
          My Recovery
        </div>
        <div className="text-[12px] text-navy/50 mb-4">
          Knee Replacement - Day 3
        </div>

        {/* Day Label */}
        <div className="font-serif text-[13px] font-semibold text-primary mb-2.5 pb-1.5 border-b-2 border-primary/15">
          Today - Feb 5
        </div>

        {/* Tasks */}
        <div className="flex items-start gap-2.5 p-2.5 px-3 bg-white rounded-xl mb-2 shadow-[0_1px_4px_rgba(43,58,74,0.06)]">
          <div className="w-5 h-5 rounded-[6px] bg-healing border-2 border-healing shrink-0 mt-0.5 relative">
            <span className="absolute top-[3px] left-1.5 w-[5px] h-[9px] border-white border-r-2 border-b-2 rotate-45" />
          </div>
          <div>
            <div className="text-[13px] leading-snug text-navy line-through opacity-50">
              Take pain medication
            </div>
            <div className="text-[11px] text-navy/45 mt-0.5">8:00 AM</div>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-2.5 px-3 bg-white rounded-xl mb-2 shadow-[0_1px_4px_rgba(43,58,74,0.06)]">
          <div className="w-5 h-5 rounded-[6px] bg-healing border-2 border-healing shrink-0 mt-0.5 relative">
            <span className="absolute top-[3px] left-1.5 w-[5px] h-[9px] border-white border-r-2 border-b-2 rotate-45" />
          </div>
          <div>
            <div className="text-[13px] leading-snug text-navy line-through opacity-50">
              Ice knee for 20 minutes
            </div>
            <div className="text-[11px] text-navy/45 mt-0.5">9:00 AM</div>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-2.5 px-3 bg-white rounded-xl mb-2 shadow-[0_1px_4px_rgba(43,58,74,0.06)]">
          <div className="w-5 h-5 rounded-[6px] border-2 border-[#d6dbe1] shrink-0 mt-0.5" />
          <div>
            <div className="text-[13px] leading-snug text-navy">
              Gentle range-of-motion exercises
            </div>
            <div className="text-[11px] text-navy/45 mt-0.5">11:00 AM</div>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-2.5 px-3 bg-white rounded-xl mb-2 shadow-[0_1px_4px_rgba(43,58,74,0.06)]">
          <div className="w-5 h-5 rounded-[6px] border-2 border-[#d6dbe1] shrink-0 mt-0.5" />
          <div>
            <div className="text-[13px] leading-snug text-navy">
              Change wound dressing
            </div>
            <div className="text-[11px] text-navy/45 mt-0.5">2:00 PM</div>
          </div>
        </div>

        {/* Milestone */}
        <div className="flex items-center gap-2.5 p-3 bg-gradient-to-br from-healing/8 to-healing/4 rounded-xl mt-3 border border-healing/15">
          <svg className="w-6 h-6 shrink-0 text-healing" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
          </svg>
          <span className="text-[12px] font-semibold text-healing">
            Day 3 complete! Walking with assistance unlocked.
          </span>
        </div>
      </div>
    </div>
  )
}
