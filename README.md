# MensHealth Client

Next.js App Router client for the MensHealth platform. Built with Tailwind CSS,
Poppins font, and Framer Motion for subtle page animations.

## Getting started

Install dependencies:

```bash
npm install
```

Set the backend URL in `.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

Run the dev server:

```bash
npm run dev
```

Open `http://localhost:3000` to view the app.

## Backend communication

The API client lives in `src/lib/api.ts` and is used by the services under
`src/services`. It reads `NEXT_PUBLIC_API_BASE_URL` and automatically attaches
a Bearer token when one is available.

To use authenticated endpoints, store the admin token in local storage:

```bash
localStorage.setItem("mensHealthToken", "<token>");
```

Public endpoints used by default pages:

- `GET /api/blogs`
- `GET /api/products`

## Project structure

- `src/app` - App Router pages (Home, Blog, Products)
- `src/components` - shared UI components
- `src/services` - API wrappers for blogs/products
- `src/types` - shared API types
