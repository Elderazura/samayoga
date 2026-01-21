import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id || session.user.status !== 'APPROVED') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get all classes with user's booking status
    const classes = await prisma.class.findMany({
      orderBy: { date: 'asc' },
      include: {
        bookings: {
          where: { userId: session.user.id },
          select: { status: true },
        },
      },
    })

    const classesWithBooking = classes.map((classItem) => ({
      id: classItem.id,
      title: classItem.title,
      description: classItem.description,
      type: classItem.type,
      date: classItem.date.toISOString(),
      duration: classItem.duration,
      meetLink: classItem.meetLink,
      status: classItem.status,
      bookingStatus: classItem.bookings[0]?.status || null,
    }))

    return NextResponse.json(classesWithBooking)
  } catch (error: any) {
    console.error('Error fetching classes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch classes' },
      { status: 500 }
    )
  }
}