# HardwareHub

A React + Vite hardware-store frontend with product browsing, categories, cart, checkout, customer authentication, and a local admin dashboard.

## Run locally

Use **Node.js 20+**.

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite (normally `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
├── components/       Reusable UI components
├── context/          Global cart state
├── data/             Product and category data
├── pages/             Route-level pages
└── utils/             Shared browser utilities
public/
├── categories/       Optimized WebP category images
├── products/         Optimized WebP product images
└── hero.webp         Optimized hero image
```

## Performance improvements

- Product/category photos are resized and converted to WebP.
- The homepage shows six featured products instead of loading the complete catalogue immediately.
- Non-critical routes are lazy-loaded with React `Suspense`.
- Below-the-fold images use lazy loading and async decoding.
- The hero image is preloaded because it is the primary above-the-fold visual.
- Local-storage access is protected against malformed data.
- Admin-uploaded images are resized/compressed before being stored locally.
- Navigation uses React Router links to avoid unnecessary full-page reloads.

## Important note

This project currently stores users, carts, products added by the admin, and orders in the browser's `localStorage`. That is suitable for a frontend/demo project, but it is **not a secure production database or authentication system**. For a real store, move authentication, orders, inventory, and payment processing to a backend/database.
