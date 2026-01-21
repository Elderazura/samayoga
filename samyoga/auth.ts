import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'

// Lazy load Prisma to avoid Edge runtime issues
let prisma: any
let adapter: any

function getPrisma() {
  if (!prisma && typeof window === 'undefined') {
    const { prisma: p } = require('./lib/prisma')
    prisma = p
  }
  return prisma
}

function getAdapter() {
  if (!adapter && process.env.DATABASE_URL && typeof window === 'undefined') {
    const prismaInstance = getPrisma()
    if (prismaInstance) {
      adapter = PrismaAdapter(prismaInstance) as any
    }
  }
  return adapter
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: getAdapter(),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET || '',
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const prismaInstance = getPrisma()
        if (!prismaInstance) return null

        const user = await prismaInstance.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          status: user.status,
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
    async jwt({ token, user, account }) {
      if (user) {
        token.sub = user.id
        token.role = (user as any).role
        token.status = (user as any).status
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