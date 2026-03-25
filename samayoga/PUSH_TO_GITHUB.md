# Push to GitHub - Manual Instructions

## Current Status
✅ Code is committed locally (111 files, ready to push)

## The Push Command

Your code is ready. Run this command in your terminal:

```bash
cd /Users/azura/samayoga
git push origin main
```

(Use SSH, GitHub CLI, or a personal access token configured via `git credential` — do not embed tokens in files.)

Or use GitHub CLI (if installed):
```bash
cd /Users/azura/samayoga
gh auth login
git push origin main
```

## Alternative: Use GitHub Desktop or VS Code

1. **GitHub Desktop**:
   - Open GitHub Desktop
   - Add repository: `/Users/azura/samayoga`
   - Click "Publish repository"
   - Select `Elderazura/samayoga`

2. **VS Code**:
   - Open the folder in VS Code
   - Go to Source Control panel
   - Click "..." → "Push to..."
   - Enter: `https://github.com/Elderazura/samayoga.git`

## After Push: Deploy to Vercel

1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Select `Elderazura/samayoga`
4. Add environment variables:
   - `DATABASE_URL` (will need PostgreSQL for production)
   - `AUTH_SECRET` (generate with `openssl rand -base64 32`)
   - `AUTH_URL` (update after first deploy)
   - `GOOGLE_API_KEY` (your existing key)
5. Click "Deploy"

## Repository Info

- **GitHub**: https://github.com/Elderazura/samayoga.git
- **Local Path**: `/Users/azura/samayoga`
- **Branch**: `main`
- **Commit**: Ready (ab73d17)

---

**The code is ready - just needs to be pushed to GitHub!**