import { useCallback, useEffect, useRef, useState } from 'react'
import { motionOK } from '../hooks/useMotion'
import Logo from './Logo'

/**
 * Boot sequence — the developer's desk.
 *
 * A server rack wakes, runs a ribbon of PCB traces across to a MacBook, and the
 * laptop's terminal types out the handshake line by line until the profile is
 * on screen. The camera then pushes into the display until the screen fills the
 * viewport and dissolves into the site — a match cut, so the page reads as what
 * was on the laptop all along.
 *
 * Plays in full on every load, with no skip. Two things still bypass it, both
 * deliberately: `prefers-reduced-motion` (an OS accessibility setting, not a
 * preference to override) and a hard failsafe timer, so a stalled animation can
 * never trap someone on the splash.
 *
 * Everything animates in CSS with per-index delays; React re-renders only on the
 * handful of coarse phase changes, never per frame.
 */

/* ── Script ─────────────────────────────────────────────────── */
const LINES = [
  { type: 'cmd', text: '$ ssh sameer@portfolio.dev' },
  { type: 'sys', text: 'authenticating ............ ok' },
  { type: 'sys', text: 'fetching profile .......... ok' },
  { type: 'kv', k: 'HOST',   v: 'Sameer Gediya' },
  { type: 'kv', k: 'ROLE',   v: 'AI Intern · Nanta Tech' },
  { type: 'kv', k: 'STACK',  v: 'Python · PyTorch · React' },
  { type: 'kv', k: 'ORIGIN', v: 'Ahmedabad, India' },
  { type: 'ok',  text: 'connection established — welcome' },
]

/* ── Timeline (ms) ──────────────────────────────────────────── */
const LID_AT = 200
const SCREEN_AT = 620
const LINE_AT = [1000, 1500, 2000, 2900, 3420, 3940, 4460, 5060]
const TYPE_DUR = 620
const TRACE_DUR = 640
const KV_FIRST = 3
const TRACE_AT = LINES
  .map((l, i) => (l.type === 'kv' ? LINE_AT[i] - TRACE_DUR : null))
  .filter((v) => v !== null)
const ZOOM_AT = 6200
const ZOOM_DUR = 1350
const FADE_DUR = 620
const FAILSAFE = ZOOM_AT + ZOOM_DUR + FADE_DUR + 2700

/** Rough rendered width of a line, used to drive the caret's travel. */
function lineWidth(l, T, narrow) {
  if (l.type === 'kv') {
    return (narrow ? 66 : 92) + l.v.length * 0.52 * T.val
  }
  const prefix = l.type === 'ok' ? 2 : l.type === 'sys' ? 2 : 0
  return (l.text.length + prefix) * 0.6 * T.mono
}

/* ── Geometry ───────────────────────────────────────────────── */
const WIDE = {
  vb: '0 0 920 540',
  server: { x: 44, y: 196, w: 104, h: 170 },
  lid: { x: 330, y: 92, w: 520, h: 322 },
  screen: { x: 344, y: 106, w: 492, h: 294 },
  deck: 'M 302 414 H 878 L 902 440 H 278 Z',
  term: { x: 374, y: 148, lh: 30, key: 12.5, val: 16.5, mono: 14 },
  wires: TRACE_AT.map((_, i) => {
    const port = 226 + i * 28
    const lane = 172 + i * 22
    const entry = 416 + i * 5
    return { d: `M 148 ${port} H ${lane} V ${entry} H 302`, port }
  }),
}

const NARROW = {
  vb: '0 0 420 620',
  server: { x: 172, y: 26, w: 76, h: 104 },
  lid: { x: 18, y: 206, w: 384, h: 322 },
  screen: { x: 30, y: 218, w: 360, h: 294 },
  deck: 'M 6 528 H 414 L 420 548 H 0 Z',
  term: { x: 52, y: 252, lh: 29, key: 10.5, val: 14, mono: 11.5 },
  wires: TRACE_AT.map((_, i) => {
    const port = 186 + i * 15
    const lane = 148 + i * 9
    const entry = 96 + i * 58
    return { d: `M ${port} 130 V ${lane} H ${entry} V 206`, port }
  }),
}

const STATUS_AT = [
  [0, 'powering up'],
  [SCREEN_AT, 'opening session'],
  [LINE_AT[1], 'authenticating'],
  [TRACE_AT[0], 'streaming profile'],
  [LINE_AT[6], 'finalising'],
  [LINE_AT[7], 'entering'],
]

export default function Preloader({ onDone }) {
  const [phase, setPhase] = useState('boot')
  const [status, setStatus] = useState(STATUS_AT[0][1])
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 760
  )
  const [zoom, setZoom] = useState(null)
  const finished = useRef(false)
  const timers = useRef([])
  const screenRef = useRef(null)

  const G = narrow ? NARROW : WIDE

  const finish = useCallback(() => {
    if (finished.current) return
    finished.current = true
    timers.current.forEach(clearTimeout)
    setPhase('leaving')
    onDone()
    setTimeout(() => {
      setPhase('gone')
      document.body.style.overflow = ''
    }, FADE_DUR + 80)
  }, [onDone])

  /**
   * Push the camera into the laptop display. The screen's live rect is measured
   * from the DOM, so this stays correct at any viewport or layout. Scaling the
   * whole stage about that rect's centre keeps the screen pinned while
   * everything else flies out of frame.
   */
  const pushIn = useCallback(() => {
    const el = screenRef.current
    if (!el) { finish(); return }

    const r = el.getBoundingClientRect()
    if (!r.width || !r.height) { finish(); return }

    const vw = window.innerWidth
    const vh = window.innerHeight
    // Heavy overshoot for two reasons: the corner radius and lid bezel are
    // magnified along with everything else, and the easing is back-loaded — a
    // tighter scale only reaches full coverage in the last few frames.
    const scale = Math.max(vw / r.width, vh / r.height) * 2.4
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2

    setZoom({
      transformOrigin: `${cx}px ${cy}px`,
      transform: `translate(${vw / 2 - cx}px, ${vh / 2 - cy}px) scale(${scale})`,
      transition: `transform ${ZOOM_DUR}ms cubic-bezier(.55,.02,.85,.42)`,
      willChange: 'transform',
    })
    setPhase('zoom')
    timers.current.push(setTimeout(finish, ZOOM_DUR + 220))
  }, [finish])

  useEffect(() => {
    if (!motionOK()) {
      setPhase('gone')
      onDone()
      return
    }

    document.body.style.overflow = 'hidden'
    STATUS_AT.slice(1).forEach(([at, text]) =>
      timers.current.push(setTimeout(() => setStatus(text), at))
    )
    timers.current.push(setTimeout(pushIn, ZOOM_AT))
    // Never let a stalled animation strand anyone on the splash.
    timers.current.push(setTimeout(finish, FAILSAFE))

    const onResize = () => setNarrow(window.innerWidth < 760)
    window.addEventListener('resize', onResize)
    return () => {
      timers.current.forEach(clearTimeout)
      window.removeEventListener('resize', onResize)
      document.body.style.overflow = ''
    }
  }, [onDone, finish, pushIn])

  if (phase === 'gone') return null
  const leaving = phase === 'leaving'
  const zooming = phase === 'zoom' || leaving
  const S = G.screen
  const T = G.term

  return (
    <div
      className="fixed inset-0 z-[120] overflow-hidden"
      aria-hidden="true"
      style={{
        opacity: leaving ? 0 : 1,
        transition: `opacity ${FADE_DUR}ms ease-out`,
      }}
    >
      {/* The stage — scaled about the laptop screen to fly the camera in. */}
      <div className="absolute inset-0 bg-paper" style={zoom || undefined}>
        <div
          className={`absolute inset-0 grid place-items-center px-5 transition-opacity duration-300 ${
            zooming ? 'opacity-100' : 'opacity-100'
          }`}
        >
        <div className="w-full max-w-[920px]">
          <div
            className="flex items-center gap-3 mb-4 md:mb-6 transition-opacity duration-300"
            style={{ opacity: zooming ? 0 : 1 }}
          >
            <Logo size={32} radius={26} dot={false} />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
              sameer.dev
            </span>
          </div>

          <svg viewBox={G.vb} className="w-full h-auto" style={{ maxHeight: '66vh' }}>
            <defs>
              {/* Spans the trace field only — across the whole viewBox every
                  trace fell in the first 20% and rendered the same ember. */}
              <linearGradient
                id="pl-trace" gradientUnits="userSpaceOnUse"
                x1={narrow ? 90 : 148} y1={narrow ? 130 : 0}
                x2={narrow ? 400 : 302} y2={narrow ? 210 : 0}
              >
                <stop offset="0%" stopColor="#FF4D26" />
                <stop offset="55%" stopColor="#E39400" />
                <stop offset="100%" stopColor="#3B2BFF" />
              </linearGradient>
              <linearGradient id="pl-glass" x1="0" y1="0" x2="0.6" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
              <clipPath id="pl-screen">
                <rect x={S.x} y={S.y} width={S.w} height={S.h} rx="8" />
              </clipPath>
              {LINES.map((_, i) => (
                <clipPath key={i} id={`pl-type-${i}`}>
                  <rect
                    className="pl-wipe"
                    x={T.x - 6} y={T.y + i * T.lh - T.lh * 0.7}
                    width={narrow ? 340 : 440} height={T.lh}
                    style={{ animationDelay: `${LINE_AT[i]}ms` }}
                  />
                </clipPath>
              ))}
            </defs>

            {/* ── Traces ── */}
            {G.wires.map((w, i) => (
              <g key={i}>
                <path d={w.d} fill="none" stroke="#E7E2D8" strokeWidth="2"
                      strokeLinejoin="round" strokeLinecap="round" />
                <path className="pl-draw" d={w.d} pathLength="1" fill="none"
                      stroke="url(#pl-trace)" strokeWidth="2.6"
                      strokeLinejoin="round" strokeLinecap="round"
                      style={{ animationDelay: `${TRACE_AT[i]}ms`,
                               animationDuration: `${TRACE_DUR}ms` }} />
                <circle className="pl-pkt" r="4" fill="#FF4D26"
                        style={{ offsetPath: `path("${w.d}")`,
                                 animationDelay: `${TRACE_AT[i]}ms`,
                                 animationDuration: `${TRACE_DUR}ms` }} />
                <circle className="pl-ring"
                        cx={narrow ? w.port : 148} cy={narrow ? 130 : w.port}
                        r="5" fill="none" stroke="#FF4D26" strokeWidth="1.6"
                        style={{ animationDelay: `${TRACE_AT[i]}ms` }} />
              </g>
            ))}

            {/* ── Server ── */}
            <g className="pl-rise" style={{ animationDelay: '60ms' }}>
              <rect x={G.server.x} y={G.server.y} width={G.server.w} height={G.server.h}
                    rx="13" fill="#FFFFFF" stroke="#12121A" strokeWidth="2.4" />
              {[0, 1, 2, 3].map((r) => {
                const y = G.server.y + 16 + r * ((G.server.h - 34) / 4)
                return (
                  <g key={r}>
                    <rect x={G.server.x + 12} y={y} width={G.server.w - 24} height="14" rx="4"
                          fill="#F3EFE7" stroke="#E7E2D8" strokeWidth="1.2" />
                    <circle className="pl-led" cx={G.server.x + 22} cy={y + 7} r="2.8"
                            fill={['#FF4D26', '#E39400', '#00908B', '#3B2BFF'][r]}
                            style={{ animationDelay: `${240 + r * 150}ms` }} />
                    <rect x={G.server.x + 32} y={y + 5} width={G.server.w - 52} height="4" rx="2"
                          fill="#E7E2D8" />
                  </g>
                )
              })}
            </g>

            {/* ── MacBook ── */}
            <g className="pl-rise" style={{ animationDelay: `${LID_AT}ms` }}>
              <path d={G.deck} fill="#FFFFFF" stroke="#12121A" strokeWidth="2.4"
                    strokeLinejoin="round" />
              <rect x={(narrow ? 210 : 590) - 42} y={narrow ? 533 : 419} width="84" height="4" rx="2"
                    fill="#E7E2D8" />
              <rect x={G.lid.x} y={G.lid.y} width={G.lid.w} height={G.lid.h} rx="15"
                    fill="#FFFFFF" stroke="#12121A" strokeWidth="2.6" />
              <rect
                ref={screenRef}
                x={S.x} y={S.y} width={S.w} height={S.h} rx="8"
                fill="#12121A"
                style={{
                  opacity: zooming ? 0 : 1,
                  transition: `opacity ${Math.round(ZOOM_DUR * 0.3)}ms ease-out ${Math.round(ZOOM_DUR * 0.16)}ms`,
                }}
              />

              <g clipPath="url(#pl-screen)">
                {/* power-on flash */}
                <rect className="pl-flash" x={S.x} y={S.y} width={S.w} height={S.h} fill="#FBFAF7"
                      style={{ animationDelay: `${SCREEN_AT}ms` }} />
                {/* sweeping scanline */}
                <rect className="pl-scan" x={S.x} y={S.y} width={S.w} height="52"
                      fill="url(#pl-glass)" style={{ animationDelay: `${SCREEN_AT + 200}ms` }} />

                <g
                  style={{
                    opacity: zooming ? 0 : 1,
                    transition: `opacity ${Math.round(ZOOM_DUR * 0.22)}ms ease-out`,
                  }}
                >
                <g className="pl-screen-in" style={{ animationDelay: `${SCREEN_AT + 120}ms` }}>
                  {/* window chrome */}
                  <circle cx={S.x + 20} cy={S.y + 20} r="4" fill="#FF4D26" />
                  <circle cx={S.x + 36} cy={S.y + 20} r="4" fill="#E39400" />
                  <circle cx={S.x + 52} cy={S.y + 20} r="4" fill="#00908B" />
                  <line x1={S.x} y1={S.y + 40} x2={S.x + S.w} y2={S.y + 40}
                        stroke="#FBFAF7" strokeOpacity="0.14" strokeWidth="1" />

                  {LINES.map((l, i) => {
                    const y = T.y + i * T.lh
                    return (
                      <g key={i}>
                        <g clipPath={`url(#pl-type-${i})`}>
                          {l.type === 'kv' ? (
                            <>
                              <text x={T.x} y={y} className="font-mono" fontSize={T.key}
                                    letterSpacing="2" fill="#8A8A99">{l.k}</text>
                              <text x={T.x + (narrow ? 66 : 92)} y={y} className="font-display"
                                    fontSize={T.val} fontWeight="600" fill="#FBFAF7">{l.v}</text>
                            </>
                          ) : (
                            <text x={T.x} y={y} className="font-mono" fontSize={T.mono}
                                  fill={l.type === 'cmd' ? '#00C2BB' : l.type === 'ok' ? '#FF7A5C' : '#8A8A99'}>
                              {l.type === 'ok' ? '✓ ' : l.type === 'sys' ? '› ' : ''}{l.text}
                            </text>
                          )}
                        </g>
                        <rect
                          className="pl-caret" x={T.x} y={y - T.lh * 0.6}
                          width="2.5" height={T.lh * 0.72} fill="#00C2BB"
                          style={{
                            '--cw': `${lineWidth(l, T, narrow)}px`,
                            animationDelay: `${LINE_AT[i]}ms, ${LINE_AT[i]}ms, ${LINE_AT[i] + TYPE_DUR + 160}ms`,
                          }}
                        />
                      </g>
                    )
                  })}
                </g>
                </g>
              </g>
            </g>
          </svg>

          {/* Status rail */}
          <div
            className="mt-4 md:mt-7 flex items-center gap-5 transition-opacity duration-300"
            style={{ opacity: zooming ? 0 : 1 }}
          >
            <p className="font-mono text-[11px] tracking-[0.14em] text-ink2 whitespace-nowrap">
              <span className="text-ember">&gt;</span>{' '}
              {leaving ? 'welcome' : status}
              <span className="animate-blink text-ember">_</span>
            </p>
            <div className="flex-1 h-px bg-line overflow-hidden">
              <div className="pl-bar h-full bg-gradient-to-r from-ember via-amber to-indigo origin-left"
                   style={{ animationDuration: `${ZOOM_AT}ms` }} />
            </div>
          </div>
        </div>
        </div>
      </div>

      <style>{`
        @keyframes plDraw   { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
        @keyframes plPkt    { from { offset-distance: 0% } to { offset-distance: 100% } }
        @keyframes plShow   { from { opacity: 0 } to { opacity: 1 } }
        @keyframes plHide   { to { opacity: 0 } }
        @keyframes plRise   { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: none } }
        @keyframes plWipe   { from { transform: scaleX(0) } to { transform: scaleX(1) } }
        @keyframes plFlash  { 0% { opacity: 0 } 18% { opacity: .85 } 100% { opacity: 0 } }
        @keyframes plScan   { from { transform: translateY(-60px) } to { transform: translateY(${S.h + 60}px) } }
        @keyframes plRing   { from { transform: scale(.4); opacity: .8 } to { transform: scale(3.4); opacity: 0 } }
        @keyframes plBlink  { 0%,49% { opacity: 1 } 50%,100% { opacity: 0 } }
        @keyframes plBar    { from { transform: scaleX(0) } to { transform: scaleX(1) } }
        @keyframes plType   { from { transform: translateX(0) } to { transform: translateX(var(--cw)) } }

        .pl-draw  { stroke-dasharray: 1; stroke-dashoffset: 1;
                    animation: plDraw cubic-bezier(.65,0,.35,1) forwards }
        .pl-pkt   { opacity: 0; offset-rotate: 0deg;
                    animation: plPkt cubic-bezier(.65,0,.35,1) forwards,
                               plShow 140ms linear forwards }
        .pl-ring  { opacity: 0; transform-box: fill-box; transform-origin: center;
                    animation: plRing 900ms cubic-bezier(.22,1,.36,1) forwards }
        .pl-rise  { opacity: 0; animation: plRise 760ms cubic-bezier(.22,1,.36,1) forwards }
        .pl-wipe  { transform-box: fill-box; transform-origin: left center; transform: scaleX(0);
                    animation: plWipe ${TYPE_DUR}ms steps(26,end) forwards }
        .pl-flash { opacity: 0; animation: plFlash 520ms ease-out forwards }
        .pl-scan  { opacity: .5; animation: plScan 3.6s linear infinite }
        .pl-screen-in { opacity: 0; animation: plShow 420ms ease-out forwards }
        .pl-caret { opacity: 0; transform-box: fill-box;
                    animation: plType ${TYPE_DUR}ms steps(26,end) forwards,
                               plBlink 800ms steps(1) infinite,
                               plHide 1ms linear forwards }
        .pl-bar   { transform: scaleX(0); animation: plBar linear forwards }
      `}</style>
    </div>
  )
}
