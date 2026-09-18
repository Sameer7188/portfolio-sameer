import { useEffect, useRef } from 'react'
import { projects } from '../data/content'
import { motionOK } from '../hooks/useMotion'
import SectionHead from './SectionHead'

const ACCENT = {
  ember: { text: 'text-ember', bar: 'from-ember to-amber', dot: 'bg-ember', hover: 'group-hover:text-ember' },
  indigo: { text: 'text-indigo', bar: 'from-indigo to-teal', dot: 'bg-indigo', hover: 'group-hover:text-indigo' },
  teal: { text: 'text-teal', bar: 'from-teal to-indigo', dot: 'bg-teal', hover: 'group-hover:text-teal' },
  amber: { text: 'text-amber', bar: 'from-amber to-ember', dot: 'bg-amber', hover: 'group-hover:text-amber' },
}

function ArrowLink({ href, label, cursor, external = true }) {
  if (!href) return null
  return (
    <a
      href={href}
      data-cursor={cursor}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group/l inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink2 hover:text-ink transition-colors duration-300"
    >
      <span className="link-u">{label}</span>
      <svg className="w-3 h-3 transition-transform duration-400 ease-swift group-hover/l:translate-x-0.5 group-hover/l:-translate-y-0.5"
           fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
      </svg>
    </a>
  )
}

export default function Projects() {
  const cardRefs = useRef([])

  /* As each card gets covered by the one after it, ease it back in z — the
     stack reads as a physical deck instead of flat sheets stacking. */
  useEffect(() => {
    if (!motionOK()) return
    let frame = 0

    const measure = () => {
      frame = 0
      const cards = cardRefs.current.filter(Boolean)
      cards.forEach((card, i) => {
        const next = cards[i + 1]
        if (!next) { card.style.transform = ''; card.style.opacity = ''; return }
        const rect = card.getBoundingClientRect()
        const covered = Math.min(1, Math.max(0, (rect.bottom - next.getBoundingClientRect().top) / rect.height))
        card.style.transform = `scale(${1 - covered * 0.05}) translateY(${covered * -7}px)`
      })
    }

    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure) }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section id="projects" className="band relative py-24 md:py-32 bg-sand">
      <div className="absolute inset-0 bg-dots opacity-[0.55] pointer-events-none" aria-hidden="true" />

      <div className="shell relative">
        <SectionHead
          num="02"
          label="Selected Projects"
          title="Four builds, each taken all the way to production."
          lead="No toy repos here. Every one of these has an auth flow, a database behind it, and a deploy story — most of them shipped solo."
        />

        {/* Sticky deck — cards stack on top of each other as you scroll. */}
        <div className="mt-14 md:mt-20">
          {projects.map((p, i) => {
            const a = ACCENT[p.accent]
            return (
              /* Sticky only on large screens: below that the cards are taller than
                 the viewport, and a pinned card's lower half becomes unreachable. */
              <div
                key={p.title}
                className="lg:sticky pb-5 md:pb-6"
                style={{ top: `calc(5.5rem + ${i * 1.35}rem)` }}
              >
                <article
                  ref={(el) => { cardRefs.current[i] = el }}
                  data-reveal
                  className="reveal surface overflow-hidden group origin-top will-change-transform"
                  style={{ boxShadow: '0 -1px 0 rgba(231,226,216,1), 0 18px 48px -22px rgba(24,20,12,0.22)' }}
                >
                  {/* Accent strip */}
                  <div className={`h-1 w-full bg-gradient-to-r ${a.bar} origin-left scale-x-[0.18] group-hover:scale-x-100 transition-transform duration-[900ms] ease-swift`} />

                  <div className="grid lg:grid-cols-[19rem_minmax(0,1fr)]">

                    {/* Left — identity */}
                    <div className="p-6 md:p-9 lg:border-r border-line flex flex-col justify-between gap-6">
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <span className="font-mono text-[11px] tracking-[0.2em] text-muted">{p.index}</span>
                          <span className={`font-mono text-[10px] uppercase tracking-[0.18em] ${a.text}`}>
                            {p.kind}
                          </span>
                        </div>

                        <h3 className={`font-display text-[2.1rem] md:text-[2.6rem] leading-[1.02] font-semibold mt-5 transition-colors duration-500 ${a.hover}`}>
                          {p.title}
                        </h3>

                        <p className="text-[13.5px] text-ink2 mt-3">{p.role}</p>
                        <p className="font-mono text-[11px] text-muted mt-1">{p.period}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                        <ArrowLink href={p.liveUrl} label="Live site" cursor="Visit" />
                        <ArrowLink href={p.githubUrl} label="Source" cursor="Code" />
                      </div>
                    </div>

                    {/* Right — the substance */}
                    <div className="p-6 md:p-9 lg:pt-9">
                      <p className="text-[15px] leading-[1.75] text-ink2 max-w-2xl">{p.description}</p>

                      <ul className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                        {p.highlights.map((h, j) => (
                          <li key={j} className="flex gap-3 text-[13.5px] leading-[1.6] text-ink2">
                            <span className={`mt-[0.5rem] w-1 h-1 rounded-full shrink-0 ${a.dot}`} />
                            {h}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-7 pt-5 border-t border-line flex flex-wrap gap-2">
                        {p.tech.map((t, k) => (
                          <span key={t} className={`capsule ${k === 0 ? 'capsule-lead' : ''}`}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            )
          })}
        </div>

        {/* Deck footer so the last card has somewhere to settle */}
        <div className="relative pt-16 md:pt-24 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
            More on GitHub
          </p>
          <a
            href="https://github.com/sameer7188"
            data-cursor="Open"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 font-display text-[1.6rem] md:text-[2rem] font-semibold mt-3 hover:text-ember transition-colors duration-400"
          >
            github.com/sameer7188
            <svg className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-500 ease-swift group-hover:translate-x-1.5 group-hover:-translate-y-1"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
