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

    const content = await prisma.content.findMany({
      orderBy: { createdAt: 'desc' },
    })

    const formattedContent = content.map((item) => ({
      id: item.id,
      type: item.type,
      title: item.title,
      published: item.published,
      publishedAt: item.publishedAt?.toISOString() || null,
      createdAt: item.createdAt.toISOString(),
    }))

    return NextResponse.json(formattedContent)
  } catch (error: any) {
    console.error('Error fetching content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    )
  }
}