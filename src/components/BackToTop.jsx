import { useEffect, useState } from 'react'

/** Appears past the first screen; the ring traces overall scroll progress. */
export default function BackToTop() {
  const [progress, setProgress] = useState(0)
  const [show, setShow] = useState(false)

  useEffect(() => {
    let frame = 0
    const measure = () => {
      frame = 0
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? window.scrollY / total : 0)
      setShow(window.scrollY > window.innerHeight * 0.85)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure) }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const R = 21
  const C = 2 * Math.PI * R

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`group fixed bottom-6 right-6 z-[60] w-12 h-12 rounded-full bg-card border border-line grid place-items-center transition-all duration-600 ease-swift hover:border-ember/50 ${
        show ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      style={{ boxShadow: 'var(--lift-2)' }}
    >
      <svg className="absolute inset-0 w-12 h-12 -rotate-90" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r={R} fill="none" stroke="var(--line)" strokeWidth="1.5" />
        <circle
          cx="24" cy="24" r={R} fill="none"
          stroke="var(--ember)" strokeWidth="1.5" strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - progress)}
          style={{ transition: 'stroke-dashoffset .15s linear' }}
        />
      </svg>
      <svg className="relative w-4 h-4 text-ink transition-transform duration-400 ease-swift group-hover:-translate-y-0.5"
           fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-6 6m6-6l6 6" />
      </svg>
    </button>
  )
}
