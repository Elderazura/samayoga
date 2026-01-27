import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export const runtime = 'nodejs'

export async function POST() {
  try {
    const password = await bcrypt.hash('12345678', 10)

    // Create admin user
    const { data: admin, error: adminError } = await supabase
      .from('User')
      .upsert({
        email: 'salith@samayoga.online',
        name: 'Admin User',
        password,
        role: 'ADMIN',
        status: 'APPROVED',
        emailVerified: new Date().toISOString(),
      }, {
        onConflict: 'email',
      })
      .select()
      .single()

    if (adminError) {
      throw new Error(`Failed to create admin: ${adminError.message}`)
    }

    // Create student user
    const { data: student, error: studentError } = await supabase
      .from('User')
      .upsert({
        email: 'student1@samayoga.online',
        name: 'Student One',
        password,
        role: 'STUDENT',
        status: 'APPROVED',
        emailVerified: new Date().toISOString(),
      }, {
        onConflict: 'email',
      })
      .select()
      .single()

    if (studentError) {
      throw new Error(`Failed to create student: ${studentError.message}`)
    }

    return NextResponse.json({
      message: 'Users created successfully',
      admin: {
        email: admin.email,
        role: admin.role,
        status: admin.status,
      },
      student: {
        email: student.email,
        role: student.role,
        status: student.status,
      },
    })
  } catch (error: any) {
    console.error('Error creating users:', error)
    return NextResponse.json(
      { error: 'Failed to create users', details: error.message },
      { status: 500 }
    )
  }
}
