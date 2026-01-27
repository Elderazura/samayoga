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

    // Get classes attended count
    const { count: attendedCount, error: attendedError } = await supabase
      .from('Booking')
      .select('*', { count: 'exact', head: true })
      .eq('userId', session.user.id)
      .eq('status', 'ATTENDED')

    if (attendedError) {
      throw new Error(`Failed to count attended bookings: ${attendedError.message}`)
    }

    // Get all bookings to calculate practice days
    const { data: bookings, error: bookingsError } = await supabase
      .from('Booking')
      .select(`
        class:Class (
          date
        )
      `)
      .eq('userId', session.user.id)

    if (bookingsError) {
      throw new Error(`Failed to fetch bookings: ${bookingsError.message}`)
    }

    // Calculate unique practice days
    const uniqueDays = new Set(
      (bookings || []).map((b: any) => {
        const date = new Date(b.class?.date)
        return date.toDateString()
      }).filter(Boolean)
    ).size

    // Get last practice date
    const { data: lastBookingData, error: lastBookingError } = await supabase
      .from('Booking')
      .select(`
        class:Class (
          date
        )
      `)
      .eq('userId', session.user.id)
      .eq('status', 'ATTENDED')
      .order('createdAt', { ascending: false })
      .limit(1)
      .maybeSingle()

    // Get progress records
    const { data: progressRecords, error: progressError } = await supabase
      .from('Progress')
      .select('*')
      .eq('userId', session.user.id)
      .order('recordedAt', { ascending: false })
      .limit(10)

    if (progressError) {
      throw new Error(`Failed to fetch progress: ${progressError.message}`)
    }

    // Extract date from nested structure
    const lastPracticeDate = lastBookingData && Array.isArray(lastBookingData.class) 
      ? lastBookingData.class[0]?.date 
      : (lastBookingData as any)?.class?.date || null

    return NextResponse.json({
      classesAttended: attendedCount || 0,
      practiceDays: uniqueDays,
      lastPracticeDate: lastPracticeDate,
      goals: (progressRecords || []).map((p: any) => ({
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
