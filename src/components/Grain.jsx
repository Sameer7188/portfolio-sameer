/**
 * Fixed film-grain + vignette wash. This is what stops a white page from
 * reading as "blank browser" — it gives the whole thing a printed-paper surface.
 */
export default function Grain() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] opacity-[0.16] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[89]"
        style={{
          background:
            'radial-gradient(ellipse 120% 90% at 50% 0%, transparent 55%, rgba(120,100,70,0.05) 100%)',
        }}
      />
    </>
  )
}
