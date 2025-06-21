import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()
    
    if (!text) {
      return NextResponse.json(
        { error: 'No text provided' },
        { status: 400 }
      )
    }

    // Call the Python Flask service
    const response = await fetch('http://localhost:5000/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })

    if (!response.ok) {
      throw new Error(`Python service error: ${response.status}`)
    }

    const data = await response.json()
    
    return NextResponse.json({
      singleRecommendation: data.single_recommendation,
      tenRecommendations: data.ten_recommendations,
      input: data.input,
      mood: data.mood,
      conversationCount: data.conversation_count
    })
    
  } catch (error: any) {
    console.error('Error getting movie recommendation:', error)
    return NextResponse.json(
      { error: 'Failed to get movie recommendation' },
      { status: 500 }
    )
  }
} 