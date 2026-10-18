import { perks } from '../../data/content'
import { Icon } from '../../components/ui/Icon'

// The reference's perks row: icon, title, one line. Icons lift into a clay disc on hover.
export function Perks() {
  return (
    <section aria-label="Why shop with us" className="shell">
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 border-b border-line py-10 lg:grid-cols-4">
        {perks.map((p) => (
          <li key={p.title} className="group flex flex-col items-center text-center">
            <span className="grid size-14 place-items-center rounded-full border border-line-strong text-clay-deep transition-[transform,background-color,color,border-color] duration-500 ease-[var(--ease-spring)] group-hover:-translate-y-1 group-hover:border-clay-deep group-hover:bg-clay-deep group-hover:text-white">
              <Icon name={p.icon} size={24} />
            </span>
            <span className="caps mt-3 text-[11px] text-slate">{p.title}</span>
            <span className="mt-1 text-[13px] text-ink-soft">{p.body}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
