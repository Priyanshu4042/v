'use client'

import { useState, useCallback, useEffect } from 'react'
import { ChatWindow } from './components/ChatWindow'

interface ConversationMessage {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  singleRecommendation?: string
  tenRecommendations?: string
  conversationCount?: number
  aiResponse?: string
  isAskingQuestion?: boolean
  conversationComplete?: boolean
  userPreferences?: any
}

export default function Home() {
  const [transcription, setTranscription] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [singleRecommendation, setSingleRecommendation] = useState<string | null>(null)
  const [tenRecommendations, setTenRecommendations] = useState<string | null>(null)
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(false)
  const [recommendationError, setRecommendationError] = useState<string | null>(null)
  const [conversationCount, setConversationCount] = useState(0)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([])
  const [currentAiResponse, setCurrentAiResponse] = useState<string | null>(null)
  const [isAskingQuestion, setIsAskingQuestion] = useState(false)
  const [conversationComplete, setConversationComplete] = useState(false)
  const [userPreferences, setUserPreferences] = useState<any>(null)

  // Initialize session on component mount
  useEffect(() => {
    startNewChat()
  }, [])

  const startNewChat = async () => {
    try {
      const response = await fetch('/api/new-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to start new chat')
      }

      const data = await response.json()
      setSessionId(data.sessionId)
    } catch (error) {
      console.error('Error starting new chat:', error)
    }
  }

  const handleTranscriptionComplete = useCallback((text: string) => {
    // Set transcription and trigger API call
    setTranscription(text)
  }, [])

  const handleClearTranscription = useCallback(async () => {
    // Start a new chat session
    await startNewChat()
    
    // Clear all states
    setTranscription('')
    setSingleRecommendation(null)
    setTenRecommendations(null)
    setRecommendationError(null)
    setConversationCount(0)
    setConversationHistory([])
    setCurrentAiResponse(null)
    setIsAskingQuestion(false)
    setConversationComplete(false)
    setUserPreferences(null)
  }, [])

  // Auto-trigger movie recommendation when transcription changes
  useEffect(() => {
    if (transcription && transcription.trim().length > 0 && sessionId) {
      getMovieRecommendation(transcription)
    }
  }, [transcription, sessionId])

  const getMovieRecommendation = async (text: string) => {
    if (!sessionId) return
    
    setIsLoadingRecommendation(true)
    setRecommendationError(null)
    
    try {
      // Prepare conversation history for the API
      const historyForApi = conversationHistory.map(msg => ({
        text: msg.text,
        isUser: msg.isUser,
        timestamp: msg.timestamp.toISOString()
      }))

      const response = await fetch('/api/movie-recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text, 
          sessionId,
          conversationHistory: historyForApi
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get recommendation')
      }

      const data = await response.json()
      
      // Update states based on response
      setSingleRecommendation(data.singleRecommendation)
      setTenRecommendations(data.tenRecommendations)
      setConversationCount(data.conversationCount)
      setCurrentAiResponse(data.aiResponse)
      setIsAskingQuestion(data.isAskingQuestion)
      setConversationComplete(data.conversationComplete)
      setUserPreferences(data.userPreferences)
      
      // Clear transcription after successful API call
      setTranscription('')
      
    } catch (error) {
      console.error('Error getting movie recommendation:', error)
      setRecommendationError('Failed to get movie recommendation. Please try again.')
      // Clear transcription even on error to prevent re-triggering
      setTranscription('')
    } finally {
      setIsLoadingRecommendation(false)
    }
  }

  // Update conversation history when new messages are added
  useEffect(() => {
    if (transcription && transcription.trim().length > 0) {
      const newMessage: ConversationMessage = {
        id: Date.now().toString(),
        text: transcription,
        isUser: true,
        timestamp: new Date()
      }
      setConversationHistory(prev => [...prev, newMessage])
    }
  }, [transcription])

  // Add AI response to conversation history
  useEffect(() => {
    if (currentAiResponse || singleRecommendation || tenRecommendations || recommendationError) {
      const responseText = recommendationError 
        ? `Sorry, I couldn't get movie recommendations right now. ${recommendationError}`
        : currentAiResponse || `Here are some movie recommendations based on what you said!`

      const newMessage: ConversationMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date(),
        singleRecommendation: singleRecommendation || undefined,
        tenRecommendations: tenRecommendations || undefined,
        conversationCount,
        aiResponse: currentAiResponse || undefined,
        isAskingQuestion,
        conversationComplete,
        userPreferences
      }
      setConversationHistory(prev => [...prev, newMessage])
      
      // Clear current response after adding to history
      setCurrentAiResponse(null)
      setSingleRecommendation(null)
      setTenRecommendations(null)
      setRecommendationError(null)
    }
  }, [currentAiResponse, singleRecommendation, tenRecommendations, recommendationError, conversationCount, isAskingQuestion, conversationComplete, userPreferences])

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
      conversationHistory={conversationHistory}
      isAskingQuestion={isAskingQuestion}
      conversationComplete={conversationComplete}
      userPreferences={userPreferences}
    />
  )
} 