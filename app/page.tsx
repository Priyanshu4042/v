'use client'

import { useState, useCallback, useEffect } from 'react'
import { ChatWindow } from './components/ChatWindow'

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
    <ChatWindow
      onTranscription={handleTranscriptionComplete}
      isRecording={isRecording}
      setIsRecording={setIsRecording}
      transcription={transcription}
      singleRecommendation={singleRecommendation}
      tenRecommendations={tenRecommendations}
      isLoadingRecommendation={isLoadingRecommendation}
      recommendationError={recommendationError}
      conversationCount={conversationCount}
      onClear={handleClearTranscription}
    />
  )
} 