import { useEffect, useRef, useState } from 'react'
import { useCountUp, useInView, motionOK } from '../hooks/useMotion'
import { profile, metrics } from '../data/content'
import Magnetic from './Magnetic'
import CompanyMark from './CompanyMark'

/* Per-letter reveal for the masthead. Each glyph rises into place on a stagger.
   Driven by state rather than a CSS animation, so the settled position is a plain
   class — nothing about the final render depends on an animation having played. */
function KineticWord({ text, className = '', delay = 0, style, go = true }) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!go) return
    const id = setTimeout(() => setShown(true), 60)
    return () => clearTimeout(id)
  }, [go])

  return (
    <span className={className} style={style} aria-label={text}>
      {text.split('').map((char, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span
            aria-hidden="true"
            className={`inline-block transition-all duration-900 ease-swift ${
              shown ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-full rotate-3'
            }`}
            style={{ transitionDelay: `${delay + i * 55}ms` }}
          >
            {char}
          </span>
        </span>
      ))}
    </span>
  )
}

function Clock() {
  const [now, setNow] = useState('')
  useEffect(() => {
    const tick = () =>
      setNow(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Asia/Kolkata',
        }).format(new Date())
      )
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="tabular-nums">{now}</span>
}

/* Eases a ledger figure up from zero once the strip is on screen. */
function Figure({ value, suffix, active, delay }) {
  const [armed, setArmed] = useState(false)
  useEffect(() => {
    if (!active) return
    const id = setTimeout(() => setArmed(true), delay)
    return () => clearTimeout(id)
  }, [active, delay])

  const n = useCountUp(Number(value), armed)

  return (
    <p className="font-display text-[2rem] md:text-[2.6rem] leading-none font-semibold tracking-tight tabular-nums">
      {motionOK() ? n : value}
      <span className="text-ember">{suffix}</span>
    </p>
  )
}

export default function Hero({ introDone = true }) {
  const ledgerRef = useRef(null)
  const ledgerSeen = useInView(ledgerRef, { threshold: 0.3 })
  const sectionRef = useRef(null)
  const [auroraLive, setAuroraLive] = useState(true)
  const [typed, setTyped] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [typing, setTyping] = useState(true)
  const auroraRef = useRef(null)

  useEffect(() => {
    if (!introDone) return
    const current = profile.roles[roleIndex]
    let timeout
    if (typing) {
      if (typed.length < current.length) {
        timeout = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 62)
      } else {
        timeout = setTimeout(() => setTyping(false), 2100)
      }
    } else if (typed.length > 0) {
      timeout = setTimeout(() => setTyped(typed.slice(0, -1)), 28)
    } else {
      setRoleIndex((i) => (i + 1) % profile.roles.length)
      setTyping(true)
    }
    return () => clearTimeout(timeout)
  }, [typed, typing, roleIndex, introDone])

  // Stop animating the blurred wash once the hero has scrolled away.
  useEffect(() => {
    const el = sectionRef.current
    if (!el || !('IntersectionObserver' in window)) return
    const obs = new IntersectionObserver(([e]) => setAuroraLive(e.isIntersecting), { threshold: 0 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Aurora parallax — the colour wash drifts against the cursor.
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const el = auroraRef.current
    if (!el) return
    let frame
    const onMove = (e) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const x = (e.clientX / window.innerWidth - 0.5) * 2
        const y = (e.clientY / window.innerHeight - 0.5) * 2
        el.style.transform = `translate3d(${x * -26}px, ${y * -20}px, 0)`
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section ref={sectionRef} id="index" className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-28 pb-10">

      {/* ── Atmosphere ── */}
      <div className="absolute inset-0 bg-grid mask-fade opacity-70" aria-hidden="true" />
      <div ref={auroraRef} className={`absolute inset-0 -z-0 will-change-transform ${auroraLive ? "" : "anim-park"}`} aria-hidden="true">
        <div className="absolute -top-[18%] -right-[12%] w-[46rem] h-[46rem] rounded-full blur-[64px] opacity-[0.5] animate-drift"
             style={{ background: 'radial-gradient(circle, rgba(255,77,38,0.42), transparent 66%)' }} />
        <div className="absolute top-[24%] -left-[16%] w-[40rem] h-[40rem] rounded-full blur-[64px] opacity-[0.42] animate-drift-slow"
             style={{ background: 'radial-gradient(circle, rgba(59,43,255,0.34), transparent 66%)' }} />
        <div className="absolute -bottom-[22%] left-[38%] w-[36rem] h-[36rem] rounded-full blur-[64px] opacity-[0.4] animate-drift"
             style={{ background: 'radial-gradient(circle, rgba(227,148,0,0.4), transparent 66%)', animationDelay: '-9s' }} />
      </div>

      <div className="shell relative w-full">

        {/* ── Masthead meta row ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.26em] text-muted">
            Portfolio · 2026
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.26em] text-muted">
            {profile.location} · <Clock /> IST
          </span>
        </div>

        <div className="rule" />

        {/* ── The name ── */}
        <div className="grid lg:grid-cols-[minmax(0,1fr)_21rem] xl:grid-cols-[minmax(0,1fr)_24rem] gap-10 lg:gap-14 pt-8 md:pt-12">

          <div className="min-w-0">
            <h1 className="display-xl font-display select-none">
              <KineticWord text={profile.first} className="block" delay={80} go={introDone} />
              <KineticWord
                text={profile.last}
                className="block outline-type"
                delay={380}
                go={introDone}
                style={{ WebkitTextStrokeWidth: 'clamp(1.3px, 0.2vw, 2.6px)' }}
              />
            </h1>

            {/* Typing role */}
            <div className="mt-7 flex items-center gap-3.5">
              <span className="w-8 h-px bg-ink shrink-0" />
              <p className="font-mono text-[13px] md:text-[14.5px] text-ink2 min-h-[1.4em]">
                {typed}
                <span className="animate-blink text-ember font-semibold">_</span>
              </p>
            </div>

            <p className="mt-7 max-w-xl text-[16px] md:text-[17px] leading-[1.7] text-ink2">
              Computer Science undergraduate at{' '}
              <span className="text-ink font-medium">Ahmedabad University</span>, currently training models at{' '}
              <span className="text-ink font-medium">Nanta Tech</span> — fine-tuning LLMs and building
              computer vision pipelines with YOLO and OpenCV. Three years of shipping full stack
              products before that, and it's the same instinct either way: make it work, then make it fast.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic strength={10}>
                <a href="#projects" className="btn-solid group" data-cursor="View">
                  See selected work
                  <svg className="w-4 h-4 transition-transform duration-500 ease-swift group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0l-5.5-5.5M19 12l-5.5 5.5" />
                  </svg>
                </a>
              </Magnetic>
              <Magnetic strength={10}>
                <a href={`mailto:${profile.email}`} className="btn-ghost">Get in touch</a>
              </Magnetic>
            </div>
          </div>

          {/* ── Status stack ── */}
          <aside className="flex flex-col gap-3 lg:pt-3">

            {/* Now */}
            <div className="surface surface-hover p-5 overflow-hidden group">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5 min-w-0">
                  <CompanyMark
                    logo={profile.current.companyLogo}
                    monogram="NT"
                    company={profile.current.company}
                    accent="ember"
                    className="!w-11 !h-11 mt-0.5"
                  />
                  <div className="min-w-0">
                    <p className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-muted">Currently</p>
                    <p className="font-display text-[19px] font-semibold mt-1.5 leading-tight truncate">
                      {profile.current.company}
                    </p>
                    <p className="text-[13.5px] text-ember font-medium mt-0.5">{profile.current.role}</p>
                  </div>
                </div>
                <span className="relative flex w-2 h-2 mt-1.5 shrink-0">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-ember animate-pulse-ring" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-ember" />
                </span>
              </div>
              <div className="mt-4 pt-3 border-t border-line flex items-center justify-between font-mono text-[10.5px] text-muted">
                <span>{profile.current.period}</span>
                <span>{profile.current.mode}</span>
              </div>
            </div>

            {/* Rating + problems */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={profile.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="surface surface-hover p-5 flex flex-col justify-between"
              >
                <p className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-muted">LeetCode</p>
                <p className="font-display text-[2.4rem] leading-none font-semibold mt-5 text-amber">1681</p>
                <p className="text-[11.5px] text-muted mt-2 leading-snug">Rating · Top 295<br />Weekly Contest 445</p>
              </a>
              <div className="surface surface-hover p-5 flex flex-col justify-between">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-muted">Solved</p>
                <p className="font-display text-[2.4rem] leading-none font-semibold mt-5 text-indigo">600+</p>
                <p className="text-[11.5px] text-muted mt-2 leading-snug">DSA problems<br />across 3 platforms</p>
              </div>
            </div>

            {/* Links */}
            <div className="surface p-1.5 flex items-center">
              {[
                { label: 'GitHub', href: profile.socials.github },
                { label: 'LinkedIn', href: profile.socials.linkedin },
                { label: 'Résumé', href: '/Sameer_Gediya_Resume.pdf' },
              ].map((l, i) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 text-center font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink2 py-2.5 rounded-[14px] hover:bg-sand hover:text-ink transition-colors duration-300 ${
                    i > 0 ? 'border-l border-line' : ''
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </aside>
        </div>

        {/* ── Metrics ledger ── */}
        <div ref={ledgerRef} className="mt-12 md:mt-16 border-t border-line grid grid-cols-2 lg:grid-cols-4 divide-x divide-line">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              data-reveal
              data-delay={i * 90}
              className={`reveal py-6 ${i % 2 === 1 ? 'pl-5' : 'pr-5'} lg:px-6 lg:first:pl-0 ${i > 1 ? 'border-t lg:border-t-0 border-line' : ''}`}
            >
              <Figure value={m.value} suffix={m.suffix} active={ledgerSeen} delay={i * 110} />
              <p className="text-[13px] font-medium mt-2.5">{m.label}</p>
              <p className="font-mono text-[10px] text-muted mt-1 leading-relaxed">{m.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
