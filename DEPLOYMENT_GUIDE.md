# MediCamp - Deployment & Supabase Setup Guide

## 1. Supabase Setup (Database & Authentication)

1. Go to [https://supabase.com](https://supabase.com) and create a new project.
2. Open the **SQL Editor** tab in your Supabase dashboard.
3. Open [`supabase_schema.sql`](file:///Users/souravkumar/Documents/websites/medicamp/supabase_schema.sql) in this repository, copy all the SQL code, paste it into the Supabase SQL Editor, and click **RUN**.
   - This creates all 5 tables (`profiles`, `doctor_profiles`, `family_members`, `medical_records`, `prescribed_medicines`), triggers, storage buckets, and Row-Level Security policies.
4. Go to **Project Settings -> API** in Supabase to find:
   - **Project URL**
   - **Project API anon / public key**
5. Add these keys into your local [`.env`](file:///Users/souravkumar/Documents/websites/medicamp/.env) file:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-api-key
   ```

---

## 2. Vercel Deployment

1. Push this repository to GitHub or GitLab.
2. Go to [https://vercel.com](https://vercel.com) and click **"Add New Project"** -> **"Import Git Repository"**.
3. In the Vercel **Environment Variables** section, add:
   - `VITE_SUPABASE_URL` = your Supabase Project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase Anon Key
4. Click **Deploy**.
   - `vercel.json` is already configured for Single-Page App rewrites and security headers.
