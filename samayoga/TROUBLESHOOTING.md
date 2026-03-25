# Website Not Loading - Troubleshooting Guide

## ✅ Current Status

- **Server**: Running on http://localhost:3000
- **Build**: Successful
- **HTML**: Loading correctly
- **Database**: Connected to Supabase PostgreSQL

## Common Issues & Solutions

### 1. Blank Page / Components Not Rendering

**Possible causes:**
- JavaScript errors in browser console
- Database connection timeout
- Component hydration errors

**Solutions:**
1. **Open browser DevTools** (F12)
2. **Check Console tab** for JavaScript errors
3. **Check Network tab** for failed requests (look for red entries)
4. **Hard refresh**: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

### 2. Database Connection Issues

**Symptoms:**
- Pages that query database show errors
- API routes return 500 errors
- "Database connection failed" messages

**Solutions:**
1. Verify `.env.local` has correct `DATABASE_URL`:
   ```bash
   cat .env.local | grep DATABASE_URL
   ```

2. Test database connection:
   ```bash
   npx prisma db push
   ```

3. Check Supabase dashboard:
   - Go to your Supabase project
   - Check if database is active
   - Verify connection string is correct

### 3. JavaScript Errors

**Check browser console:**
1. Open http://localhost:3000
2. Press F12 (DevTools)
3. Go to **Console** tab
4. Look for red error messages
5. Share the error message if you see any

### 4. Network Errors

**Check Network tab:**
1. Open DevTools (F12)
2. Go to **Network** tab
3. Refresh the page
4. Look for:
   - Red entries (failed requests)
   - 404 errors (missing files)
   - 500 errors (server errors)
   - CORS errors

### 5. Cache Issues

**Clear browser cache:**
1. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
2. Or use incognito/private mode
3. Clear Next.js cache:
   ```bash
   rm -rf .next
   npm run dev
   ```

## Quick Diagnostic Steps

1. **Check if server is running:**
   ```bash
   lsof -ti:3000
   ```

2. **Restart the server:**
   ```bash
   lsof -ti:3000 | xargs kill -9
   npm run dev
   ```

3. **Verify database connection:**
   ```bash
   npx prisma db push
   ```

4. **Check build:**
   ```bash
   npm run build
   ```

## What to Share for Help

If the website still isn't loading, please share:

1. **Browser console errors** (F12 → Console tab)
2. **Network tab errors** (F12 → Network tab → look for red entries)
3. **Which page** you're trying to access
4. **What you see** (blank page, error message, partial load, etc.)
5. **Server logs** (terminal output from `npm run dev`)

## Current Configuration

- **Database**: Supabase PostgreSQL ✅
- **Auth**: Email/Password only (Google OAuth removed) ✅
- **Server**: Next.js 14.2.35 ✅
- **Port**: 3000 ✅

The website should be accessible at: **http://localhost:3000**
