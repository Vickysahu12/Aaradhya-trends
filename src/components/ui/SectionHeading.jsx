import { Link } from 'react-router'
import { Icon } from './Icon'
import { cn } from '../../lib/cn'

/**
 * Section title in deco capitals, centred by default like the reference. An optional
 * `kicker` sits above (used sparingly) and an optional link sits below.
 */
export function SectionHeading({ title, kicker, sub, link, id, className, align = 'center', light }) {
  const center = align === 'center'
  return (
    <div className={cn('flex flex-col gap-3', center ? 'items-center text-center' : 'items-start', className)}>
      {kicker && <p className={cn('caps text-[11px]', light ? 'text-clay-soft' : 'text-clay-deep')}>{kicker}</p>}
      <h2 id={id} className={cn('display text-[26px] sm:text-[36px]', light ? 'text-paper' : 'text-slate')}>
        {title}
      </h2>
      {sub && <p className={cn('max-w-[54ch] text-[15px]', light ? 'text-paper/75' : 'text-ink-soft')}>{sub}</p>}
      {link && (
        <Link to={link.to} className={cn('group mt-1 inline-flex items-center gap-1.5 text-[14px] font-semibold', light ? 'text-paper' : 'text-slate')}>
          <span className="link-under">{link.label}</span>
          <Icon name="arrow" size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  )
}

/** Page title for inner pages. */
export function PageTitle({ title, sub, className, children }) {
  return (
    <div className={cn('pb-6', className)}>
      <h1 className="display text-[32px] text-slate sm:text-[44px]">{title}</h1>
      {sub && <p className="mt-2 text-[15px] text-ink-soft">{sub}</p>}
      {children}
    </div>
  )
}
