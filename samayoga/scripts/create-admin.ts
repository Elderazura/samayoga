import bcrypt from 'bcryptjs'
import { config } from 'dotenv'

// Load environment variables from .env.local FIRST, before importing prisma
config({ path: '.env.local' })

// Verify DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error('❌ Error: DATABASE_URL is not set in .env.local')
  console.error('Please ensure .env.local contains your Supabase connection string.')
  process.exit(1)
}

// Import prisma after environment is loaded
// This uses the Prisma client from lib/prisma.ts which handles connection properly
const { prisma } = require('../lib/prisma')

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@samayoga.com'
  const password = process.env.ADMIN_PASSWORD || 'admin123'
  const name = process.env.ADMIN_NAME || 'Admin User'

  const hashedPassword = await bcrypt.hash(password, 10)

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      role: 'ADMIN',
      status: 'APPROVED',
      password: hashedPassword,
    },
    create: {
      email,
      name,
      password: hashedPassword,
      role: 'ADMIN',
      status: 'APPROVED',
    },
  })

  console.log('Admin user created/updated:', {
    id: admin.id,
    email: admin.email,
    role: admin.role,
    status: admin.status,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })