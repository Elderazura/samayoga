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

    // Fetch payments with user data
    const { data: payments, error } = await supabase
      .from('Payment')
      .select(`
        *,
        user:User (
          name,
          email
        )
      `)
      .order('createdAt', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch payments: ${error.message}`)
    }

    // Format payments
    const formattedPayments = (payments || []).map((payment: any) => ({
      id: payment.id,
      user: {
        name: payment.user?.name,
        email: payment.user?.email,
      },
      amount: payment.amount,
      status: payment.status,
      description: payment.description,
      dueDate: payment.dueDate || null,
      createdAt: payment.createdAt,
    }))

    return NextResponse.json(formattedPayments)
  } catch (error: any) {
    console.error('Error fetching payments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    )
  }
}
