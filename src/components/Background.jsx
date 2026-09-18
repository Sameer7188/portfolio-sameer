import { education, certifications } from '../data/content'
import SectionHead from './SectionHead'

const ACCENT = {
  ember: 'bg-ember',
  indigo: 'bg-indigo',
  teal: 'bg-teal',
  amber: 'bg-amber',
}

export default function Background() {
  return (
    <section id="background" className="band relative py-24 md:py-32 bg-sand">
      <div className="shell">
        <SectionHead
          num="04"
          label="Background"
          title="Where the fundamentals came from."
          lead="A CSE degree for the theory, and a short stack of certifications for the parts the syllabus moved past too quickly."
        />

        <div className="mt-14 md:mt-20 grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-10 lg:gap-16">

          {/* ── Education ── */}
          <div>
            <p className="eyebrow mb-7"><span className="eyebrow-num">→</span> Education</p>

            <ol className="relative border-l border-line ml-[5px]">
              {education.map((edu, i) => (
                <li
                  key={edu.degree}
                  data-reveal
                  data-delay={i * 90}
                  className="reveal relative pl-7 pb-9 last:pb-0 group"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[5px] top-[7px] w-[9px] h-[9px] rounded-full ring-4 ring-sand transition-transform duration-500 ease-swift group-hover:scale-150 ${ACCENT[edu.accent]}`}
                  />

                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-[1.25rem] md:text-[1.4rem] font-semibold leading-snug">
                      {edu.degree}
                    </h3>
                    <span className="font-mono text-[11px] text-muted shrink-0">{edu.period}</span>
                  </div>

                  <p className="text-[14px] font-medium text-ink2 mt-1.5">{edu.institution}</p>
                  <p className="font-mono text-[10.5px] text-muted mt-1">{edu.meta}</p>

                  {edu.details.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {edu.details.map((d, j) => (
                        <li key={j} className="flex gap-3 text-[13px] leading-[1.65] text-ink2">
                          <span className="mt-[0.5rem] w-1 h-1 rounded-full bg-muted shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* ── Certifications ── */}
          <div>
            <p className="eyebrow mb-7"><span className="eyebrow-num">→</span> Certifications</p>

            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <article
                  key={cert.title}
                  data-reveal
                  data-delay={i * 90}
                  className="reveal surface surface-hover p-6 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-display text-[1.15rem] font-semibold leading-snug group-hover:text-ember transition-colors duration-400">
                        {cert.title}
                      </h3>
                      <p className="text-[13px] text-ink2 mt-1.5">{cert.issuer}</p>
                    </div>
                    <span className="font-mono text-[10.5px] text-muted shrink-0 pt-1">{cert.period}</span>
                  </div>
                  <p className="text-[13px] leading-[1.7] text-muted mt-4">{cert.description}</p>
                </article>
              ))}
            </div>

            {/* A small note card to balance the column */}
            <div data-reveal data-delay="180" className="reveal surface-flat p-6 mt-3 bg-transparent border-dashed">
              <p className="eyebrow mb-3"><span className="eyebrow-num">✦</span> Also</p>
              <p className="text-[13.5px] leading-[1.7] text-ink2">
                5th place in Ahmedabad University's <span className="text-ink font-medium">Clash of Code</span>, and
                a standing habit of one contest a week — it's the cheapest way I know to keep the
                fundamentals from going stale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
