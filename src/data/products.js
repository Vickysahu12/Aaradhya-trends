// Demo catalogue built from the client's photos (public/media/products/aNN-1 / aNN-2).
// `n` is the source photo number (src/assets/image/ImgNN). Shape mirrors what a
// products API would return, so services/catalog.js can switch to fetch() later.
// Prices sit between ₹899 and ₹1,999 as agreed; ratings and copy are sample data.

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const CATEGORY = {
  tees: { includes: 'One tee', pack: true, care: ['Machine wash cold, inside out', 'Do not iron on the print', 'Dry in shade'] },
  'lounge-sets': { includes: 'Top and pyjama', care: ['Machine wash cold on gentle', 'Wash darks separately', 'Tumble dry low or line dry'] },
  'lounge-pants': { includes: 'One pair of pants', care: ['Machine wash cold', 'Do not bleach', 'Dry flat to keep the shape'] },
  shorts: { includes: 'One pair of shorts', pack: true, care: ['Machine wash cold', 'Do not bleach', 'Line dry'] },
  leggings: { includes: 'One pair of leggings', pack: true, care: ['Machine wash cold, inside out', 'Do not tumble dry', 'Avoid fabric softener to keep the stretch'] },
  pants: { includes: 'One pair of pants', care: ['Gentle wash cold', 'Dry in shade', 'Iron on medium on the reverse'] },
}

const item = (category) => (p) => ({ category, sizes: SIZES, ...CATEGORY[category], ...p })
const tee = item('tees')
const set = item('lounge-sets')
const pyj = item('lounge-pants')
const short = item('shorts')
const leg = item('leggings')
const pant = item('pants')

const raw = [
  tee({ n: 1, name: 'New Icon Oversized Tee', fabric: 'Cotton Jersey', color: 'Mauve', hex: '#8e5560', occasions: ['out', 'home'], price: 899, compareAt: 1199, rating: 4.6, reviews: 214, bestseller: true, blurb: 'A drop-shoulder tee in soft cotton jersey with a small tonal slogan. Roomy, never sloppy.' }),
  set({ n: 2, name: 'Rib Polo Lounge Set', fabric: 'Rib Knit', color: 'Clay', hex: '#b9826b', occasions: ['home', 'travel'], price: 1799, compareAt: 2199, rating: 4.7, reviews: 96, family: 'polo-set', badge: 'Bestseller', bestseller: true, blurb: 'A ribbed polo top with a V collar and wide pants. Looks put together, feels like pyjamas.' }),
  pyj({ n: 3, name: 'Grey Stripe Lounge Pants', fabric: 'Cotton Jersey', color: 'Grey', hex: '#9a9ca2', occasions: ['out', 'travel'], price: 999, rating: 4.4, reviews: 58, blurb: 'Vertical stripes, a drawstring waist and a cropped straight leg. Easy with sneakers.' }),
  pyj({ n: 4, name: 'Daisy Print Pyjama', fabric: 'Cotton Jersey', color: 'Clay', hex: '#c58e6c', occasions: ['sleep', 'home'], price: 899, rating: 4.5, reviews: 77, blurb: 'Tiny daisies on a warm clay base, with deep pockets and a soft elastic waist.' }),
  tee({ n: 5, name: 'Overthinker Slogan Tee', fabric: 'Cotton Jersey', color: 'Slate', hex: '#5b6574', occasions: ['out', 'home'], price: 899, rating: 4.6, reviews: 188, isNew: true, badge: 'New', blurb: 'For the 2 a.m. thinkers. A regular-fit tee in slate grey with a small chest slogan.' }),
  pant({ n: 6, name: 'Magenta Wide Pants', fabric: 'Viscose Crepe', color: 'Magenta', hex: '#b03566', occasions: ['out', 'work'], price: 1199, rating: 4.5, reviews: 44, blurb: 'Fluid wide-leg pants in a bold magenta that moves when you walk.' }),
  leg({ n: 7, name: 'Mustard Ankle Leggings', fabric: 'Lycra Stretch', color: 'Mustard', hex: '#d9a628', occasions: ['out', 'work'], price: 899, rating: 4.5, reviews: 132, family: 'ankle-leggings', blurb: 'Four-way stretch ankle leggings that keep their colour wash after wash.' }),
  short({ n: 8, name: 'Cherry Lounge Shorts', fabric: 'Cotton Jersey', color: 'Cherry', hex: '#8f1d2c', occasions: ['home', 'sleep'], price: 899, rating: 4.4, reviews: 61, family: 'lounge-shorts', blurb: 'Mid-thigh lounge shorts with a drawstring and side pockets.' }),
  short({ n: 9, name: 'Grey Melange Shorts', fabric: 'Cotton Jersey', color: 'Grey', hex: '#6f7075', occasions: ['home', 'sleep'], price: 899, rating: 4.5, reviews: 73, family: 'lounge-shorts', blurb: 'The lounge shorts in grey melange. The pair you will reach for first.' }),
  short({ n: 10, name: 'Black Lounge Shorts', fabric: 'Cotton Jersey', color: 'Black', hex: '#1f1f22', occasions: ['home', 'sleep'], price: 899, rating: 4.6, reviews: 92, family: 'lounge-shorts', bestseller: true, blurb: 'The lounge shorts in black, with a soft brushed inside.' }),
  pyj({ n: 11, name: 'Rose Rib Lounge Pants', fabric: 'Rib Knit', color: 'Rose', hex: '#b9808a', occasions: ['home', 'travel'], price: 1099, rating: 4.6, reviews: 68, family: 'rib-pants', blurb: 'Ribbed straight pants with a tie waist. Cosy enough for sofa days, neat enough for a coffee run.' }),
  leg({ n: 12, name: 'Royal Blue Leggings', fabric: 'Lycra Stretch', color: 'Royal Blue', hex: '#2b3fa6', occasions: ['out', 'work'], price: 899, rating: 4.4, reviews: 87, family: 'ankle-leggings', blurb: 'The ankle leggings in royal blue. Pairs with every white kurti you own.' }),
  pyj({ n: 13, name: 'Black Rib Wide Pants', fabric: 'Rib Knit', color: 'Black', hex: '#25252a', occasions: ['out', 'home'], price: 1099, compareAt: 1399, rating: 4.7, reviews: 109, family: 'rib-pants', bestseller: true, blurb: 'The rib pants in black with a wider leg. Dress them up with a crisp shirt.' }),
  set({ n: 14, name: 'Teddy Print Night Suit', fabric: 'Cotton Poplin', color: 'Sky Blue', hex: '#9fbad8', occasions: ['sleep'], price: 1499, rating: 4.8, reviews: 154, bestseller: true, blurb: 'A button-down shirt and pyjama covered in tiny teddies. Piped collar, soft poplin.' }),
  set({ n: 15, name: 'Panda Leaf Lounge Set', fabric: 'Cotton Jersey', color: 'Sage', hex: '#b9c2a4', occasions: ['home', 'sleep'], price: 1399, rating: 4.6, reviews: 57, blurb: 'A sage tee with a panda pocket and printed leaf pyjamas.' }),
  set({ n: 16, name: 'Olive Polo Lounge Set', fabric: 'Rib Knit', color: 'Olive', hex: '#8f9761', occasions: ['home', 'travel'], price: 1699, rating: 4.6, reviews: 49, family: 'polo-set', blurb: 'The rib polo set in olive. Collar up, feet up.' }),
  set({ n: 17, name: 'Lilac Floral Lounge Set', fabric: 'Cotton Jersey', color: 'Pink', hex: '#e3cbd6', occasions: ['sleep', 'home'], price: 1299, rating: 4.5, reviews: 63, isNew: true, blurb: 'A soft floral print tee and pyjama in powder pink.' }),
  pyj({ n: 18, name: 'Sand Straight Pants', fabric: 'Viscose Crepe', color: 'Sand', hex: '#dcc4a6', occasions: ['work', 'out'], price: 1199, compareAt: 1499, rating: 4.5, reviews: 52, blurb: 'Straight-leg sand pants with a drawstring waist. Work-call friendly.' }),
  tee({ n: 19, name: 'Palm Print Oversized Tee', fabric: 'Cotton Jersey', color: 'Black', hex: '#1d1d20', occasions: ['out', 'travel'], price: 999, rating: 4.7, reviews: 121, blurb: 'An oversized black tee with a monochrome palm photo print.' }),
  pyj({ n: 20, name: 'Olive Rib Lounge Pants', fabric: 'Rib Knit', color: 'Olive', hex: '#8a9450', occasions: ['home', 'travel'], price: 1099, rating: 4.5, reviews: 38, family: 'rib-pants', blurb: 'The rib pants in olive with a straight leg and tie waist.' }),
  tee({ n: 21, name: 'Puppy Trio Oversized Tee', fabric: 'Cotton Jersey', color: 'Beige', hex: '#e2d8c8', occasions: ['home', 'out'], price: 999, rating: 4.8, reviews: 167, isNew: true, blurb: 'Three sleepy puppies on a soft beige oversized tee.' }),
  set({ n: 22, name: 'Navy Bow Print Lounge Set', fabric: 'Cotton Jersey', color: 'Navy', hex: '#26304d', occasions: ['sleep', 'home'], price: 1299, rating: 4.6, reviews: 72, blurb: 'Little bows scattered over a navy tee and pyjama.' }),
  set({ n: 23, name: 'Black Polo Lounge Set', fabric: 'Rib Knit', color: 'Black', hex: '#202024', occasions: ['travel', 'home'], price: 1699, compareAt: 1999, rating: 4.7, reviews: 85, family: 'polo-set', blurb: 'The rib polo set in black. The one for airports.' }),
  set({ n: 24, name: 'Navy Doodle Lounge Set', fabric: 'Cotton Jersey', color: 'Navy', hex: '#2b3554', occasions: ['sleep', 'home'], price: 1299, rating: 4.5, reviews: 46, family: 'doodle-set', blurb: 'Hand-drawn doodles on a navy tee and pyjama.' }),
  set({ n: 25, name: 'Aqua Doodle Lounge Set', fabric: 'Cotton Jersey', color: 'Aqua', hex: '#a8c3c4', occasions: ['sleep', 'home'], price: 1299, rating: 4.6, reviews: 51, family: 'doodle-set', blurb: 'The doodle set in a soft aqua.' }),
  set({ n: 26, name: 'Bunny Print Lounge Set', fabric: 'Cotton Jersey', color: 'Peach', hex: '#f0ddd3', occasions: ['sleep'], price: 1399, rating: 4.7, reviews: 88, blurb: 'Bunnies, carrots and a lot of comfort, on a pale peach set.' }),
  set({ n: 27, name: 'Bear Print Lounge Set', fabric: 'Cotton Jersey', color: 'Cocoa', hex: '#8e6658', occasions: ['sleep', 'home'], price: 1399, rating: 4.6, reviews: 64, blurb: 'Cocoa brown with little bear faces. Warm, soft, and slightly silly.' }),
  tee({ n: 28, name: 'What’s Up Bear Tee', fabric: 'Cotton Jersey', color: 'Navy', hex: '#26305a', occasions: ['out', 'home'], price: 949, rating: 4.6, reviews: 98, blurb: 'A navy oversized tee with a waving bear and a hand-lettered hello.' }),
  set({ n: 29, name: 'Not So Basic Lounge Set', fabric: 'Cotton Jersey', color: 'Cocoa', hex: '#5f4339', occasions: ['home', 'travel'], price: 1499, rating: 4.5, reviews: 59, blurb: 'A cocoa tee and jogger set with a small tonal slogan. Basic, but not.' }),
  set({ n: 30, name: 'Pin Dot Lounge Set', fabric: 'Cotton Jersey', color: 'Charcoal', hex: '#34363b', occasions: ['travel', 'home'], price: 1499, rating: 4.6, reviews: 47, blurb: 'A charcoal set with a fine white pin dot. Smart enough for a quick video call.' }),
  tee({ n: 31, name: 'Little Hearts Tee', fabric: 'Cotton Jersey', color: 'Plum', hex: '#3a2129', occasions: ['out', 'home'], price: 899, rating: 4.5, reviews: 70, blurb: 'A dark plum tee with a column of hand-drawn hearts down one side.' }),
  tee({ n: 32, name: 'Summer Night Slogan Tee', fabric: 'Cotton Jersey', color: 'Pink', hex: '#d78a99', occasions: ['out', 'travel'], price: 949, rating: 4.6, reviews: 83, blurb: 'Love yourself like a summer night. Puff print on a candy pink tee.' }),
  set({ n: 33, name: 'Heart Print Night Suit', fabric: 'Cotton Poplin', color: 'Black', hex: '#1f1f23', occasions: ['sleep'], price: 1599, compareAt: 1899, rating: 4.8, reviews: 112, blurb: 'A black button-down night suit with a tone-on-tone heart print.' }),
  pyj({ n: 34, name: 'Powder Blue Heart Pyjama', fabric: 'Cotton Jersey', color: 'Powder Blue', hex: '#a9b6cc', occasions: ['sleep', 'home'], price: 949, rating: 4.5, reviews: 66, blurb: 'Faded hearts on a powder blue pyjama with a comfy elastic waist.' }),
  pant({ n: 35, name: 'Grey Cigarette Pants', fabric: 'Lycra Stretch', color: 'Grey', hex: '#74767b', occasions: ['work', 'out'], price: 1099, rating: 4.5, reviews: 54, blurb: 'Slim cigarette pants with a hint of stretch. Wear under kurtas or with shirts.' }),
  tee({ n: 36, name: 'Duck Buddies Oversized Tee', fabric: 'Cotton Jersey', color: 'Cocoa', hex: '#5d4842', occasions: ['home', 'out'], price: 999, rating: 4.7, reviews: 76, blurb: 'Two ducks and a lot of attitude, on a cocoa oversized tee.' }),
  pyj({ n: 37, name: 'Blush Rib Flared Pants', fabric: 'Rib Knit', color: 'Blush', hex: '#e2b6bd', occasions: ['home', 'out'], price: 1149, rating: 4.6, reviews: 42, family: 'rib-pants', blurb: 'The rib pants in blush, with a soft flare at the hem.' }),
  pyj({ n: 38, name: 'Ivory Rib Straight Pants', fabric: 'Rib Knit', color: 'Ivory', hex: '#e9e2d6', occasions: ['home', 'out'], price: 1099, rating: 4.5, reviews: 39, family: 'rib-pants', blurb: 'The rib pants in ivory. Lighter than it looks, warmer than you think.' }),
  pyj({ n: 39, name: 'Wine Stripe Lounge Pants', fabric: 'Cotton Jersey', color: 'Wine', hex: '#4c1d24', occasions: ['home', 'sleep'], price: 999, rating: 4.4, reviews: 45, blurb: 'Fine tonal stripes on deep wine, with a drawstring and pockets.' }),
  set({ n: 40, name: 'Polka Heart Lounge Set', fabric: 'Cotton Jersey', color: 'Grey', hex: '#d4d2cf', occasions: ['sleep', 'home'], price: 1299, rating: 4.6, reviews: 58, blurb: 'Black hearts on a light grey tee and pyjama.' }),
  pant({ n: 41, name: 'Blue Stripe Paperbag Pants', fabric: 'Cotton Linen', color: 'Blue', hex: '#a3b5cc', occasions: ['out', 'travel'], price: 1299, compareAt: 1599, rating: 4.6, reviews: 37, blurb: 'Paperbag waist, self tie and breezy stripes. Holiday trousers that also work on Monday.' }),
  pant({ n: 42, name: 'Mustard Palazzo', fabric: 'Viscose Crepe', color: 'Mustard', hex: '#e2b322', occasions: ['out', 'work'], price: 1199, rating: 4.5, reviews: 48, blurb: 'A full-flow palazzo in sunny mustard with an easy elastic waist.' }),
  pant({ n: 43, name: 'Teal Satin Ankle Pants', fabric: 'Satin', color: 'Teal', hex: '#1d6b6d', occasions: ['work', 'out'], price: 1299, rating: 4.7, reviews: 41, blurb: 'Satin ankle pants with a soft sheen and a button slit at the hem.' }),
  pant({ n: 44, name: 'Ivory Straight Pants', fabric: 'Lycra Stretch', color: 'Ivory', hex: '#efe8de', occasions: ['work', 'out'], price: 1099, rating: 4.5, reviews: 56, blurb: 'Ivory ankle pants with a smooth stretch. Under kurtis, over heels.' }),
  leg({ n: 45, name: 'Stretch Denim Jeggings', fabric: 'Denim Stretch', color: 'Denim', hex: '#3c5a86', occasions: ['out', 'travel'], price: 1299, compareAt: 1599, rating: 4.6, reviews: 101, blurb: 'Looks like denim, moves like leggings. High rise, real back pockets.' }),
  leg({ n: 46, name: 'White Ankle Leggings', fabric: 'Lycra Stretch', color: 'White', hex: '#f2f1ee', occasions: ['out', 'work'], price: 899, rating: 4.4, reviews: 79, family: 'ankle-leggings', blurb: 'The ankle leggings in white, opaque and soft.' }),
  leg({ n: 47, name: 'Fuchsia Capri Leggings', fabric: 'Lycra Stretch', color: 'Fuchsia', hex: '#c62257', occasions: ['out', 'home'], price: 899, rating: 4.3, reviews: 34, blurb: 'Cropped capri leggings in a bright fuchsia.' }),
  leg({ n: 48, name: 'Red Churidar Leggings', fabric: 'Lycra Stretch', color: 'Red', hex: '#c6232b', occasions: ['out', 'work'], price: 899, rating: 4.5, reviews: 64, family: 'ankle-leggings', blurb: 'Churidar leggings with soft gathers at the ankle.' }),
  pant({ n: 49, name: 'Mint Slit Ankle Pants', fabric: 'Lycra Stretch', color: 'Mint', hex: '#8fc1a8', occasions: ['work', 'out'], price: 1149, rating: 4.5, reviews: 33, blurb: 'Slim ankle pants in mint with a small side slit.' }),
  pant({ n: 50, name: 'Ochre Button Ankle Pants', fabric: 'Cotton Linen', color: 'Ochre', hex: '#d8a64a', occasions: ['work', 'out'], price: 1149, rating: 4.5, reviews: 29, isNew: true, blurb: 'Ochre ankle pants with a button detail at the hem.' }),
]

const slugify = (s) => s.toLowerCase().replace(/[’']/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export const products = raw.map(({ n, ...p }) => {
  const id = `a${String(n).padStart(2, '0')}`
  return {
    id,
    slug: slugify(p.name),
    images: [`${id}-1`, `${id}-2`],
    ...p,
  }
})

export const getProduct = (id) => products.find((p) => p.id === id)
export const getProductBySlug = (slug) => products.find((p) => p.slug === slug)
