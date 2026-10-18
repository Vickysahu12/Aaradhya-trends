import { Link } from 'react-router'
import { priceStops } from '../../data/content'
import { products } from '../../data/products'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'

const picks = priceStops.map((s, i) => {
  const min = i ? priceStops[i - 1].max + 1 : 0
  const inBand = products.filter((p) => p.price >= min && p.price <= s.max)
  return { ...s, count: products.filter((p) => p.price <= s.max).length, thumbs: inBand.slice(0, 3) }
})

/**
 * The brand's promise as a shelf: four price ceilings, each with a little fan of what
 * you get there. On hover the three photos fan out and the arrow moves on.
 */
export function ShopByPrice() {
  return (
    <section className="shell pt-20 lg:pt-28" aria-labelledby="price-title">
      <div className="flex flex-col items-center text-center">
        <h2 id="price-title" className="display text-[26px] text-slate sm:text-[36px]">
          Everything under ₹1,999
        </h2>
        <p className="mt-3 max-w-[48ch] text-[15px] text-ink-soft">Start with your budget. We will show you everything that fits it.</p>
      </div>
      <ul className="mt-9 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {picks.map((p, i) => (
          <li key={p.label}>
            <Link to={p.to} className="group flex h-full flex-col justify-between gap-6 rounded-[14px] bg-paper p-5 transition-[box-shadow,transform] duration-500 ease-[var(--ease-out)] hover:-translate-y-1 hover:shadow-lift sm:p-6">
              <div className="relative mx-auto h-[150px] w-full max-w-[230px] sm:h-[190px]" aria-hidden="true">
                {p.thumbs.map((t, k) => (
                  <span
                    key={t.id}
                    className="absolute top-2 left-1/2 w-[46%] overflow-hidden rounded-[10px] shadow-float transition-transform duration-500 ease-[var(--ease-spring)] [transform:translateX(-50%)_translateX(var(--x))_rotate(var(--r))] group-hover:[transform:translateX(-50%)_translateX(calc(var(--x)*1.7))_rotate(calc(var(--r)*1.8))_translateY(-4px)]"
                    style={{ zIndex: k === 1 ? 3 : 1, '--x': `${(k - 1) * 34}%`, '--r': `${(k - 1) * 7}deg` }}
                  >
                    <Img id={t.images[0]} alt="" sizes="80px" className="aspect-[4/5]" position="50% 25%" />
                  </span>
                ))}
              </div>
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="display text-[19px] leading-tight text-slate sm:text-[22px]">{p.label}</p>
                  <p className="mt-1 text-[13px] text-ink-soft tabular-nums">{p.count} styles</p>
                </div>
                <span className={`grid size-10 shrink-0 place-items-center rounded-full transition-[background-color,color,transform] duration-300 group-hover:translate-x-1 ${i === picks.length - 1 ? 'bg-clay-deep text-white' : 'bg-fog text-slate group-hover:bg-slate group-hover:text-paper'}`}>
                  <Icon name="arrow" size={16} weight="bold" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
