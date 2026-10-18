# Aaradhya Trends

A demo storefront for Aaradhya Trends, a women's loungewear, tees and easy-pants label. It has 50 products priced from ₹899 to ₹1,999.

## Run it

```bash
npm install
npm run dev
```

Build with `npm run build`, then preview with `npm run preview`.

## What works

- **Home**:
  - Full-width photo slider hero, perks and promo tiles.
  - "Recommended for you" tabs.
  - Shop by mood, the "Feel the fabric" explorer, a "Sofa to café" drag slider and shop by price.
  - "Pick any 3 tees" bundle builder, testimonials and an Instagram grid.
- **Shop**:
  - Category pages, with filters in the URL: fabric, mood, colour, price.
  - Sort, and search with suggestions.
- **Product page**:
  - Gallery with zoom and colour siblings.
  - Size picker, size guide and pack of 2 (15% off) on tees, shorts and leggings.
  - Pincode check, reviews, related and recently viewed.
- **Bag**:
  - Drawer and full page.
  - Free shipping progress over ₹999.
  - Coupons `COMFY10`, `FIRST15` (₹1,499+) and `TRIO` (₹300 off 3+ tees).
- **Checkout**:
  - Address step with pincode autofill, then UPI, card, net banking or COD (₹39).
  - Order confirmation and order history on this device.
- **Also**: wishlist, account, help/FAQ, about, a 404 page and an error page.

All data is local (`src/data`). The cart, wishlist and orders are saved in localStorage. No real payment is taken.

## Stack

- Vite, React 19, React Router 7 and Tailwind CSS v4.
- Motion, Lenis and Phosphor icons.
- Josefin Sans and Figtree fonts.
