'use client'

interface MovieRecommendationProps {
  singleRecommendation: string | null
  tenRecommendations: string | null
  isLoading: boolean
  error: string | null
  conversationCount: number
}

export function MovieRecommendation({ 
  singleRecommendation, 
  tenRecommendations, 
  isLoading, 
  error, 
  conversationCount 
}: MovieRecommendationProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Movie Recommendations</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Getting movie recommendations...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Movie Recommendations</h2>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    )
  }

  if (!singleRecommendation && !tenRecommendations) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Movie Recommendations</h2>
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-gray-500 italic">
            Your movie recommendations will appear here after you speak...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Movie Recommendations</h2>
      
      {/* Single Movie Recommendation */}
      {singleRecommendation && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Top Recommendation</h3>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-blue-800 font-semibold text-lg">{singleRecommendation}</p>
                <p className="text-sm text-blue-600 mt-1">
                  Based on your mood (3/5) and what you said
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ten Movie Recommendations */}
      {tenRecommendations && (
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Top 10 Recommendations 
            {conversationCount > 1 && (
              <span className="text-sm text-gray-500 ml-2">
                (Based on {conversationCount} conversations)
              </span>
            )}
          </h3>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-green-800 font-medium">Recommended Movies:</p>
                <div className="mt-2 text-green-700">
                  {tenRecommendations.split(',').map((movie, index) => (
                    <div key={index} className="py-1">
                      <span className="text-sm font-medium">{index + 1}.</span>
                      <span className="ml-2">{movie.trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 