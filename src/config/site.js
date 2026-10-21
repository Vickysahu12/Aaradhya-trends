// Brand-level settings. Change the name, offers, fees or contact details here, not in components.
export const site = {
  name: 'Aaradhya Trends',
  tagline: 'Comfort, made to be seen',
  currency: 'INR',
  locale: 'en-IN',
  freeShippingOver: 999,
  shippingFee: 59,
  codFee: 39,
  packDiscount: 0.15,
  orderPrefix: 'AT',
  instagram: '@aaradhyatrends',
  phone: '+91 98765 43210',
  email: 'care@aaradhyatrends.in',

  announcements: [
    'Free shipping on orders above ₹999',
    'Extra 10% off everything with code COMFY10',
    'Any 3 tees, ₹300 off with code TRIO',
  ],

  // Coupon codes accepted at bag / checkout (demo).
  coupons: {
    COMFY10: { type: 'percent', value: 10, label: '10% off everything' },
    FIRST15: { type: 'percent', value: 15, label: '15% off your first order', min: 1499 },
    TRIO: { type: 'flat', value: 300, label: '₹300 off on 3 or more tees', min: 2400 },
  },

  footer: {
    blurb: 'Lounge sets, tees and easy pants in soft cotton and rib. Everything under ₹1,999.',
    columns: [
      {
        title: 'Shop',
        links: [
          { label: 'Lounge Sets', to: '/shop/lounge-sets' },
          { label: 'Graphic Tees', to: '/shop/tees' },
          { label: 'Lounge Pants', to: '/shop/lounge-pants' },
          { label: 'Leggings', to: '/shop/leggings' },
          { label: 'Ankle & Palazzo', to: '/shop/pants' },
          { label: 'Shorts', to: '/shop/shorts' },
        ],
      },
      {
        title: 'Help',
        links: [
          { label: 'Track order', to: '/account' },
          { label: 'Size guide', to: '/help#sizing' },
          { label: 'Shipping', to: '/help#shipping' },
          { label: 'Returns', to: '/help#returns' },
          { label: 'Contact', to: '/help#contact' },
        ],
      },
      {
        title: 'Aaradhya',
        links: [
          { label: 'Our story', to: '/about' },
          { label: 'Our fabrics', to: '/about#fabrics' },
          { label: 'Wishlist', to: '/wishlist' },
          { label: 'Privacy', to: '/help#privacy' },
        ],
      },
    ],
  },
}
