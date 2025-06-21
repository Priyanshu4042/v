# Speech to Text App

A Next.js application that uses the browser's Web Speech API to transcribe speech into text in real-time.

## Features

- **Real-time Speech Recording**: Click to start/stop recording your voice
- **Web Speech API Integration**: Real-time speech-to-text transcription using your browser
- **Modern UI**: Clean, responsive interface with visual feedback
- **Live Status Updates**: Visual indicators for recording states
- **Transcription Management**: View, accumulate, and clear transcriptions

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Tailwind CSS

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
- Your transcribed text will appear in real-time as you speak
- Click "Stop Recording" when finished

## Technical Details

### Speech Recognition
- Uses the browser's Web Speech API (`webkitSpeechRecognition`)
- Real-time transcription as you speak
- Automatically handles different languages and accents

### Transcription Process
1. User clicks "Start Recording"
2. Browser's speech recognition is activated
3. Speech is transcribed in real-time
4. Transcribed text is displayed immediately

### UI States
- **Inactive**: Ready to start recording (blue microphone icon)
- **Recording**: Currently capturing audio (red pulsing microphone icon)

## Browser Compatibility

This app works best in modern browsers that support:
- Web Speech API (`webkitSpeechRecognition`)
- Modern JavaScript features

Recommended browsers:
- Chrome 25+
- Safari 14+
- Edge 79+

Note: Firefox does not support the Web Speech API, so this app works best in Chrome and Safari.

## Dependencies

- **Next.js 14**: React framework for production
- **React 18**: UI library
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type safety and better development experience

## Troubleshooting

### Microphone Access Issues
- Ensure your browser has microphone permissions
- Check that no other applications are using the microphone
- Try refreshing the page and granting permissions again

### Speech Recognition Issues
- Speak clearly and at a moderate pace
- Reduce background noise
- Ensure your microphone is working properly
- Try using Chrome or Safari for best compatibility

### Browser Compatibility
- The Web Speech API is not supported in Firefox
- Use Chrome or Safari for the best experience
- Ensure you're using a modern browser version

## Development

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License. 