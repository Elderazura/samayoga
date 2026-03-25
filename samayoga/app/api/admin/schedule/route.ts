import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { supabase } from '@/lib/supabase'

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

    // Fetch classes with booking counts
    const { data: classes, error } = await supabase
      .from('Class')
      .select(`
        *,
        bookings:Booking(count)
      `)
      .order('date', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch classes: ${error.message}`)
    }

    // Format classes
    const formattedClasses = (classes || []).map((classItem: any) => ({
      id: classItem.id,
      title: classItem.title,
      description: classItem.description,
      type: classItem.type,
      date: classItem.date,
      duration: classItem.duration,
      meetLink: classItem.meetLink,
      maxStudents: classItem.maxStudents,
      status: classItem.status,
      bookingsCount: classItem.bookings?.[0]?.count || 0,
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

    const { data: classItem, error } = await supabase
      .from('Class')
      .insert({
        title: data.title,
        description: data.description || null,
        type: data.type,
        instructor: 'Samyuktha Nambiar',
        date: data.date,
        duration: data.duration,
        meetLink: data.meetLink || null,
        maxStudents: data.maxStudents,
        status: 'SCHEDULED',
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create class: ${error.message}`)
    }

    return NextResponse.json(classItem, { status: 201 })
  } catch (error: any) {
    console.error('Error creating class:', error)
    return NextResponse.json(
      { error: 'Failed to create class' },
      { status: 500 }
    )
  }
}
