interface IconProps {
  className?: string
}

export function ScanIcon({ className = "w-12 h-12" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="6" y="6" width="14" height="14" rx="2" stroke="#3d8bd4" strokeWidth="2.5" />
      <rect x="10" y="10" width="6" height="6" fill="#3d8bd4" />
      <rect x="28" y="6" width="14" height="14" rx="2" stroke="#3d8bd4" strokeWidth="2.5" />
      <rect x="32" y="10" width="6" height="6" fill="#3d8bd4" />
      <rect x="6" y="28" width="14" height="14" rx="2" stroke="#3d8bd4" strokeWidth="2.5" />
      <rect x="10" y="32" width="6" height="6" fill="#3d8bd4" />
      <rect x="28" y="28" width="6" height="6" fill="#3d8bd4" />
      <rect x="36" y="28" width="6" height="6" fill="#3d8bd4" />
      <rect x="28" y="36" width="6" height="6" fill="#3d8bd4" />
      <rect x="36" y="36" width="6" height="6" fill="#3d8bd4" />
    </svg>
  )
}

export function DownloadIcon({ className = "w-12 h-12" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="12" y="4" width="24" height="40" rx="4" stroke="#2a9d6e" strokeWidth="2.5" />
      <line x1="20" y1="38" x2="28" y2="38" stroke="#2a9d6e" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 14V26M24 26L19 21M24 26L29 21" stroke="#2a9d6e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function FollowIcon({ className = "w-12 h-12" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="8" y="8" width="32" height="32" rx="4" stroke="#c97a4a" strokeWidth="2.5" />
      <path d="M15 20L19 24L27 16" stroke="#c97a4a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="15" y1="32" x2="27" y2="32" stroke="#c97a4a" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="35" cy="35" r="8" fill="#FBF7F3" stroke="#c97a4a" strokeWidth="2.5" />
      <path d="M35 31V35L37.5 37.5" stroke="#c97a4a" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function StepIcon({ type, className }: { type: string; className?: string }) {
  switch (type) {
    case 'scan':
      return <ScanIcon className={className} />
    case 'download':
      return <DownloadIcon className={className} />
    case 'follow':
      return <FollowIcon className={className} />
    default:
      return <ScanIcon className={className} />
  }
}
