import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { supabase } from '@/lib/supabase'

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

    // Get all classes
    const { data: classes, error: classesError } = await supabase
      .from('Class')
      .select('*')
      .order('date', { ascending: true })

    if (classesError) {
      throw new Error(`Failed to fetch classes: ${classesError.message}`)
    }

    // Get user's bookings separately for better query
    const { data: userBookings, error: bookingsError } = await supabase
      .from('Booking')
      .select('classId, status')
      .eq('userId', session.user.id)

    if (bookingsError) {
      throw new Error(`Failed to fetch bookings: ${bookingsError.message}`)
    }

    const bookingMap = new Map(
      (userBookings || []).map((b: any) => [b.classId, b.status])
    )

    // Format classes with booking status
    const classesWithBooking = (classes || []).map((classItem: any) => ({
      id: classItem.id,
      title: classItem.title,
      description: classItem.description,
      type: classItem.type,
      date: classItem.date,
      duration: classItem.duration,
      meetLink: classItem.meetLink,
      status: classItem.status,
      bookingStatus: bookingMap.get(classItem.id) || null,
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
