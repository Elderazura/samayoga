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

    const { data: content, error } = await supabase
      .from('Content')
      .select('*')
      .order('createdAt', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch content: ${error.message}`)
    }

    const formattedContent = (content || []).map((item: any) => ({
      id: item.id,
      type: item.type,
      title: item.title,
      published: item.published,
      publishedAt: item.publishedAt || null,
      createdAt: item.createdAt,
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
