# Reuben David Kizito Scholar Website

An editorial scholar portfolio and appointment-request website for Reuben David Kizito, built with Next.js, Supabase and Vercel.

## What is included

- Public profile, research, teaching, consultancy, community work and book pages.
- Searchable publication catalogue with DOI and book links.
- Native appointment-request flow with Africa/Kampala availability, blackout dates and collision protection.
- Contact form with server-side validation and optional Resend notifications.
- Supabase-backed admin studio for profile content, publications and appointment statuses.
- RLS policies that keep drafts, requests and private administration data out of the public site.
- Metadata, Open Graph defaults, sitemap, robots rules and responsive accessible presentation.

## Local development

1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env.local` and add the Supabase and Resend settings.
3. Apply `supabase/migrations/0001_scholar_site.sql` to a Supabase project.
4. Run `supabase/seed.sql` to load the CV publication catalogue.
5. Create a Supabase Auth user and add its id to `public.user_roles` as `admin`.
6. Start the site with `npm run dev`.

Without Supabase environment variables, public routes render from the bundled CV seed data and the admin/API write paths show a configuration message. This makes the editorial design reviewable before external services are connected.

## Commands

```text
npm run dev
npm run lint
npm run build
```

## Environment variables

See `.env.example`. `NEXT_PUBLIC_SUPABASE_ANON_KEY` is the browser-safe publishable key. Never expose a Supabase service-role key, Resend API key or other private credential in client-side code.

## Deployment

Connect the repository to Vercel, add the environment variables, apply the Supabase migration and seed, then verify `/`, `/publications`, `/appointments`, `/admin/login`, `/sitemap.xml` and `/robots.txt` in production.
