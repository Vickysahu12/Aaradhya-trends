import { useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { testimonials } from '../../data/content'
import { getProductSync } from '../../services/catalog'
import { formatPrice } from '../../lib/format'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { cn } from '../../lib/cn'

/**
 * Customer notes (sample content): one large quote at a time with the piece she bought,
 * and a row of initials to jump between them.
 */
export function Testimonials() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const t = testimonials[index]
  const p = getProductSync(t.productId)
  const go = (i) => {
    setDir(i > index ? 1 : -1)
    setIndex((i + testimonials.length) % testimonials.length)
  }

  return (
    <section className="shell pt-20 lg:pt-28" aria-labelledby="notes-title">
      <div className="grid gap-8 rounded-[16px] bg-slate p-6 text-paper sm:p-10 lg:grid-cols-[1fr_260px] lg:items-center lg:gap-14 lg:p-14">
        <div className="overflow-hidden">
          <h2 id="notes-title" className="caps text-[11px] text-clay-soft">
            What our customers say
          </h2>
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.figure
              key={t.name}
              custom={dir}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -30 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="mt-5"
            >
              <span className="flex text-clay" aria-label={`${t.rating} out of 5`}>
                {Array.from({ length: 5 }, (_, k) => (
                  <Icon key={k} name="star" size={18} weight={k < t.rating ? 'fill' : 'regular'} />
                ))}
              </span>
              <blockquote className="mt-4 max-w-[34ch] text-[22px] leading-snug font-medium sm:text-[28px]">“{t.text}”</blockquote>
              <figcaption className="mt-5 text-[14px] text-paper/75">
                <span className="font-semibold text-paper">{t.name}</span>, {t.city}
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="mt-8 flex items-center gap-2">
            {testimonials.map((x, i) => (
              <button
                key={x.name}
                type="button"
                onClick={() => go(i)}
                aria-label={`Note from ${x.name}`}
                aria-current={i === index}
                className={cn('press grid size-10 place-items-center rounded-full text-[12px] font-bold transition-colors', i === index ? 'bg-clay text-white' : 'bg-paper/10 text-paper/80 hover:bg-paper/20')}
              >
                {x.name
                  .split(' ')
                  .map((w) => w[0])
                  .join('')}
              </button>
            ))}
            <span className="ml-auto flex gap-2">
              {[
                [-1, 'caret-left', 'Previous'],
                [1, 'caret-right', 'Next'],
              ].map(([d, icon, label]) => (
                <button key={d} type="button" onClick={() => go(index + d)} aria-label={label} className="press grid size-10 place-items-center rounded-full border border-paper/30 transition-colors hover:bg-paper hover:text-slate">
                  <Icon name={icon} size={16} weight="bold" />
                </button>
              ))}
            </span>
          </div>
        </div>

        <Link to={`/product/${p.slug}`} className="group block rounded-[14px] bg-paper p-3 text-ink">
          <Img key={p.id} id={p.images[0]} alt="" sizes="240px" className="anim-fade-in aspect-[4/5] rounded-[10px]" position="50% 25%" imgClassName="transition-transform duration-700 group-hover:scale-105" />
          <span className="caps mt-3 block text-[9.5px] text-ink-soft">She bought</span>
          <span className="mt-1 block truncate text-[14px] font-medium group-hover:text-clay-deep">{p.name}</span>
          <span className="block text-[14px] font-semibold text-slate tabular-nums">{formatPrice(p.price)}</span>
        </Link>
      </div>
      <p className="mt-3 text-center text-[12px] text-ink-soft">Sample customer notes for this demo store.</p>
    </section>
  )
}
