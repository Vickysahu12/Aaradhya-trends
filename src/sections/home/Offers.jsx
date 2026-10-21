import { offers } from '../../data/content'
import { useReveal } from '../../hooks/useReveal'
import { CopyCode } from '../../components/ui/CopyCode'

// The close: three codes to copy.
export function Offers() {
  const ref = useReveal()
  return (
    <section ref={ref} className="shell pt-20 lg:pt-28" aria-label="Offers">
      <ul className="grid gap-3 sm:grid-cols-3">
        {offers.map((o) => (
          <li key={o.code} className="group flex items-center justify-between gap-3 rounded-[14px] border border-dashed border-clay/50 bg-paper px-5 py-4 transition-colors hover:border-clay-deep">
            <p className="text-[14px] font-medium text-slate">{o.title}</p>
            <CopyCode code={o.code} />
          </li>
        ))}
      </ul>
    </section>
  )
}
