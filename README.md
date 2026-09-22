# Foundry

A directory for browsing every club and activity at a high school — searchable,
filterable by category, with a dedicated page per club.

Built with Next.js (App Router) + TypeScript, MUI, and Tailwind CSS. Club
data is read from a Supabase table — see below to set that up.

## Project structure

- `src/app` — routes (App Router), including the per-club Overview and About pages
- `src/components` — UI components
- `src/data` — tag list + weekday order (no club data — that's Supabase-only now)
- `src/lib` — Supabase client + the `getClubs`/`getClubById` data layer
- `src/theme` — MUI theme + Next.js SSR style registry
- `src/types` — shared TypeScript types
