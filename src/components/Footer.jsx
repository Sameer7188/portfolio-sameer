import { profile } from '../data/content'
import Logo from './Logo'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-line bg-sand/50 overflow-hidden">
      {/* Oversized wordmark bleeding off the bottom edge */}
      <div className="shell pt-14 md:pt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10">
          <div>
            {/* Wrapped: .eyebrow is inline-flex, so a bare inline-grid mark
                would sit on the same line instead of above it. */}
            <div className="mb-5 -ml-0.5">
              <Logo variant="bare" size={44} dot={false} />
            </div>
            <p className="eyebrow mb-4"><span className="eyebrow-num">✦</span> Sameer Gediya · 2026</p>
            <p className="max-w-sm text-[14px] leading-[1.7] text-ink2">
              Designed and built from scratch by me — React, Vite and Tailwind, no template
              underneath it.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-7 gap-y-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink2">
            {[
              { label: 'GitHub', href: profile.socials.github },
              { label: 'LinkedIn', href: profile.socials.linkedin },
              { label: 'LeetCode', href: profile.socials.leetcode },
              { label: 'Email', href: `mailto:${profile.email}` },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="link-u hover:text-ember transition-colors duration-300"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="rule" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6 font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted">
          <span>© {year} Sameer Gediya</span>
          <a href="#index" className="link-u hover:text-ink transition-colors duration-300">Back to top ↑</a>
        </div>

        {/* The signature */}
        <p
          aria-hidden="true"
          className="font-display font-semibold text-center leading-[0.78] whitespace-nowrap select-none outline-type -mb-[0.2em] mt-4 opacity-[0.18]"
          style={{
            fontSize: 'clamp(2rem, 10.6vw, 11rem)',
            WebkitTextStrokeWidth: 'clamp(0.8px, 0.12vw, 1.6px)',
            letterSpacing: '-0.035em',
          }}
        >
          SAMEER GEDIYA
        </p>
      </div>
    </footer>
  )
}
