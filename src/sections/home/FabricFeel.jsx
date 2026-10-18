import { useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { fabrics } from '../../data/content'
import { products } from '../../data/products'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { cn } from '../../lib/cn'

const counts = Object.fromEntries(fabrics.map((f) => [f.id, products.filter((p) => p.fabric === f.id).length]))

/**
 * Feel the fabric: pick a fabric on the left and its close-up opens on the right like a
 * swatch held to the light (it zooms out from close), with how it stretches, weighs and feels.
 */
export function FabricFeel() {
  const reduce = useReducedMotion()
  const [id, setId] = useState(fabrics[0].id)
  const f = fabrics.find((x) => x.id === id)

  return (
    <section className="shell pt-20 lg:pt-28" aria-labelledby="fabric-title">
      <div className="grid gap-8 rounded-[16px] bg-paper p-4 shadow-[0_1px_0_var(--color-line)] sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:p-12">
        <div className="flex flex-col">
          <h2 id="fabric-title" className="display text-[26px] text-slate sm:text-[36px]">
            Feel the fabric
          </h2>
          <p className="mt-3 max-w-[46ch] text-[15px] text-ink-soft">Five fabrics, chosen for how they feel on a long day. Tap one to see it up close.</p>

          <ul className="mt-7 space-y-1.5" role="tablist" aria-label="Fabrics">
            {fabrics.map((x) => {
              const on = x.id === id
              return (
                <li key={x.id}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setId(x.id)}
                    onMouseEnter={() => setId(x.id)}
                    className={cn('group relative flex w-full items-center justify-between rounded-[10px] px-4 py-3.5 text-left transition-colors duration-300', on ? 'text-paper' : 'text-slate hover:bg-fog')}
                  >
                    {on && <motion.span layoutId="fabric-pill" className="absolute inset-0 rounded-[10px] bg-slate" transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.45, bounce: 0.12 }} />}
                    <span className="caps relative text-[11.5px]">{x.title}</span>
                    <span className={cn('relative text-[13px] tabular-nums', on ? 'text-paper/75' : 'text-ink-soft')}>{counts[x.id]} styles</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] sm:items-center">
          <div className="relative overflow-hidden rounded-[14px] bg-fog">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={f.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.25 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              >
                <Img id={f.image} alt={`${f.title} close-up`} sizes="(min-width: 1024px) 26vw, 90vw" className="aspect-[4/5]" position="50% 40%" />
              </motion.div>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={f.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }}>
              <p className="display text-[22px] text-slate">{f.title}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{f.body}</p>
              <dl className="mt-5 grid grid-cols-3 gap-2 text-center">
                {[
                  ['Stretch', f.stretch],
                  ['Weight', f.weight],
                  ['Feel', f.feel],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-[10px] bg-fog px-2 py-3">
                    <dt className="caps text-[9px] text-ink-soft">{k}</dt>
                    <dd className="mt-1 text-[13px] leading-tight font-semibold text-slate">{v}</dd>
                  </div>
                ))}
              </dl>
              <Link to={`/shop?fabric=${encodeURIComponent(f.id)}`} className="group mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-slate">
                <span className="link-under">Shop {f.title.toLowerCase()}</span>
                <Icon name="arrow" size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
