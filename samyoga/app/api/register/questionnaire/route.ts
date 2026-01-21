import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.json()

    // Create or update registration
    await prisma.registration.upsert({
      where: { userId: session.user.id },
      update: {
        experience: data.experience || null,
        goals: data.goals || null,
        injuries: data.injuries || null,
        preferences: data.preferences || null,
        availability: data.availability || null,
        additionalInfo: data.additionalInfo || null,
        submittedAt: new Date(),
      },
      create: {
        userId: session.user.id,
        experience: data.experience || null,
        goals: data.goals || null,
        injuries: data.injuries || null,
        preferences: data.preferences || null,
        availability: data.availability || null,
        additionalInfo: data.additionalInfo || null,
      },
    })

    return NextResponse.json(
      { message: 'Questionnaire submitted successfully' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Questionnaire submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit questionnaire' },
      { status: 500 }
    )
  }
}