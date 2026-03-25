import { NextResponse } from 'next/server'
import { sendRegisterEmail } from '@/lib/email'
import { SAMAYOGA_INBOX_EMAIL } from '@/lib/inbox'

export const runtime = 'nodejs'

const MAX = 200
const MAX_LONG = 8000

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
    const height = clampStr(body.height, 80)
    const weight = clampStr(body.weight, 80)
    const experienceLevel = clampStr(body.experienceLevel, 40)
    const yogaExperience = clampStr(body.yogaExperience, MAX_LONG)
    const goals = clampStr(body.goals, MAX_LONG)
    const healthIssues = clampStr(body.healthIssues, MAX_LONG)
    const classFormat = clampStr(body.classFormat, 40)
    const practiceStyle = clampStr(body.practiceStyle, 40)
    const preferredTimeSlot = clampStr(body.preferredTimeSlot, 80)
    const availability = clampStr(body.availability, MAX_LONG)
    const additionalInfo = clampStr(body.additionalInfo, MAX_LONG)

    if (!name || name.length > 200) {
      return NextResponse.json({ error: 'Invalid name' }, { status: 400 })
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
    if (!classFormat || !['group', 'private'].includes(classFormat)) {
      return NextResponse.json(
        { error: 'Please choose group or private class' },
        { status: 400 }
      )
    }
    if (!preferredTimeSlot) {
      return NextResponse.json(
        { error: 'Please choose a preferred time slot' },
        { status: 400 }
      )
    }

    const result = await sendRegisterEmail({
      name,
      email,
      phone: phone || undefined,
      height: height || undefined,
      weight: weight || undefined,
      experienceLevel: experienceLevel || undefined,
      yogaExperience: yogaExperience || undefined,
      goals: goals || undefined,
      healthIssues: healthIssues || undefined,
      classFormat,
      practiceStyle: practiceStyle || undefined,
      preferredTimeSlot,
      availability: availability || undefined,
      additionalInfo: additionalInfo || undefined,
    })

    if (!result.sent) {
      if (result.reason === 'not_configured') {
        return NextResponse.json(
          {
            error: `We could not send this automatically. Please email ${SAMAYOGA_INBOX_EMAIL} with your registration details; we will reply from there.`,
          },
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
