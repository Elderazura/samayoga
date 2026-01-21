# Quick Start Guide

## ✅ Server is Running!

Your dev server should be accessible at: **http://localhost:3000**

## If You Don't See the Preview:

### 1. Check the Browser
- Open your browser and go to: `http://localhost:3000`
- Make sure you're not looking at a cached page - try a hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

### 2. Check if Server is Running
```bash
# Check if something is running on port 3000
lsof -ti:3000

# If nothing, start the server
cd /Users/azura/samyoga
npm run dev
```

### 3. Check for Errors
```bash
# View server logs
tail -f /tmp/samyoga-dev.log
```

### 4. Verify the Database
The database exists at: `/Users/azura/samyoga/prisma/dev.db`

If you need to recreate it:
```bash
cd /Users/azura/samyoga
npx prisma migrate reset
npx prisma migrate deploy
npm run create-admin
```

## What You Should See:

1. **Homepage** (`http://localhost:3000`)
   - Hero section with "Samayoga" title
   - Yoga image background
   - Navigation menu

2. **All Pages Working**:
   - `/` - Home
   - `/about` - About page
   - `/media` - Media gallery
   - `/blog` - Blog listing
   - `/contact` - Contact form
   - `/auth/signin` - Sign in page

## Common Issues:

### Port Already in Use
If port 3000 is busy:
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Module Not Found Errors
```bash
npm install
npm run build
```

### Database Connection Issues
Make sure `.env.local` has:
```
DATABASE_URL="file:./prisma/dev.db"
```

## Still Not Working?

1. **Check browser console** for JavaScript errors (F12)
2. **Check network tab** to see if files are loading
3. **Try incognito/private mode** to avoid cache issues
4. **Check server terminal** for any error messages

---

**The server IS running and serving HTML correctly!** The issue might be browser-related.