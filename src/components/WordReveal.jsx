import { useRef } from 'react'
import { useInView } from '../hooks/useMotion'

/**
 * Rises text into place one word at a time — each word sits in its own
 * overflow-hidden box so it wipes up from the baseline rather than fading.
 *
 * Wrap a phrase in [[double brackets]] to give those words the ember accent.
 * Matching on a word list would catch every other "the"; marking the span in
 * the source keeps it unambiguous.
 */
function parse(text) {
  const out = []
  let hot = false

  text.split(/\s+/).forEach((raw) => {
    let word = raw
    let opens = false
    let closes = false

    if (word.startsWith('[[')) { opens = true; word = word.slice(2) }
    if (word.endsWith(']]')) { closes = true; word = word.slice(0, -2) }

    if (opens) hot = true
    out.push({ word, hot })
    if (closes) hot = false
  })

  return out
}

export default function WordReveal({
  text,
  className = '',
  stagger = 42,
  delay = 0,
  style,
  as: Tag = 'p',
}) {
  const ref = useRef(null)
  const shown = useInView(ref, { threshold: 0.15 })
  const words = parse(text)

  return (
    <Tag ref={ref} className={className} style={style}>
      {words.map(({ word, hot }, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]">
          <span
            className={`inline-block transition-all duration-[850ms] ease-swift ${
              shown ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            } ${hot ? 'text-ember' : ''}`}
            style={{ transitionDelay: `${delay + i * stagger}ms` }}
          >
            {word}
          </span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}
