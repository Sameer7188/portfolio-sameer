/**
 * Mixed-weight middot sentence — a Fonestar device: a run of terms separated by
 * middots where the emphasised ones jump to a heavier weight, so the line reads
 * as one breath rather than a list. Wrap a term in *asterisks* to emphasise it.
 */
export default function MiddotLine({ items, className = '', size = 'clamp(1.05rem, 2.3vw, 1.75rem)' }) {
  return (
    <p
      className={`font-display leading-[1.55] tracking-[-0.015em] text-ink2 ${className}`}
      style={{ fontSize: size }}
    >
      <span className="text-ember">·</span>{' '}
      {items.map((raw, i) => {
        const strong = raw.startsWith('*') && raw.endsWith('*')
        const word = strong ? raw.slice(1, -1) : raw
        return (
          <span key={i}>
            <span className={strong ? 'font-semibold text-ink' : 'font-normal'}>{word}</span>{' '}
            <span className="text-ember">·</span>{' '}
          </span>
        )
      })}
    </p>
  )
}
