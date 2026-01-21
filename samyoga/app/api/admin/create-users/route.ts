import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const runtime = 'nodejs'

export async function POST() {
  try {
    const password = await bcrypt.hash('12345678', 10)

    // Create admin user
    const admin = await prisma.user.upsert({
      where: { email: 'salith@samayoga.online' },
      update: {
        password,
        role: 'ADMIN',
        status: 'APPROVED',
      },
      create: {
        email: 'salith@samyoga.online',
        name: 'Admin User',
        password,
        role: 'ADMIN',
        status: 'APPROVED',
        emailVerified: new Date(),
      },
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

    return NextResponse.json({
      message: 'Users created successfully',
      admin: {
        email: admin.email,
        role: admin.role,
        status: admin.status,
      },
      student: {
        email: student.email,
        role: student.role,
        status: student.status,
      },
    })
  } catch (error: any) {
    console.error('Error creating users:', error)
    return NextResponse.json(
      { error: 'Failed to create users', details: error.message },
      { status: 500 }
    )
  }
}