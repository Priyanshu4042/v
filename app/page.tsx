'use client'

import { useState, useRef, useCallback } from 'react'
import { AudioRecorder } from './components/AudioRecorder'
import { WebSpeechRecorder } from './components/WebSpeechRecorder'
import { TranscriptionDisplay } from './components/TranscriptionDisplay'

export default function Home() {
  const [transcription, setTranscription] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [useWebSpeech, setUseWebSpeech] = useState(false)

  const handleTranscriptionComplete = useCallback((text: string) => {
    setTranscription(prev => prev + (prev ? ' ' : '') + text)
  }, [])

  const handleClearTranscription = useCallback(() => {
    setTranscription('')
  }, [])

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Speech to Text
        </h1>
        <p className="text-lg text-gray-600">
          Click the microphone to start recording. Your speech will be transcribed using OpenAI Whisper.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="mb-6 text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={() => setUseWebSpeech(false)}
              className={`btn ${!useWebSpeech ? 'btn-primary' : 'btn-secondary'}`}
              disabled={isRecording}
            >
              OpenAI Whisper
            </button>
            <button
              onClick={() => setUseWebSpeech(true)}
              className={`btn ${useWebSpeech ? 'btn-primary' : 'btn-secondary'}`}
              disabled={isRecording}
            >
              Web Speech API
            </button>
          </div>
          
          {!useWebSpeech && (
            <p className="text-sm text-gray-600">
              High-quality transcription using OpenAI Whisper
            </p>
          )}
          
          {useWebSpeech && (
            <p className="text-sm text-gray-600">
              Real-time transcription using your browser (fallback mode)
            </p>
          )}
        </div>

        {!useWebSpeech ? (
          <AudioRecorder
            onTranscription={handleTranscriptionComplete}
            isRecording={isRecording}
            setIsRecording={setIsRecording}
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
          />
        ) : (
          <WebSpeechRecorder
            onTranscription={handleTranscriptionComplete}
            isRecording={isRecording}
            setIsRecording={setIsRecording}
          />
        )}
      </div>

      <TranscriptionDisplay
        transcription={transcription}
        onClear={handleClearTranscription}
      />
    </main>
  )
} 