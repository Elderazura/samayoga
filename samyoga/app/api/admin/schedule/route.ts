import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const classes = await prisma.class.findMany({
      orderBy: { date: 'desc' },
      include: {
        _count: {
          select: { bookings: true },
        },
      },
    })

    const formattedClasses = classes.map((classItem) => ({
      id: classItem.id,
      title: classItem.title,
      description: classItem.description,
      type: classItem.type,
      date: classItem.date.toISOString(),
      duration: classItem.duration,
      meetLink: classItem.meetLink,
      maxStudents: classItem.maxStudents,
      status: classItem.status,
      bookingsCount: classItem._count.bookings,
    }))

    return NextResponse.json(formattedClasses)
  } catch (error: any) {
    console.error('Error fetching classes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch classes' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.json()

    const classItem = await prisma.class.create({
      data: {
        title: data.title,
        description: data.description || null,
        type: data.type,
        instructor: 'Samyuktha Nambiar',
        date: new Date(data.date),
        duration: data.duration,
        meetLink: data.meetLink || null,
        maxStudents: data.maxStudents,
        status: 'SCHEDULED',
      },
    })

    return NextResponse.json(classItem, { status: 201 })
  } catch (error: any) {
    console.error('Error creating class:', error)
    return NextResponse.json(
      { error: 'Failed to create class' },
      { status: 500 }
    )
  }
}