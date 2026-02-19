# HealthPulse — Men's Health Client

> A modern, full-featured health and wellness web platform built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**. The platform delivers expert health content, a curated product shop, and a rich community experience for men's health and wellness.

**Live URL:** [https://men-health-mu.vercel.app](https://men-health-mu.vercel.app)  
**Backend API:** [https://menhealthbackend.onrender.com](https://menhealthbackend.onrender.com)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Pages & Routes](#pages--routes)
- [Components](#components)
- [Services & API Layer](#services--api-layer)
- [Authentication](#authentication)
- [Comment System](#comment-system)
- [Share System](#share-system)
- [Shopping & Cart](#shopping--cart)
- [Planned Advanced Features](#planned-advanced-features)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + `@tailwindcss/typography` |
| Animations | Framer Motion 12 |
| State | React Context API |
| HTTP Client | Custom `apiFetch` wrapper (`src/lib/api.ts`) |
| Auth | JWT Bearer tokens via `localStorage` |
| Deployment | Vercel |

---

## Features

### Content & Blog
- **Dynamic blog listing** with featured post hero, category filtering, and paginated article grid
- **Full article pages** with rich HTML rendering, table of contents, read-time estimate, and related articles
- **Category chips** for filtering posts by health topic
- **SEO-ready** — server-side rendered pages with `revalidate` for ISR (Incremental Static Regeneration)

### E-Commerce / Shop
- **Product catalogue** with category sidebar (desktop) and chip filters (mobile)
- **Product detail pages** with image gallery, stock status, pricing, and add-to-cart
- **Shopping cart** with quantity management, subtotal, shipping, and tax calculation
- **Checkout flow** with order form and payment summary

### Community & Engagement
- **Comment system** — authenticated users can post comments on blog articles
- **Admin reply notifications** — commenters receive email when an admin replies
- **Share buttons** — Facebook, Twitter/X, LinkedIn, WhatsApp, Email, and Copy Link
- **Unique trackable share links** per post via `shareToken`
- **Newsletter subscription** section on Home and Blog pages

### User Accounts
- **Registration** with full name, email, phone, and location
- **Email verification** via 6-digit OTP code (Brevo/SendinBlue)
- **Login / Logout** with JWT session management
- **User avatar** with initials derived from full name
- **Protected routes** — middleware redirects unauthenticated users away from checkout

### UI / UX
- **Fully responsive** — mobile-first design with hamburger navigation, 2-column footer grid, and stacked layouts
- **Animated sections** using Framer Motion `fadeInUp` on scroll
- **Sticky navbar** with blur backdrop
- **Active route highlighting** in navigation
- **Optimistic UI** on comment submission
- **Toast-style feedback** for copy link, form errors, and success states

---

## Project Structure

```
mensHealthClient/
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── page.tsx                # Home — hero, blog preview, product preview, newsletter
│   │   ├── layout.tsx              # Root layout — Navbar, Footer, AuthProvider, CartProvider
│   │   ├── globals.css             # Global styles and CSS variables
│   │   ├── blog/
│   │   │   ├── page.tsx            # Blog listing — featured post + article grid
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Blog article — content, comments, share buttons
│   │   ├── products/
│   │   │   ├── page.tsx            # Product catalogue with filters
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Product detail page
│   │   ├── cart/
│   │   │   └── page.tsx            # Shopping cart
│   │   ├── checkout/
│   │   │   └── page.tsx            # Checkout form
│   │   ├── signin/
│   │   │   └── page.tsx            # Sign in
│   │   ├── signup/
│   │   │   └── page.tsx            # Register
│   │   └── verify/
│   │       └── page.tsx            # OTP email verification
│   ├── components/
│   │   ├── Navbar.tsx              # Sticky nav with mobile hamburger menu
│   │   ├── Footer.tsx              # Responsive 2-col mobile footer
│   │   ├── CommentSection.tsx      # Auth-gated comment form + comment list
│   │   ├── ShareButtons.tsx        # Social share + copy link buttons
│   │   ├── AddToCartButton.tsx     # Cart action button (icon or full)
│   │   ├── ProductGallery.tsx      # Product image carousel
│   │   └── AnimatedSection.tsx     # Framer Motion scroll-reveal wrapper
│   ├── context/
│   │   ├── AuthContext.tsx         # Global auth state (user, login, logout, register)
│   │   └── CartContext.tsx         # Global cart state (items, qty, subtotal)
│   ├── services/
│   │   ├── blogs.ts                # getPublicBlogs, getBlogBySlug
│   │   ├── products.ts             # getPublicProducts, getProductBySlug
│   │   ├── categories.ts           # getCategories
│   │   └── comments.ts             # getPostComments, addComment
│   ├── lib/
│   │   └── api.ts                  # apiFetch, api.get, api.post, ApiError, authTokenKey
│   ├── types/
│   │   ├── blog.ts                 # BlogPost, BlogCategory types
│   │   └── product.ts              # Product type
│   ├── data/                       # Static data (e.g. local fallbacks)
│   └── middleware.ts               # Next.js middleware — protects /checkout route
├── public/                         # Static assets
├── .env.local                      # Local environment variables (gitignored)
├── next.config.ts                  # Next.js config (image domains, etc.)
├── tailwind.config.ts              # Tailwind configuration
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd mensHealthClient

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Production

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Required — URL of the backend API
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

For production (set in Vercel dashboard):

```env
NEXT_PUBLIC_API_BASE_URL=https://menhealthbackend.onrender.com
```

> **Note:** Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. All other secrets must remain server-side.

---

## Pages & Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Home — hero, blog preview, product preview, newsletter |
| `/blog` | Public | Blog listing with category filter |
| `/blog/[slug]` | Public | Full article with comments and share |
| `/products` | Public | Product catalogue with filters and sort |
| `/products/[slug]` | Public | Product detail with gallery and add-to-cart |
| `/cart` | Public | Shopping cart |
| `/checkout` | Auth required | Checkout form (protected by middleware) |
| `/signin` | Guest only | Login page |
| `/signup` | Guest only | Registration page |
| `/verify` | Guest only | OTP email verification |

---

## Components

### `Navbar`
- Sticky header with blur backdrop
- Desktop: logo, search bar, nav links, cart icon, user avatar/dropdown
- Mobile: hamburger button toggles a full nav panel with search, links, cart, and auth
- Auto-closes on route change; `aria-expanded` for accessibility

### `Footer`
- 2-column grid on mobile, 4-column on desktop
- Brand column spans full width on mobile
- Social links (Twitter, Instagram, YouTube), quick links, support links, contact info
- Hidden on auth pages (`/signin`, `/signup`, `/verify`)

### `CommentSection`
- Requires authentication — shows sign-in prompt for guests
- Validates content (5–500 characters)
- Optimistic UI — comment appears immediately on submit
- Displays approved comments with admin replies
- Triggers admin email notification on new comment

### `ShareButtons`
- Supports: Facebook, Twitter/X, LinkedIn, WhatsApp, Email, Copy Link
- Uses Web Share API on supported mobile browsers
- Copy Link shows inline "Copied!" feedback for 2 seconds

### `AddToCartButton`
- `iconOnly` prop for compact card usage
- Full button variant for product detail pages
- Integrates with `CartContext`

### `ProductGallery`
- Image carousel for product detail pages
- Thumbnail navigation

### `AnimatedSection`
- Framer Motion wrapper with `fadeInUp` animation on scroll entry
- Used on every major page section

---

## Services & API Layer

All API calls go through `src/lib/api.ts`:

```ts
// Authenticated GET
api.get<T>('/api/endpoint')

// Authenticated POST
api.post<T>('/api/endpoint', { body })
```

The `apiFetch` function automatically:
- Attaches `Content-Type: application/json`
- Reads `mensHealthToken` from `localStorage` and adds `Authorization: Bearer <token>`
- Parses JSON responses
- Throws `ApiError` with message and status code on non-2xx responses

### Service files

| File | Functions |
|---|---|
| `blogs.ts` | `getPublicBlogs(init, filters?)`, `getBlogBySlug(slug)` |
| `products.ts` | `getPublicProducts()`, `getProductBySlug(slug)` |
| `categories.ts` | `getCategories(init?)` |
| `comments.ts` | `getPostComments(postId)`, `addComment(postId, content)` |

---

## Authentication

Authentication is managed by `AuthContext` (`src/context/AuthContext.tsx`):

- **Token storage:** `localStorage` key `mensHealthToken`
- **Auto-load:** On mount, fetches `/api/auth/me` if a token exists to restore session
- **Login:** `POST /api/auth/login` → stores token + user object
- **Register:** `POST /api/auth/register` → returns email for OTP verification
- **Logout:** Clears token and resets user state
- **Route protection:** `src/middleware.ts` redirects unauthenticated users from `/checkout` to `/signin`

### User object shape

```ts
type AuthUser = {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  profilePhoto?: string;
  location?: string;
  isVerified: boolean;
};
```

---

## Comment System

Comments are scoped to individual blog posts and require authentication.

**Flow:**
1. Authenticated user submits a comment via `CommentSection`
2. Frontend calls `POST /api/comments` with `postId` and `content`
3. Backend validates (5–500 chars), sanitizes, checks for duplicates within 10 minutes, and stores the comment
4. Admin receives an email notification with commenter name, excerpt, and a link to the post
5. Admin replies via the admin dashboard
6. Commenter receives an email notification with the reply preview and a link back to the article

**Rate limiting:** 5 comments per 15 minutes per IP (enforced server-side).

---

## Share System

Each blog post has a unique `shareToken` for trackable links.

**Supported platforms:**
- Facebook
- Twitter / X
- LinkedIn
- WhatsApp
- Email (mailto)
- Copy Link (clipboard API with visual feedback)

On mobile browsers that support the Web Share API, a native share sheet is triggered instead.

---

## Shopping & Cart

Cart state is managed globally by `CartContext` (`src/context/CartContext.tsx`):

- Items persist across page navigation (in-memory; can be extended to `localStorage`)
- `updateQty(id, qty)` — update item quantity
- `removeItem(id)` — remove item from cart
- `clearCart()` — empty cart after checkout
- `subtotal`, `totalQty` computed values

Checkout is protected — unauthenticated users are redirected to `/signin` by Next.js middleware.

---

## Planned Advanced Features

The following features are planned for upcoming releases:

### User Experience
- **Dark mode** — system-preference-aware theme toggle with `prefers-color-scheme` and manual override stored in `localStorage`
- **Progressive Web App (PWA)** — offline support, installable on mobile, push notifications for new articles and order updates
- **Infinite scroll** on blog listing and product catalogue, replacing the "Load More" button
- **Real-time search** with debounced input and instant results dropdown (blog posts + products)
- **Bookmark / Save articles** — authenticated users can save articles to a personal reading list
- **Reading progress bar** — visual indicator of scroll progress on blog article pages

### Personalisation
- **User profile page** — edit name, email, phone, location, and profile photo (Cloudinary upload)
- **Order history** — authenticated users can view past orders and their statuses
- **Wishlist** — save products for later with persistent storage
- **Personalised recommendations** — "You may also like" sections based on viewed categories

### Community
- **Comment reactions** — like/upvote individual comments
- **Nested replies** — users can reply to other users' comments (threaded discussions)
- **Comment moderation queue** — admin dashboard for approving, rejecting, and flagging comments
- **Report comment** — flag inappropriate content for admin review

### E-Commerce
- **Promo codes & discounts** — apply coupon codes at checkout
- **Multiple payment gateways** — Paystack, Flutterwave, and Stripe integration
- **Order tracking** — real-time order status updates via email and on-site notifications
- **Product reviews & ratings** — star ratings and written reviews on product pages
- **Stock alerts** — "Notify me when back in stock" for out-of-stock products
- **Related products** carousel on product detail pages

### Performance & SEO
- **Dynamic Open Graph images** — auto-generated OG images per blog post and product using `next/og`
- **Structured data (JSON-LD)** — Article and Product schema for rich Google search results
- **Image optimisation** — lazy loading, blur placeholders, and WebP conversion via `next/image`
- **Comment thread caching** — Redis-backed cache for high-traffic article comment threads

### Security & Reliability
- **CSRF protection** — double-submit cookie pattern on all state-mutating forms
- **Input sanitisation** — DOMPurify on the client for any user-generated HTML rendering
- **Error boundary** — React error boundaries with graceful fallback UI
- **Retry logic** — automatic retry with exponential backoff on failed API requests
- **Accessibility audit** — WCAG 2.1 AA compliance across all pages

### Analytics & Monitoring
- **Page view tracking** — privacy-friendly analytics (Plausible or Umami)
- **Share link click tracking** — count and attribute traffic from each share channel
- **Error monitoring** — Sentry integration for client-side error reporting
- **Performance monitoring** — Core Web Vitals tracking via Vercel Analytics

---

## Deployment

The frontend is deployed on **Vercel** with automatic deployments on push to `main`.

### Required Vercel Environment Variables

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | `https://menhealthbackend.onrender.com` |

### Deploy manually

```bash
vercel --prod
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please follow the existing code style (TypeScript strict mode, Tailwind utility classes, no inline styles).

---

## License

Private — All rights reserved © 2026 HealthPulse.
