import { useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { collectionTabs } from '../../data/content'
import { queryProducts } from '../../services/catalog'
import { ProductCard } from '../../features/product/ProductCard'
import { Button } from '../../components/ui/Button'
import { Icon } from '../../components/ui/Icon'
import { cn } from '../../lib/cn'

const viewAllFor = (q) => (q.category ? `/shop/${q.category}` : '/shop?sort=new')

/**
 * "Recommended for you": underlined tabs and a four-up carousel with round arrows, as in
 * the reference. The underline glides between tabs; cards re-enter on change.
 */
export function Recommended() {
  const [tab, setTab] = useState(collectionTabs[0].id)
  const reduce = useReducedMotion()
  const rail = useRef(null)
  const active = collectionTabs.find((t) => t.id === tab)
  const products = useMemo(() => queryProducts({ ...active.query, limit: 10 }), [active])

  const scroll = (dir) => {
    const el = rail.current
    const card = el?.querySelector('li')
    if (card) el.scrollBy({ left: dir * (card.offsetWidth + 16) * 2, behavior: 'smooth' })
  }

  return (
    <section className="pt-20 lg:pt-28" aria-labelledby="rec-title">
      <div className="shell flex flex-col items-center text-center">
        <p className="caps text-[11px] text-clay-deep">Picked for you</p>
        <h2 id="rec-title" className="display mt-3 text-[26px] text-slate sm:text-[36px]">
          Recommended for you
        </h2>
        <div role="tablist" aria-label="Collections" className="no-scrollbar mt-6 flex max-w-full gap-6 overflow-x-auto px-2">
          {collectionTabs.map((t) => {
            const selected = t.id === tab
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => {
                  setTab(t.id)
                  rail.current?.scrollTo({ left: 0 })
                }}
                className={cn('caps relative shrink-0 pb-2.5 text-[11px] transition-colors', selected ? 'text-slate' : 'text-ink-soft hover:text-slate')}
              >
                {t.label}
                {selected && <motion.span layoutId="rec-line" className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-clay" transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.4, bounce: 0 }} />}
              </button>
            )
          })}
        </div>
      </div>

      <div className="relative mx-auto mt-9 max-w-[1360px]">
        <ul ref={rail} className="no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:scroll-px-6 sm:px-6 lg:scroll-px-10 lg:px-10">
          {products.map((p, i) => (
            <li key={`${tab}-${p.id}`} className="anim-fade-up w-[46vw] shrink-0 snap-start sm:w-[31vw] lg:w-[calc((100%-48px)/4)]" style={{ '--delay': `${i * 50}ms` }}>
              <ProductCard product={p} sizes="(min-width: 1024px) 23vw, 46vw" />
            </li>
          ))}
        </ul>
        {[
          [-1, 'caret-left', 'Previous', 'left-3 lg:left-4'],
          [1, 'caret-right', 'Next', 'right-3 lg:right-4'],
        ].map(([d, icon, label, pos]) => (
          <button
            key={d}
            type="button"
            onClick={() => scroll(d)}
            aria-label={label}
            className={cn('press absolute top-[32%] hidden size-11 place-items-center rounded-full bg-paper text-slate shadow-float transition-colors hover:bg-slate hover:text-paper sm:grid', pos)}
          >
            <Icon name={icon} size={17} weight="bold" />
          </button>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button to={viewAllFor(active.query)} variant="outline" arrow>
          All products
        </Button>
      </div>
    </section>
  )
}
