import { useEffect, useRef } from 'react'

/**
 * Two-part cursor: a hard ink dot that tracks 1:1, and a ring that lags behind
 * with spring-ish easing. The ring swells and inverts over anything interactive.
 * Mouse-only — never mounted logic runs on touch devices.
 */
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let visible = false
    let frame

    const INTERACTIVE = 'a, button, [role="button"], input, textarea, [data-cursor]'

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!visible) {
        visible = true
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }
      const target = e.target.closest?.(INTERACTIVE)
      const label = target?.closest('[data-cursor]')?.dataset?.cursor || ''
      ring.dataset.active = target ? 'true' : 'false'
      ring.dataset.labelled = label ? 'true' : 'false'
      if (labelRef.current) labelRef.current.textContent = label
    }

    const onLeave = () => {
      visible = false
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    const tick = () => {
      ringX += (mouseX - ringX) * 0.16
      ringY += (mouseY - ringY) * 0.16
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    frame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden lg:block" aria-hidden="true">
      <span
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-ink opacity-0 transition-opacity duration-300"
      />
      <span
        ref={ringRef}
        className="cursor-ring fixed top-0 left-0 w-9 h-9 rounded-full border border-ink/35 opacity-0 grid place-items-center"
      >
        <span
          ref={labelRef}
          className="cursor-label font-mono text-[9px] uppercase tracking-[0.14em] text-ember opacity-0"
        />
      </span>
      <style>{`
        .cursor-ring {
          transition: opacity .3s ease, width .4s cubic-bezier(.22,1,.36,1),
                      height .4s cubic-bezier(.22,1,.36,1), background-color .4s ease,
                      border-color .4s ease;
        }
        .cursor-ring[data-active="true"] {
          width: 3.6rem; height: 3.6rem;
          background-color: rgba(255,77,38,.12);
          border-color: rgba(255,77,38,.5);
        }
        .cursor-ring[data-labelled="true"] {
          width: 4.6rem; height: 4.6rem;
          background-color: rgba(255,255,255,.72);
          backdrop-filter: blur(6px);
          border-color: rgba(255,77,38,.45);
        }
        .cursor-label { transition: opacity .3s ease .05s }
        .cursor-ring[data-labelled="true"] .cursor-label { opacity: 1 }
      `}</style>
    </div>
  )
}
