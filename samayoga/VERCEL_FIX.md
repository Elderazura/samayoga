# Fixing Vercel 404 Error

## Common Causes & Fixes

### Issue 1: SQLite/Better-SQLite3 on Serverless

**Problem**: `better-sqlite3` doesn't work well on Vercel's serverless functions.

**Solution**: Switch to PostgreSQL for production.

### Issue 2: Missing Environment Variables

Make sure these are set in Vercel:
- `DATABASE_URL`
- `AUTH_SECRET`
- `AUTH_URL`
- `GOOGLE_API_KEY`

### Issue 3: Build Errors

Check Vercel build logs for errors.

## Quick Fixes

1. **Check Build Logs**: Go to Vercel Dashboard → Your Project → Deployments → Click latest deployment → View build logs

2. **Check Function Logs**: View runtime logs to see actual errors

3. **Temporary Fix**: Update Prisma to handle missing DATABASE_URL gracefully