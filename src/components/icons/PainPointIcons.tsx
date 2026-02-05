interface IconProps {
  className?: string
}

export function PapersIcon({ className = "w-10 h-10" }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <rect x="6" y="8" width="24" height="28" rx="2" stroke="currentColor" strokeWidth="2.5" />
      <rect x="10" y="4" width="24" height="28" rx="2" fill="#FBF7F3" stroke="currentColor" strokeWidth="2.5" />
      <line x1="15" y1="12" x2="29" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="15" y1="18" x2="29" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="15" y1="24" x2="23" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function UncertainIcon({ className = "w-10 h-10" }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2.5" />
      <path d="M15 15C15 12.5 17.5 11 20 11C22.5 11 25 12.5 25 15C25 17 23 18 21 19C20 19.5 20 20.5 20 21.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="20" cy="27" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function WorriedIcon({ className = "w-10 h-10" }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="22" r="13" stroke="currentColor" strokeWidth="2.5" />
      <path d="M20 14V22L25 25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 6L20 10L26 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PainPointIcon({ type, className }: { type: string; className?: string }) {
  switch (type) {
    case 'papers':
      return <PapersIcon className={className} />
    case 'uncertain':
      return <UncertainIcon className={className} />
    case 'worried':
      return <WorriedIcon className={className} />
    default:
      return <PapersIcon className={className} />
  }
}
