import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { supabase } from './lib/supabase'

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.error('[Auth] Missing credentials')
            return null
          }

          // Normalize email to lowercase for case-insensitive lookup
          const normalizedEmail = (credentials.email as string).toLowerCase().trim()
          
          // Query user from Supabase
          const { data: user, error } = await supabase
            .from('User')
            .select('id, email, name, image, password, role, status')
            .eq('email', normalizedEmail)
            .single()

          if (error || !user) {
            console.error(`[Auth] User not found: ${credentials.email}`, error?.message)
            return null
          }

          if (!user.password) {
            console.error(`[Auth] User has no password: ${credentials.email}`)
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          )

          if (!isPasswordValid) {
            console.error(`[Auth] Invalid password for: ${credentials.email}`)
            return null
          }

          console.log(`[Auth] Successful login: ${credentials.email}`)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role,
            status: user.status,
          }
        } catch (error: any) {
          console.error('[Auth] Error during authorization:', error.message)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.sub!
        session.user.role = token.role as 'STUDENT' | 'ADMIN'
        session.user.status = token.status as 'PENDING' | 'APPROVED' | 'REJECTED'
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
        token.role = user.role
        token.status = user.status
      }
      return token
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
})
