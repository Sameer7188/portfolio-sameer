/**
 * SG monogram — Sameer Gediya.
 *
 * The mark is the hero masthead in miniature: a solid "S" (Sameer) beside an
 * outlined "G" (Gediya), the same solid/outline pairing the page opens with.
 *
 * Rendered as live Fraunces text rather than embedded outlines, which keeps the
 * bundle lean but means the mark inherits the webfont's load timing — the
 * fallback stack below is what shows until Fraunces arrives.
 *
 * The standalone files (public/favicon.svg, public/brand/*.svg) still carry
 * real converted outlines: they are separate assets with no bundle cost, and a
 * favicon can never rely on a webfont.
 *
 * variant: "tile" (squircle lockup) | "bare" (letters only)
 * tone:    "ink" | "paper" | "ember"
 */
const TONES = {
  ink:   { tile: '#12121A', letter: '#FBFAF7', outline: '#FBFAF7' },
  paper: { tile: '#F3EFE7', letter: '#12121A', outline: '#12121A' },
  ember: { tile: '#12121A', letter: '#FBFAF7', outline: '#FF4D26' },
}

export default function Logo({
  variant = 'tile',
  tone = 'ink',
  size = 40,
  dot = true,
  radius = 30,
  className = '',
  title = 'Sameer Gediya',
}) {
  const t = TONES[tone] || TONES.ink
  const tiled = variant === 'tile'
  const letter = tiled ? t.letter : '#12121A'
  const outline = tiled ? t.outline : tone === 'ember' ? '#FF4D26' : '#12121A'

  return (
    <span
      role="img"
      aria-label={title}
      className={`relative inline-grid place-items-center shrink-0 align-middle ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: tiled ? (radius / 100) * size : 0,
        background: tiled ? t.tile : 'transparent',
      }}
    >
      <span
        aria-hidden="true"
        className="font-display font-semibold leading-none select-none"
        style={{ fontSize: size * 0.46, letterSpacing: '-0.06em', color: letter }}
      >
        S
        <span
          style={{
            color: 'transparent',
            WebkitTextStroke: `${Math.max(0.7, size * 0.023).toFixed(2)}px ${outline}`,
          }}
        >
          G
        </span>
      </span>

      {dot && tiled && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: `${78}%`,
            top: `${6}%`,
            width: `${16}%`,
            height: `${16}%`,
            borderRadius: '50%',
            background: '#FF4D26',
          }}
        />
      )}
    </span>
  )
}
