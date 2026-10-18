// Navigation content: the mega-menu panels (desktop), menu tabs (phone) and quick chips.

export const megaMenus = [
  {
    id: 'shop',
    label: 'Shop',
    to: '/shop',
    columns: [
      {
        title: 'Categories',
        items: [
          { label: 'Lounge Sets', desc: 'Top and pyjama, matched', image: 'a23-1', to: '/shop/lounge-sets' },
          { label: 'Graphic Tees', desc: 'Wear your mood', image: 'a21-1', to: '/shop/tees' },
          { label: 'Lounge Pants', desc: 'Rib, stripe, print', image: 'a13-1', to: '/shop/lounge-pants' },
          { label: 'Leggings', desc: 'Four-way stretch', image: 'a45-1', to: '/shop/leggings' },
          { label: 'Ankle & Palazzo', desc: 'Desk to dinner', image: 'a42-1', to: '/shop/pants' },
        ],
      },
    ],
    feature: { image: 'a14-1', title: 'The teddy night suit is back', to: '/product/teddy-print-night-suit' },
  },
  {
    id: 'mood',
    label: 'Moods',
    to: '/shop',
    columns: [
      {
        title: 'Shop by mood',
        items: [
          { label: 'At home', desc: 'Sofa, chai, repeat', image: 'a29-1', to: '/shop?occasion=home' },
          { label: 'Sleep', desc: 'Night suits and pyjamas', image: 'a26-1', to: '/shop?occasion=sleep' },
          { label: 'Work from home', desc: 'Call-ready comfort', image: 'a18-1', to: '/shop?occasion=work' },
          { label: 'Out and about', desc: 'Errands, cafés, college', image: 'a41-1', to: '/shop?occasion=out' },
          { label: 'Travel', desc: 'Airport-friendly sets', image: 'a23-1', to: '/shop?occasion=travel' },
        ],
      },
    ],
    feature: { image: 'a02-1', title: 'Rib polo set, three colours', to: '/product/rib-polo-lounge-set' },
  },
]

export const navLinks = [
  { label: 'New in', to: '/shop?sort=new' },
  { label: 'Under ₹999', to: '/shop?price=u999' },
  { label: 'Sale', to: '/shop?sale=1', accent: true },
]

export const quickChips = [
  { label: 'New in', to: '/shop?sort=new' },
  { label: 'Lounge Sets', to: '/shop/lounge-sets' },
  { label: 'Tees', to: '/shop/tees' },
  { label: 'Pants', to: '/shop/lounge-pants' },
  { label: 'Leggings', to: '/shop/leggings' },
  { label: 'Under ₹999', to: '/shop?price=u999' },
  { label: 'Sale', to: '/shop?sale=1', accent: true },
]
