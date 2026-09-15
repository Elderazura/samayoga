# Vercel Deployment Checklist

## ✅ Steps to Fix 404 Error

### 1. Check Vercel Build Logs
- Go to: https://vercel.com/dashboard
- Click on your project
- Click "Deployments" tab
- Click on latest deployment
- **Check "Build Logs"** - Look for:
  - Build errors
  - Missing dependencies
  - TypeScript errors
  - Compilation failures

### 2. Check Function Logs
- Same deployment page
- Click "Function Logs"
- Look for runtime errors like:
  - Database connection errors
  - Missing environment variables
  - Prisma errors

### 3. Verify Environment Variables

Go to: Settings → Environment Variables

**Required Variables:**
```
DATABASE_URL=file:./prisma/dev.db (or PostgreSQL URL)
AUTH_SECRET=<your-secret>
AUTH_URL=https://your-app.vercel.app
GOOGLE_API_KEY=your_google_api_key_here
```

**To Generate AUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 4. Most Likely Issue: Database

**SQLite doesn't work on Vercel serverless!**

**Solution: Use PostgreSQL**

1. **Create PostgreSQL Database:**
   - Vercel Dashboard → Your Project → Storage
   - Click "Create Database"
   - Select "Postgres"
   - Copy connection string

2. **Update Environment Variable:**
   - Settings → Environment Variables
   - Update `DATABASE_URL` with PostgreSQL connection string

3. **Update Prisma Schema:**
   - Edit `prisma/schema.prisma`
   - Change: `provider = "postgresql"`

4. **Run Migrations:**
   ```bash
   npx prisma migrate deploy
   ```

### 5. Check Project Settings

Verify these in Vercel:
- **Framework Preset**: Next.js
- **Root Directory**: `./` (should be empty)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

### 6. Redeploy

After fixing issues:
- Settings → Redeploy (latest deployment)
- OR push a new commit to trigger auto-deploy

## 🔍 Common Errors

### Error: "Cannot find module './lib/prisma'"
**Fix**: Ensure Prisma Client is generated
```bash
npx prisma generate
```

### Error: "better-sqlite3" not found
**Fix**: Switch to PostgreSQL for production

### Error: Environment variable missing
**Fix**: Add all required env vars in Vercel dashboard

### Error: Build fails with TypeScript errors
**Fix**: Check `next.config.js` - might need `ignoreBuildErrors: true` temporarily

## 📋 Quick Fix Steps

1. **Check build logs** - Identify specific error
2. **Add PostgreSQL database** - Don't use SQLite on Vercel
3. **Verify all env vars** - Especially AUTH_SECRET and DATABASE_URL
4. **Redeploy** - After making changes

## 🚀 After Fix

Once deployed successfully:
1. Visit your Vercel URL
2. Test sign up / sign in
3. Create admin user (via script or manually)
4. Test admin functions

---

**Share the build logs from Vercel if still getting 404!**