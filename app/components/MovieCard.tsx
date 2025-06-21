'use client'

interface MovieCardProps {
  title: string
  index: number
  isTopRecommendation?: boolean
}

export function MovieCard({ title, index, isTopRecommendation = false }: MovieCardProps) {
  return (
    <div className={`movie-card group cursor-pointer ${isTopRecommendation ? 'ring-2 ring-orange-500' : ''}`}>
      <div className="relative">
        {/* Movie Poster Placeholder */}
        <div className="w-full h-48 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          <div className="text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
            </svg>
            <p className="text-gray-400 text-sm">Movie Poster</p>
          </div>
        </div>
        
        {/* Top Recommendation Badge */}
        {isTopRecommendation && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            TOP PICK
          </div>
        )}
        
        {/* Movie Number */}
        <div className="absolute top-2 right-2 bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
          {index}
        </div>
      </div>
      
      {/* Movie Title */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors duration-200 line-clamp-2">
          {title}
        </h3>
        
        {/* Hover Effect */}
        <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-full h-1 bg-orange-500 rounded-full"></div>
        </div>
      </div>
    </div>
  )
} 