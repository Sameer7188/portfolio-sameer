import { useRef } from 'react'

/**
 * Pulls its child toward the cursor while hovered, then springs back.
 * `strength` is how far (px) it can travel at the edge of its own box.
 */
export default function Magnetic({ children, strength = 14, className = '' }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el || !window.matchMedia('(pointer: fine)').matches) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate(0, 0)'
  }

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block will-change-transform transition-transform duration-500 ease-swift ${className}`}
    >
      {children}
    </span>
  )
}
