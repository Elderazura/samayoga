import { Resend } from 'resend'
import { SAMAYOGA_INBOX_EMAIL } from '@/lib/inbox'

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

/** Inbox that receives contact + registration notifications */
export function getNotifyEmail(): string {
  const to = process.env.CONTACT_NOTIFY_EMAIL?.trim()
  return to || SAMAYOGA_INBOX_EMAIL
}

export function getFromEmail(): string {
  return (
    process.env.RESEND_FROM_EMAIL?.trim() ||
    'Samayoga <onboarding@resend.dev>'
  )
}

export async function sendContactEmail(input: {
  name: string
  email: string
  message: string
}): Promise<{ sent: boolean; reason?: string }> {
  const to = getNotifyEmail()
  const resend = getResend()
  if (!resend) {
    return { sent: false, reason: 'not_configured' }
  }

  const { name, email, message } = input
  const { error } = await resend.emails.send({
    from: getFromEmail(),
    to: [to],
    replyTo: email,
    subject: `[Samayoga Contact] Message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  })

  if (error) {
    console.error('[email] contact send failed', error)
    return { sent: false, reason: error.message }
  }
  return { sent: true }
}

export async function sendRegistrationNotifyEmail(input: {
  registrantName: string | null
  registrantEmail: string | null
  height?: string | null
  weight?: string | null
  phone?: string | null
  yogaExperience?: string | null
  healthIssues?: string | null
  classType?: string | null
  preferredTimeSlot?: string | null
}): Promise<{ sent: boolean; reason?: string }> {
  const to = getNotifyEmail()
  const resend = getResend()
  if (!resend) {
    return { sent: false, reason: 'not_configured' }
  }

  const lines = [
    'New registration / questionnaire submitted.',
    '',
    `Name: ${input.registrantName ?? '—'}`,
    `Email: ${input.registrantEmail ?? '—'}`,
    `Phone: ${input.phone ?? '—'}`,
    `Height: ${input.height ?? '—'}`,
    `Weight: ${input.weight ?? '—'}`,
    `Class type: ${input.classType ?? '—'}`,
    `Preferred time (IST): ${input.preferredTimeSlot ?? '—'}`,
    '',
    'Yoga experience:',
    input.yogaExperience || '—',
    '',
    'Health / concerns:',
    input.healthIssues || '—',
  ]

  const { error } = await resend.emails.send({
    from: getFromEmail(),
    to: [to],
    replyTo: input.registrantEmail || undefined,
    subject: `[Samayoga] New registration: ${input.registrantName || input.registrantEmail || 'Unknown'}`,
    text: lines.join('\n'),
  })

  if (error) {
    console.error('[email] registration notify failed', error)
    return { sent: false, reason: error.message }
  }
  return { sent: true }
}
