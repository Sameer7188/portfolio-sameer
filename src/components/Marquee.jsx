import { useEffect, useRef } from 'react'
import { motionOK } from '../hooks/useMotion'

/**
 * One repeat of the word list. Defined at module scope on purpose: declaring it
 * inside Marquee would make it a fresh component type on every render, so React
 * would tear down and rebuild the strips whenever an ancestor re-rendered.
 */
function Strip({ items, separator }) {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center gap-8 whitespace-nowrap">
          <span className="font-display text-[15px] md:text-base tracking-tight">{item}</span>
          <span className="text-ember/70 text-xs">{separator}</span>
        </span>
      ))}
    </div>
  )
}

/**
 * Ticker tape running at a constant rate, fully independent of page scroll —
 * it neither speeds up, skews, nor stalls when the visitor scrolls.
 *
 * One rAF loop writing a single transform: no layout thrash, no React re-render
 * per frame. Three copies are rendered so that with the offset wrapped into
 * (-w, 0] there are always at least 2w of content across the viewport.
 */
export default function Marquee({
  items,
  speed = 46,            // px per second at rest
  direction = -1,        // -1 drifts left, 1 drifts right
  separator = '✦',
  className = '',
}) {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track || !motionOK()) return

    const rate = Number.isFinite(Number(speed)) ? Number(speed) : 46
    const dir = direction < 0 ? -1 : 1

    let offset = 0
    let lastTime = 0
    let raf

    const tick = (t) => {
      // Clamped so a backgrounded tab resuming can't jump the tape forward.
      const dt = lastTime ? Math.min(64, t - lastTime) : 16
      lastTime = t

      offset += dir * (rate * dt) / 1000
      if (!Number.isFinite(offset)) offset = 0

      // Measured off the live DOM every frame rather than a captured ref, so a
      // remount or a late webfont changing the width can't strand the wrap.
      // Reading offsetWidth is cheap here: we only ever write `transform`,
      // which is compositor-only and doesn't dirty layout.
      const width = track.firstElementChild?.offsetWidth || 0
      if (width > 0) {
        offset %= width                                 // into (-w, w)
        if (offset > 0) offset -= width                 // into (-w, 0]
      }

      track.style.transform = `translate3d(${offset}px,0,0)`
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [speed, direction])

  return (
    <div className={`flex overflow-hidden mask-edges ${className}`} aria-hidden="true">
      <div ref={trackRef} className="flex will-change-transform">
        <Strip items={items} separator={separator} />
        <Strip items={items} separator={separator} />
        <Strip items={items} separator={separator} />
      </div>
    </div>
  )
}
