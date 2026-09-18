/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Tight"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        paper: '#FBFAF7',
        sand: '#F3EFE7',
        card: '#FFFFFF',
        ink: '#12121A',
        ink2: '#3C3C48',
        muted: '#7C7C8A',
        line: '#E7E2D8',
        ember: '#FF4D26',
        indigo: '#3B2BFF',
        amber: '#E39400',
        teal: '#00908B',
      },
      maxWidth: {
        shell: '82rem',
      },
      opacity: {
        3: '.03', 8: '.08', 12: '.12', 14: '.14', 15: '.15', 18: '.18',
        22: '.22', 35: '.35', 45: '.45', 55: '.55', 65: '.65', 85: '.85',
        97: '.97',
      },
      transitionDuration: {
        250: '250ms', 400: '400ms', 450: '450ms', 550: '550ms',
        600: '600ms', 800: '800ms', 900: '900ms',
      },
      transitionTimingFunction: {
        swift: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0)' },
          '33%': { transform: 'translate3d(6%, -8%, 0)' },
          '66%': { transform: 'translate3d(-7%, 5%, 0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        riseGlyph: {
          '0%': { opacity: '0', transform: 'translateY(105%) rotate(4deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) rotate(0)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '0.55' },
          '100%': { transform: 'scale(2.6)', opacity: '0' },
        },
      },
      animation: {
        drift: 'drift 22s ease-in-out infinite',
        'drift-slow': 'drift 34s ease-in-out infinite reverse',
        marquee: 'marquee 38s linear infinite',
        'marquee-fast': 'marquee 24s linear infinite',
        blink: 'blink 1.05s step-end infinite',
        rise: 'rise 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
        'rise-glyph': 'riseGlyph 0.95s cubic-bezier(0.22,1,0.36,1) forwards',
        'pulse-ring': 'pulseRing 2.2s cubic-bezier(0.22,1,0.36,1) infinite',
      },
    },
  },
  plugins: [],
}
