import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id || session.user.status !== 'APPROVED') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { classId } = await request.json()

    if (!classId) {
      return NextResponse.json(
        { error: 'Class ID is required' },
        { status: 400 }
      )
    }

    // Check if class exists and has space
    const classItem = await prisma.class.findUnique({
      where: { id: classId },
      include: { bookings: true },
    })

    if (!classItem) {
      return NextResponse.json(
        { error: 'Class not found' },
        { status: 404 }
      )
    }

    if (classItem.bookings.length >= classItem.maxStudents) {
      return NextResponse.json(
        { error: 'Class is full' },
        { status: 400 }
      )
    }

    // Create booking
    await prisma.booking.create({
      data: {
        userId: session.user.id,
        classId: classId,
        status: 'CONFIRMED',
      },
    })

    return NextResponse.json({ message: 'Class booked successfully' })
  } catch (error: any) {
    console.error('Error booking class:', error)
    return NextResponse.json(
      { error: 'Failed to book class' },
      { status: 500 }
    )
  }
}