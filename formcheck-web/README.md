# formcheck-web

The web app for the AI Form Checker. Built with [Next.js](https://nextjs.org) and [Supabase](https://supabase.com/).

## Running locally
1. Copy [../.env.local.example](../.env.local.example) to `.env.local` in this folder and fill in the values.
2. Make sure you already ran the SQL found in [../supabase/migrations/](../supabase/migrations/) inside your Supabase project.
3. Install and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts: 

`npm run dev:wsl` (listens on all interfaces if you are on WSL)

`npm run build` (compile for optimization and production) and `npm start` to start that build
 
 `npm run lint` (to report problems such as unused vars, react mistakes, and styling issues)

## Layout

| Path | What it holds |
| --- | --- |
| `app/` | Routes: `login`, `forgot-password`, `reset-password`, `update-password`, `auth`, and the signed-in area under `(app)/` (exercises, session, history, settings) |
| `app/(app)/session/[slug]/` | Camera session page for one exercise |
| `components/` | Shared React components |
| `lib/exercises.ts` | The list of supported exercises (with links to MuscleWiki guides) |
| `lib/supabase/` | Supabase client helpers |
| `proxy.ts` | Refreshes the auth session on each request |
