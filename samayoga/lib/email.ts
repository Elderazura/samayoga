import { Resend } from 'resend'
import { SAMAYOGA_INBOX_EMAIL } from '@/lib/inbox'

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

/** Inbox that receives contact form messages */
export function getNotifyEmail(): string {
  const to = process.env.CONTACT_NOTIFY_EMAIL?.trim()
  const raw = to || SAMAYOGA_INBOX_EMAIL
  // Resend test mode matches recipient case-sensitively; Gmail addresses are case-insensitive for delivery
  return raw.toLowerCase()
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

export async function sendRegisterEmail(input: {
  name: string
  email: string
  phone?: string
  classType: string
  preferredTimeSlot?: string
  yogaExperience?: string
  healthNotes?: string
  message?: string
}): Promise<{ sent: boolean; reason?: string }> {
  const to = getNotifyEmail()
  const resend = getResend()
  if (!resend) {
    return { sent: false, reason: 'not_configured' }
  }

  const lines = [
    'New class / registration request (submitted via website).',
    '',
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone?.trim() || '—'}`,
    `Class interest: ${input.classType}`,
    `Preferred time (IST): ${input.preferredTimeSlot?.trim() || '—'}`,
    '',
    'Yoga experience:',
    input.yogaExperience?.trim() || '—',
    '',
    'Health / injuries / notes:',
    input.healthNotes?.trim() || '—',
    '',
    'Additional message:',
    input.message?.trim() || '—',
  ]

  const { error } = await resend.emails.send({
    from: getFromEmail(),
    to: [to],
    replyTo: input.email,
    subject: `[Samayoga Register] ${input.name}`,
    text: lines.join('\n'),
  })

  if (error) {
    console.error('[email] register send failed', error)
    return { sent: false, reason: error.message }
  }
  return { sent: true }
}
