import { useEffect } from 'react'

/**
 * Adds `is-in` to every [data-reveal] element as it enters the viewport.
 * A single observer for the whole page — cheaper than one per component.
 * Honours an optional `data-delay` (ms) for staggered entrances.
 */
export function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]')
    if (!nodes.length) return

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-in'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const delay = Number(entry.target.dataset.delay || 0)
          if (delay) entry.target.style.transitionDelay = `${delay}ms`
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [])
}

/** Fires `cb(0..1)` with how far the element has scrolled through the viewport. */
export function useScrollFill(ref, cb) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let frame = 0

    const measure = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const span = rect.height + window.innerHeight * 0.4
      const progress = (window.innerHeight * 0.75 - rect.top) / span
      cb(Math.min(1, Math.max(0, progress)))
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ref, cb])
}

/** True once the pointer is a real mouse — used to gate cursor/tilt effects. */
export function usePrecisePointer() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: fine)').matches
}
