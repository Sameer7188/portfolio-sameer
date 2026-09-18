import { useCallback, useRef, useState } from 'react'
import { experiences } from '../data/content'
import { useScrollFill } from '../hooks/useReveal'
import SectionHead from './SectionHead'
import CompanyMark from './CompanyMark'

const ACCENT = {
  ember: { text: 'text-ember', bg: 'bg-ember', ring: 'ring-ember/30', soft: 'bg-ember/8', border: 'border-ember/25' },
  indigo: { text: 'text-indigo', bg: 'bg-indigo', ring: 'ring-indigo/30', soft: 'bg-indigo/8', border: 'border-indigo/25' },
  teal: { text: 'text-teal', bg: 'bg-teal', ring: 'ring-teal/30', soft: 'bg-teal/8', border: 'border-teal/25' },
  amber: { text: 'text-amber', bg: 'bg-amber', ring: 'ring-amber/30', soft: 'bg-amber/8', border: 'border-amber/25' },
}

/** Bolds the numbers inside a bullet so the impact reads at a glance. */
function Metricised({ text }) {
  const parts = text.split(/(\d+(?:[.,–-]\d+)*\s*%|~?\d+(?:\.\d+)?s\b|\b\d+\+)/g)
  return (
    <>
      {parts.map((part, i) =>
        /^\d|^~\d/.test(part)
          ? <strong key={i} className="text-ink font-semibold">{part}</strong>
          : <span key={i}>{part}</span>
      )}
    </>
  )
}

export default function Experience() {
  const spineRef = useRef(null)
  const [fill, setFill] = useState(0)
  useScrollFill(spineRef, useCallback((v) => setFill(v), []))

  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="shell">
        <SectionHead
          num="01"
          label="Work"
          title="Three internships, one throughline: ship it, then make it fast."
          lead="Each of these put me on production systems with real users attached — which is where I learned that the interesting problems are almost never the ones in the ticket."
        />

        <div ref={spineRef} className="relative mt-14 md:mt-20">

          {/* Scroll-drawn spine */}
          <div className="hidden md:block absolute left-[7.5rem] top-2 bottom-2 w-px bg-line" aria-hidden="true">
            <div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-ember via-indigo to-teal transition-[height] duration-200 ease-out"
              style={{ height: `${fill * 100}%` }}
            />
          </div>

          <div className="space-y-5 md:space-y-8">
            {experiences.map((exp, i) => {
              const a = ACCENT[exp.accent]
              return (
                <article
                  key={exp.company}
                  data-reveal
                  data-delay={i * 90}
                  className="reveal relative md:pl-[10.5rem] group"
                >
                  {/* Year rail + node */}
                  <div className="hidden md:flex absolute left-0 top-7 items-center gap-0 w-[7.5rem] justify-end pr-5">
                    <span className="font-mono text-[11px] tracking-[0.18em] text-muted group-hover:text-ink transition-colors duration-400">
                      {exp.short}
                    </span>
                  </div>
                  <span
                    aria-hidden="true"
                    className={`hidden md:block absolute left-[7.5rem] top-[2.1rem] -translate-x-1/2 w-[9px] h-[9px] rounded-full ${a.bg} ring-4 ring-paper transition-transform duration-500 ease-swift group-hover:scale-150`}
                  />

                  <div className="surface surface-hover p-6 md:p-8">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                      <div className="flex items-start gap-4 min-w-0">
                        <CompanyMark
                          monogram={exp.monogram}
                          logo={exp.logo}
                          company={exp.company}
                          accent={exp.accent}
                        />
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <h3 className="font-display text-[1.45rem] md:text-[1.7rem] font-semibold leading-tight">
                              {exp.company}
                            </h3>
                            {exp.current && (
                              <span className="chip-live !py-1 !px-2.5 !text-[9.5px]">
                                <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                                Current
                              </span>
                            )}
                          </div>
                          <p className={`text-[14.5px] font-medium mt-1.5 ${a.text}`}>{exp.role}</p>
                        </div>
                      </div>
                      <div className="md:text-right shrink-0">
                        <p className="font-mono text-[11.5px] text-ink2 tracking-tight">{exp.period}</p>
                        <p className="font-mono text-[10.5px] text-muted mt-1">{exp.location}</p>
                      </div>
                    </div>

                    <p className="mt-5 text-[14.5px] leading-[1.7] text-ink2 max-w-2xl">{exp.summary}</p>

                    {/* Highlights */}
                    <ul className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-3">
                      {exp.highlights.map((h, j) => (
                        <li key={j} className="flex gap-3 text-[13.5px] leading-[1.65] text-ink2">
                          <span className={`mt-[0.55rem] w-1 h-1 rounded-full shrink-0 ${a.bg}`} />
                          <span><Metricised text={h} /></span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech */}
                    <div className="mt-7 pt-5 border-t border-line flex flex-wrap gap-2">
                      {exp.tech.map((t, k) => (
                        <span
                          key={t}
                          data-reveal
                          data-delay={k * 45}
                          className={`reveal capsule ${k === 0 ? 'capsule-lead' : ''}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
