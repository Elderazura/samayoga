# Vercel Deployment Guide

## ✅ GitHub Repository Ready

Your code has been pushed to: https://github.com/Elderazura/samayoga.git

## 🚀 Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Sign in with your GitHub account (or create an account)

2. **Create New Project**
   - Click "Add New..." → "Project"
   - Click "Import Git Repository"
   - Select `Elderazura/samayoga` repository

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Environment Variables**
   Add these in Vercel dashboard:
   ```
   DATABASE_URL=file:./prisma/dev.db
   AUTH_SECRET=<generate-a-secret-here>
   AUTH_URL=https://your-domain.vercel.app
   GOOGLE_API_KEY=your_google_api_key_here
   AUTH_GOOGLE_ID=<optional-if-using-google-oauth>
   AUTH_GOOGLE_SECRET=<optional-if-using-google-oauth>
   ```

   **Important:** 
   - Generate a new `AUTH_SECRET` (run `openssl rand -base64 32` or use https://generate-secret.vercel.app/32)
   - Update `AUTH_URL` with your actual Vercel domain after first deployment

5. **Deploy!**
   - Click "Deploy"
   - Wait for build to complete (usually 2-3 minutes)

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
cd /Users/azura/samyoga
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? samayoga (or your choice)
# - Directory? ./
# - Override settings? No

# Add environment variables
vercel env add DATABASE_URL
vercel env add AUTH_SECRET
vercel env add AUTH_URL
vercel env add GOOGLE_API_KEY

# Deploy to production
vercel --prod
```

## ⚠️ Important Notes

### Database for Production

SQLite (`file:./prisma/dev.db`) works for development, but for production you should use:

**Option 1: PostgreSQL (Recommended)**
1. Create a PostgreSQL database on Vercel Postgres, Supabase, or Railway
2. Update `DATABASE_URL` in Vercel environment variables
3. Update `prisma/schema.prisma` datasource to `provider = "postgresql"`
4. Run migrations: `npx prisma migrate deploy`

**Option 2: Keep SQLite** (for testing only)
- Note: SQLite on serverless functions has limitations
- Works for small-scale apps
- Consider upgrading to PostgreSQL for production

### Environment Variables Setup

1. **AUTH_SECRET**: Generate a secure random string
   ```bash
   openssl rand -base64 32
   ```

2. **AUTH_URL**: Update after first deployment
   - First deployment will give you a URL like: `https://samayoga-xyz.vercel.app`
   - Add this as `AUTH_URL` in environment variables
   - Redeploy

3. **DATABASE_URL**: For production PostgreSQL
   ```
   DATABASE_URL=postgresql://user:password@host:5432/database
   ```

### Post-Deployment Steps

1. **Create Admin User**
   ```bash
   # Connect to your deployed database
   # Or use Vercel CLI to run commands
   vercel exec npm run create-admin
   ```

2. **Run Migrations**
   ```bash
   vercel exec npx prisma migrate deploy
   ```

3. **Verify**
   - Visit your deployed URL
   - Test sign up / sign in
   - Test admin functions

## 🔗 Your Repository

**GitHub**: https://github.com/Elderazura/samayoga.git

After deployment, your site will be live at:
`https://samayoga-xyz.vercel.app` (or your custom domain)

## 📝 Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `AUTH_URL` and redeploy

---

**Ready to deploy!** 🚀

Follow the steps above to get your site live on Vercel.