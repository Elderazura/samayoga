# Security Notice

## ⚠️ Important: API Keys and Secrets

**NEVER commit API keys, secrets, or credentials to version control!**

### What to Do:

1. **Use Environment Variables**
   - Store all sensitive data in `.env.local` (for local development)
   - Add environment variables in Vercel dashboard (for production)
   - `.env.local` is already in `.gitignore` and will NOT be committed

2. **If You Accidentally Commit a Secret:**
   - **IMMEDIATELY** regenerate the compromised key/secret
   - Remove it from git history (if possible)
   - Update all places where it was used
   - Never use the old key again

3. **Documentation Files:**
   - Use placeholders like `your_api_key_here` or `YOUR_API_KEY`
   - Never include real keys in documentation

### Current Environment Variables:

- `GOOGLE_API_KEY` - Google Gemini API key (get from https://makersuite.google.com/app/apikey)
- `AUTH_SECRET` - NextAuth secret (generate with `openssl rand -base64 32`)
- `DATABASE_URL` - Database connection string
- `AUTH_URL` - Your application URL
- `AUTH_GOOGLE_ID` - Google OAuth client ID (optional)
- `AUTH_GOOGLE_SECRET` - Google OAuth client secret (optional)

### How to Set Up Locally:

1. Copy `.env.example` to `.env.local` (if it exists)
2. Add your actual values to `.env.local`
3. `.env.local` is gitignored and will never be committed

### How to Set Up on Vercel:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add each variable with its actual value
3. Redeploy after adding variables

---

**Remember: If a key is exposed, regenerate it immediately!**
