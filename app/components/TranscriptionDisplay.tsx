'use client'

interface TranscriptionDisplayProps {
  transcription: string
  onClear: () => void
}

export function TranscriptionDisplay({ transcription, onClear }: TranscriptionDisplayProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Transcription</h2>
        {transcription && (
          <button
            onClick={onClear}
            className="btn btn-secondary text-sm"
          >
            Clear
          </button>
        )}
      </div>
      
      <div className="min-h-[200px] p-4 bg-gray-50 rounded-lg border">
        {transcription ? (
          <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
            {transcription}
          </p>
        ) : (
          <p className="text-gray-500 italic">
            Your transcribed speech will appear here...
          </p>
        )}
      </div>
      
      {transcription && (
        <div className="mt-4 text-sm text-gray-600">
          <p>Word count: {transcription.split(/\s+/).filter(word => word.length > 0).length}</p>
        </div>
      )}
    </div>
  )
} 