import { useRef } from 'react'
import { skillGroups, competitive } from '../data/content'
import { useInView } from '../hooks/useMotion'
import SectionHead from './SectionHead'
import TiltCard from './TiltCard'

const ACCENT = {
  ember: { text: 'text-ember', tick: '#ff4d26', soft: 'rgba(255,77,38,0.10)' },
  indigo: { text: 'text-indigo', tick: '#3b2bff', soft: 'rgba(59,43,255,0.10)' },
  teal: { text: 'text-teal', tick: '#00908b', soft: 'rgba(0,144,139,0.10)' },
  amber: { text: 'text-amber', tick: '#e39400', soft: 'rgba(227,148,0,0.10)' },
}

/** Ten segments, filled proportionally — reads as a spec sheet, not a progress
    bar. The segments light up left to right when the card enters view. */
function Meter({ level, color, active, offset = 0 }) {
  const filled = Math.round(level / 10)
  return (
    <div className="flex gap-[3px] w-[68px] shrink-0">
      {Array.from({ length: 10 }, (_, i) => (
        <span
          key={i}
          className="tick"
          style={{
            backgroundColor: active && i < filled ? color : undefined,
            transform: active && i < filled ? 'scaleY(1.9)' : 'scaleY(1)',
            transitionDelay: `${offset + i * 55}ms`,
          }}
        />
      ))}
    </div>
  )
}

/** One skill card — owns its own in-view latch so the meters stagger per card. */
function SkillCard({ group, accent, span, wide, index }) {
  const ref = useRef(null)
  const seen = useInView(ref, { threshold: 0.3 })

  return (
    <TiltCard
      as="article"
      tilt={4}
      ref={ref}
      data-reveal
      data-delay={index * 70}
      className={`reveal surface p-6 md:p-7 flex flex-col ${span}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="font-mono text-[10.5px] tracking-[0.2em] text-muted">{group.num}</span>
          <h3 className={`font-display text-[1.4rem] font-semibold leading-tight mt-1.5 ${accent.text}`}>
            {group.category}
          </h3>
        </div>
        <span
          className="w-8 h-8 rounded-full shrink-0 grid place-items-center"
          style={{ background: accent.soft }}
          aria-hidden="true"
        >
          <span
            className="w-2 h-2 rounded-full transition-transform duration-700 ease-swift"
            style={{ background: accent.tick, transform: seen ? 'scale(1)' : 'scale(0)' }}
          />
        </span>
      </div>

      <p className="text-[13px] text-muted mt-3 leading-relaxed">{group.blurb}</p>

      <ul className={`mt-6 flex-1 ${wide ? 'grid sm:grid-cols-2 gap-x-10 gap-y-3 content-start' : 'space-y-3'}`}>
        {group.skills.map((s, j) => (
          <li key={s.name} className="flex items-center justify-between gap-4">
            <span className="text-[13.5px] text-ink2 font-medium">{s.name}</span>
            <div className="flex items-center gap-3">
              <Meter level={s.level} color={accent.tick} active={seen} offset={j * 90} />
              <span className="font-mono text-[10px] text-muted tabular-nums w-7 text-right">{s.level}</span>
            </div>
          </li>
        ))}
      </ul>
    </TiltCard>
  )
}

export default function Skills() {
  return (
    <section id="craft" className="relative py-24 md:py-32">
      <div className="shell">
        <SectionHead
          num="03"
          label="Craft"
          title="The toolkit — and an honest read on where I sit with each of it."
          lead="Grouped by what I actually reach for day to day. The meters are self-assessed, calibrated against what I've shipped rather than what I've watched a tutorial on."
        />

        <div className="mt-14 md:mt-20 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {skillGroups.map((group, i) => {
            const a = ACCENT[group.accent]
            // A trailing card would otherwise sit alone beside empty columns —
            // let it stretch across whatever the last row leaves over.
            const last = i === skillGroups.length - 1
            const span = last
              ? `${skillGroups.length % 2 === 1 ? 'md:col-span-2' : ''} ${
                  skillGroups.length % 3 === 1 ? 'xl:col-span-2' : 'xl:col-span-1'
                }`
              : ''
            return (
              <SkillCard
                key={group.category}
                group={group}
                accent={a}
                span={span}
                wide={last && skillGroups.length % 3 === 1}
                index={i}
              />
            )
          })}
        </div>

        {/* ── Competitive programming ledger ── */}
        <div data-reveal className="reveal mt-12 md:mt-16 surface overflow-hidden">
          <div className="px-6 md:px-8 py-5 border-b border-line flex flex-wrap items-center justify-between gap-3">
            <p className="eyebrow"><span className="eyebrow-num">✦</span> Competitive Programming</p>
            <p className="font-mono text-[10.5px] text-muted">600+ problems · 3 platforms</p>
          </div>

          <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line">
            {competitive.map((c) => {
              const a = ACCENT[c.accent]
              return (
                <a
                  key={c.platform}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-6 md:px-8 py-6 flex items-center justify-between gap-4 hover:bg-sand/70 transition-colors duration-400"
                >
                  <div className="min-w-0">
                    <p className={`font-display text-[1.2rem] font-semibold ${a.text}`}>{c.platform}</p>
                    <p className="font-mono text-[11px] text-muted mt-1 truncate">@{c.handle}</p>
                  </div>
                  <div className="text-right shrink-0">
                    {c.rating ? (
                      <p className="font-display text-[1.7rem] font-semibold leading-none tabular-nums">{c.rating}</p>
                    ) : (
                      <p className="font-mono text-[11px] text-muted">Active</p>
                    )}
                    <span className="inline-flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted mt-1.5 group-hover:text-ink transition-colors">
                      Profile
                      <svg className="w-2.5 h-2.5 transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                           fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
                      </svg>
                    </span>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
