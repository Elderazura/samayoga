import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { supabase } from '@/lib/supabase'
import { UnauthorizedError, formatErrorResponse, logError } from '@/lib/errors'
import type { QuestionnaireData } from '@/types/database'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const data: QuestionnaireData = await request.json()
    
    // If userId is provided (from registration), use it; otherwise require auth
    let userId: string
    
    if (data.userId) {
      userId = data.userId
    } else {
      const session = await auth()
      if (!session?.user?.id) {
        throw new UnauthorizedError()
      }
      userId = session.user.id
    }

    // Store new fields in additionalInfo as JSON, or use existing fields
    const additionalInfo = {
      height: data.height || null,
      weight: data.weight || null,
      phone: data.phone || null,
      classType: data.classType || null,
      preferredTimeSlot: data.preferredTimeSlot || null,
      yogaExperience: data.yogaExperience || null,
      healthIssues: data.healthIssues || null,
      // Keep existing fields
      experience: data.experience || null,
      goals: data.goals || null,
      injuries: data.injuries || null,
      preferences: data.preferences || null,
      availability: data.availability || null,
    }

    // Check if registration exists
    const { data: existing } = await supabase
      .from('Registration')
      .select('id')
      .eq('userId', userId)
      .single()

    if (existing) {
      // Update existing registration
      const { error } = await supabase
        .from('Registration')
        .update({
          experience: data.experience || data.yogaExperience || null,
          injuries: data.injuries || data.healthIssues || null,
          preferences: data.preferences || data.classType || null,
          availability: data.availability || data.preferredTimeSlot || null,
          additionalInfo: JSON.stringify(additionalInfo),
          submittedAt: new Date().toISOString(),
        })
        .eq('userId', userId)

      if (error) {
        throw new Error(`Failed to update registration: ${error.message}`)
      }
    } else {
      // Create new registration
      const { error } = await supabase
        .from('Registration')
        .insert({
          userId,
          experience: data.experience || data.yogaExperience || null,
          injuries: data.injuries || data.healthIssues || null,
          preferences: data.preferences || data.classType || null,
          availability: data.availability || data.preferredTimeSlot || null,
          additionalInfo: JSON.stringify(additionalInfo),
        })

      if (error) {
        throw new Error(`Failed to create registration: ${error.message}`)
      }
    }

    return NextResponse.json(
      { message: 'Registration submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    logError(error, 'Questionnaire API')
    const errorResponse = formatErrorResponse(error)
    const statusCode = error instanceof UnauthorizedError ? 401 : 500
    
    return NextResponse.json(
      errorResponse,
      { status: statusCode }
    )
  }
}
