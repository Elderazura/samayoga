import { Client } from 'pg'
import bcrypt from 'bcryptjs'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  console.error('❌ Error: DATABASE_URL is not set in .env.local')
  process.exit(1)
}

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@samayoga.com'
  const password = process.env.ADMIN_PASSWORD || 'admin123'
  const name = process.env.ADMIN_NAME || 'Admin User'

  const hashedPassword = await bcrypt.hash(password, 10)

  const client = new Client({
    connectionString: databaseUrl,
  })

  try {
    await client.connect()
    console.log('✅ Connected to database')

    // Check if user exists
    const checkResult = await client.query(
      'SELECT id, email, role FROM "User" WHERE email = $1',
      [email]
    )

    if (checkResult.rows.length > 0) {
      // Update existing user
      await client.query(
        'UPDATE "User" SET role = $1, status = $2, password = $3, name = $4 WHERE email = $5',
        ['ADMIN', 'APPROVED', hashedPassword, name, email]
      )
      console.log('✅ Admin user updated:', {
        email: checkResult.rows[0].email,
        role: 'ADMIN',
        status: 'APPROVED',
      })
    } else {
      // Create new user with cuid() for ID (Prisma uses cuid by default)
      // Generate a simple ID - in production Prisma would use cuid()
      const { randomBytes } = require('crypto')
      const id = 'c' + randomBytes(16).toString('hex')
      
      const result = await client.query(
        'INSERT INTO "User" (id, email, name, password, role, status, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING id, email, role, status',
        [id, email, name, hashedPassword, 'ADMIN', 'APPROVED']
      )
      console.log('✅ Admin user created:', {
        id: result.rows[0].id,
        email: result.rows[0].email,
        role: result.rows[0].role,
        status: result.rows[0].status,
      })
    }

    console.log('\n📧 Login credentials:')
    console.log(`   Email: ${email}`)
    console.log(`   Password: ${password}`)
    console.log('\n⚠️  Please change the password after first login!')
  } catch (error: any) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  } finally {
    await client.end()
  }
}

main()
