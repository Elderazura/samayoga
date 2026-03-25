import { NextResponse } from 'next/server'
import { sendRegisterEmail } from '@/lib/email'

export const runtime = 'nodejs'

const MAX = 200
const MAX_LONG = 5000

function clampStr(s: unknown, max: number): string {
  if (typeof s !== 'string') return ''
  return s.trim().slice(0, max)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = clampStr(body.name, MAX)
    const email = clampStr(body.email, 320)
    const phone = clampStr(body.phone, 40)
    const classType = clampStr(body.classType, 80)
    const preferredTimeSlot = clampStr(body.preferredTimeSlot, 200)
    const yogaExperience = clampStr(body.yogaExperience, MAX_LONG)
    const healthNotes = clampStr(body.healthNotes, MAX_LONG)
    const message = clampStr(body.message, MAX_LONG)

    if (!name || name.length > 200) {
      return NextResponse.json({ error: 'Invalid name' }, { status: 400 })
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
    if (!classType) {
      return NextResponse.json({ error: 'Please choose a class type' }, { status: 400 })
    }

    const result = await sendRegisterEmail({
      name,
      email,
      phone: phone || undefined,
      classType,
      preferredTimeSlot: preferredTimeSlot || undefined,
      yogaExperience: yogaExperience || undefined,
      healthNotes: healthNotes || undefined,
      message: message || undefined,
    })

    if (!result.sent) {
      if (result.reason === 'not_configured') {
        return NextResponse.json(
          { error: 'Email is not configured on the server' },
          { status: 503 }
        )
      }
      return NextResponse.json(
        { error: 'Could not send your registration. Please try again later.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
