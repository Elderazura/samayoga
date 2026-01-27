import { Client } from 'pg'
import bcrypt from 'bcryptjs'
import { config } from 'dotenv'

// Load environment variables from Vercel production
// This script should be run with production DATABASE_URL
config({ path: '.env.production', override: false })
config({ path: '.env.local', override: false })

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  console.error('❌ Error: DATABASE_URL is not set')
  console.error('   Make sure to set DATABASE_URL environment variable')
  process.exit(1)
}

async function main() {
  const email = 'admin@samayoga.com'
  const password = 'admin123'
  const name = 'Admin User'

  console.log(`\n🔗 Connecting to database...`)
  console.log(`   URL: ${databaseUrl.replace(/:[^:@]+@/, ':****@')}`)
  
  const hashedPassword = await bcrypt.hash(password, 10)
  console.log(`\n🔐 Password hash generated: ${hashedPassword.substring(0, 30)}...`)

  const client = new Client({
    connectionString: databaseUrl,
  })

  try {
    await client.connect()
    console.log('✅ Connected to database')

    // Check if user exists
    const checkResult = await client.query(
      'SELECT id, email, role, status, password FROM "User" WHERE email = $1',
      [email]
    )

    if (checkResult.rows.length > 0) {
      const existingUser = checkResult.rows[0]
      console.log('\n📋 Existing user found:')
      console.log(`   ID: ${existingUser.id}`)
      console.log(`   Email: ${existingUser.email}`)
      console.log(`   Role: ${existingUser.role}`)
      console.log(`   Status: ${existingUser.status}`)
      console.log(`   Has password: ${existingUser.password ? 'Yes' : 'No'}`)
      
      // Test current password
      if (existingUser.password) {
        const currentValid = await bcrypt.compare(password, existingUser.password)
        console.log(`   Current password valid: ${currentValid ? '✅ Yes' : '❌ No'}`)
      }

      // Update existing user with new password
      console.log('\n🔄 Updating user with new password...')
      await client.query(
        'UPDATE "User" SET role = $1, status = $2, password = $3, name = $4, "updatedAt" = NOW() WHERE email = $5',
        ['ADMIN', 'APPROVED', hashedPassword, name, email]
      )
      console.log('✅ User updated successfully')
    } else {
      // Create new user
      console.log('\n➕ Creating new admin user...')
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

    // Verify password after update/create
    console.log('\n🔍 Verifying password...')
    const verifyResult = await client.query(
      'SELECT password FROM "User" WHERE email = $1',
      [email]
    )
    
    if (verifyResult.rows.length === 0) {
      console.error('❌ User not found after creation!')
      process.exit(1)
    }

    const storedPassword = verifyResult.rows[0].password
    if (!storedPassword) {
      console.error('❌ Password is NULL after update!')
      process.exit(1)
    }

    const isValid = await bcrypt.compare(password, storedPassword)
    
    console.log('\n📧 Final Login Credentials:')
    console.log(`   Email: ${email}`)
    console.log(`   Password: ${password}`)
    console.log(`   Password verification: ${isValid ? '✅ VALID' : '❌ INVALID'}`)
    
    if (!isValid) {
      console.error('\n❌ CRITICAL: Password verification failed after update!')
      process.exit(1)
    }

    console.log('\n✅ Admin user is ready for login!')
    console.log('⚠️  Please change the password after first login!')
  } catch (error: any) {
    console.error('\n❌ Error:', error.message)
    if (error.code) {
      console.error(`   Error code: ${error.code}`)
    }
    if (error.detail) {
      console.error(`   Detail: ${error.detail}`)
    }
    console.error('\nStack trace:', error.stack)
    process.exit(1)
  } finally {
    await client.end()
  }
}

main()
