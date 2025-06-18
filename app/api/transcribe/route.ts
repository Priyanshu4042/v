import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 60000, // 60 second timeout
  maxRetries: 3, // Built-in retry logic
})

export async function POST(request: NextRequest) {
  try {
    console.log('Transcription API called')
    
    const formData = await request.formData()
    const audioFile = formData.get('audio') as File

    if (!audioFile) {
      console.error('No audio file provided')
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      )
    }

    console.log('Audio file received:', {
      name: audioFile.name,
      type: audioFile.type,
      size: audioFile.size
    })

    // Validate file size (max 25MB for OpenAI Whisper)
    if (audioFile.size > 25 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Audio file too large. Maximum size is 25MB.' },
        { status: 400 }
      )
    }

    // Convert the audio file to the format expected by OpenAI
    const audioBuffer = await audioFile.arrayBuffer()
    console.log('Audio buffer size:', audioBuffer.byteLength)
    
    // Create a proper File object with correct extension
    const fileExtension = audioFile.type.includes('mp3') ? 'mp3' :
                         audioFile.type.includes('mp4') ? 'mp4' : 
                         audioFile.type.includes('wav') ? 'wav' :
                         audioFile.type.includes('ogg') ? 'ogg' : 'webm'
    const fileName = `audio.${fileExtension}`
    
    const file = new File([audioBuffer], fileName, { type: audioFile.type })
    console.log('Created file for OpenAI:', fileName, file.type)

    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key not found')
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    console.log('Sending to OpenAI Whisper...')
    
    // Add retry logic for connection issues
    let retries = 3
    let transcription
    
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`Attempt ${attempt}/${retries} to OpenAI...`)
        
        // Transcribe the audio using OpenAI Whisper
        transcription = await openai.audio.transcriptions.create({
          file: file,
          model: 'whisper-1',
          language: 'en', // You can make this dynamic if needed
        }, {
          timeout: 30000, // 30 second timeout
        })
        
        break // Success, exit retry loop
        
      } catch (error: any) {
        console.log(`Attempt ${attempt} failed:`, error?.message)
        
        if (attempt === retries) {
          // Last attempt failed, throw the error
          throw error
        }
        
        // Wait before retry (exponential backoff)
        const delay = Math.pow(2, attempt - 1) * 1000 // 1s, 2s, 4s
        console.log(`Waiting ${delay}ms before retry...`)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }

    console.log('Transcription successful:', transcription?.text)
    return NextResponse.json({ text: transcription?.text || '' })
  } catch (error: any) {
    console.error('Detailed error transcribing audio:', {
      message: error?.message,
      type: error?.type,
      code: error?.code,
      status: error?.status,
      headers: error?.headers,
      error: error
    })
    
    // Handle specific OpenAI errors
    if (error?.code === 'invalid_api_key') {
      return NextResponse.json(
        { error: 'Invalid OpenAI API key. Please check your API key.' },
        { status: 401 }
      )
    }
    
    if (error?.code === 'insufficient_quota') {
      return NextResponse.json(
        { error: 'OpenAI API quota exceeded. Please check your billing.' },
        { status: 429 }
      )
    }
    
    if (error?.code === 'model_not_found') {
      return NextResponse.json(
        { error: 'Whisper model not available. Please try again later.' },
        { status: 503 }
      )
    }
    
    if (error?.message?.includes('unsupported file format')) {
      return NextResponse.json(
        { error: 'Unsupported audio format. Please try recording again.' },
        { status: 400 }
      )
    }
    
    // Network/connection errors
    if (error?.message?.includes('ENOTFOUND') || error?.message?.includes('ECONNREFUSED') || error?.code === 'ECONNRESET') {
      return NextResponse.json(
        { error: 'Network connection error. Please check your internet connection.' },
        { status: 503 }
      )
    }
    
    // More detailed error handling
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to transcribe audio: ${error.message}` },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to transcribe audio: Unknown error' },
      { status: 500 }
    )
  }
} 