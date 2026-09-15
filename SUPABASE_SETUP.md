# Supabase Database Setup for Samayoga

This guide walks you through connecting your Samayoga app to a Supabase PostgreSQL database.

---

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in (or create an account).
2. Click **New project**.
3. Choose your **organization** (or create one).
4. Set:
   - **Name:** e.g. `samayoga`
   - **Database password:** create a strong password and store it safely.
   - **Region:** pick one close to you or your users.
5. Click **Create new project** and wait until it’s ready.

---

## 2. Get connection strings

1. In the Supabase dashboard, open your project.
2. Go to **Settings** (gear) → **Database**.
3. Under **Connection string**, choose **URI**.
4. You’ll see two kinds of URLs:

   **Session mode (direct, port 5432)**  
   - Use for: migrations, local dev.  
   - Format:  
     `postgresql://postgres.[project-ref]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:5432/postgres`  
   - Or use the “Direct connection” / “Session” variant if shown.  
   - Replace `[YOUR-PASSWORD]` with your database password.

   **Transaction mode (pooler, port 6543)**  
   - Use for: app in production (e.g. Vercel).  
   - Format:  
     `postgresql://postgres.[project-ref]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true`  
   - Replace `[YOUR-PASSWORD]` with your database password.

   You can also copy these from the **Connection pooling** section and use “Session” vs “Transaction” as above.

---

## 3. Configure environment variables

1. In the project root, open or create `.env.local` (it’s gitignored).
2. Add both Supabase connection strings:

```env
# Connect to Supabase via connection pooling (for app runtime)
DATABASE_URL="postgresql://postgres.[project-ref]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection to the database. Used for migrations
DIRECT_URL="postgresql://postgres.[project-ref]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:5432/postgres"
```

Replace `[project-ref]`, `[YOUR-PASSWORD]`, and `[region]` with the values from the Supabase dashboard.

**How it works:**
- `DATABASE_URL` is used by your Next.js app (via `process.env`) for the Prisma client at runtime
- `DIRECT_URL` is used by Prisma CLI commands (migrations, `db push`) via `prisma.config.ts`
- Keep your other variables (e.g. `AUTH_SECRET`, `AUTH_URL`) as they are

---

## 4. Create tables and generate the client

The Prisma schema uses `provider = "postgresql"`. The `prisma.config.ts` file uses `DIRECT_URL` for migrations (or falls back to `DATABASE_URL` if `DIRECT_URL` is not set).

Because the project previously used SQLite, use **`db push`** for the first Supabase setup. On an empty database, run:

```bash
npx prisma db push
```

Then generate the Prisma client:

```bash
npx prisma generate
```

**Using migrations later:** For new schema changes after Supabase is set up, you can use `npx prisma migrate dev --name your_change`. For a completely fresh migration history on Supabase, you can remove the existing `prisma/migrations` folder (after backing it up if needed), then run `npx prisma migrate dev --name init` on an empty Supabase database to create one initial PostgreSQL migration.

---

## 5. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Auth, registrations, classes, and payments will use the Supabase database.

---

## 6. Quick checklist

- [ ] Supabase project created  
- [ ] Database password saved  
- [ ] `DATABASE_URL` (pooler, port 6543) in `.env.local`  
- [ ] `DIRECT_URL` (direct, port 5432) in `.env.local`  
- [ ] Both URLs updated in Vercel/hosting for production  
- [ ] `npx prisma db push` run successfully  
- [ ] `npx prisma generate` run  
- [ ] App runs with `npm run dev` and can sign in / use data  

---

## Optional: Supabase Dashboard

- **Table Editor:** view/edit rows for `User`, `Registration`, `Class`, etc.  
- **SQL Editor:** run raw SQL.  
- **Logs:** check Postgres and API logs if something fails.

---

## Troubleshooting

**“Can’t reach database” / connection timeouts**

- Confirm both `DATABASE_URL` and `DIRECT_URL` have the correct password and no extra spaces or quotes.
- `DIRECT_URL` should use port **5432** (Session mode) for migrations.
- `DATABASE_URL` should use port **6543** with `?pgbouncer=true` (Transaction pooler) for app runtime.

**“Relation does not exist”**

- Tables haven’t been created yet. Run `npx prisma db push` again.
- Confirm you’re using the right project (check host/`project-ref` in the URLs).

**“Missing required environment variable: DATABASE_URL”**

- Ensure `.env.local` exists in the project root and contains both `DATABASE_URL` and `DIRECT_URL`.
- Prisma loads `DIRECT_URL` via `prisma.config.ts` for migrations; your app uses `DATABASE_URL` from `process.env`.

**Migrations fail with pooler URL**

- Make sure `DIRECT_URL` is set and uses port **5432** (not 6543) without `?pgbouncer=true`.
- The direct connection is required for migrations; the pooler is for app queries only.

**Local dev vs production**

- Use the same setup for both: `DATABASE_URL` (pooler) for app, `DIRECT_URL` (direct) for migrations.
- Set both in Vercel/hosting provider’s environment variables for production.

---

## Notes

- This app uses **NextAuth** with **Prisma** and the existing schema. Auth remains in your Next.js app; Supabase is used only as the Postgres database.
- For optional extras (storage, Realtime, Edge Functions), see [Supabase docs](https://supabase.com/docs).
