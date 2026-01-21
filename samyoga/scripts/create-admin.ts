import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

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