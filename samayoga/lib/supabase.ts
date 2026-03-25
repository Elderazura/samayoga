import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Set them in .env.local (local) or Netlify/Vercel environment variables (production).'
  )
}

// Server-side Supabase client (for API routes and server components)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})

// Client-side Supabase client (for client components)
export function createBrowserClient() {
  return createClient(supabaseUrl, supabaseAnonKey)
}
