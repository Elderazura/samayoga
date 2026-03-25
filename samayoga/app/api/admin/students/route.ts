import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { supabase } from '@/lib/supabase'

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

    // Fetch students
    const { data: students, error } = await supabase
      .from('User')
      .select(`
        id,
        name,
        email,
        status,
        createdAt,
        bookings:Booking(count),
        payments:Payment(count)
      `)
      .eq('role', 'STUDENT')
      .order('createdAt', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch students: ${error.message}`)
    }

    // Format students with counts
    const formattedStudents = (students || []).map((student: any) => ({
      id: student.id,
      name: student.name,
      email: student.email,
      status: student.status,
      createdAt: student.createdAt,
      bookingsCount: student.bookings?.[0]?.count || 0,
      paymentsCount: student.payments?.[0]?.count || 0,
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
