import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

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
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        status: approved ? 'APPROVED' : 'REJECTED',
      },
    })

    // Update registration review info
    await prisma.registration.updateMany({
      where: { userId },
      data: {
        reviewedAt: new Date(),
        reviewedBy: session.user.id,
      },
    })

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