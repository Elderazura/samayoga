import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const students = await prisma.user.findMany({
      where: { role: 'STUDENT' },
      include: {
        _count: {
          select: {
            bookings: true,
            payments: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    const formattedStudents = students.map((student) => ({
      id: student.id,
      name: student.name,
      email: student.email,
      status: student.status,
      createdAt: student.createdAt.toISOString(),
      bookingsCount: student._count.bookings,
      paymentsCount: student._count.payments,
    }))

    return NextResponse.json(formattedStudents)
  } catch (error: any) {
    console.error('Error fetching students:', error)
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    )
  }
}