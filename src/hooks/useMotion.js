import { useEffect, useRef, useState } from 'react'

/** Every animation in the site funnels through this check. */
export const motionOK = () =>
  typeof window !== 'undefined' &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Latches true the first time the element enters view, then stops observing. */
export function useInView(ref, { rootMargin = '0px 0px -12% 0px', threshold = 0.2 } = {}) {
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    if (!('IntersectionObserver' in window)) { setSeen(true); return }

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setSeen(true); obs.disconnect() } },
      { rootMargin, threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, seen, rootMargin, threshold])

  return seen
}

/** Eases a number up from zero once `active` flips. Runs exactly once. */
export function useCountUp(value, active, duration = 1600) {
  const [n, setN] = useState(0)
  const ran = useRef(false)

  useEffect(() => {
    if (!active || ran.current) return
    ran.current = true

    if (!motionOK()) { setN(value); return }

    let raf
    let startedAt = 0
    const step = (t) => {
      if (!startedAt) startedAt = t
      const p = Math.min(1, (t - startedAt) / duration)
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)   // easeOutExpo
      setN(Math.round(value * eased))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [active, value, duration])

  return n
}

/**
 * Settles text into place by cycling random glyphs first. Used on the mono
 * eyebrow labels so each section header "tunes in" rather than just appearing.
 */
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>*#'

export function useScramble(text, active, { speed = 34, hold = 3 } = {}) {
  const [out, setOut] = useState(text)
  const ran = useRef(false)

  useEffect(() => {
    if (!active || ran.current) return
    ran.current = true
    if (!motionOK()) { setOut(text); return }

    let frame = 0
    const id = setInterval(() => {
      frame += 1
      const settled = Math.floor(frame / hold)
      setOut(
        text
          .split('')
          .map((ch, i) => {
            if (i < settled || ch === ' ') return ch
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join('')
      )
      if (settled >= text.length) clearInterval(id)
    }, speed)

    return () => clearInterval(id)
  }, [active, text, speed, hold])

  return out
}
