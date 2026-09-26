# HimKosh e-Challan — Actual Web App

A deployable Next.js frontend for an academic Human-Centered Design + AI redesign.

## Run locally

1. Install Node.js 20+.
2. Extract this folder.
3. Run:

```bash
npm install
npm run dev
```

4. Open http://localhost:3000

## Build for production

```bash
npm run build
npm start
```

## Deploy

The project is ready for Vercel/Netlify-style deployment as a Next.js app.

## AI

The `/api/ai-guide` endpoint is included as a working demo endpoint. The UI currently uses local demo responses so the site works without an API key. A real AI provider can be connected later through `.env.local`.

## Database/auth

This academic version deliberately uses demo data. Supabase can be added for real authentication, persistent user profiles, and transaction records.

## Safety

This is an independent academic prototype. It is NOT the Government of Himachal Pradesh website and does not process real challans or payments.
