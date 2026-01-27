import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { supabase } from '@/lib/supabase'

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
    const { data: classItem, error: classError } = await supabase
      .from('Class')
      .select(`
        *,
        bookings:Booking(count)
      `)
      .eq('id', classId)
      .single()

    if (classError || !classItem) {
      return NextResponse.json(
        { error: 'Class not found' },
        { status: 404 }
      )
    }

    const bookingsCount = classItem.bookings?.[0]?.count || 0
    if (bookingsCount >= classItem.maxStudents) {
      return NextResponse.json(
        { error: 'Class is full' },
        { status: 400 }
      )
    }

    // Check if user already has a booking
    const { data: existingBooking } = await supabase
      .from('Booking')
      .select('id')
      .eq('userId', session.user.id)
      .eq('classId', classId)
      .single()

    if (existingBooking) {
      return NextResponse.json(
        { error: 'You have already booked this class' },
        { status: 400 }
      )
    }

    // Create booking
    const { error: bookingError } = await supabase
      .from('Booking')
      .insert({
        userId: session.user.id,
        classId: classId,
        status: 'CONFIRMED',
      })

    if (bookingError) {
      throw new Error(`Failed to create booking: ${bookingError.message}`)
    }

    return NextResponse.json({ message: 'Class booked successfully' })
  } catch (error: any) {
    console.error('Error booking class:', error)
    return NextResponse.json(
      { error: 'Failed to book class' },
      { status: 500 }
    )
  }
}
