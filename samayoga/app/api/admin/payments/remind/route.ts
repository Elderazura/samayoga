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

    const { paymentId } = await request.json()

    const { data: payment, error } = await supabase
      .from('Payment')
      .select(`
        *,
        user:User (
          email
        )
      `)
      .eq('id', paymentId)
      .single()

    if (error || !payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      )
    }

    // In a real app, send email here
    // For now, just log it
    console.log(`Payment reminder sent to ${payment.user?.email} for $${payment.amount}`)

    return NextResponse.json({
      message: 'Reminder sent successfully',
      email: payment.user?.email,
    })
  } catch (error: any) {
    console.error('Error sending reminder:', error)
    return NextResponse.json(
      { error: 'Failed to send reminder' },
      { status: 500 }
    )
  }
}
