import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import path from 'path'
import fs from 'fs'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Only initialize Prisma Client in Node.js runtime, not Edge
let prisma: PrismaClient

if (typeof window === 'undefined') {
  // Server-side only
  if (!globalForPrisma.prisma) {
    let databaseUrl = process.env.DATABASE_URL || 'file:./prisma/dev.db'
    
    // Check if using PostgreSQL (production) or SQLite (development)
    const isPostgres = databaseUrl.startsWith('postgresql://') || databaseUrl.startsWith('postgres://')
    
    if (!isPostgres) {
      // SQLite setup (development)
      // Ensure the URL format is correct (file:./path or file:/absolute/path)
      if (!databaseUrl.startsWith('file:')) {
        databaseUrl = `file:${databaseUrl}`
      }
      
      // If relative path, make it absolute
      if (databaseUrl.startsWith('file:./') || databaseUrl.startsWith('file:../')) {
        const filePath = databaseUrl.replace(/^file:/, '')
        const absolutePath = path.isAbsolute(filePath) 
          ? filePath 
          : path.join(process.cwd(), filePath)
        
        // Ensure directory exists
        const dir = path.dirname(absolutePath)
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true })
        }
        
        databaseUrl = `file:${absolutePath}`
      }
      
      try {
        // Create adapter with URL object for SQLite
        const adapter = new PrismaBetterSqlite3({
          url: databaseUrl,
        })
        
        prisma = new PrismaClient({
          adapter,
          log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
        })
      } catch (error) {
        // Fallback if better-sqlite3 fails (e.g., on Vercel serverless)
        console.warn('SQLite adapter failed, using default Prisma Client:', error)
        prisma = new PrismaClient({
          log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
        })
      }
    } else {
      // PostgreSQL setup (production) - Prisma 7 handles PostgreSQL natively
      // No adapter needed for PostgreSQL
      prisma = new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
      })
    }
    
    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prisma
    }
  } else {
    prisma = globalForPrisma.prisma
  }
} else {
  // Client-side: should never happen, but provide a fallback
  prisma = globalForPrisma.prisma as any
}

export { prisma }