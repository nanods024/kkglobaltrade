# KK Global Trade — B2B Export Website

A full-stack MERN application for **KK Global Trade** (Kurnool, Andhra Pradesh, India),
an Indian exporter of spices, pulses, millets, superfoods and natural
ingredients. Built as the "first version" scope: Home, Products, Product
Details, Request-a-Quote, About, Quality & Compliance, Global Trade, Private
Label, Contact, and an admin dashboard for managing products and enquiries.

```
kk-global-trade/
├── client/   React + Vite + Tailwind frontend
└── server/   Node + Express + MongoDB backend
```

## What's included

- Public site with 8 pages, all product data served dynamically from MongoDB
  (nothing product-related is hard-coded into components)
- A Request-for-Quote (RFQ) system on every product page, plus a general
  Contact form — both save to a shared `enquiries` collection and trigger
  email notifications
- Floating WhatsApp button with a context-aware, product-specific message
- Admin dashboard (`/admin/login`) with JWT auth: product CRUD (with image
  upload), enquiry management with status tracking, a stats/chart overview,
  and editable company info
- Security basics: JWT + bcrypt, Helmet, CORS, rate limiting, Mongo
  sanitization, express-validator input validation, centralized error
  handling
- SEO basics: per-page `<title>`/meta description via `react-helmet-async`,
  per-product SEO title/description fields editable from the admin
- 9 seeded products from the KK Global Trade catalogue spec (chilli,
  turmeric, cardamom, moringa, stevia, black gram, pigeon pea, finger
  millet, sorghum), each with HS code, botanical name, specifications,
  packaging, MOQ and origin

## Brand assets

The official KK Global Trade logo is wired into the navbar, footer, favicons,
and hero watermark. Source and processed files live in:

- `client/public/brand/` — `logo-nav.png` (navbar), `logo-footer.png`
  (footer, on a white chip so it stays legible on the dark navy background),
  `logo-mark.png` (icon-only, used as a subtle decorative watermark on hero/
  page banners), and `favicon-{16,32,48,180,512}.png`.
- The Tailwind `navy` and `gold` color scales in `client/tailwind.config.js`
  were sampled directly from the logo's own pixels, so the site's palette
  matches the brand mark exactly rather than an eyeballed approximation.

**Placeholders you'll want to replace before going live:**

- **Product images** — image provenance is documented at the top of
  `server/seed/productsData.js`. Current status per product:
  - **Confirmed, closely-matching product photography**: Dried Red Chilli,
    Organic Turmeric Powder, Green Cardamom, Organic Moringa Powder.
  - **Generic stand-in photography** (visually similar but not a confirmed
    photo of this exact product — e.g. a generic dried green leaf for Stevia,
    a generic dark whole bean for Black Gram, a generic split yellow pulse
    for Pigeon Pea): Stevia Powder, Black Gram/Urad, Pigeon Pea/Red Gram.
  - **Still on the branded placeholder** (no confidently accurate stock photo
    could be found — deliberately left as a `placehold.co` graphic rather
    than risk an inaccurate or misleading image): Finger Millet/Ragi,
    Sorghum/Jowar.

  For all nine, swap in real KK Global Trade product photography via the
  admin dashboard's image upload as soon as it's available — that's the
  right long-term fix, especially for the stand-ins and remaining
  placeholders. Editing `server/seed/productsData.js` before seeding is the
  alternative if you'd rather manage images as code.
- The homepage/about/quality sections use Unsplash stock photography for
  general farm/sourcing/processing imagery (not attributed to specific
  products) — swap for real facility photography when available.
- **Certifications/claims** — per the original spec, no ISO/FDA/USDA/organic
  certification claims, testimonials, client logos, or export-country/
  turnover/experience statistics have been added anywhere. Add these only
  once the business can provide supporting documentation.

## Prerequisites

- Node.js 18+
- MongoDB (a local `mongod`, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

## 1. Backend setup

```bash
cd server
npm install
cp .env.example .env
# edit .env: at minimum set MONGO_URI and JWT_SECRET
npm run seed     # creates the admin user, categories, and 9 products
npm run dev      # starts the API on http://localhost:5000
```

The seed script prints the admin login it created (from `ADMIN_EMAIL` /
`ADMIN_PASSWORD` in `.env`, defaulting to
`admin@kkglobaltrade.com` / `ChangeMe123!`). **Change this password** after
first login in production — there's a "Change Admin Password" form under
Admin → Settings.

Re-running `npm run seed` is safe — it upserts categories/products by name
and won't duplicate the admin user. `npm run seed:destroy` removes seeded
products/categories only (admin user and enquiries are left alone).

### Image uploads without Cloudinary

By default (`USE_CLOUDINARY=false` in `.env`), the admin product form's
image upload saves files locally to `server/uploads/` and serves them at
`/uploads/<filename>`. This works out of the box with no external account.
To use Cloudinary instead, set `USE_CLOUDINARY=true` and fill in
`CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` —
no code changes needed.

### Email without SMTP credentials

If `EMAIL_USER` / `EMAIL_PASSWORD` are left blank in `.env`, the backend
logs enquiry/contact emails to the console instead of sending them, so RFQ
submission still works end-to-end in development. Fill in real SMTP
credentials (e.g. a Gmail account with an App Password) to send real email.

## 2. Frontend setup

```bash
cd client
npm install
cp .env.example .env    # defaults are fine for local dev
npm run dev              # starts the site on http://localhost:5173
```

The Vite dev server proxies `/api` and `/uploads` to `http://localhost:5000`
(see `client/vite.config.js`), so the two `.env` files rarely need to
disagree in local development.

## 3. Using the site

- Visit `http://localhost:5173` for the public site.
- Visit `http://localhost:5173/admin/login` for the admin dashboard.
- Submit a Request a Quote form on any product page, or the Contact page —
  it will appear under Admin → Enquiries, and (if SMTP is configured) an
  email will be sent to `COMPANY_NOTIFY_EMAIL` plus an acknowledgement to
  the customer.

## Environment variables

See `server/.env.example` and `client/.env.example` for the full list with
inline explanations. Nothing sensitive (DB password, JWT secret, email
password, Cloudinary secret) is ever read from frontend code — only from
the backend's `.env`.

## Deployment

- **Frontend → Vercel**: import the `client/` folder as the project root,
  build command `npm run build`, output directory `dist`. Set
  `VITE_API_BASE_URL` to your deployed backend's URL (e.g.
  `https://api.kkglobaltrade.com/api`).
- **Backend → Render / Railway**: import the `server/` folder, build
  command `npm install`, start command `npm start`. Set all variables from
  `.env.example` in the platform's environment settings, plus `CLIENT_URL`
  pointing at your deployed frontend (for CORS).
- **Database → MongoDB Atlas**: create a free cluster, add a database user,
  allow network access from your backend host, and use the connection
  string as `MONGO_URI`.
- **Domain**: verify availability of `kkglobaltrade.com` / `kkglobaltrade.in`
  (and check for conflicting trademarks/business names) before registering.

After deploying, re-run `npm run seed` once against the production database
(with production `.env` values) to populate the initial catalogue.

## Project structure

```
server/
├── config/         db.js, cloudinary.js
├── controllers/    auth, product, category, enquiry, contact, company
├── middleware/      auth, error handling, validation, file upload
├── models/          User, Product, Category, Enquiry, CompanyProfile
├── routes/          one file per resource, mounted under /api/*
├── seed/            categoriesData.js, productsData.js, seed.js
├── services/        emailService.js (Nodemailer, with console fallback)
└── server.js

client/src/
├── components/      Navbar, Footer, Hero, ProductCard, QuoteForm, ...
├── pages/           Home, About, Products, ProductDetails, Quality,
│                    GlobalTrade, PrivateLabel, Contact, NotFound
├── admin/           Login, Dashboard, Products, ProductForm, Enquiries,
│                    Settings, AdminLayout
├── context/         AuthContext (admin JWT session)
├── routes/          ProtectedRoute (guards /admin/*)
├── services/        api.js (all backend calls, in one place)
└── utils/           constants.js, whatsapp.js
```

## What's deliberately not built yet

Per the spec's phased rollout, these were left for a later iteration:
blog/market updates, country-specific landing pages, downloadable PDF
catalogue, CRM integration, multi-language/multi-currency, shipment
tracking, buyer portal, and full technical SEO (sitemap.xml, robots.txt,
JSON-LD structured data) beyond per-page meta tags.
