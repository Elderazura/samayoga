import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'
import { ValidationError, formatErrorResponse, logError } from '@/lib/errors'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password) {
      throw new ValidationError('Email and password are required')
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new ValidationError('Invalid email format')
    }

    // Validate password length
    if (password.length < 6) {
      throw new ValidationError('Password must be at least 6 characters')
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('User')
      .select('id')
      .eq('email', email.toLowerCase().trim())
      .single()

    if (existingUser) {
      throw new ValidationError('User with this email already exists')
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const { data: user, error } = await supabase
      .from('User')
      .insert({
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        name: name || null,
        role: 'STUDENT',
        status: 'PENDING',
      })
      .select('id')
      .single()

    if (error) {
      throw new Error(`Failed to create user: ${error.message}`)
    }

    return NextResponse.json(
      { message: 'User created successfully', userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    logError(error, 'Registration API')
    const errorResponse = formatErrorResponse(error)
    const statusCode = error instanceof ValidationError ? 400 : 500
    
    return NextResponse.json(
      errorResponse,
      { status: statusCode }
    )
  }
}
