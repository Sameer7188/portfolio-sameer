import { useState, useEffect, useRef } from 'react'
import { navLinks, profile } from '../data/content'
import Magnetic from './Magnetic'
import RollText from './RollText'
import Logo from './Logo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('index')
  const [progress, setProgress] = useState(0)
  const listRef = useRef(null)
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false })

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers = navLinks.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActive(id),
        { rootMargin: '-45% 0px -50% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  // Slide the highlight pill under whichever link is active.
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const el = list.querySelector(`[data-nav="${active}"]`)
    if (!el) return
    const a = el.getBoundingClientRect()
    const b = list.getBoundingClientRect()
    setPill({ left: a.left - b.left, width: a.width, ready: true })
  }, [active])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[70] transition-all duration-700 ease-swift ${
          scrolled ? 'bg-paper/94 border-b border-line' : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-ember via-amber to-indigo transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />

        <nav className="shell h-[72px] flex items-center justify-between gap-6">
          {/* Wordmark */}
          <a href="#index" aria-label="Back to top" className="group flex items-center gap-3 shrink-0">
            <Logo
              size={40}
              radius={26}
              className="transition-transform duration-500 ease-swift group-hover:-rotate-6 group-hover:scale-105"
            />
            <span className="hidden sm:flex flex-col leading-none">
              <span className="font-display text-[17px] font-semibold tracking-tight">Sameer Gediya</span>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-muted mt-1">
                {profile.current.role} · {profile.current.company}
              </span>
            </span>
          </a>

          {/* Desktop links with sliding pill */}
          <ul ref={listRef} className="hidden lg:flex relative items-center gap-1 p-1 rounded-full border border-line bg-card/85">
            <li
              aria-hidden="true"
              className={`absolute top-1 bottom-1 rounded-full bg-ink transition-all duration-500 ease-swift ${pill.ready ? 'opacity-100' : 'opacity-0'}`}
              style={{ left: pill.left, width: pill.width }}
            />
            {navLinks.map((link) => (
              <li key={link.id} data-nav={link.id} className="relative z-10">
                <a
                  href={link.href}
                  className={`block px-4 py-2 text-[13.5px] font-medium rounded-full transition-colors duration-250 ${
                    active === link.id ? 'text-paper delay-200' : 'text-ink2 hover:text-ink delay-0'
                  }`}
                >
                  <RollText text={link.label} />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Magnetic strength={8} className="hidden md:inline-block">
              <a href="#contact" className="btn-solid group !py-2.5 !px-5 !text-[13.5px]">
                Let's talk
                <span className="w-1.5 h-1.5 rounded-full bg-ember transition-colors duration-400 group-hover:bg-paper" />
              </a>
            </Magnetic>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              className="lg:hidden w-11 h-11 rounded-xl border border-line bg-card flex flex-col items-center justify-center gap-[5px] active:scale-95 transition-transform"
            >
              <span className={`w-4 h-[1.5px] bg-ink rounded-full transition-all duration-400 ease-swift ${menuOpen ? 'rotate-45 translate-y-[3.25px]' : ''}`} />
              <span className={`w-4 h-[1.5px] bg-ink rounded-full transition-all duration-400 ease-swift ${menuOpen ? '-rotate-45 -translate-y-[3.25px]' : ''}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Full-bleed mobile overlay */}
      <div
        className={`fixed inset-0 z-[65] lg:hidden transition-opacity duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-paper/97 backdrop-blur-2xl" onClick={() => setMenuOpen(false)} />
        <div className="relative h-full flex flex-col justify-center px-8 pt-20 pb-10">
          <ul className="space-y-1">
            {navLinks.map((link, i) => (
              <li
                key={link.id}
                style={{ transitionDelay: menuOpen ? `${120 + i * 55}ms` : '0ms' }}
                className={`transition-all duration-600 ease-swift ${
                  menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
              >
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-baseline gap-4 py-2.5 border-b border-line/70"
                >
                  <span className="font-mono text-[11px] text-muted w-7">0{i + 1}</span>
                  <span className={`font-display text-[2.1rem] leading-tight transition-colors duration-300 ${
                    active === link.id ? 'text-ember' : 'text-ink group-hover:text-ember'
                  }`}>
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="link-u hover:text-ink">GitHub</a>
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="link-u hover:text-ink">LinkedIn</a>
            <a href={profile.socials.leetcode} target="_blank" rel="noopener noreferrer" className="link-u hover:text-ink">LeetCode</a>
          </div>

          <a
            href={`mailto:${profile.email}`}
            onClick={() => setMenuOpen(false)}
            className="btn-solid mt-6 w-full"
          >
            {profile.email}
          </a>
        </div>
      </div>
    </>
  )
}
