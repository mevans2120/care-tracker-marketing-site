export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16 28C16 28 4 20 4 12C4 8 7 5 10.5 5C13 5 15 6.5 16 8.5C17 6.5 19 5 21.5 5C25 5 28 8 28 12C28 20 16 28 16 28Z"
        fill="#E8A87C"
        stroke="#E8A87C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 14L14 18L22 10"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
