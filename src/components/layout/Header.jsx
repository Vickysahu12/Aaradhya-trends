import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { quickChips } from '../../config/navigation'
import { useCart } from '../../features/cart/CartContext'
import { useWishlist } from '../../features/wishlist/WishlistContext'
import { useSearch } from '../../features/search/SearchOverlay'
import { Icon } from '../ui/Icon'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { MegaNav, useIsActive } from './MegaNav'
import { cn } from '../../lib/cn'

/** Text utility link on desktop (as in the reference), icon on phones. */
function Utility({ icon, label, count, bumpKey, onClick, to, className, ...props }) {
  const Tag = to ? Link : 'button'
  return (
    <Tag
      {...(to ? { to } : { type: 'button', onClick })}
      aria-label={count ? `${label}, ${count} items` : label}
      className={cn('group press relative flex h-11 items-center gap-1.5 px-2 text-slate', className)}
      {...props}
    >
      <Icon name={icon} size={21} className="transition-transform duration-300 ease-[var(--ease-spring)] group-hover:-translate-y-0.5 xl:hidden" />
      <span className="caps link-line hidden text-[11px] xl:inline">{label}</span>
      {count > 0 && (
        <span
          key={bumpKey}
          className={cn(
            'grid h-[18px] min-w-[18px] place-items-center rounded-full bg-clay-deep px-1 text-[10.5px] font-bold text-white tabular-nums',
            'absolute top-1 right-0 xl:static',
            bumpKey ? 'anim-bump' : '',
          )}
        >
          {count}
        </span>
      )}
    </Tag>
  )
}

export function Header() {
  const cart = useCart()
  const wishlist = useWishlist()
  const { openSearch } = useSearch()
  const isActive = useIsActive()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const sentinel = useRef(null)

  // A 1px sentinel above the header tells us when the page has scrolled, without a scroll listener.
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting))
    if (sentinel.current) io.observe(sentinel.current)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="h-px" />
      <header
        className={cn(
          'sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-300',
          scrolled ? 'border-transparent bg-paper/90 shadow-[0_12px_30px_-24px_rgb(38_50_74/0.55)] backdrop-blur-xl' : 'border-line bg-paper',
        )}
      >
        <div className="shell grid h-16 grid-cols-[1fr_auto_1fr] items-center lg:h-[76px]">
          <div className="flex items-center">
            <button type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu" className="press -ml-2 grid size-11 place-items-center text-slate lg:hidden">
              <Icon name="menu" size={24} />
            </button>
            <MegaNav />
          </div>

          <Logo className="justify-self-center" />

          <div className="flex items-center justify-end gap-0.5 xl:gap-2">
            <Utility icon="search" label="Search" onClick={openSearch} />
            <Utility icon="user" label="Account" to="/account" className="hidden sm:flex" />
            <Utility icon="heart" label="Wishlist" to="/wishlist" count={wishlist.count} className="hidden sm:flex" />
            <Utility icon="bag" label="Bag" count={cart.count} bumpKey={cart.addedAt} onClick={() => cart.setOpen(true)} className="-mr-2" data-bag-target="" />
          </div>
        </div>

        {/* Phones: swipeable chips */}
        <nav aria-label="Categories" className="lg:hidden">
          <ul className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-3 sm:px-6">
            {quickChips.map((c) => {
              const active = isActive(c.to)
              return (
                <li key={c.label} className="shrink-0">
                  <Link
                    to={c.to}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'press flex h-9 items-center rounded-full border px-4 text-[13px] font-medium transition-colors duration-200',
                      active ? 'border-slate bg-slate text-paper' : c.accent ? 'border-clay/40 bg-clay-soft text-clay-deep' : 'border-line-strong text-slate',
                    )}
                  >
                    {c.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
