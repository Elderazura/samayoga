import { NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/email'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    if (!name || name.length > 200) {
      return NextResponse.json({ error: 'Invalid name' }, { status: 400 })
    }
    if (!email || email.length > 320 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
    if (!message || message.length > 10000) {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 })
    }

    const result = await sendContactEmail({ name, email, message })
    if (!result.sent) {
      if (result.reason === 'not_configured') {
        return NextResponse.json(
          { error: 'Email is not configured on the server' },
          { status: 503 }
        )
      }
      return NextResponse.json(
        { error: 'Could not send message. Please try again later.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
