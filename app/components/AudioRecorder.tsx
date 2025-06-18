'use client'

import { useState, useRef, useCallback } from 'react'

interface AudioRecorderProps {
  onTranscription: (text: string) => void
  isRecording: boolean
  setIsRecording: (recording: boolean) => void
  isProcessing: boolean
  setIsProcessing: (processing: boolean) => void
}

export function AudioRecorder({
  onTranscription,
  isRecording,
  setIsRecording,
  isProcessing,
  setIsProcessing,
}: AudioRecorderProps) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      
      // Use the most compatible format
      let mimeType = 'audio/webm'
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        mimeType = 'audio/webm;codecs=opus'
      }
      
      console.log('Using mime type:', mimeType)
      
      const mediaRecorder = new MediaRecorder(stream, { mimeType })

      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType })
        console.log('Audio blob created:', audioBlob.size, 'bytes, type:', audioBlob.type)
        
        await transcribeAudio(audioBlob)
        
        // Stop all tracks to release the microphone
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Error accessing microphone. Please ensure you have granted microphone permissions.')
    }
  }, [setIsRecording])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }, [isRecording, setIsRecording])

  const transcribeAudio = useCallback(async (audioBlob: Blob) => {
    setIsProcessing(true)
    
    try {
      console.log('Starting transcription...', audioBlob.size, 'bytes')
      
      const formData = new FormData()
      // Use the original blob type or default to mp3
      const fileName = audioBlob.type.includes('mp3') ? 'recording.mp3' :
                      audioBlob.type.includes('wav') ? 'recording.wav' :
                      audioBlob.type.includes('mp4') ? 'recording.mp4' : 
                      audioBlob.type.includes('ogg') ? 'recording.ogg' : 'recording.webm'
      formData.append('audio', audioBlob, fileName)

      console.log('Sending request to /api/transcribe...')
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      })

      console.log('Response status:', response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Server error:', errorText)
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
      }

      const data = await response.json()
      console.log('Transcription response:', data)
      
      if (data.text) {
        console.log('Transcription successful:', data.text)
        onTranscription(data.text)
      } else if (data.error) {
        console.error('API error:', data.error)
        alert(`Transcription failed: ${data.error}`)
      } else {
        console.error('No transcription received:', data)
        alert('No transcription received. Please try again.')
      }
    } catch (error) {
      console.error('Error transcribing audio:', error)
      alert(`Error transcribing audio: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsProcessing(false)
    }
  }, [onTranscription, setIsProcessing])

  const getButtonText = () => {
    if (isProcessing) return 'Processing...'
    if (isRecording) return 'Stop Recording'
    return 'Start Recording'
  }

  const getButtonClass = () => {
    if (isProcessing) return 'btn btn-secondary cursor-not-allowed'
    if (isRecording) return 'btn btn-danger'
    return 'btn btn-primary'
  }

  return (
    <div className="text-center">
      <div className="mb-6">
        <div 
          className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 ${
            isRecording 
              ? 'bg-red-100 border-4 border-red-500 pulse-animation' 
              : 'bg-blue-100 border-4 border-blue-500'
          }`}
        >
          <svg 
            className={`w-12 h-12 ${isRecording ? 'text-red-600' : 'text-blue-600'}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      </div>

      <button
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isProcessing}
        className={getButtonClass()}
      >
        {getButtonText()}
      </button>

      {isRecording && (
        <p className="mt-4 text-sm text-gray-600">
          Recording... Click "Stop Recording" when you're done speaking.
        </p>
      )}

      {isProcessing && (
        <p className="mt-4 text-sm text-gray-600">
          Processing your audio with OpenAI Whisper...
        </p>
      )}
    </div>
  )
} 