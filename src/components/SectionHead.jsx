import { useRef } from 'react'
import { useInView, useScramble } from '../hooks/useMotion'

/** Shared newspaper-style section masthead: index, rule, title, standfirst. */
export default function SectionHead({ num, label, title, lead, className = '' }) {
  const ref = useRef(null)
  const seen = useInView(ref, { threshold: 0.4 })
  const scrambled = useScramble(label, seen)

  return (
    <header ref={ref} className={`relative ${className}`}>
      <div className="flex items-center gap-4">
        <span className="eyebrow">
          <span className="eyebrow-num">{num}</span>
          <span
            className={`h-px bg-line transition-all duration-700 ease-swift ${seen ? 'w-5' : 'w-0'}`}
          />
          <span className="tabular-nums">{scrambled}</span>
        </span>
        <span
          className={`flex-1 h-px bg-line origin-left transition-transform duration-[1100ms] ease-swift ${
            seen ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
      </div>

      <h2 data-reveal className="reveal reveal-mask display-lg font-display mt-6 max-w-3xl">
        <span className="mask-inner">{title}</span>
      </h2>

      {lead && (
        <p data-reveal data-delay="120" className="reveal mt-5 max-w-2xl text-[15.5px] leading-[1.75] text-ink2">
          {lead}
        </p>
      )}
    </header>
  )
}
