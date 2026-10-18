import { useRef } from 'react'
import { Link } from 'react-router'
import { motion, useMotionValue, useReducedMotion, useTransform, animate } from 'motion/react'
import { homeToOut } from '../../data/content'
import { getProductSync } from '../../services/catalog'
import { formatPrice } from '../../lib/format'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'

/**
 * Sofa to café: two looks stacked in one frame. Drag the handle (or use the arrow keys)
 * to wipe between them; on first view the handle nudges once to show it can move.
 */
export function HomeToOut() {
  const reduce = useReducedMotion()
  const box = useRef(null)
  const pos = useMotionValue(50) // percent of width showing the "out" look from the right
  const clip = useTransform(pos, (v) => `inset(0 0 0 ${v}%)`)
  const left = useTransform(pos, (v) => `${v}%`)
  const home = getProductSync(homeToOut.home.productId)
  const out = getProductSync(homeToOut.out.productId)

  const setFromX = (clientX) => {
    const r = box.current.getBoundingClientRect()
    pos.set(Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100)))
  }

  const onKey = (e) => {
    if (e.key === 'ArrowLeft') pos.set(Math.max(4, pos.get() - 5))
    if (e.key === 'ArrowRight') pos.set(Math.min(96, pos.get() + 5))
  }

  return (
    <section className="shell pt-20 lg:pt-28" aria-labelledby="h2o-title">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,560px)] lg:gap-16">
        <div>
          <h2 id="h2o-title" className="display text-[26px] text-slate sm:text-[36px]">
            {homeToOut.title}
          </h2>
          <p className="mt-3 max-w-[44ch] text-[15px] text-ink-soft">{homeToOut.sub}</p>
          <ul className="mt-7 space-y-2">
            {[
              [homeToOut.home.label, home],
              [homeToOut.out.label, out],
            ].map(([label, p]) => (
              <li key={label}>
                <Link to={`/product/${p.slug}`} className="group flex items-center gap-4 rounded-[12px] bg-paper p-2.5 pr-4 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-float">
                  <Img id={p.images[0]} alt="" sizes="64px" className="h-20 w-16 shrink-0 rounded-[10px]" position="50% 30%" />
                  <span className="min-w-0 flex-1">
                    <span className="caps block text-[9.5px] text-clay-deep">{label}</span>
                    <span className="mt-1 block truncate text-[15px] font-medium">{p.name}</span>
                    <span className="block text-[14px] font-semibold text-slate tabular-nums">{formatPrice(p.price)}</span>
                  </span>
                  <Icon name="arrow" size={16} weight="bold" className="text-slate transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          ref={box}
          className="relative mx-auto aspect-[4/5] w-full max-w-[460px] touch-pan-y overflow-hidden rounded-[16px] bg-fog-deep select-none"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId)
            setFromX(e.clientX)
          }}
          onPointerMove={(e) => e.buttons === 1 && setFromX(e.clientX)}
          onViewportEnter={() => {
            if (reduce) return
            animate(pos, [50, 34, 66, 50], { duration: 1.6, ease: 'easeInOut' })
          }}
          viewport={{ once: true, amount: 0.6 }}
        >
          <Img id={homeToOut.home.image} alt={home.name} sizes="460px" className="absolute! inset-0" position="50% 30%" />
          <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
            <Img id={homeToOut.out.image} alt={out.name} sizes="460px" className="absolute! inset-0" position="50% 30%" />
          </motion.div>

          <span className="caps pointer-events-none absolute top-3 left-3 rounded-[6px] bg-paper/90 px-2 py-1 text-[9.5px] text-slate">{homeToOut.home.label}</span>
          <span className="caps pointer-events-none absolute top-3 right-3 rounded-[6px] bg-slate px-2 py-1 text-[9.5px] text-paper">{homeToOut.out.label}</span>

          <motion.div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-paper" style={{ left }}>
            <button
              type="button"
              role="slider"
              aria-label="Compare home and out looks"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={50}
              onKeyDown={onKey}
              className="pointer-events-auto absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-paper text-slate shadow-lift transition-transform duration-200 hover:scale-110 active:scale-95"
            >
              <Icon name="arrows-h" size={20} weight="bold" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
