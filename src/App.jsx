import { useCallback, useState } from 'react'
import { useReveal } from './hooks/useReveal'
import Preloader from './components/Preloader'
import BackToTop from './components/BackToTop'
import Cursor from './components/Cursor'
import Grain from './components/Grain'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Statement from './components/Statement'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Creed from './components/Creed'
import Skills from './components/Skills'
import Background from './components/Background'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useReveal()
  const [introDone, setIntroDone] = useState(false)
  const handleIntroDone = useCallback(() => setIntroDone(true), [])

  return (
    <div className="relative min-h-screen bg-paper text-ink selection:bg-ember/20">
      <Preloader onDone={handleIntroDone} />
      <Grain />
      <Cursor />
      <BackToTop />

      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:px-4 focus:py-2 focus:rounded-full focus:bg-ink focus:text-paper"
      >
        Skip to content
      </a>

      <Navbar />

      <main>
        <Hero introDone={introDone} />
        <Statement />
        <Experience />
        <Projects />
        <Creed />
        <Skills />
        <Background />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
