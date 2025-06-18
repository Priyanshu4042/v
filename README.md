# Speech to Text App

A Next.js application that uses OpenAI's Whisper model to transcribe speech into text in real-time.

## Features

- **Real-time Speech Recording**: Click to start/stop recording your voice
- **OpenAI Whisper Integration**: High-quality speech-to-text transcription
- **Modern UI**: Clean, responsive interface with visual feedback
- **Live Status Updates**: Visual indicators for recording, processing states
- **Transcription Management**: View, accumulate, and clear transcriptions

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure OpenAI API Key

Create a `.env.local` file in the root directory and add your OpenAI API key:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

You can get an API key from [OpenAI's platform](https://platform.openai.com/api-keys).

### 3. Install Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Usage

### 1. Start the Development Server

```bash
npm run dev
```

### 2. Open the Application

Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Grant Microphone Permissions

When you first click "Start Recording", your browser will ask for microphone permissions. Click "Allow" to enable recording.

### 4. Record and Transcribe

- Click "Start Recording" to begin capturing audio
- Speak clearly into your microphone
- Click "Stop Recording" when finished
- The app will process your audio using OpenAI Whisper
- Your transcribed text will appear in the transcription area

## Technical Details

### Audio Recording
- Uses the browser's `MediaRecorder` API
- Records in WebM format with Opus codec
- Automatically stops recording when the stop button is clicked

### Transcription Process
1. Audio is recorded as WebM/Opus
2. Sent to `/api/transcribe` endpoint
3. Processed by OpenAI's Whisper-1 model
4. Transcribed text is returned and displayed

### UI States
- **Inactive**: Ready to start recording (blue microphone icon)
- **Recording**: Currently capturing audio (red pulsing microphone icon)
- **Processing**: Sending audio to OpenAI for transcription

## Browser Compatibility

This app works best in modern browsers that support:
- MediaRecorder API
- getUserMedia API
- Modern JavaScript features

Recommended browsers:
- Chrome 60+
- Firefox 65+
- Safari 14+
- Edge 79+

## API Endpoints

### POST /api/transcribe

Accepts a FormData object with an audio file and returns the transcribed text.

**Request:**
- `audio`: Audio file (WebM format)

**Response:**
```json
{
  "text": "Your transcribed speech text here"
}
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |

## Dependencies

- **Next.js 14**: React framework for production
- **React 18**: UI library
- **OpenAI SDK**: For Whisper API integration
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type safety and better development experience

## Troubleshooting

### Microphone Access Issues
- Ensure your browser has microphone permissions
- Check that no other applications are using the microphone
- Try refreshing the page and granting permissions again

### Transcription Errors
- Verify your OpenAI API key is correct and has credits
- Check the browser console for detailed error messages
- Ensure you have a stable internet connection

### Audio Quality Issues
- Speak clearly and at a moderate pace
- Reduce background noise
- Ensure your microphone is working properly

## Development

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License. 