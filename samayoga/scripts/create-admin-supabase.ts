import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '❌ Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local (or the environment).'
  )
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@samayoga.com'
  const password = process.env.ADMIN_PASSWORD || 'admin123'
  const name = process.env.ADMIN_NAME || 'Admin User'

  console.log(`\n🔗 Connecting to Supabase...`)
  console.log(`   URL: ${supabaseUrl}`)
  
  const hashedPassword = await bcrypt.hash(password, 10)
  console.log(`\n🔐 Password hash generated`)

  try {
    // Check if user exists
    const { data: existingUser, error: checkError } = await supabase
      .from('User')
      .select('id, email, role, status, password')
      .eq('email', email)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 is "not found" which is fine
      throw checkError
    }

    if (existingUser) {
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
      const { data: updatedUser, error: updateError } = await supabase
        .from('User')
        .update({
          role: 'ADMIN',
          status: 'APPROVED',
          password: hashedPassword,
          name: name,
          updatedAt: new Date().toISOString(),
        })
        .eq('id', existingUser.id)
        .select()
        .single()

      if (updateError) {
        throw updateError
      }

      console.log('✅ User updated successfully')
    } else {
      // Create new user
      console.log('\n➕ Creating new admin user...')
      const { data: newUser, error: createError } = await supabase
        .from('User')
        .insert({
          email: email,
          name: name,
          password: hashedPassword,
          role: 'ADMIN',
          status: 'APPROVED',
        })
        .select()
        .single()

      if (createError) {
        throw createError
      }

      console.log('✅ Admin user created:', {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
      })
    }

    // Verify password after update/create
    console.log('\n🔍 Verifying password...')
    const { data: verifyUser, error: verifyError } = await supabase
      .from('User')
      .select('password')
      .eq('email', email)
      .single()
    
    if (verifyError || !verifyUser) {
      console.error('❌ User not found after creation!')
      process.exit(1)
    }

    if (!verifyUser.password) {
      console.error('❌ Password is NULL after update!')
      process.exit(1)
    }

    const isValid = await bcrypt.compare(password, verifyUser.password)
    
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
    if (error.details) {
      console.error(`   Details: ${error.details}`)
    }
    process.exit(1)
  }
}

main()
