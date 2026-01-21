import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

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

    const payments = await prisma.payment.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    const formattedPayments = payments.map((payment) => ({
      id: payment.id,
      user: {
        name: payment.user.name,
        email: payment.user.email,
      },
      amount: payment.amount,
      status: payment.status,
      description: payment.description,
      dueDate: payment.dueDate?.toISOString() || null,
      createdAt: payment.createdAt.toISOString(),
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