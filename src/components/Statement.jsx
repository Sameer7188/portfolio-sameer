import { marqueeWords } from '../data/content'
import Marquee from './Marquee'
import WordReveal from './WordReveal'

/**
 * The band between the masthead and the work: a ticker tape of the stack,
 * then a short, plain-spoken statement set at reading size.
 */
export default function Statement() {
  return (
    <div className="relative">

      {/* Ticker tape — a solid ink band that cuts the page in two */}
      <div className="relative bg-ink text-paper py-4 overflow-hidden">
        <Marquee items={marqueeWords} speed={46} separator="✦" />
      </div>

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="shell">
          <div className="grid lg:grid-cols-[13rem_minmax(0,1fr)] gap-8 lg:gap-16">

            <div className="lg:pt-3">
              <p className="eyebrow"><span className="eyebrow-num">00</span><span className="w-5 h-px bg-line" />Statement</p>
            </div>

            <div>
              <WordReveal
                text="I started out making pages look right. Then a client's site took four seconds to load and I learned that [[looking right isn't the job]] — the job is the thing that happens between the click and the paint."
                className="font-display font-medium leading-[1.32] tracking-[-0.022em] max-w-4xl"
                style={{ fontSize: 'clamp(1.35rem, 2.9vw, 2.2rem)' }}
                stagger={26}
              />

              <div className="mt-10 grid sm:grid-cols-2 gap-8 lg:gap-14 max-w-3xl">
                <p data-reveal data-delay="100" className="reveal text-[14.5px] leading-[1.8] text-ink2">
                  Since then I've spent three internships on production systems — cutting load times,
                  rewriting APIs that had outgrown their shape, and tuning the servers underneath.
                  Now I'm a layer deeper: at Nanta Tech I train and fine-tune language models, and
                  build computer vision pipelines with YOLO and OpenCV. Same discipline, harder
                  feedback loop — a model doesn't throw an error when it's wrong, it just answers.
                </p>
                <p data-reveal data-delay="180" className="reveal text-[14.5px] leading-[1.8] text-ink2">
                  Outside of work it's contests — 600+ problems and a weekly habit I haven't broken.
                  It keeps me sharp on the parts of engineering that frameworks are happy to hide,
                  and it's why I'd rather read a stack trace than guess.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
