import { forwardRef, useImperativeHandle, useRef } from 'react'

/**
 * Subtle 3D tilt plus a pointer-tracked spotlight (`--mx`/`--my` drive the
 * `.spotlight` gradient in index.css). Kept gentle — this is an editorial page,
 * not a toy.
 */
const TiltCard = forwardRef(function TiltCard(
  { children, className = '', tilt = 5, as: Tag = 'div', ...rest },
  forwardedRef
) {
  const ref = useRef(null)
  useImperativeHandle(forwardedRef, () => ref.current, [])

  const onMove = (e) => {
    const el = ref.current
    if (!el || !window.matchMedia('(pointer: fine)').matches) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
    el.style.transform =
      `perspective(1000px) rotateX(${(0.5 - py) * tilt}deg) rotateY(${(px - 0.5) * tilt}deg) translateY(-3px)`
  }

  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)'
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`spotlight will-change-transform ${className}`}
      style={{ transition: 'transform .55s cubic-bezier(.22,1,.36,1), box-shadow .55s cubic-bezier(.22,1,.36,1), border-color .45s ease' }}
      {...rest}
    >
      {children}
    </Tag>
  )
})

export default TiltCard
