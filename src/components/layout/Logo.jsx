import { Link } from 'react-router'
import { site } from '../../config/site'
import { cn } from '../../lib/cn'

// The client's logo (public/brand): the deco "A" mark beside the tracked wordmark.
// `light` turns both white for dark grounds; `stacked` puts the wordmark under the mark.
export function Logo({ className, light, stacked }) {
  return (
    <Link to="/" aria-label={`${site.name} home`} className={cn('press group inline-flex items-center gap-2.5', stacked && 'flex-col gap-3', className)}>
      <img src="/brand/mark.png" alt="" width={330} height={291} className={cn('h-9 w-auto transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-6 lg:h-10', light && 'brightness-0 invert', stacked && 'h-14 lg:h-16')} draggable={false} />
      <img src="/brand/wordmark.png" alt={site.name} width={298} height={74} className={cn('h-[26px] w-auto lg:h-[30px]', light && 'brightness-0 invert', stacked && 'h-8 lg:h-9')} draggable={false} />
    </Link>
  )
}
