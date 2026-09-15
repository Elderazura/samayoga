import { config } from 'dotenv'
import { getNotifyEmail, sendContactEmail } from '../lib/email'

config({ path: '.env.local' })
config({ path: '.env' })

async function main() {
  if (!process.env.RESEND_API_KEY?.trim()) {
    console.error(
      'Missing RESEND_API_KEY. Add it to .env.local (get a key from https://resend.com/api-keys).'
    )
    process.exit(1)
  }

  const to = getNotifyEmail()
  console.log(`Sending test to notify inbox: ${to}`)

  const result = await sendContactEmail({
    name: 'Samayoga test',
    email: 'test@example.com',
    message: `Smoke test at ${new Date().toISOString()}`,
  })

  if (!result.sent) {
    console.error('Send failed:', result.reason)
    process.exit(1)
  }
  console.log('Test email sent successfully.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
