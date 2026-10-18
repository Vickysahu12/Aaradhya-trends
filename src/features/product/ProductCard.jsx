import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { useCart } from '../cart/CartContext'
import { useToast } from '../toast/Toast'
import { getSiblings } from '../../services/catalog'
import { imageSet } from '../../data/media'
import { flyToCart } from '../../lib/flyToCart'
import { formatPrice, discountOf } from '../../lib/format'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { HeartButton } from '../wishlist/HeartButton'
import { cn } from '../../lib/cn'

/**
 * Product tile in the reference's layout: photo on a soft ground, then a centred caption
 * with stars, price and colour swatches. Hovering a swatch previews that colour in the
 * photo; hovering the photo (pointer devices) shows the close crop and a size bar that
 * slides up. Adding a size flies the photo into the bag.
 */
export function ProductCard({ product, sizes = '(min-width: 1024px) 23vw, 50vw', priority, className }) {
  const { add, setOpen } = useCart()
  const { show } = useToast()
  const [preview, setPreview] = useState(null) // sibling product shown on swatch hover
  const [picking, setPicking] = useState(false)
  const frame = useRef(null)
  const discount = discountOf(product)
  const href = `/product/${product.slug}`
  const siblings = getSiblings(product)
  const shown = preview ?? product

  const quickAdd = (size) => {
    add(product.id, size)
    setPicking(false)
    flyToCart(frame.current, imageSet(product.images[0]).src)
    show({
      title: 'Added to bag',
      body: `${product.name}, size ${size}`,
      image: product.images[0],
      action: { label: 'View bag', onClick: () => setOpen(true) },
    })
  }

  return (
    <article className={cn('group relative', className)} onMouseLeave={() => setPicking(false)}>
      <div ref={frame} className="relative overflow-hidden rounded-[14px] bg-fog-deep">
        <Link to={`/product/${shown.slug}`} className="block" aria-label={shown.name}>
          <Img
            key={shown.id}
            id={shown.images[0]}
            alt={`${shown.name} in ${shown.color.toLowerCase()}`}
            sizes={sizes}
            priority={priority}
            className="aspect-[4/5]"
            position="50% 30%"
            imgClassName="transition-transform duration-[1200ms] ease-out hover-device:group-hover:scale-[1.04]"
          />
          {!preview && (
            <Img
              id={product.images[1]}
              alt=""
              sizes={sizes}
              className="absolute! inset-0 opacity-0 transition-opacity duration-500 hover-device:group-hover:opacity-100"
              position="50% 30%"
            />
          )}
        </Link>

        {(product.badge || discount > 0 || product.isNew) && (
          <span
            className={cn(
              'caps pointer-events-none absolute top-3 left-3 rounded-[6px] px-2 py-1 text-[9.5px]',
              discount > 0 ? 'bg-clay-deep text-white' : 'bg-paper text-slate',
            )}
          >
            {discount > 0 ? `${discount}% off` : product.badge ?? 'New'}
          </span>
        )}

        <HeartButton product={product} className="absolute top-2 right-2 transition-[opacity,transform] duration-300 hover-device:translate-y-1 hover-device:opacity-0 hover-device:group-hover:translate-y-0 hover-device:group-hover:opacity-100 has-[[aria-pressed=true]]:opacity-100" />

        {/* Size bar: slides up from the bottom edge */}
        <div
          className={cn(
            'absolute inset-x-2 bottom-2 rounded-[10px] bg-paper/95 p-1.5 shadow-float backdrop-blur-md transition-[opacity,transform] duration-300 ease-[var(--ease-out)]',
            picking ? 'translate-y-0 opacity-100' : 'translate-y-[115%] opacity-0 hover-device:group-hover:translate-y-0 hover-device:group-hover:opacity-100',
          )}
        >
          <div className="grid grid-cols-6 gap-0.5">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => quickAdd(s)}
                className="press h-9 rounded-[7px] text-[12px] font-semibold text-slate transition-colors hover:bg-slate hover:text-paper"
                aria-label={`Add ${product.name}, size ${s}, to bag`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Touch devices: a button opens the size bar */}
        <button
          type="button"
          onClick={() => setPicking((p) => !p)}
          aria-label={`Quick add ${product.name}`}
          aria-expanded={picking}
          className={cn('press absolute right-2 bottom-2 grid size-10 place-items-center rounded-full bg-slate text-paper shadow-float hover-device:hidden', picking && 'hidden')}
        >
          <Icon name="bag" size={18} />
        </button>
      </div>

      <div className="px-1 pt-3.5 text-center">
        <p className="caps text-[9.5px] text-ink-soft">{product.fabric}</p>
        <Link to={href} className="mt-1 block">
          <h3 className="line-clamp-1 text-[15px] font-medium text-ink transition-colors group-hover:text-clay-deep">{product.name}</h3>
        </Link>
        <p className="mt-1 flex items-center justify-center gap-1 text-[12px] text-ink-soft">
          <span className="flex text-clay" aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => (
              <Icon key={i} name="star" size={11} weight={i < Math.round(product.rating) ? 'fill' : 'regular'} />
            ))}
          </span>
          <span className="tabular-nums">({product.reviews})</span>
        </p>
        <p className="mt-1.5 flex flex-wrap items-baseline justify-center gap-x-2 text-[15px]">
          {product.compareAt && <span className="text-[13px] text-ink-soft tabular-nums line-through">{formatPrice(product.compareAt)}</span>}
          <span className={cn('font-semibold tabular-nums', product.compareAt ? 'text-clay-deep' : 'text-slate')}>{formatPrice(product.price)}</span>
        </p>
        {siblings.length > 1 && (
          <ul className="mt-2.5 flex items-center justify-center gap-1.5" aria-label={`${siblings.length} colours`} onMouseLeave={() => setPreview(null)}>
            {siblings.map((s) => (
              <li key={s.id}>
                <Link
                  to={`/product/${s.slug}`}
                  aria-label={s.color}
                  onMouseEnter={() => setPreview(s.id === product.id ? null : s)}
                  onFocus={() => setPreview(s.id === product.id ? null : s)}
                  className={cn(
                    'block size-[18px] rounded-full ring-offset-2 ring-offset-fog transition-[box-shadow,transform] duration-200 hover:scale-110',
                    s.id === shown.id ? 'ring-[1.5px] ring-slate' : 'ring-1 ring-line-strong',
                  )}
                  style={{ backgroundColor: s.hex }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

export function ProductCardSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="aspect-[4/5] animate-pulse rounded-[14px] bg-fog-deep" />
      <div className="mx-auto mt-3.5 h-2.5 w-1/3 rounded-full bg-fog-deep" />
      <div className="mx-auto mt-2 h-3.5 w-3/4 rounded-full bg-fog-deep" />
      <div className="mx-auto mt-2 h-3.5 w-1/3 rounded-full bg-fog-deep" />
    </div>
  )
}
