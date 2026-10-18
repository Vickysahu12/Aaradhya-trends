import { Link } from 'react-router'
import { Icon } from './Icon'
import { cn } from '../../lib/cn'

// Each variant sets its resting colours and the colour that sweeps in from the left on hover.
const variants = {
  primary: '',
  clay: '[--btn-bg:var(--color-clay-deep)] [--btn-fg:#fff] [--btn-fill:var(--color-slate-deep)] [--btn-fill-fg:var(--color-paper)]',
  light: '[--btn-bg:var(--color-paper)] [--btn-fg:var(--color-slate)] [--btn-fill:var(--color-slate)] [--btn-fill-fg:var(--color-paper)]',
  outline: '[--btn-bg:transparent] [--btn-fg:var(--color-slate)] [--btn-ring:var(--color-slate)] [--btn-fill:var(--color-slate)] [--btn-fill-fg:var(--color-paper)]',
  'outline-light': '[--btn-bg:transparent] [--btn-fg:var(--color-paper)] [--btn-ring:rgb(251_251_252/0.75)] [--btn-fill:var(--color-paper)] [--btn-fill-fg:var(--color-slate)]',
  ghost: '[--btn-bg:var(--color-fog)] [--btn-fg:var(--color-slate)] [--btn-fill:var(--color-fog-deep)] [--btn-fill-fg:var(--color-slate)]',
}

const sizes = {
  sm: 'h-10 px-5 text-[11px]',
  md: 'h-12 px-7 text-[12px]',
  lg: 'h-14 px-9 text-[12.5px]',
}

/**
 * Button. On hover a second colour sweeps in from the left and the arrow (when `arrow`)
 * nudges right. Renders a router <Link> for `to`, an <a> for `href`, else a <button>.
 */
export function Button({ to, href, variant = 'primary', size = 'md', arrow, className, children, ...props }) {
  const classes = cn('btn', variants[variant], sizes[size], className)
  const content = (
    <>
      {children}
      {arrow && <Icon name="arrow" size={15} weight="bold" className="btn-arrow" />}
    </>
  )
  if (to) return <Link to={to} className={classes} {...props}>{content}</Link>
  if (href) return <a href={href} className={classes} {...props}>{content}</a>
  return <button type="button" className={classes} {...props}>{content}</button>
}
