/**
 * Company identity tile. Renders a real logo when one is supplied, and falls
 * back to an accent-tinted monogram otherwise — which is the intended default:
 * these are small firms, so their initials read cleaner than a foreign logo
 * dropped into this palette.
 *
 * To use a real logo, drop an SVG in /public/logos and set `logo` on the entry
 * in data/content.js. Nothing else changes.
 */
import { useState } from 'react'

const TINT = {
  ember: { bg: 'rgba(255,77,38,0.09)', bd: 'rgba(255,77,38,0.26)', fg: '#d93a17' },
  indigo: { bg: 'rgba(59,43,255,0.08)', bd: 'rgba(59,43,255,0.24)', fg: '#3b2bff' },
  teal: { bg: 'rgba(0,144,139,0.09)', bd: 'rgba(0,144,139,0.26)', fg: '#00706c' },
  amber: { bg: 'rgba(227,148,0,0.11)', bd: 'rgba(227,148,0,0.28)', fg: '#b87700' },
}

export default function CompanyMark({ monogram, logo, company, accent = 'ember', className = '' }) {
  const t = TINT[accent] || TINT.ember
  // If the logo file isn't there (or fails to decode) we quietly show the
  // monogram instead of a broken-image icon.
  const [broken, setBroken] = useState(false)
  const showLogo = logo && !broken

  return (
    <span
      aria-hidden="true"
      className={`shrink-0 grid place-items-center w-12 h-12 rounded-2xl border overflow-hidden transition-transform duration-500 ease-swift group-hover:-rotate-6 group-hover:scale-105 ${className}`}
      style={
        showLogo
          ? { background: '#fff', borderColor: 'var(--line)' }
          : { background: t.bg, borderColor: t.bd }
      }
    >
      {showLogo ? (
        <img
          src={logo}
          alt=""
          className="w-[26px] h-[26px] object-contain"
          loading="lazy"
          decoding="async"
          onError={() => setBroken(true)}
        />
      ) : (
        <span
          className="font-display font-semibold text-[15px] leading-none tracking-tight"
          style={{ color: t.fg }}
        >
          {monogram || company?.slice(0, 2).toUpperCase()}
        </span>
      )}
    </span>
  )
}
