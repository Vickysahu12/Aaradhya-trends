import { instagram, offers } from '../../data/content'
import { useReveal } from '../../hooks/useReveal'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { CopyCode } from '../../components/ui/CopyCode'

// The close: three codes to copy, then the community grid (#MyAaradhya).
export function Instagram() {
  const ref = useReveal()
  return (
    <section ref={ref} className="shell pt-20 lg:pt-28" aria-labelledby="ig-title">
      <ul className="grid gap-3 sm:grid-cols-3">
        {offers.map((o) => (
          <li key={o.code} className="group flex items-center justify-between gap-3 rounded-[14px] border border-dashed border-clay/50 bg-paper px-5 py-4 transition-colors hover:border-clay-deep">
            <p className="text-[14px] font-medium text-slate">{o.title}</p>
            <CopyCode code={o.code} />
          </li>
        ))}
      </ul>

      <div className="mt-16 flex flex-col items-center text-center">
        <h2 id="ig-title" className="display text-[26px] text-slate sm:text-[36px]">
          {instagram.tag}
        </h2>
        <p className="mt-3 text-[15px] text-ink-soft">Tag {instagram.handle} in your comfiest fit to be featured.</p>
      </div>
      <ul className="mt-8 grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
        {instagram.images.map((id, i) => (
          <li key={id}>
            <a href={instagram.href} target="_blank" rel="noreferrer" aria-label={`Instagram post ${i + 1}`} className="group relative block overflow-hidden rounded-[12px]" data-reveal-frame style={{ '--reveal-delay': `${i * 70}ms` }}>
              <Img id={id} alt="" sizes="(min-width: 1024px) 16vw, 33vw" className="aspect-square" position="50% 25%" imgClassName="transition-transform duration-1000 ease-out group-hover:scale-110" />
              <span className="absolute inset-0 grid place-items-center bg-slate/0 transition-colors duration-300 group-hover:bg-slate/55">
                <Icon name="instagram" size={28} className="scale-75 text-paper opacity-0 transition-[opacity,transform] duration-300 ease-[var(--ease-spring)] group-hover:scale-100 group-hover:opacity-100" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
