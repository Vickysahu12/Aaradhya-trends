import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { heroSlides } from '../../data/content'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/cn'

const DURATION = 6500
const ease = [0.23, 1, 0.32, 1]

/**
 * Full-width photo slider with the message centred over it, like the reference.
 * Each slide joins three portrait looks edge to edge (just the middle one on phones).
 * The active dot fills as a timer; when it finishes the next slide comes in. Hovering pauses it,
 * arrows and dots jump, and a horizontal swipe works on touch.
 */
export function HeroSlider() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const startX = useRef(null)
  const slide = heroSlides[index]
  const count = heroSlides.length

  const go = (next, d = next > index ? 1 : -1) => {
    setDir(d)
    setIndex((next + count) % count)
  }

  return (
    <section
      className="group/hero relative h-[560px] overflow-hidden bg-slate-deep sm:h-[clamp(520px,46vw,680px)]"
      aria-roledescription="carousel"
      aria-label="Featured collections"
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => {
        if (startX.current == null) return
        const dx = e.clientX - startX.current
        startX.current = null
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1)
      }}
    >
      {/* Photos: crossfade with a slow settle from a slight zoom */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          className="absolute inset-0 grid grid-cols-1 sm:grid-cols-3"
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: 'easeOut' } }}
          transition={{ opacity: { duration: 0.9, ease: 'easeOut' }, scale: { duration: 1.6, ease } }}
          aria-hidden="true"
        >
          {slide.images.map((id, k) => (
            <Img
              key={id}
              id={id}
              alt=""
              sizes="(min-width: 640px) 34vw, 100vw"
              priority={index === 0}
              className={cn('h-full w-full', k !== 1 && 'hidden sm:block')}
              position="50% 30%"
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Scrim: darker through the middle and at the foot so white type always reads */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgb(38_50_74/0.55),rgb(38_50_74/0.18)_70%,transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-deep/60 to-transparent" />

      {/* Message */}
      <div className="absolute inset-0 grid place-items-center px-6 text-center text-paper">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={slide.id} className="max-w-[720px]" initial="out" animate="in" exit="gone" transition={{ staggerChildren: 0.08, delayChildren: 0.15 }}>
            {[
              <p key="k" className="caps text-[11px] text-clay-soft sm:text-[12px]">
                {slide.kicker}
              </p>,
              <h1 key="t" id={index === 0 ? 'hero-title' : undefined} className="display mt-4 text-[38px] leading-[1.08] [text-shadow:0_2px_24px_rgb(28_34_51/0.35)] sm:text-[58px] lg:text-[72px]">
                {slide.title}
              </h1>,
              <p key="s" className="mx-auto mt-4 max-w-[44ch] text-[15px] text-paper/85 sm:text-[17px]">
                {slide.sub}
              </p>,
              <div key="c" className="mt-8">
                <Button to={slide.cta.to} variant="light" size="lg" arrow>
                  {slide.cta.label}
                </Button>
              </div>,
            ].map((el) => (
              <motion.div
                key={el.key}
                variants={{
                  out: reduce ? { opacity: 0 } : { opacity: 0, y: dir * 18, filter: 'blur(4px)' },
                  in: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease } },
                  gone: { opacity: 0, transition: { duration: 0.25 } },
                }}
              >
                {el}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      {[
        [-1, 'caret-left', 'Previous slide', 'left-4 lg:left-8'],
        [1, 'caret-right', 'Next slide', 'right-4 lg:right-8'],
      ].map(([d, icon, label, pos]) => (
        <button
          key={d}
          type="button"
          onClick={() => go(index + d, d)}
          aria-label={label}
          className={cn(
            'press absolute top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-paper/40 bg-paper/10 text-paper backdrop-blur-sm transition-[background-color,color,border-color] duration-300 hover:border-paper hover:bg-paper hover:text-slate sm:grid',
            pos,
          )}
        >
          <Icon name={icon} size={18} weight="bold" />
        </button>
      ))}

      {/* Counter and timed dots */}
      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-4 sm:bottom-8">
        <span className="caps w-12 text-right text-[10.5px] text-paper/75 tabular-nums">0{index + 1}</span>
        <div className="flex gap-2">
          {heroSlides.map((s, i) => (
            <button key={s.id} type="button" onClick={() => go(i)} aria-label={`Slide ${i + 1}: ${s.title}`} aria-current={i === index} className="group/dot py-3">
              <span className="block h-[3px] w-10 overflow-hidden rounded-full bg-paper/30 transition-colors group-hover/dot:bg-paper/50 sm:w-14">
                {i === index && (
                  <span
                    key={`${s.id}-${index}`}
                    className="block h-full origin-left rounded-full bg-paper group-hover/hero:[animation-play-state:paused]"
                    style={reduce ? undefined : { animation: `progress ${DURATION}ms linear forwards` }}
                    onAnimationEnd={() => go(index + 1, 1)}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
        <span className="caps w-12 text-[10.5px] text-paper/50 tabular-nums">0{count}</span>
      </div>
    </section>
  )
}
