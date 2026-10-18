import { useId, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { site } from '../../config/site'
import { perks } from '../../data/content'
import { subscribe } from '../../services/newsletter'
import { Icon } from '../ui/Icon'
import { Logo } from './Logo'

const YEAR = new Date().getFullYear()
const PAYMENTS = ['UPI', 'Visa', 'Mastercard', 'RuPay', 'COD']
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Newsletter() {
  const id = useId()
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle') // idle | sending | done
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!EMAIL.test(email.trim())) return setError('Please enter a valid email.')
    setError('')
    setState('sending')
    await subscribe(email.trim())
    setState('done')
  }

  if (state === 'done') {
    return (
      <p role="status" className="anim-fade-up flex items-center justify-center gap-2 rounded-[10px] bg-paper/10 px-5 py-4 text-[15px] font-medium text-clay-soft">
        <Icon name="check-circle" size={20} weight="fill" /> You are on the list. Your 15% code is on its way.
      </p>
    )
  }
  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <div className="flex gap-2 rounded-[12px] bg-paper p-1.5 transition-shadow focus-within:shadow-[0_0_0_4px_rgb(196_124_93/0.45)]">
        <input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          aria-invalid={Boolean(error)}
          className="h-11 min-w-0 flex-1 bg-transparent px-3 text-[15px] text-ink outline-none placeholder:text-ink-soft"
        />
        <button type="submit" disabled={state === 'sending'} className="btn h-11 px-5 text-[11px] [--btn-bg:var(--color-clay-deep)] [--btn-fill:var(--color-slate-deep)]">
          {state === 'sending' ? 'Joining' : 'Join'}
          <Icon name="arrow" size={14} weight="bold" className="btn-arrow" />
        </button>
      </div>
      <p role="alert" className="mt-2 min-h-5 text-[13px] text-clay-soft">
        {error}
      </p>
    </form>
  )
}

export function Footer() {
  // The home page shows the perks right under the hero, so the footer skips them there.
  const { pathname } = useLocation()
  return (
    <footer className="mt-24 lg:mt-32">
      <ul hidden={pathname === '/'} className="shell grid grid-cols-2 gap-x-4 gap-y-8 border-y border-line py-10 lg:grid-cols-4">
        {perks.map((s) => (
          <li key={s.title} className="group flex flex-col items-center text-center">
            <span className="grid size-14 place-items-center rounded-full border border-line-strong text-clay-deep transition-[transform,background-color,color,border-color] duration-500 ease-[var(--ease-spring)] group-hover:-translate-y-1 group-hover:border-clay-deep group-hover:bg-clay-deep group-hover:text-white">
              <Icon name={s.icon} size={24} />
            </span>
            <span className="caps mt-3 text-[11px] text-slate">{s.title}</span>
            <span className="mt-1 text-[13px] text-ink-soft">{s.body}</span>
          </li>
        ))}
      </ul>

      <div className="mt-16 bg-slate-deep text-paper">
        <div className="shell flex flex-col items-center py-14 text-center lg:py-20">
          <Logo light stacked />
          <p className="display mt-8 max-w-[22ch] text-[24px] leading-snug sm:text-[30px]">Join for 15% off your first order</p>
          <p className="mt-3 max-w-[46ch] text-[14px] text-paper/70">New drops, restocks and members-only sales. Two letters a month, no more.</p>
          <div className="mt-6 w-full max-w-[440px] text-left">
            <Newsletter />
          </div>
        </div>

        <div className="shell grid grid-cols-2 gap-x-6 gap-y-10 border-t border-paper/12 py-12 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <p className="max-w-[30ch] text-[14px] leading-relaxed text-paper/70">{site.footer.blurb}</p>
            <ul className="mt-5 flex gap-2">
              {site.footer.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="press grid size-10 place-items-center rounded-full border border-paper/20 transition-[background-color,border-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-clay hover:bg-clay hover:text-white"
                  >
                    <Icon name={s.icon} size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {site.footer.columns.map((col) => (
            <div key={col.title}>
              <h3 className="caps text-[11px] text-clay">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="link-line text-[14px] text-paper/75 transition-colors hover:text-paper">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="shell flex flex-col gap-4 border-t border-paper/12 py-5 text-[12px] text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {YEAR} {site.name}. Demo storefront: prices, reviews and orders are sample data.
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Payment methods">
            {PAYMENTS.map((p) => (
              <li key={p} className="rounded-[6px] border border-paper/20 px-2.5 py-1 text-paper/80">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
