import MiddotLine from './MiddotLine'

/**
 * Full-bleed breather band between the project deck and the craft grid — a
 * single mixed-weight sentence that names the work in one breath.
 */
export default function Creed() {
  return (
    <section className="band bg-sand py-20 md:py-28">
      <div className="shell text-center">
        <p data-reveal className="reveal eyebrow justify-center mb-8">
          <span className="eyebrow-num">✦</span> What I work on
        </p>

        <div data-reveal data-delay="120" className="reveal max-w-4xl mx-auto">
          <MiddotLine
            items={[
              'model training',
              '*computer vision*',
              'object detection',
              '*full stack builds*',
              'REST APIs',
              '*web performance*',
              'deployment',
            ]}
          />
        </div>
      </div>
    </section>
  )
}
