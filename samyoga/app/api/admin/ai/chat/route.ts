import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
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

    const { message, history = [] } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Store conversation in memory
    await prisma.aIMemory.upsert({
      where: { key: `conversation_${session.user.id}_latest` },
      update: {
        value: message,
        context: JSON.stringify({ timestamp: new Date().toISOString() }),
      },
      create: {
        key: `conversation_${session.user.id}_latest`,
        value: message,
        context: JSON.stringify({ timestamp: new Date().toISOString() }),
      },
    })

    // Get context from database for better responses
    const studentCount = await prisma.user.count({ where: { role: 'STUDENT' } })
    const classCount = await prisma.class.count({ where: { status: 'SCHEDULED' } })
    const pendingPayments = await prisma.payment.count({ where: { status: 'PENDING' } })
    const approvedStudents = await prisma.user.count({ 
      where: { role: 'STUDENT', status: 'APPROVED' } 
    })

    // Build system context
    const systemContext = `You are an AI assistant for Samyoga, a yoga studio run by Samyuktha Nambiar. 
You help with administrative tasks. Here's the current system status:
- Total students: ${studentCount}
- Approved students: ${approvedStudents}
- Scheduled classes: ${classCount}
- Pending payments: ${pendingPayments}

You can help with:
- Student management and information
- Class scheduling and details
- Payment tracking
- General questions about the yoga studio

Be helpful, professional, and concise.`

    const apiKey = process.env.GOOGLE_API_KEY
    if (!apiKey) {
      // Fallback to keyword-based responses if API key not configured
      let response = "I'm your AI assistant. "
      
      const lowerMessage = message.toLowerCase()
      
      if (lowerMessage.includes('student') || lowerMessage.includes('students')) {
        response += `I found ${studentCount} students in the system. `
      }
      
      if (lowerMessage.includes('class') || lowerMessage.includes('classes')) {
        response += `There are ${classCount} scheduled classes. `
      }
      
      if (lowerMessage.includes('payment') || lowerMessage.includes('payments')) {
        response += `There are ${pendingPayments} pending payments. `
      }
      
      if (!response.includes('found') && !response.includes('There are')) {
        response += "I can help you with information about students, classes, and payments. What would you like to know? (Note: Gemini API key not configured - using fallback mode)"
      }

      // Store response in memory
      await prisma.aIMemory.upsert({
        where: { key: `conversation_${session.user.id}_response_${Date.now()}` },
        update: {
          value: response,
          context: JSON.stringify({ 
            timestamp: new Date().toISOString(),
            userMessage: message,
          }),
        },
        create: {
          key: `conversation_${session.user.id}_response_${Date.now()}`,
          value: response,
          context: JSON.stringify({ 
            timestamp: new Date().toISOString(),
            userMessage: message,
          }),
        },
      })

      return NextResponse.json({ response })
    }

    // Use Gemini API
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash' // Fast and efficient for chat
    })

    // Build conversation history
    const conversationHistory = [
      { role: 'user', parts: [{ text: systemContext }] },
      { role: 'model', parts: [{ text: 'I understand. I\'m ready to help with Samyoga administrative tasks.' }] },
      ...history,
      { role: 'user', parts: [{ text: message }] },
    ]

    const result = await model.generateContent({
      contents: conversationHistory,
    })

    const response = result.response
    const responseText = response.text()

    // Store response in memory
    await prisma.aIMemory.upsert({
      where: { key: `conversation_${session.user.id}_response_${Date.now()}` },
      update: {
        value: responseText,
        context: JSON.stringify({ 
          timestamp: new Date().toISOString(),
          userMessage: message,
        }),
      },
      create: {
        key: `conversation_${session.user.id}_response_${Date.now()}`,
        value: responseText,
        context: JSON.stringify({ 
          timestamp: new Date().toISOString(),
          userMessage: message,
        }),
      },
    })

    return NextResponse.json({ response: responseText })
  } catch (error: any) {
    console.error('Error in AI chat:', error)
    
    // Handle specific API errors
    if (error.message?.includes('API key')) {
      return NextResponse.json(
        { error: 'Invalid API key. Please check your GOOGLE_API_KEY environment variable.', 
          response: 'I apologize, but there\'s an issue with the API configuration. Please contact the administrator.' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to process message', response: 'I apologize, but I encountered an error. Please try again.' },
      { status: 500 }
    )
  }
}