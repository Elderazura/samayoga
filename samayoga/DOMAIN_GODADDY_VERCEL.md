# Connect GoDaddy Domain to Vercel (Samayoga)

Follow these steps with **Vercel** and **GoDaddy** (you’re already logged into GoDaddy).

---

## 1. Add the domain in Vercel

1. Open **https://vercel.com/dashboard**
2. Click your **samayoga** project
3. Go to **Settings** → **Domains**
4. Under “Add Domain”, type your domain (e.g. `samayoga.com` or `www.samayoga.com`)
5. Click **Add**
6. Vercel will show which **DNS records** you need (see step 2)

**Tip:** Add both:
- `yourdomain.com` (apex/root)
- `www.yourdomain.com` (www)

Vercel will tell you the exact values to use.

---

## 2. Typical DNS values Vercel shows

Often you’ll see something like:

| Type | Name | Value |
|------|------|--------|
| **A** | `@` | `76.76.21.21` |
| **CNAME** | `www` | `cname.vercel-dns.com` |

Or for **apex (root) on Vercel**:

| Type | Name | Value |
|------|------|--------|
| **A** | `@` | `76.76.21.21` |
| **CNAME** | `www` | `cname.vercel-dns.com` |

**Use the values Vercel shows for your project** — they can differ. Copy them before going to GoDaddy.

---

## 3. Add/update records in GoDaddy

1. In GoDaddy, open **My Products** → find your domain → **DNS** (or **Manage DNS**)
2. **Add/update records** to match what Vercel told you:

   - **Root domain (e.g. samayoga.com):**
     - Type: **A**
     - Name: `@` (or leave “Host” blank if GoDaddy uses that)
     - Value: `76.76.21.21` (or the IP Vercel gave you)
     - TTL: 600 or 1 Hour

   - **www (e.g. www.samayoga.com):**
     - Type: **CNAME**
     - Name: `www`
     - Value: `cname.vercel-dns.com` (or the CNAME Vercel gave you)
     - TTL: 600 or 1 Hour

3. If there are **old A or CNAME** records for `@` or `www` pointing elsewhere, **edit** them to the values above or **delete** them so only the Vercel records remain.
4. Save.

DNS can take **5–60 minutes** (sometimes up to 48 hours). Vercel will show “Valid Configuration” when it’s correct.

---

## 4. Update Vercel environment variables

After the domain is working on Vercel:

1. Vercel Dashboard → **samayoga** → **Settings** → **Environment Variables**
2. Find **AUTH_URL** and set it to your live URL, e.g.:
   - `https://samayoga.com` or
   - `https://www.samayoga.com`
   (Use whichever you use as the main domain.)
3. Save and trigger a **redeploy**: **Deployments** → ⋮ on latest → **Redeploy**.

---

## 5. Optional: force HTTPS and prefer www (or non-www)

In Vercel **Settings** → **Domains** you can:

- Assign which domain is **primary** (e.g. redirect `samayoga.com` → `www.samayoga.com` or the other way).
- Vercel serves HTTPS automatically once DNS is valid.

---

## Checklist

- [ ] Domain added in Vercel (Settings → Domains)
- [ ] A record for `@` and CNAME for `www` (or as Vercel shows) set in GoDaddy
- [ ] Old conflicting A/CNAME for `@` and `www` removed or updated in GoDaddy
- [ ] Waited for DNS (Vercel shows “Valid Configuration”)
- [ ] AUTH_URL updated to `https://yourdomain.com` (or www) in Vercel
- [ ] Redeployed the project in Vercel

---

**Need the exact IP/CNAME?**  
In Vercel: **Project** → **Settings** → **Domains** → click your domain. The required records and values are shown there.
