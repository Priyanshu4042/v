'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

interface WebSpeechRecorderProps {
  onTranscription: (text: string) => void
  isRecording: boolean
  setIsRecording: (recording: boolean) => void
}

export function WebSpeechRecorder({
  onTranscription,
  isRecording,
  setIsRecording,
}: WebSpeechRecorderProps) {
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    // Check if browser supports Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true)
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'en-US'
      
      recognition.onresult = (event) => {
        let finalTranscript = ''
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          }
        }
        
        if (finalTranscript) {
          onTranscription(finalTranscript)
        }
      }
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsRecording(false)
      }
      
      recognition.onend = () => {
        setIsRecording(false)
      }
      
      recognitionRef.current = recognition
    }
  }, [onTranscription, setIsRecording])

  const startRecording = useCallback(() => {
    if (recognitionRef.current && !isRecording) {
      recognitionRef.current.start()
      setIsRecording(true)
    }
  }, [isRecording, setIsRecording])

  const stopRecording = useCallback(() => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop()
      setIsRecording(false)
    }
  }, [isRecording, setIsRecording])

  if (!isSupported) {
    return (
      <div className="text-center">
        <p className="text-red-600 mb-4">
          Web Speech API is not supported in your browser.
        </p>
      </div>
    )
  }

  return (
    <div className="text-center">
      <div className="mb-6">
        <div 
          className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 ${
            isRecording 
              ? 'bg-red-100 border-4 border-red-500 pulse-animation' 
              : 'bg-green-100 border-4 border-green-500'
          }`}
        >
          <svg 
            className={`w-12 h-12 ${isRecording ? 'text-red-600' : 'text-green-600'}`} 
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
        className={`btn ${isRecording ? 'btn-danger' : 'btn btn-secondary'}`}
      >
        {isRecording ? 'Stop Recording (Web Speech)' : 'Start Recording (Web Speech Fallback)'}
      </button>

      {isRecording && (
        <p className="mt-4 text-sm text-gray-600">
          Speaking... Speech will be transcribed in real-time using your browser.
        </p>
      )}
      
      <p className="mt-2 text-xs text-gray-500">
        Using browser's Web Speech API (fallback mode)
      </p>
    </div>
  )
} 