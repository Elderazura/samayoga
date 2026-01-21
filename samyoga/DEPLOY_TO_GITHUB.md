# Deploy to GitHub & Vercel

## 📦 Current Status

✅ **Code is committed locally** - All files are ready to push

## 🔐 Push to GitHub

The repository is set up but needs authentication. You have two options:

### Option 1: Use GitHub CLI (Recommended)

```bash
cd /Users/azura/samyoga

# Install GitHub CLI if not installed
# brew install gh

# Authenticate
gh auth login

# Push to GitHub
git push -u origin main
```

### Option 2: Use Git with Personal Access Token

```bash
cd /Users/azura/samyoga

# Push with token in URL (one-time)
# Replace YOUR_TOKEN with your actual GitHub Personal Access Token
git push https://YOUR_TOKEN@github.com/Elderazura/samayoga.git main
```

### Option 3: Set up SSH (Most Secure)

```bash
# Generate SSH key (if you don't have one)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to GitHub: Settings → SSH and GPG keys → New SSH key

# Change remote to SSH
git remote set-url origin git@github.com:Elderazura/samayoga.git

# Push
git push -u origin main
```

## 🚀 Deploy to Vercel

Once your code is on GitHub:

### Quick Deploy Steps:

1. **Go to Vercel**: https://vercel.com/new

2. **Import Repository**:
   - Click "Import Git Repository"
   - Select `Elderazura/samayoga`
   - Authorize if needed

3. **Configure Project**:
   - **Framework**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

4. **Add Environment Variables**:
   Click "Environment Variables" and add:
   
   ```
   DATABASE_URL=file:./prisma/dev.db
   AUTH_SECRET=<generate-new-secret>
   AUTH_URL=https://your-app.vercel.app
   GOOGLE_API_KEY=your_google_api_key_here
   ```

   **Generate AUTH_SECRET**:
   - Visit: https://generate-secret.vercel.app/32
   - Or run: `openssl rand -base64 32`

5. **Deploy!**
   - Click "Deploy"
   - Wait 2-3 minutes

6. **After First Deployment**:
   - Copy your deployment URL (e.g., `https://samayoga-abc123.vercel.app`)
   - Update `AUTH_URL` in Vercel environment variables
   - Redeploy

## ⚠️ Production Database

For production, use **PostgreSQL** instead of SQLite:

1. **Add Vercel Postgres**:
   - Vercel Dashboard → Your Project → Storage → Create Database
   - Select "Postgres"
   - Copy the connection string

2. **Update Environment Variable**:
   - Replace `DATABASE_URL` with PostgreSQL connection string
   - Update `prisma/schema.prisma` datasource to `provider = "postgresql"`
   - Run migration: `npx prisma migrate deploy`

3. **Create Admin User**:
   ```bash
   # Via Vercel CLI or connect to database directly
   npm run create-admin
   ```

## 📋 Checklist

- [ ] Push code to GitHub
- [ ] Create Vercel project
- [ ] Add environment variables
- [ ] Deploy
- [ ] Update AUTH_URL after first deployment
- [ ] Set up production database (PostgreSQL)
- [ ] Create admin user
- [ ] Test deployment

---

**Repository**: https://github.com/Elderazura/samayoga.git

Your code is ready! Just push to GitHub and deploy to Vercel! 🚀