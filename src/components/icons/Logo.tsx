export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Gradient background matching Post Pal app */}
      <defs>
        <linearGradient id="heart-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1DB584" />
          <stop offset="100%" stopColor="#1390FF" />
        </linearGradient>
      </defs>
      {/* Rounded square background */}
      <rect width="256" height="256" rx="48" fill="url(#heart-gradient)" />
      {/* Phosphor Heart filled icon path - centered and scaled */}
      <path
        d="M128 216C128 216 40 160 40 104C40 78.52 60.52 58 86 58C103.2 58 118.28 67.32 128 80.84C137.72 67.32 152.8 58 170 58C195.48 58 216 78.52 216 104C216 160 128 216 128 216Z"
        fill="white"
      />
    </svg>
  )
}
