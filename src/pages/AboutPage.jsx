import { Link } from 'react-router'
import { categories, fabrics } from '../data/content'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useReveal } from '../hooks/useReveal'
import { Img } from '../components/ui/Img'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'

const STEPS = [
  { title: 'Fabric first', body: 'Every piece starts with how it should feel at 11pm on the sofa: jersey for tees, rib for sets, Lycra for leggings. If it does not pass the couch test, it does not make the cut.', image: 'a02-2' },
  { title: 'Fits for real days', body: 'Elastic waists with a drawcord, pockets deep enough for a phone, and lengths that work from XS to XXL. We fit every pattern on people, not mannequins.', image: 'a13-2' },
  { title: 'Priced to buy two', body: 'Everything sits between ₹899 and ₹1,999, and tees, shorts and leggings come as packs of 2 for 15% less. Comfort should not be a splurge.', image: 'a24-2' },
]

export function AboutPage() {
  useDocumentTitle('Our Story')
  const ref = useReveal()

  return (
    <div ref={ref}>
      <section className="px-2 pt-2 lg:px-3">
        <div className="overflow-hidden rounded-[14px] bg-slate text-paper">
          <div className="shell grid items-center gap-10 py-12 lg:grid-cols-[1fr_1fr] lg:py-16">
            <div>
              <p className="caps text-[11px] text-clay-soft">Our story</p>
              <h1 className="display mt-4 text-[40px] leading-[1.05] sm:text-[60px]">
                Comfort you can <span className="swash anim-swash">step out</span> in
              </h1>
              <p className="mt-6 max-w-[48ch] text-[17px] leading-relaxed text-paper/80">
                Aaradhya Trends makes loungewear, tees and easy pants for women who live in comfy clothes and still want to look put together. The same set you wear to sleep should get you through a café run.
              </p>
              <Button to="/shop" variant="clay" size="lg" className="mt-8" arrow>
                Shop the collection
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Img id="a16-1" alt="A woman in an olive polo lounge set" sizes="(min-width: 1024px) 24vw, 50vw" className="aspect-[4/5] rotate-[-3deg] rounded-[14px]" position="50% 25%" />
              <Img id="a19-1" alt="A woman in a palm print oversized tee" sizes="(min-width: 1024px) 24vw, 50vw" className="mt-12 aspect-[4/5] rotate-[3deg] rounded-[14px]" position="50% 25%" />
            </div>
          </div>
        </div>
      </section>

      <section id="craft" className="shell scroll-mt-32 pt-24 lg:pt-32">
        <h2 className="display text-[30px] text-slate sm:text-[44px]">How we make it</h2>
        <ul className="mt-10 space-y-6">
          {STEPS.map((c, i) => (
            <li key={c.title} className="grid items-center gap-6 rounded-[16px] bg-paper p-4 sm:grid-cols-[240px_1fr] sm:gap-10 sm:p-5">
              <div className="overflow-hidden rounded-[14px]" data-reveal-frame style={{ '--reveal-delay': `${i * 80}ms` }}>
                <Img id={c.image} alt="" sizes="240px" className="aspect-[4/5]" position="50% 30%" />
              </div>
              <div className="pb-2 sm:pr-8">
                <span className="display grid size-10 place-items-center rounded-full bg-clay-soft text-[15px] text-clay-deep">{i + 1}</span>
                <h3 className="display mt-4 text-[24px] text-slate sm:text-[30px]">{c.title}</h3>
                <p className="mt-3 max-w-[56ch] text-[16px] leading-relaxed text-ink-soft">{c.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="fabrics" className="shell scroll-mt-32 pt-24 lg:pt-32">
        <h2 className="display text-[30px] text-slate sm:text-[44px]">Our fabrics</h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {fabrics.map((f) => (
            <li key={f.id}>
              <Link to={`/shop?fabric=${encodeURIComponent(f.id)}`} className="group block h-full rounded-[14px] bg-paper p-3 transition-[box-shadow,transform] duration-500 ease-[var(--ease-out)] hover:-translate-y-1 hover:shadow-lift">
                <Img id={f.image} alt="" sizes="(min-width: 1024px) 18vw, 50vw" className="aspect-square rounded-[10px]" position="50% 40%" imgClassName="transition-transform duration-700 group-hover:scale-110" />
                <p className="display mt-3 text-[16px] text-slate">{f.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{f.body}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="shell pt-24 lg:pt-32">
        <h2 className="display text-[26px] text-slate sm:text-[36px]">Where to start</h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <li key={c.id}>
              <Link to={c.to} className="press group inline-flex h-12 items-center gap-2 rounded-[10px] bg-paper pr-1.5 pl-5 text-[15px] font-semibold text-slate transition-colors hover:bg-slate hover:text-paper">
                {c.label}
                <span className="grid size-9 place-items-center rounded-[8px] bg-fog text-slate transition-transform duration-300 group-hover:-rotate-45">
                  <Icon name="arrow" size={15} weight="bold" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
