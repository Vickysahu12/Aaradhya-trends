import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { lookbook } from '../../data/content'
import { queryProducts } from '../../services/catalog'
import { useCart } from '../../features/cart/CartContext'
import { useToast } from '../../features/toast/Toast'
import { formatPrice } from '../../lib/format'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { Button } from '../../components/ui/Button'
import { CopyCode } from '../../components/ui/CopyCode'
import { cn } from '../../lib/cn'

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

/**
 * Pick any 3 tees: tap tees on the shelf to drop them into three slots (tap a slot to take
 * one out), choose sizes, and add the trio in one go. The code TRIO takes ₹300 off.
 */
export function TeeTrio() {
  const reduce = useReducedMotion()
  const { add, setOpen } = useCart()
  const { show } = useToast()
  const tees = useMemo(() => queryProducts({ category: 'tees' }), [])
  const [picked, setPicked] = useState([]) // [{ id, size }]
  const full = picked.length >= lookbook.slots
  const total = picked.reduce((s, x) => s + tees.find((t) => t.id === x.id).price, 0)

  const toggle = (id) =>
    setPicked((prev) => (prev.some((x) => x.id === id) ? prev.filter((x) => x.id !== id) : prev.length < lookbook.slots ? [...prev, { id, size: 'M' }] : prev))

  const addAll = () => {
    picked.forEach((x) => add(x.id, x.size))
    show({ title: '3 tees added to bag', body: 'Use code TRIO at checkout for ₹300 off', action: { label: 'View bag', onClick: () => setOpen(true) } })
    setPicked([])
  }

  return (
    <section className="pt-20 lg:pt-28" aria-labelledby="trio-title">
      <div className="bg-clay-soft py-14 lg:py-20">
        <div className="shell">
          <div className="flex flex-col items-center text-center">
            <h2 id="trio-title" className="display text-[26px] text-slate sm:text-[36px]">
              {lookbook.title}
            </h2>
            <p className="mt-3 max-w-[52ch] text-[15px] text-ink-soft">{lookbook.sub}</p>
          </div>

          {/* The three slots */}
          <div className="mx-auto mt-9 grid max-w-[720px] grid-cols-3 gap-3 sm:gap-5">
            {Array.from({ length: lookbook.slots }, (_, i) => {
              const x = picked[i]
              const t = x && tees.find((p) => p.id === x.id)
              return (
                <div key={i} className="flex flex-col">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] border-2 border-dashed border-clay/50 bg-paper/60">
                    <AnimatePresence>
                      {t ? (
                        <motion.button
                          key={t.id}
                          type="button"
                          onClick={() => toggle(t.id)}
                          aria-label={`Remove ${t.name}`}
                          className="group absolute inset-0"
                          initial={reduce ? { opacity: 0 } : { opacity: 0, y: -30, rotate: -6, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
                          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                        >
                          <Img id={t.images[0]} alt="" sizes="220px" className="h-full w-full" position="50% 25%" />
                          <span className="absolute top-2 right-2 grid size-8 place-items-center rounded-full bg-paper/95 text-slate shadow-float transition-colors group-hover:bg-danger group-hover:text-white">
                            <Icon name="close" size={14} weight="bold" />
                          </span>
                        </motion.button>
                      ) : (
                        <motion.span key="empty" className="absolute inset-0 grid place-items-center text-center text-clay-deep" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <span>
                            <Icon name="tshirt" size={30} className="mx-auto" />
                            <span className="caps mt-2 block text-[10px]">Tee {i + 1}</span>
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <label className={cn('mt-2 flex items-center justify-center gap-2 text-[12px] text-ink-soft', !t && 'invisible')}>
                    Size
                    <select
                      value={x?.size ?? 'M'}
                      onChange={(e) => setPicked((prev) => prev.map((p, k) => (k === i ? { ...p, size: e.target.value } : p)))}
                      tabIndex={t ? 0 : -1}
                      className="h-8 rounded-[8px] border border-line-strong bg-paper px-2 text-[13px] font-semibold text-slate outline-none focus:border-slate"
                    >
                      {SIZES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </label>
                </div>
              )
            })}
          </div>

          <div className="mx-auto mt-6 flex max-w-[720px] flex-col items-center justify-between gap-4 rounded-[14px] bg-paper p-4 sm:flex-row">
            <p className="text-[14px] text-ink-soft">
              {picked.length} of {lookbook.slots} picked
              <span key={total} className="anim-fade-in ml-3 empty:hidden text-[18px] font-semibold text-slate tabular-nums">
                {picked.length > 0 && formatPrice(total)}
              </span>
              {full && <span className="ml-2 text-[13px] text-clay-deep">then ₹300 off with</span>}
            </p>
            <div className="flex items-center gap-2">
              {full && <CopyCode code={lookbook.code} />}
              <Button onClick={addAll} disabled={!full}>
                Add trio
              </Button>
            </div>
          </div>
        </div>

        {/* The shelf */}
        <ul className="no-scrollbar mx-auto mt-8 flex max-w-[1360px] snap-x scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 sm:scroll-px-6 sm:px-6 lg:scroll-px-10 lg:px-10">
          {tees.map((t) => {
            const on = picked.some((x) => x.id === t.id)
            return (
              <li key={t.id} className="w-[34vw] shrink-0 snap-start sm:w-[170px]">
                <button
                  type="button"
                  onClick={() => toggle(t.id)}
                  aria-pressed={on}
                  disabled={!on && full}
                  className={cn('group block w-full text-left transition-opacity disabled:opacity-40')}
                >
                  <span className={cn('relative block overflow-hidden rounded-[12px] ring-offset-2 ring-offset-clay-soft transition-[box-shadow,transform] duration-300 group-enabled:group-hover:-translate-y-1', on && 'ring-2 ring-slate')}>
                    <Img id={t.images[0]} alt="" sizes="170px" className="aspect-[4/5]" position="50% 25%" />
                    <span className={cn('absolute top-2 left-2 grid size-7 place-items-center rounded-full transition-[background-color,color] duration-300', on ? 'bg-slate text-paper' : 'bg-paper/90 text-slate')}>
                      <Icon name={on ? 'check' : 'plus'} size={14} weight="bold" />
                    </span>
                  </span>
                  <span className="mt-2 block truncate text-[13px] font-medium">{t.name}</span>
                  <span className="block text-[13px] font-semibold text-slate tabular-nums">{formatPrice(t.price)}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
