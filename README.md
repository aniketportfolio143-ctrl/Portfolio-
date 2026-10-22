# Aniket Shukla — Web & AI Developer Portfolio

A responsive React + Vite portfolio starter with project showcase/case studies, service pages, work inquiry form, sample review placeholders, and an optional Supabase-powered admin panel.

## Run locally

1. Install Node.js (LTS).
2. Open this folder in a terminal.
3. Run `npm install`
4. Copy `.env.example` to `.env.local` and add your Supabase project URL and publishable/anon key (optional for preview; required for live admin/database features).
5. Run `npm run dev` and open the local URL printed in the terminal.
6. Run `npm run build` before deployment.

## GitHub → Netlify

1. Create a new GitHub repository and upload/push these project files.
2. In Netlify choose **Add new site → Import an existing project** and connect that repository.
3. Build command: `npm run build`; publish directory: `dist` (also configured in `netlify.toml`).
4. In Netlify Site configuration → Environment variables, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` if using Supabase, then redeploy.

## Supabase setup

1. Create a Supabase project.
2. Open SQL Editor and run the complete `supabase/schema.sql` file.
3. In Authentication → Users, create your own admin user with your email and a strong password. Do not put credentials in source code.
4. In Supabase SQL Editor, replace `ADMIN_EMAIL_HERE` in the admin bootstrap SQL (at the bottom of `supabase/schema.sql`) with your admin email and run that statement. This grants the `admin` role in `profiles`.
5. Add the project URL and publishable/anon key to local `.env.local` and Netlify environment variables.
6. Keep Row Level Security enabled. Never put the Supabase service-role/secret key in frontend environment variables.

## What works in this starter

- Responsive landing page, navigation, service cards, category filters and project search.
- Project details/case-study modal pages, with visual preview artwork and honest concept labels.
- Work inquiry form with optional Supabase save and WhatsApp/email contact routes.
- Reviews are explicitly marked as sample placeholders until replaced by real, permissioned feedback.
- Supabase email/password admin login, with database-backed CRUD for projects, reviews, and service content where schema/policies allow.
- Admin inquiries list and basic aggregate page-view counter (only when Supabase is configured).

## Before publishing

- Replace the profile image placeholder in `src/data.js` with your own approved image.
- Replace concept showcases with genuine work when available; do not claim concept projects are completed client work.
- Replace sample review placeholders with real client feedback and permission to publish.
- Verify the WhatsApp number, email and Instagram URL.
- Review privacy/consent requirements for analytics and inquiry data in your jurisdiction.
- Test the admin role and RLS using a non-admin account before going live.

## Notes

This is a starter implementation, not an already deployed website. Supabase features remain unavailable until you configure your own project, environment variables, schema and admin role. Instagram does not allow a website to silently send a DM on a visitor's behalf; the site can open Instagram, but the visitor must send the message themselves.
