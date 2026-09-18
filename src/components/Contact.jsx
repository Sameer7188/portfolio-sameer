import { useRef, useState, useEffect } from 'react'
import { profile } from '../data/content'
import Magnetic from './Magnetic'
import RollText from './RollText'

const channels = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'Phone', value: profile.phone, href: 'tel:+919825417188' },
  { label: 'LinkedIn', value: 'in/sameer-gediya', href: profile.socials.linkedin },
  { label: 'GitHub', value: 'sameer7188', href: profile.socials.github },
  { label: 'Based in', value: profile.location, href: null },
]

export default function Contact() {
  const ref = useRef(null)
  const [live, setLive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const obs = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} id="contact" className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      {/* Aurora wash */}
      <div className={`absolute inset-0 pointer-events-none ${live ? "" : "anim-park"}`} aria-hidden="true">
        <div className="absolute -bottom-[30%] left-1/2 -translate-x-1/2 w-[60rem] h-[45rem] rounded-full blur-[64px] opacity-45 animate-drift"
             style={{ background: 'radial-gradient(circle, rgba(255,77,38,0.34), rgba(59,43,255,0.16) 55%, transparent 72%)' }} />
      </div>

      <div className="shell relative">
        <div className="flex items-center gap-4">
          <span className="eyebrow"><span className="eyebrow-num">05</span><span className="w-5 h-px bg-line" />Contact</span>
          <span className="flex-1 h-px bg-line" />
        </div>

        {/* Oversized invitation */}
        <div className="mt-10 md:mt-14 max-w-5xl">
          <h2 data-reveal className="reveal reveal-mask font-display font-semibold leading-[1.02] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(2.4rem, 6.6vw, 5rem)' }}>
            <span className="mask-inner">
              Got something worth<br />
              building?{' '}
              <span className="outline-type" style={{ WebkitTextStrokeWidth: 'clamp(1.2px, 0.18vw, 2.2px)' }}>Let's talk.</span>
            </span>
          </h2>

          <p data-reveal data-delay="140" className="reveal mt-7 max-w-xl text-[16px] leading-[1.75] text-ink2">
            Whether it's an engineering role, a freelance build, or a side project that needs
            a second pair of hands — I'd like to hear about it. I read everything that lands in
            my inbox and reply to all of it.
          </p>

          <div data-reveal data-delay="220" className="reveal mt-9 flex flex-wrap items-center gap-3">
            <Magnetic strength={11}>
              <a href={`mailto:${profile.email}`} className="btn-solid group !px-7 !py-4 !text-base" data-cursor="Say hi">
                {profile.email}
                <svg className="w-4 h-4 transition-transform duration-500 ease-swift group-hover:translate-x-1.5 group-hover:-translate-y-1"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic strength={11}>
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-7 !py-4 !text-base">
                Connect on LinkedIn
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Channel ledger */}
        <div data-reveal data-delay="280" className="reveal mt-16 md:mt-20 border-t border-line">
          {channels.map((c) => {
            const Inner = (
              <>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-muted w-28 shrink-0">
                  {c.label}
                </span>
                <span className="flex-1 font-display text-[1.05rem] md:text-[1.3rem] font-medium truncate">
                  {c.href ? <RollText text={c.value} stagger={11} /> : c.value}
                </span>
                {c.href && (
                  <svg className="w-4 h-4 text-muted shrink-0 transition-all duration-500 ease-swift group-hover:text-ember group-hover:translate-x-1 group-hover:-translate-y-1"
                       fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
                  </svg>
                )}
              </>
            )

            const shared = 'group flex items-center gap-5 py-5 border-b border-line transition-colors duration-400'

            return c.href ? (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`${shared} hover:bg-card hover:px-4 -mx-0 hover:-mx-4`}
              >
                {Inner}
              </a>
            ) : (
              <div key={c.label} className={shared}>{Inner}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
