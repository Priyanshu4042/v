'use client'

import { useState, useCallback, useEffect } from 'react'
import { WebSpeechRecorder } from './components/WebSpeechRecorder'
import { TranscriptionDisplay } from './components/TranscriptionDisplay'
import { MovieRecommendation } from './components/MovieRecommendation'

export default function Home() {
  const [transcription, setTranscription] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [singleRecommendation, setSingleRecommendation] = useState<string | null>(null)
  const [tenRecommendations, setTenRecommendations] = useState<string | null>(null)
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(false)
  const [recommendationError, setRecommendationError] = useState<string | null>(null)
  const [conversationCount, setConversationCount] = useState(0)

  const handleTranscriptionComplete = useCallback((text: string) => {
    setTranscription(prev => prev + (prev ? ' ' : '') + text)
  }, [])

  const handleClearTranscription = useCallback(() => {
    setTranscription('')
    setSingleRecommendation(null)
    setTenRecommendations(null)
    setRecommendationError(null)
    setConversationCount(0)
  }, [])

  // Auto-trigger movie recommendation when transcription changes
  useEffect(() => {
    if (transcription && transcription.trim().length > 0) {
      getMovieRecommendation(transcription)
    }
  }, [transcription])

  const getMovieRecommendation = async (text: string) => {
    setIsLoadingRecommendation(true)
    setRecommendationError(null)
    
    try {
      const response = await fetch('/api/movie-recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        throw new Error('Failed to get recommendation')
      }

      const data = await response.json()
      setSingleRecommendation(data.singleRecommendation)
      setTenRecommendations(data.tenRecommendations)
      setConversationCount(data.conversationCount)
    } catch (error) {
      console.error('Error getting movie recommendation:', error)
      setRecommendationError('Failed to get movie recommendation. Please try again.')
    } finally {
      setIsLoadingRecommendation(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Speech to Movie Recommendations
        </h1>
        <p className="text-lg text-gray-600">
          Speak about a movie plot or your mood, and get AI-powered movie recommendations!
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-gray-600">
            Real-time transcription using your browser's Web Speech API
          </p>
        </div>

        <WebSpeechRecorder
          onTranscription={handleTranscriptionComplete}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <TranscriptionDisplay
          transcription={transcription}
          onClear={handleClearTranscription}
        />
        
        <MovieRecommendation
          singleRecommendation={singleRecommendation}
          tenRecommendations={tenRecommendations}
          isLoading={isLoadingRecommendation}
          error={recommendationError}
          conversationCount={conversationCount}
        />
      </div>
    </main>
  )
} 