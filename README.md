# Foundry

A directory for browsing every club and activity at a high school — searchable,
filterable by category, with a dedicated page per club.

Built with Next.js (App Router) + TypeScript, MUI, and Tailwind CSS. Supabase
is stubbed out (`src/lib/supabaseClient.ts`, `.env.example`) but not wired up
yet — the app currently runs on local mock data in `src/data/clubs.ts`. 

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `src/app` — routes (App Router), including the intercepted club-detail modal
- `src/components` — UI components
- `src/data` — mock club data + tag list
- `src/theme` — MUI theme + Next.js SSR style registry
- `src/types` — shared TypeScript types
- `src/lib` — Supabase client stub
