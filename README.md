# Fire TV Movie Bot - Interactive AI Movie Recommendations

A sophisticated speech-to-text movie recommendation app with interactive AI conversations, built with Next.js, TypeScript, and Python Flask.

## 🎯 Features

### 🎤 Speech-to-Text Integration
- Real-time speech transcription using Web Speech API
- Voice-activated movie recommendations
- Fire TV-style interface with dark theme and orange accents

### 🤖 Interactive AI Conversations
- **Multi-turn conversations** with contextual learning
- **Session-based memory** (no persistent storage)
- **Dynamic preference learning** through natural dialogue
- **Intelligent questioning** to understand user preferences

### 🎬 Smart Movie Recommendations
- **Personalized recommendations** based on learned preferences
- **10-movie lists** generated after conversation completion
- **Genre, mood, actor, and year preference detection**
- **Contextual learning** throughout the conversation

### 💬 Conversation Flow
1. **Initial Greeting** - AI welcomes user and asks about genre preferences
2. **Genre Discovery** - AI learns user's preferred movie genres
3. **Mood Assessment** - AI asks about current mood and desired atmosphere
4. **Actor Preferences** - AI inquires about favorite actors/actresses
5. **Final Recommendations** - AI provides 10 personalized movie suggestions

### 🎨 Modern UI/UX
- **Fire TV-inspired design** with dark theme
- **Chat bubble interface** for natural conversation flow
- **Movie cards** displaying recommendations
- **Real-time status indicators** for conversation progress
- **Responsive design** for various screen sizes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd v
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   # Create .env.local file
   echo "GOOGLE_API_KEY=your_gemini_api_key_here" > .env.local
   ```

5. **Start the Python backend**
   ```bash
   python movie_recommender.py
   ```

6. **Start the Next.js frontend**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎭 How It Works

### Interactive Conversation System
The AI engages in natural conversations to understand user preferences:

1. **Genre Learning**: "What genre do you usually enjoy?"
2. **Mood Assessment**: "What mood are you in today?"
3. **Actor Preferences**: "Do you have any favorite actors?"
4. **Final Recommendations**: 10 personalized movies based on learned preferences

### Session Management
- **Session-only memory** - no data persistence
- **Unique session IDs** for each conversation
- **Context preservation** throughout the conversation
- **Fresh start** with "Clear Chat" functionality

### Preference Detection
The AI automatically detects:
- **Genres**: action, comedy, drama, horror, romance, sci-fi, thriller, documentary, animation, fantasy
- **Moods**: happy, sad, excited, relaxed, stressed, romantic, adventurous, mysterious, funny, serious
- **Years**: Any year mentioned (e.g., "movies from the 90s")
- **Actors**: Popular actors and actresses

## 🛠️ Technical Architecture

### Frontend (Next.js + TypeScript)
- **Components**: ChatWindow, ChatBubble, MovieCard, TranscriptionDisplay
- **State Management**: React hooks for conversation state
- **API Integration**: RESTful communication with Python backend
- **Speech Recognition**: Web Speech API integration

### Backend (Python Flask)
- **Session Management**: In-memory session storage
- **AI Integration**: Google Gemini API for recommendations
- **Conversation Logic**: Multi-stage conversation flow
- **Preference Analysis**: Natural language processing for preference detection

### API Endpoints
- `POST /api/movie-recommendation` - Process user input and generate responses
- `POST /api/new-chat` - Start new conversation session

## �� UI Components

### Chat Interface
- **User Messages**: Right-aligned chat bubbles
- **AI Responses**: Left-aligned chat bubbles with status indicators
- **Conversation Status**: Visual indicators for question asking and completion
- **Preference Display**: Shows learned user preferences

### Movie Recommendations
- **Top Pick**: Highlighted single recommendation
- **Movie Grid**: 10-movie recommendation display
- **Movie Cards**: Individual movie cards with styling

### Voice Interface
- **Microphone Button**: Central voice activation
- **Recording Status**: Visual feedback during recording
- **Transcription Display**: Real-time speech-to-text

## 🔧 Configuration

### Environment Variables
```bash
GOOGLE_API_KEY=your_gemini_api_key_here
```

### Python Dependencies
```
flask
flask-cors
google-generativeai
```

### Frontend Dependencies
```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.0.0"
}
```

## 🎯 Usage Examples

### Example Conversation Flow
```
User: "I want to watch a movie"
AI: "Hi! I'd love to help you find the perfect movie. What genre do you usually enjoy?"

User: "I like action movies"
AI: "Great! I see you like action movies. What mood are you in today?"

User: "I'm feeling excited"
AI: "Perfect! An excited mood sounds great. Do you have any favorite actors?"

User: "I like Tom Hanks"
AI: "Perfect! Based on your preferences for action movies and your excited mood, here are some great recommendations for you!"
[Shows 10 personalized movie recommendations]
```

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
npm start
```

### Backend Deployment
```bash
python movie_recommender.py
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🎬 Future Enhancements

- **Rating System**: Allow users to rate recommended movies
- **Watch History**: Track watched movies (optional)
- **Advanced Preferences**: More sophisticated preference learning
- **Multi-language Support**: Support for multiple languages
- **Mobile App**: Native mobile application
- **Social Features**: Share recommendations with friends 