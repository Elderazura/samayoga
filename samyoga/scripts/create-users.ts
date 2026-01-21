import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  const password = await bcrypt.hash('12345678', 10)

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'salith@samyoga.online' },
    update: {
      password,
      role: 'ADMIN',
      status: 'APPROVED',
    },
    create: {
        email: 'salith@samayoga.online',
      name: 'Admin User',
      password,
      role: 'ADMIN',
      status: 'APPROVED',
      emailVerified: new Date(),
    },
  })

  console.log('Admin user created/updated:', {
    id: admin.id,
    email: admin.email,
    role: admin.role,
    status: admin.status,
  })

  // Create student user
  const student = await prisma.user.upsert({
    where: { email: 'student1@samayoga.online' },
    update: {
      password,
      role: 'STUDENT',
      status: 'APPROVED',
    },
    create: {
        email: 'student1@samayoga.online',
      name: 'Student One',
      password,
      role: 'STUDENT',
      status: 'APPROVED',
      emailVerified: new Date(),
    },
  })

  console.log('Student user created/updated:', {
    id: student.id,
    email: student.email,
    role: student.role,
    status: student.status,
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