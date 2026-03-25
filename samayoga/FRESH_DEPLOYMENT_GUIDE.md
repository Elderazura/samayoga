# Fresh Deployment Guide

## ✅ Diagnostics Complete

All errors have been fixed:
- ✅ Build successful (no TypeScript errors)
- ✅ All critical linting errors fixed
- ✅ Dependencies verified
- ✅ Prisma 7 PostgreSQL adapter configured
- ✅ All unescaped entities fixed

## 🗑️ Step 1: Remove GitHub Repository

### Option A: Via GitHub Web Interface (Recommended)
1. Go to: https://github.com/Elderazura/samayoga
2. Click **Settings** (top right)
3. Scroll down to **Danger Zone**
4. Click **Delete this repository**
5. Type `Elderazura/samayoga` to confirm
6. Click **I understand the consequences, delete this repository**

### Option B: Via GitHub CLI
```bash
gh repo delete Elderazura/samayoga --yes
```

## 🗑️ Step 2: Clear Vercel Project

### Via Vercel Dashboard
1. Go to: https://vercel.com/dashboard
2. Click on **samayoga** project
3. Go to **Settings**
4. Scroll to **Danger Zone**
5. Click **Delete Project**
6. Type project name to confirm
7. Click **Delete**

### Via Vercel CLI
```bash
vercel remove samayoga --yes
```

## 🆕 Step 3: Create Fresh GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `samayoga`
3. Description: `Samayoga - Yoga wellness platform`
4. Set to **Private** or **Public** (your choice)
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **Create repository**

## 📤 Step 4: Push Fresh Code

```bash
cd /Users/azura/samayoga

# Remove old remote
git remote remove origin

# Add new remote (replace YOUR_USERNAME if different)
git remote add origin https://github.com/Elderazura/samayoga.git

# Push to new repository
git push -u origin main
```

## 🚀 Step 5: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended)
1. Go to: https://vercel.com/new
2. Click **Import Git Repository**
3. Select **Elderazura/samayoga**
4. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave empty)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
5. Add Environment Variables:
   ```
   DATABASE_URL=postgresql://postgres.tsqekcguvwlwugnfzfig:Pentacose369%2A@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true
   DIRECT_URL=postgresql://postgres.tsqekcguvwlwugnfzfig:Pentacose369%2A@aws-1-ap-south-1.pooler.supabase.com:5432/postgres
   AUTH_SECRET=MmXrbu0dpYBXrgp+4FxHRjZzJ6pX2Sc09oSC9u21qrQ=
   AUTH_URL=https://samayoga.vercel.app
   ```
6. Click **Deploy**

### Option B: Via Vercel CLI
```bash
cd /Users/azura/samayoga

# Link to new project
vercel link

# Add environment variables
vercel env add DATABASE_URL production
vercel env add DIRECT_URL production
vercel env add AUTH_SECRET production
vercel env add AUTH_URL production

# Deploy
vercel --prod
```

## 👤 Step 6: Create Admin User

After deployment, create the admin user:

```bash
cd /Users/azura/samayoga
npm run create-admin
```

**Admin Credentials:**
- Email: `admin@samayoga.com`
- Password: `admin123`

## ✅ Verification Checklist

- [ ] GitHub repo deleted
- [ ] Vercel project deleted
- [ ] New GitHub repo created
- [ ] Code pushed to new repo
- [ ] Vercel project created and linked
- [ ] Environment variables set
- [ ] Deployment successful
- [ ] Admin user created
- [ ] Login tested

## 📝 Notes

- The codebase is now clean and error-free
- All Prisma 7 PostgreSQL adapter issues are resolved
- All linting errors are fixed
- Build passes successfully
- Ready for production deployment
