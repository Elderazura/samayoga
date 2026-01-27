import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { supabase } from '@/lib/supabase'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { userId, approved } = await request.json()

    if (!userId || typeof approved !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      )
    }

    // Update user status
    const { data: user, error: userError } = await supabase
      .from('User')
      .update({
        status: approved ? 'APPROVED' : 'REJECTED',
        updatedAt: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single()

    if (userError) {
      throw new Error(`Failed to update user: ${userError.message}`)
    }

    // Update registration review info
    const { error: regError } = await supabase
      .from('Registration')
      .update({
        reviewedAt: new Date().toISOString(),
        reviewedBy: session.user.id,
      })
      .eq('userId', userId)

    if (regError) {
      console.warn('Failed to update registration review info:', regError.message)
      // Don't fail the request if this fails
    }

    return NextResponse.json({
      message: `User ${approved ? 'approved' : 'rejected'} successfully`,
      user,
    })
  } catch (error: any) {
    console.error('Error updating user status:', error)
    return NextResponse.json(
      { error: 'Failed to update user status' },
      { status: 500 }
    )
  }
}
