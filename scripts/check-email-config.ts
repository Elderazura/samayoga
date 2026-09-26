/**
 * Preflight for the Resend setup.
 *
 * The failure this exists to catch: RESEND_FROM_EMAIL pointing at a domain that
 * is not verified in Resend (or being unset, which falls back to the shared
 * onboarding@resend.dev sender). Either way the internal notification still
 * works — it goes to the Resend account owner — while every acknowledgement to
 * an actual visitor is rejected. Nothing in the app surfaces that, so check it
 * here instead of discovering it from a visitor who never got a reply.
 *
 *   npx tsx scripts/check-email-config.ts           # read-only checks
 *   npx tsx scripts/check-email-config.ts --send    # also send two real emails
 *
 * To check PRODUCTION rather than .env.local:
 *   vercel env pull .env.production.local --environment=production
 *   DOTENV=.env.production.local npx tsx scripts/check-email-config.ts
 */
import { config } from 'dotenv'

config({ path: process.env.DOTENV || '.env.local' })
config({ path: '.env' })

const FALLBACK_SENDER = 'onboarding@resend.dev'

let failures = 0
const ok = (m: string) => console.log(`  ok    ${m}`)
const warn = (m: string) => console.log(`  warn  ${m}`)
const bad = (m: string) => {
  failures++
  console.log(`  FAIL  ${m}`)
}

/** Pulls the bare address out of either "Name <a@b.com>" or "a@b.com". */
function addressOf(from: string): string {
  const m = from.match(/<([^>]+)>/)
  return (m ? m[1] : from).trim().toLowerCase()
}

async function main() {
  console.log('\nResend configuration check\n')

  const key = process.env.RESEND_API_KEY?.trim()
  if (!key) {
    bad('RESEND_API_KEY is missing or empty — every form returns 503 "not configured".')
    console.log('\nCannot continue without a key.\n')
    process.exit(1)
  }
  ok(`RESEND_API_KEY present (${key.length} chars)`)

  // --- key validity + verified domains -------------------------------------
  const res = await fetch('https://api.resend.com/domains', {
    headers: { Authorization: `Bearer ${key}` },
  })
  if (!res.ok) {
    bad(`Resend rejected the API key (HTTP ${res.status}). Regenerate it at https://resend.com/api-keys`)
    process.exit(1)
  }
  const body = (await res.json()) as { data?: Array<{ name: string; status: string }> }
  const domains = body.data ?? []
  const verified = domains.filter((d) => d.status === 'verified').map((d) => d.name.toLowerCase())

  if (domains.length === 0) {
    warn('No domains added in Resend — you can only send from onboarding@resend.dev.')
  } else {
    for (const d of domains) {
      if (d.status === 'verified') ok(`domain ${d.name} verified`)
      else bad(`domain ${d.name} is "${d.status}", not verified — sending from it will fail.`)
    }
  }

  // --- the sender ----------------------------------------------------------
  const rawFrom = process.env.RESEND_FROM_EMAIL?.trim()
  if (!rawFrom) {
    bad(
      `RESEND_FROM_EMAIL is missing or empty, so the app falls back to ${FALLBACK_SENDER}. ` +
        'That shared sender only delivers to the Resend account owner, so acknowledgement ' +
        'emails to visitors will be rejected.'
    )
  } else {
    const addr = addressOf(rawFrom)
    const domain = addr.split('@')[1]
    if (!domain) {
      bad(`RESEND_FROM_EMAIL="${rawFrom}" is not a usable address.`)
    } else if (addr.endsWith('@resend.dev')) {
      bad(
        `RESEND_FROM_EMAIL uses ${addr}. That shared sender only delivers to the Resend ` +
          'account owner — visitors will not receive acknowledgements.'
      )
    } else if (verified.includes(domain)) {
      ok(`sender ${rawFrom} uses verified domain ${domain} — can send to anyone`)
    } else {
      bad(
        `sender domain ${domain} is not verified in Resend ` +
          `(verified: ${verified.join(', ') || 'none'}). Sends will be rejected.`
      )
    }
  }

  // --- the inbox -----------------------------------------------------------
  const { getNotifyEmail } = await import('../lib/email')
  ok(`form submissions notify ${getNotifyEmail()}`)

  // --- optional live send --------------------------------------------------
  if (process.argv.includes('--send')) {
    if (failures > 0) {
      console.log('\nSkipping --send: fix the failures above first.\n')
      process.exit(1)
    }
    const { sendContactEmail, sendAcknowledgementEmail } = await import('../lib/email')
    const stamp = new Date().toISOString()

    const notify = await sendContactEmail({
      name: 'Samayoga config check',
      email: 'test@example.com',
      message: `Preflight at ${stamp}`,
    })
    notify.sent ? ok('internal notification sent') : bad(`internal notification failed: ${notify.reason}`)

    // Sent to the same inbox, but exercises the acknowledgement path and sender.
    const ack = await sendAcknowledgementEmail({
      to: getNotifyEmail(),
      name: 'Samayoga config check',
      kind: 'contact',
    })
    ack.sent ? ok('acknowledgement sent') : bad(`acknowledgement failed: ${ack.reason}`)
  }

  console.log(
    failures === 0
      ? '\nAll checks passed.\n'
      : `\n${failures} problem(s) found — see FAIL lines above.\n`
  )
  process.exit(failures === 0 ? 0 : 1)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
