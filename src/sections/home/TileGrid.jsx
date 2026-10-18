import { Link } from 'react-router'
import { tiles } from '../../data/content'
import { useReveal } from '../../hooks/useReveal'
import { Img } from '../../components/ui/Img'
import { cn } from '../../lib/cn'

function TileText({ t, light = true }) {
  return (
    <>
      <span className={cn('caps block text-[9.5px] sm:text-[10.5px]', light ? 'text-clay-soft' : 'text-clay-deep')}>{t.kicker}</span>
      <span className={cn('display mt-2 block text-[18px] leading-tight sm:text-[24px]', light ? 'text-paper' : 'text-slate')}>{t.title}</span>
      <span
        className={cn(
          'btn btn-group mt-4 h-9 px-4 text-[10px] sm:h-10 sm:px-5 sm:text-[10.5px]',
          light
            ? '[--btn-bg:var(--color-paper)] [--btn-fg:var(--color-slate)] [--btn-fill:var(--color-clay-deep)] [--btn-fill-fg:#fff]'
            : '[--btn-bg:var(--color-slate)] [--btn-fg:var(--color-paper)] [--btn-fill:var(--color-clay-deep)] [--btn-fill-fg:#fff]',
        )}
      >
        Shop now
      </span>
    </>
  )
}

/**
 * The reference's tile grid, three over two. Top tiles are photos with the text on them;
 * the two wide tiles split into photo and a coloured panel (the client's photos are small,
 * so they never stretch wider than they were shot). Hovering a tile leans the photo in and
 * sweeps the button.
 */
export function TileGrid() {
  const ref = useReveal()
  return (
    <section ref={ref} className="shell pt-12 lg:pt-16" aria-label="Collections">
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6">
        {tiles.map((t, i) =>
          t.wide ? (
            <li key={t.id} className="col-span-2 lg:col-span-3">
              <Link
                to={t.to}
                className={cn('group grid h-full grid-cols-2 overflow-hidden rounded-[14px]', i % 2 ? 'bg-slate' : 'bg-clay-soft')}
                data-reveal-frame
                style={{ '--reveal-delay': `${i * 80}ms` }}
              >
                <Img id={t.image} alt="" sizes="(min-width: 1024px) 24vw, 50vw" className={cn('aspect-[4/5] h-full', i % 2 && 'order-2')} position={t.focus} imgClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]" />
                <span className="flex flex-col items-start justify-end p-4 sm:p-7">
                  <TileText t={t} light={Boolean(i % 2)} />
                </span>
              </Link>
            </li>
          ) : (
            <li key={t.id} className={cn(i === 0 ? 'col-span-2 lg:col-span-2' : 'lg:col-span-2')}>
              <Link to={t.to} className="group relative block h-full overflow-hidden rounded-[14px]" data-reveal-frame style={{ '--reveal-delay': `${i * 80}ms` }}>
                <Img
                  id={t.image}
                  alt=""
                  sizes="(min-width: 1024px) 32vw, 50vw"
                  className={cn(i === 0 ? 'aspect-[4/3.4] sm:aspect-[16/12] lg:aspect-[4/4.4]' : 'aspect-[4/5] lg:aspect-[4/4.4]')}
                  position={t.focus}
                  imgClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-slate-deep/75 via-slate-deep/10 to-transparent" aria-hidden="true" />
                <span className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
                  <TileText t={t} />
                </span>
              </Link>
            </li>
          ),
        )}
      </ul>
    </section>
  )
}
