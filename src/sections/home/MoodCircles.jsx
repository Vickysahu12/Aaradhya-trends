import { Link } from 'react-router'
import { occasions } from '../../data/content'
import { products } from '../../data/products'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'

const counts = Object.fromEntries(occasions.map((o) => [o.id, products.filter((p) => p.occasions.includes(o.id)).length]))
const ICONS = { home: 'house', sleep: 'moon', work: 'laptop', out: 'sneaker', travel: 'plane' }

// Shop by mood: round portraits; on hover the photo lifts and a small icon badge pops in.
export function MoodCircles() {
  return (
    <section className="shell pt-20 lg:pt-28" aria-labelledby="mood-title">
      <h2 id="mood-title" className="display text-center text-[26px] text-slate sm:text-[36px]">
        What are you dressing for?
      </h2>
      <ul className="no-scrollbar -mx-4 mt-9 flex snap-x scroll-px-4 gap-5 overflow-x-auto px-4 sm:mx-0 sm:justify-center sm:px-0 lg:gap-10">
        {occasions.map((o) => (
          <li key={o.id} className="shrink-0 snap-start">
            <Link to={o.to} className="group flex w-[112px] flex-col items-center text-center sm:w-[140px]">
              <span className="relative block">
                <span className="block size-[104px] overflow-hidden rounded-full ring-1 ring-line-strong ring-offset-4 ring-offset-fog transition-[box-shadow,transform] duration-500 ease-[var(--ease-spring)] group-hover:-translate-y-1.5 group-hover:ring-2 group-hover:ring-clay sm:size-[128px]">
                  <Img id={o.image} alt="" sizes="128px" className="h-full w-full" position="50% 25%" imgClassName="transition-transform duration-700 group-hover:scale-110" />
                </span>
                <span className="absolute -right-1 bottom-1 grid size-9 scale-75 place-items-center rounded-full bg-clay-deep text-white opacity-0 shadow-float transition-[opacity,transform] duration-300 ease-[var(--ease-spring)] group-hover:scale-100 group-hover:opacity-100">
                  <Icon name={ICONS[o.id]} size={17} />
                </span>
              </span>
              <span className="caps mt-4 text-[10.5px] text-slate">{o.label}</span>
              <span className="mt-0.5 text-[12px] text-ink-soft tabular-nums">{counts[o.id]} styles</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
