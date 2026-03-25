import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { posterType, style, title, description } = await request.json()

    const apiKey = process.env.GOOGLE_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google API key not configured' },
        { status: 500 }
      )
    }

    const genAI = new GoogleGenerativeAI(apiKey)

    // Build prompt based on poster type and style
    let prompt = `Create a professional yoga poster for "${title || 'Yoga Class'}"`
    
    if (description) {
      prompt += `. Description: ${description}`
    }

    // Style variations
    const stylePrompts: Record<string, string> = {
      'Calm & Minimal': 'Use a calm, minimal design with soft colors, plenty of white space, and gentle typography. Think serene and peaceful.',
      'Energetic': 'Use vibrant, energetic colors with dynamic composition and bold typography. Think movement and vitality.',
      'Meditative': 'Use deep, grounding colors with contemplative imagery and elegant typography. Think stillness and introspection.',
    }

    if (style && stylePrompts[style]) {
      prompt += `. ${stylePrompts[style]}`
    }

    // Poster type specific prompts
    if (posterType === 'Class Announcement') {
      prompt += ' Include space for class details like date, time, and instructor name. Make it inviting and welcoming.'
    } else if (posterType === 'Event Poster') {
      prompt += ' Create an eye-catching event poster with clear event information and compelling visuals.'
    } else if (posterType === 'Workshop Flyer') {
      prompt += ' Design a workshop flyer that highlights the learning outcomes and benefits.'
    }

    prompt += ' The poster should be suitable for digital sharing and print. Use high-quality imagery related to yoga practice, wellness, and mindfulness.'

    // Use REST API directly for image generation
    // The SDK may not fully support image generation yet, so we use REST
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${apiKey}`
    
    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          responseModalities: ['IMAGE'],
          imageConfig: {
            aspectRatio: '4:5',
            imageSize: '2K',
          },
        },
      }),
    })

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json().catch(() => ({}))
      return NextResponse.json(
        { 
          error: 'Failed to generate image',
          details: errorData.error?.message || apiResponse.statusText,
        },
        { status: apiResponse.status }
      )
    }

    const data = await apiResponse.json()
    
    // Extract image from response
    const imagePart = data.candidates?.[0]?.content?.parts?.find(
      (part: any) => part.inlineData
    )

    if (!imagePart?.inlineData) {
      return NextResponse.json(
        { error: 'No image data in response', response: data },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      imageData: imagePart.inlineData.data,
      mimeType: imagePart.inlineData.mimeType,
      prompt: prompt,
    })
  } catch (error: any) {
    console.error('Error generating poster:', error)
    
    // Handle specific API errors
    if (error.message?.includes('API key')) {
      return NextResponse.json(
        { error: 'Invalid API key. Please check your GOOGLE_API_KEY environment variable.' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to generate poster', details: error.message },
      { status: 500 }
    )
  }
}