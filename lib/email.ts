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

/** Maps form values to readable lines for registration emails */
const EXPERIENCE_LEVEL_LABELS: Record<string, string> = {
  beginner: 'Beginner — New to yoga',
  'some-experience': 'Some experience — Practiced occasionally',
  intermediate: 'Intermediate — Regular practice',
  advanced: 'Advanced — Years of practice',
}

const CLASS_FORMAT_LABELS: Record<string, string> = {
  group: 'Group class',
  private: 'Private class',
}

const PRACTICE_STYLE_LABELS: Record<string, string> = {
  hatha: 'Hatha Yoga',
  vinyasa: 'Vinyasa Flow',
  yin: 'Yin Yoga',
  breathwork: 'Breathwork (Pranayama)',
  meditation: 'Meditation',
  open: 'Open to exploring',
}

const TIME_SLOT_LABELS: Record<string, string> = {
  'morning-6-7': 'Morning (6:00 AM – 7:00 AM IST)',
  'morning-7-8': 'Morning (7:00 AM – 8:00 AM IST)',
  'morning-8-9': 'Morning (8:00 AM – 9:00 AM IST)',
  'evening-6-7': 'Evening (6:00 PM – 7:00 PM IST)',
  'evening-7-8': 'Evening (7:00 PM – 8:00 PM IST)',
  'evening-8-9': 'Evening (8:00 PM – 9:00 PM IST)',
}

function label(
  map: Record<string, string>,
  value: string | undefined
): string {
  if (!value?.trim()) return '—'
  return map[value] ?? value
}

export type RegisterEmailPayload = {
  name: string
  email: string
  phone?: string
  height?: string
  weight?: string
  experienceLevel?: string
  yogaExperience?: string
  goals?: string
  healthIssues?: string
  classFormat: string
  practiceStyle?: string
  preferredTimeSlot: string
  additionalInfo?: string
}

export async function sendRegisterEmail(
  input: RegisterEmailPayload
): Promise<{ sent: boolean; reason?: string }> {
  const to = getNotifyEmail()
  const resend = getResend()
  if (!resend) {
    return { sent: false, reason: 'not_configured' }
  }

  const lines = [
    'New registration (submitted via website — same fields as the previous registration form).',
    '',
    '--- Contact ---',
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone?.trim() || '—'}`,
    '',
    '--- Physical ---',
    `Height: ${input.height?.trim() || '—'}`,
    `Weight: ${input.weight?.trim() || '—'}`,
    '',
    '--- Experience & health ---',
    `Yoga experience level: ${label(EXPERIENCE_LEVEL_LABELS, input.experienceLevel)}`,
    '',
    'Yoga experience (details):',
    input.yogaExperience?.trim() || '—',
    '',
    'Goals with yoga:',
    input.goals?.trim() || '—',
    '',
    'Any injuries, limitations, or health concerns:',
    input.healthIssues?.trim() || '—',
    '',
    '--- Class preferences ---',
    `Group vs private: ${label(CLASS_FORMAT_LABELS, input.classFormat)}`,
    `Practice style: ${label(PRACTICE_STYLE_LABELS, input.practiceStyle)}`,
    `Preferred time slot (IST): ${label(TIME_SLOT_LABELS, input.preferredTimeSlot)}`,
    '',
    '--- Additional ---',
    input.additionalInfo?.trim() || '—',
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

/**
 * Auto-acknowledgement sent to the person who submitted a form.
 *
 * Requires RESEND_FROM_EMAIL to be a verified-domain sender. The fallback
 * `onboarding@resend.dev` can only deliver to the Resend account owner, so
 * acknowledgements silently fail against it — see getFromEmail().
 *
 * Never blocks the submission: callers log and continue on failure, since the
 * internal notification has already been delivered at that point.
 */
export async function sendAcknowledgementEmail(input: {
  to: string
  name: string
  kind: 'contact' | 'register'
}): Promise<{ sent: boolean; reason?: string }> {
  const resend = getResend()
  if (!resend) {
    return { sent: false, reason: 'not_configured' }
  }

  const { to, name, kind } = input
  const firstName = name.split(/\s+/)[0] || name

  const subject =
    kind === 'register'
      ? 'We received your Samayoga registration'
      : 'We received your message'

  const opening =
    kind === 'register'
      ? 'Thank you for registering with Samayoga. We have received your details.'
      : 'Thank you for reaching out to Samayoga. We have received your message.'

  const lines = [
    `Hi ${firstName},`,
    '',
    opening,
    '',
    'We will get back to you within 24 hours.',
    '',
    `If it is urgent, you can reply to this email or write to ${getNotifyEmail()}.`,
    '',
    'Warmly,',
    'Samayoga',
  ]

  const { error } = await resend.emails.send({
    from: getFromEmail(),
    to: [to],
    replyTo: getNotifyEmail(),
    subject,
    text: lines.join('\n'),
  })

  if (error) {
    console.error('[email] acknowledgement send failed', error)
    return { sent: false, reason: error.message }
  }
  return { sent: true }
}
