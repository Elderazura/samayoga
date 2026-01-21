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

    // Get classes attended
    const attendedBookings = await prisma.booking.count({
      where: {
        userId: session.user.id,
        status: 'ATTENDED',
      },
    })

    // Get practice days (unique days with any booking)
    const practiceDays = await prisma.booking.findMany({
      where: { userId: session.user.id },
      select: {
        class: {
          select: { date: true },
        },
      },
    })

    const uniqueDays = new Set(
      practiceDays.map((b) => b.class.date.toDateString())
    ).size

    // Get last practice date
    const lastBooking = await prisma.booking.findFirst({
      where: {
        userId: session.user.id,
        status: 'ATTENDED',
      },
      orderBy: { createdAt: 'desc' },
      include: { class: true },
    })

    // Get progress records
    const progressRecords = await prisma.progress.findMany({
      where: { userId: session.user.id },
      orderBy: { recordedAt: 'desc' },
      take: 10,
    })

    return NextResponse.json({
      classesAttended: attendedBookings,
      practiceDays: uniqueDays,
      lastPracticeDate: lastBooking?.class.date.toISOString() || null,
      goals: progressRecords.map((p) => ({
        metric: p.metric,
        value: p.value,
        notes: p.notes,
      })),
    })
  } catch (error: any) {
    console.error('Error fetching progress:', error)
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    )
  }
}