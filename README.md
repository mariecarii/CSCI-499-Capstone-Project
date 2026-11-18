# CSCI-499-Capstone-Project
AI Form Checker

# Built With
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-0097A7?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/edge/mediapipe/solutions/guide)
[![NumPy](https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white)](https://numpy.org/)
[![Scikit-learn](https://img.shields.io/badge/Scikit--learn-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white)](https://scikit-learn.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

# Our Goal

Help people check their exercise form from their device's camera. We extract body pose landmarks with MediaPipe, then train a classifier on those joint positions to tell good form from bad. The web app lets users pick an exercise, run a camera session, and keep a history of their workouts.

# Project Structure

| Path | What it is |
| --- | --- |
| [formcheck-web/](formcheck-web/) | Next.js web app: sign-in, exercise guides, camera sessions, exercise logging, settings |
| [ml_algo_.ipynb](ml_algo_.ipynb) | Notebook for the ML: loads datasets, MediaPipe pose detection, trains a scikit-learn classifier |
| [supabase/](supabase/) | Database migrations (the `workouts` table with row-level security) and auth email templates |
| [.env.local.example](.env.local.example) | Template for environment variables |

# Getting Started

## Web app

1. Create a [Supabase](https://supabase.com/) project, then run the SQL found in  [supabase/migrations/](supabase/migrations/) inside Supabase dashboard's SQL Editor.
2. Copy [.env.local.example](.env.local.example) to `formcheck-web/.env.local` and fill it in:
   - `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: Supabase dashboard, under Connect
   - `MUSCLEWIKI_API_KEY`: from [api.musclewiki.com](https://api.musclewiki.com)
3. Install and run:

   ```bash
   cd formcheck-web
   npm install
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## ML notebook

1. 