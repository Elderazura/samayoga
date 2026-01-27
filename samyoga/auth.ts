import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'

// Lazy load Prisma to avoid Edge runtime issues
import type { PrismaClient } from '@prisma/client'
import type { Adapter } from 'next-auth/adapters'

let prisma: PrismaClient | undefined
let adapter: Adapter | undefined

function getPrisma() {
  if (!prisma && typeof window === 'undefined') {
    const { prisma: p } = require('./lib/prisma')
    prisma = p
  }
  return prisma
}

function getAdapter(): Adapter | undefined {
  if (!adapter && process.env.DATABASE_URL && typeof window === 'undefined') {
    const prismaInstance = getPrisma()
    if (prismaInstance) {
      adapter = PrismaAdapter(prismaInstance) as Adapter
    }
  }
  return adapter
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: getAdapter(),
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

          const prismaInstance = getPrisma()
          if (!prismaInstance) {
            console.error('[Auth] Prisma instance not available')
            return null
          }

          const user = await prismaInstance.user.findUnique({
            where: { email: credentials.email as string },
          })

          if (!user) {
            console.error(`[Auth] User not found: ${credentials.email}`)
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