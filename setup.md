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