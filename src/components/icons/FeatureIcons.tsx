interface IconProps {
  className?: string
}

export function TimelineIcon({ className = "w-7 h-7" }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className}>
      <rect x="3" y="5" width="22" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
      <line x1="3" y1="11" x2="25" y2="11" stroke="currentColor" strokeWidth="2" />
      <line x1="9" y1="5" x2="9" y2="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="19" y1="5" x2="19" y2="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="7" y="15" width="4" height="3" rx="0.5" fill="currentColor" />
      <rect x="12" y="15" width="4" height="3" rx="0.5" fill="currentColor" />
      <rect x="17" y="15" width="4" height="3" rx="0.5" fill="currentColor" />
    </svg>
  )
}

export function MilestonesIcon({ className = "w-7 h-7" }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className}>
      <path d="M14 3L17.09 9.26L24 10.27L19 15.14L20.18 22.02L14 18.77L7.82 22.02L9 15.14L4 10.27L10.91 9.26L14 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

export function RemindersIcon({ className = "w-7 h-7" }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className}>
      <path d="M11 21C11 22.66 12.34 24 14 24C15.66 24 17 22.66 17 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 4C14 4 14 3 14 3C12.34 3 11 4.34 11 6V7C7.5 8 5 11 5 14.5V17L3 20H25L23 17V14.5C23 11 20.5 8 17 7V6C17 4.34 15.66 3 14 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function EmergencyIcon({ className = "w-7 h-7" }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className}>
      <path d="M14 24C14 24 4 18 4 11C4 7.5 6.5 5 9.5 5C11.5 5 13 6 14 7.5C15 6 16.5 5 18.5 5C21.5 5 24 7.5 24 11C24 18 14 24 14 24Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="14" y1="10" x2="14" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="14" cy="18" r="1" fill="currentColor" />
    </svg>
  )
}

export function FeatureIcon({ type, className }: { type: string; className?: string }) {
  switch (type) {
    case 'timeline':
      return <TimelineIcon className={className} />
    case 'milestones':
      return <MilestonesIcon className={className} />
    case 'reminders':
      return <RemindersIcon className={className} />
    case 'emergency':
      return <EmergencyIcon className={className} />
    default:
      return <TimelineIcon className={className} />
  }
}
