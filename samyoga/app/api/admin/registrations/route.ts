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

    // Fetch registrations with user data
    const { data: registrations, error } = await supabase
      .from('Registration')
      .select(`
        *,
        user:User (
          id,
          name,
          email,
          status,
          createdAt
        )
      `)
      .order('submittedAt', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch registrations: ${error.message}`)
    }

    // Transform data to match expected format
    const formattedRegistrations = registrations?.map((reg: any) => ({
      ...reg,
      user: reg.user,
    })) || []

    return NextResponse.json(formattedRegistrations)
  } catch (error: any) {
    console.error('Error fetching registrations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch registrations' },
      { status: 500 }
    )
  }
}
