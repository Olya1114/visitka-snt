import { cn } from "@/lib/utils"

export function QualitySeal({ className, animated = true }: { className?: string; animated?: boolean }) {
  return (
    <div
      role="img"
      aria-label="Знак качества: Проверено на членах СНТ"
      className={cn("text-stamp", animated ? "animate-stamp" : "-rotate-12", className)}
    >
      <svg viewBox="0 0 200 200" className="size-full" aria-hidden="true">
        <defs>
          <path id="seal-ring" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
        </defs>
        <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeWidth="5" />
        <circle cx="100" cy="100" r="86" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="52" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text fill="currentColor" fontSize="19" fontWeight="700">
          <textPath href="#seal-ring" startOffset="0" textLength="446" lengthAdjust="spacing">
            ПРОВЕРЕНО НА ЧЛЕНАХ СНТ • СНТ ПОРТАЛ •
          </textPath>
        </text>
        <path
          d="M76 101 l16 16 l33 -36"
          fill="none"
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x="100" y="140" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="700" letterSpacing="3">
          ОТК
        </text>
      </svg>
    </div>
  )
}
