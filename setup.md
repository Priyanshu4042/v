# Setup Guide for Speech-to-Movie Recommendations

## Prerequisites
- Python 3.7+ installed
- Node.js and npm installed
- Gemini API key (replace in `movie_recommender.py`)

## Step 1: Install Python Dependencies
```bash
pip install -r requirements.txt
```

## Step 2: Start the Python Flask Service
```bash
python movie_recommender.py
```
This will start the Flask server on http://localhost:5000

## Step 3: Start the Next.js App
In a new terminal:
```bash
npm run dev
```
This will start the Next.js app on http://localhost:3000

## Step 4: Test the Integration
1. Open http://localhost:3000 in your browser
2. Click "Start Recording" and speak about a movie or your mood
3. The transcription will appear on the left
4. The movie recommendation will automatically appear on the right

## How It Works
1. **Voice Input** → User speaks into microphone
2. **Web Speech API** → Converts speech to text in real-time
3. **Auto-Trigger** → When transcription is complete, it automatically calls the Python service
4. **Python Service** → Sends text to Gemini API with hardcoded mood (3/5)
5. **AI Response** → Gemini returns movie recommendation
6. **Display** → Recommendation appears in the UI

## Troubleshooting
- Make sure both servers are running (Python on port 5000, Next.js on port 3000)
- Check browser console for any errors
- Ensure microphone permissions are granted
- Verify your Gemini API key is correct

## Features
- ✅ Real-time speech transcription
- ✅ Auto-triggered movie recommendations
- ✅ Hardcoded mood (3/5)
- ✅ Error handling and loading states
- ✅ Responsive UI design

# Setup Guide for Fire TV Movie Bot

## 🔑 Google API Key Setup

The backend requires a Google Gemini API key to generate personalized movie recommendations. Without it, the system will use fallback recommendations.

### How to Get a Google API Key:

1. **Go to Google AI Studio**: https://makersuite.google.com/app/apikey
2. **Sign in** with your Google account
3. **Create a new API key**
4. **Copy the API key**

### How to Set the API Key:

#### Option 1: Environment Variable (Recommended)
Create a `.env.local` file in your project root:
```bash
GOOGLE_API_KEY=your_actual_api_key_here
```

#### Option 2: Direct in Code (Not recommended for production)
Edit `movie_recommender.py` and replace line 12:
```python
genai.configure(api_key='your_actual_api_key_here')
```

### Restart the Backend
After setting the API key, restart the Python backend:
```bash
python movie_recommender.py
```

## 🎯 What Happens Without API Key:

- ✅ **Conversation works**: AI will still ask questions and learn preferences
- ✅ **Fallback recommendations**: Curated movie lists based on detected preferences
- ❌ **No AI-generated recommendations**: Won't use Gemini for personalized suggestions

## 🎬 Current Features (Works Without API Key):

1. **Interactive Conversations**: AI asks about genre, mood, actors
2. **Preference Learning**: Detects and stores user preferences
3. **Fallback Recommendations**: Curated lists for each genre
4. **Session Management**: Maintains conversation context
5. **Speech-to-Text**: Voice input functionality

## 🚀 To Get Full AI Recommendations:

Set up the Google API key as described above to enable:
- **AI-generated personalized recommendations**
- **Dynamic movie suggestions based on conversation**
- **More sophisticated preference analysis**

The system works great even without the API key, but with it, you get the full AI-powered experience! 