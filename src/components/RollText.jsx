/**
 * Character roll-over: the label sits in a clipped box with an identical copy
 * stacked below it. On hover the top copy rolls out and the bottom rolls in,
 * each character on its own stagger.
 */
export default function RollText({ text, className = '', stagger = 22 }) {
  const chars = text.split('')

  const row = (shift) =>
    chars.map((c, i) => (
      <span
        key={`${shift}-${i}`}
        className="inline-block transition-transform duration-500 ease-swift"
        style={{ transitionDelay: `${i * stagger}ms` }}
      >
        {c === ' ' ? ' ' : c}
      </span>
    ))

  return (
    <span className={`roll relative inline-block overflow-hidden align-bottom ${className}`}>
      <span className="roll-a block">{row('a')}</span>
      <span className="roll-b absolute inset-0 block" aria-hidden="true">{row('b')}</span>
    </span>
  )
}
