import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import path from 'path'
import fs from 'fs'

// Ensure DATABASE_URL is available for Prisma
if (typeof process !== 'undefined' && !process.env.DATABASE_URL && typeof window === 'undefined') {
  // Try to load from .env.local if in Node.js environment
  try {
    require('dotenv').config({ path: '.env.local' })
  } catch {
    // Ignore if dotenv is not available or file doesn't exist
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Lazy initialization function - only called when prisma is actually used
function getPrisma(): PrismaClient {
  if (typeof window !== 'undefined') {
    throw new Error('Prisma Client cannot be used on the client side')
  }

  if (!globalForPrisma.prisma) {
    const databaseUrl = process.env.DATABASE_URL || 'file:./prisma/dev.db'
    
    // Check if using PostgreSQL (production) or SQLite (development)
    const isPostgres = databaseUrl.startsWith('postgresql://') || databaseUrl.startsWith('postgres://')
    
    if (!isPostgres) {
      // SQLite setup (development)
      let sqliteUrl = databaseUrl
      if (!sqliteUrl.startsWith('file:')) {
        sqliteUrl = `file:${sqliteUrl}`
      }
      
      if (sqliteUrl.startsWith('file:./') || sqliteUrl.startsWith('file:../')) {
        const filePath = sqliteUrl.replace(/^file:/, '')
        const absolutePath = path.isAbsolute(filePath) 
          ? filePath 
          : path.join(process.cwd(), filePath)
        
        const dir = path.dirname(absolutePath)
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true })
        }
        
        sqliteUrl = `file:${absolutePath}`
      }
      
      try {
        const adapter = new PrismaBetterSqlite3({
          url: sqliteUrl,
        })
        
        globalForPrisma.prisma = new PrismaClient({
          adapter,
          log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
        })
      } catch (error) {
        console.warn('SQLite adapter failed, using default Prisma Client:', error)
        globalForPrisma.prisma = new PrismaClient({
          log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
        })
      }
    } else {
      // PostgreSQL setup (production/Supabase)
      // DATABASE_URL is automatically read from process.env by Prisma
      // Ensure DATABASE_URL is set in the environment
      if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL environment variable is not set')
      }
      
      // For Prisma 7 with PostgreSQL, we need to ensure the connection URL is available
      // The URL is read from process.env.DATABASE_URL automatically
      // We don't need an adapter for PostgreSQL - it uses the native driver
      globalForPrisma.prisma = new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
      }) as PrismaClient
    }
  }
  
  return globalForPrisma.prisma
}

// Export a proxy that lazily initializes Prisma
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const instance = getPrisma()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (instance as any)[prop]
    return typeof value === 'function' ? value.bind(instance) : value
  }
})