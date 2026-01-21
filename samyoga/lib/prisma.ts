import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import path from 'path'
import fs from 'fs'

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
      // PostgreSQL setup (production)
      globalForPrisma.prisma = new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
      })
    }
  }
  
  return globalForPrisma.prisma
}

// Export a proxy that lazily initializes Prisma
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const instance = getPrisma()
    const value = (instance as any)[prop]
    return typeof value === 'function' ? value.bind(instance) : value
  }
})