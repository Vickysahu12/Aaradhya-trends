// Editorial content for the storefront. Kept out of components so the client
// (or a CMS later) can change copy and imagery in one place.
// Image ids refer to public/media/products (aNN-1 full look, aNN-2 close crop).

// Hero: a full-width slider. Each slide joins three looks edge to edge into one wide frame
// (the source photos are portrait), with the message centred over it.
export const heroSlides = [
  {
    id: 'every-day',
    images: ['a24-1', 'a27-1', 'a30-1'],
    kicker: 'New season, all under ₹1,999',
    title: 'Comfort for every day',
    sub: 'Lounge sets in soft cotton and rib. Made to live in.',
    cta: { label: 'Discover now', to: '/shop/lounge-sets' },
  },
  {
    id: 'tees',
    images: ['a01-1', 'a21-1', 'a32-1'],
    kicker: 'Graphic tees from ₹899',
    title: 'Tees with a mood',
    sub: 'Oversized cotton jersey, with prints that say it for you.',
    cta: { label: 'Shop tees', to: '/shop/tees' },
  },
  {
    id: 'pants',
    images: ['a11-1', 'a13-1', 'a39-1'],
    kicker: 'Rib, stripe and print',
    title: 'Sofa to café pants',
    sub: 'Drawcord waists and deep pockets. Dress them up or down.',
    cta: { label: 'Shop pants', to: '/shop/lounge-pants' },
  },
]

export const perks = [
  { icon: 'truck', title: 'Free shipping', body: 'On orders above ₹999' },
  { icon: 'returns', title: 'Easy 7-day returns', body: 'Free pickup from home' },
  { icon: 'cash', title: 'Cash on delivery', body: 'Pay when it arrives' },
  { icon: 'ruler', title: 'Size exchange', body: 'If the fit is off, swap it' },
]

export const categoryLabels = {
  tees: 'Graphic Tees',
  'lounge-sets': 'Lounge Sets',
  'lounge-pants': 'Lounge Pants',
  shorts: 'Shorts',
  leggings: 'Leggings',
  pants: 'Ankle & Palazzo',
}

export const categorySingular = {
  tees: 'Tee',
  'lounge-sets': 'Lounge Set',
  'lounge-pants': 'Lounge Pants',
  shorts: 'Shorts',
  leggings: 'Leggings',
  pants: 'Pants',
}

export const categories = [
  { id: 'lounge-sets', label: 'Lounge Sets', image: 'a23-1', to: '/shop/lounge-sets' },
  { id: 'tees', label: 'Graphic Tees', image: 'a21-1', to: '/shop/tees' },
  { id: 'lounge-pants', label: 'Lounge Pants', image: 'a13-1', to: '/shop/lounge-pants' },
  { id: 'leggings', label: 'Leggings', image: 'a45-1', to: '/shop/leggings' },
  { id: 'pants', label: 'Ankle & Palazzo', image: 'a42-1', to: '/shop/pants' },
  { id: 'shorts', label: 'Shorts', image: 'a10-1', to: '/shop/shorts' },
]

// The ref's tile grid: three on top, two below. Each one says what the category is for.
export const tiles = [
  { id: 'sets', kicker: 'Most loved', title: 'Lounge sets', image: 'a02-1', to: '/shop/lounge-sets', focus: '50% 30%' },
  { id: 'tees', kicker: 'Wear your mood', title: 'Graphic tees', image: 'a32-1', to: '/shop/tees', focus: '50% 25%' },
  { id: 'pants', kicker: 'Rib, stripe, print', title: 'Lounge pants', image: 'a11-1', to: '/shop/lounge-pants', focus: '50% 40%' },
  { id: 'leggings', kicker: 'Four-way stretch', title: 'Leggings that stay put', image: 'a46-1', to: '/shop/leggings', focus: '50% 45%', wide: true },
  { id: 'out', kicker: 'Desk to dinner', title: 'Ankle & palazzo', image: 'a43-1', to: '/shop/pants', focus: '50% 45%', wide: true },
]

// "Mood" is stored in each product's `occasions`.
export const occasionLabels = {
  home: 'At home',
  sleep: 'Sleep',
  work: 'Work from home',
  out: 'Out and about',
  travel: 'Travel',
}

export const occasions = [
  { id: 'home', label: 'At home', image: 'a29-1', to: '/shop?occasion=home' },
  { id: 'sleep', label: 'Sleep', image: 'a14-1', to: '/shop?occasion=sleep' },
  { id: 'work', label: 'Work from home', image: 'a18-1', to: '/shop?occasion=work' },
  { id: 'out', label: 'Out and about', image: 'a41-1', to: '/shop?occasion=out' },
  { id: 'travel', label: 'Travel', image: 'a23-1', to: '/shop?occasion=travel' },
]

// Recommended tabs (ref: "Recommended for you").
export const collectionTabs = [
  { id: 'tees', label: 'Graphic tees', query: { category: 'tees', sort: 'rating' } },
  { id: 'sets', label: 'Lounge sets', query: { category: 'lounge-sets', sort: 'rating' } },
  { id: 'pants', label: 'Pants', query: { category: 'lounge-pants', sort: 'rating' } },
  { id: 'new', label: 'New in', query: { sort: 'new' } },
]

// Feel the fabric: each one with a close crop, what it is, and how it behaves.
export const fabrics = [
  { id: 'Cotton Jersey', image: 'a21-2', title: 'Cotton jersey', body: 'Soft, breathable knit cotton that gets better with every wash. Our tees and most sets.', stretch: 'Medium', weight: 'Light', feel: 'Soft and cool' },
  { id: 'Rib Knit', image: 'a11-2', title: 'Rib knit', body: 'Raised ribs that hug a little and spring back. Holds its shape through long sofa days.', stretch: 'High', weight: 'Medium', feel: 'Textured and cosy' },
  { id: 'Cotton Poplin', image: 'a14-2', title: 'Cotton poplin', body: 'A crisp woven cotton for button-down night suits. Cool on hot nights.', stretch: 'Low', weight: 'Light', feel: 'Smooth and crisp' },
  { id: 'Lycra Stretch', image: 'a07-2', title: 'Lycra stretch', body: 'Four-way stretch that moves with you and does not sag at the knee.', stretch: 'High', weight: 'Medium', feel: 'Sleek and snug' },
  { id: 'Viscose Crepe', image: 'a42-2', title: 'Viscose crepe', body: 'Fluid and lightly textured. It falls straight and swishes when you walk.', stretch: 'Low', weight: 'Light', feel: 'Silky and airy' },
]

// Home vs out: the drag slider.
export const homeToOut = {
  title: 'Sofa to café, same pants',
  sub: 'Drag to switch. The rib pants that carry your Sunday also carry your Monday.',
  home: { image: 'a13-1', label: 'At home', productId: 'a13' },
  out: { image: 'a03-1', label: 'Out', productId: 'a03' },
}

// Shop by price, the brand's promise in numbers.
export const priceStops = [
  { label: 'Under ₹999', max: 999, to: '/shop?price=u999' },
  { label: 'Under ₹1,299', max: 1299, to: '/shop?price=u999,999-1299' },
  { label: 'Under ₹1,599', max: 1599, to: '/shop?price=u999,999-1299,1300-1599' },
  { label: 'Under ₹1,999', max: 1999, to: '/shop' },
]

// Tee trio bundle: pick any three tees; code TRIO takes ₹300 off.
export const lookbook = {
  title: 'Pick any 3 tees',
  sub: 'Fill the three slots, choose sizes, and add them together. Use code TRIO for ₹300 off.',
  code: 'TRIO',
  slots: 3,
}

export const offers = [
  { title: '10% off everything', code: 'COMFY10' },
  { title: '15% off your first order', code: 'FIRST15' },
  { title: '₹300 off any 3 tees', code: 'TRIO' },
]

// Sample customer notes (demo content), each linked to what she bought.
export const testimonials = [
  { name: 'Nidhi Agarwal', city: 'Lucknow', rating: 5, productId: 'a14', text: 'The teddy night suit is so soft I bought it for my sister too. Poplin stays cool all night.' },
  { name: 'Shreya Menon', city: 'Kochi', rating: 5, productId: 'a13', text: 'Black rib pants are my WFH uniform. Nobody on the call knows they are basically pyjamas.' },
  { name: 'Ritu Saxena', city: 'Indore', rating: 4, productId: 'a45', text: 'Jeggings actually stretch and do not bag at the knee. Ordered a second pair.' },
  { name: 'Ayesha Qureshi', city: 'Hyderabad', rating: 5, productId: 'a21', text: 'The puppy tee gets comments every single time. Fabric is thick and not see-through.' },
  { name: 'Kavya Hegde', city: 'Mysuru', rating: 5, productId: 'a02', text: 'Wore the rib polo set on a 9 hour train ride and looked fine when I got off. Love it.' },
]

export const instagram = {
  handle: '@aaradhyatrends',
  tag: '#MyAaradhya',
  href: 'https://instagram.com',
  images: ['a29-1', 'a17-1', 'a28-1', 'a41-1', 'a26-1', 'a05-1'],
}

export const serviceRow = perks

// Review pool used to fill product pages (demo).
export const reviewPool = [
  { name: 'Pallavi K.', rating: 5, title: 'So comfortable', text: 'Soft from the first wear and did not shrink after washing. True to size.' },
  { name: 'Megha T.', rating: 5, title: 'Great value', text: 'At this price I expected average, but the fabric is really good.' },
  { name: 'Sana R.', rating: 4, title: 'Nice fit', text: 'Slightly long for me at 5 feet, still very comfy. Colour is exactly as shown.' },
  { name: 'Divya P.', rating: 5, title: 'Buying more', text: 'Ordered one, came back for two more colours. Delivery in 3 days.' },
  { name: 'Tanya G.', rating: 4, title: 'Good quality', text: 'Neat stitching and deep pockets. Wish there were more prints.' },
]

export const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'new', label: 'New in' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
]

export const priceBands = [
  { id: 'u999', label: 'Under ₹999', min: 0, max: 999 },
  { id: '999-1299', label: '₹1,000 to ₹1,299', min: 1000, max: 1299 },
  { id: '1300-1599', label: '₹1,300 to ₹1,599', min: 1300, max: 1599 },
  { id: '1600-1999', label: '₹1,600 to ₹1,999', min: 1600, max: 1999 },
]

export const sizeChart = [
  ['XS', '30', '24', '34'],
  ['S', '32', '26', '36'],
  ['M', '34', '28', '38'],
  ['L', '36', '30', '40'],
  ['XL', '38', '32', '42'],
  ['XXL', '40', '34', '44'],
]
