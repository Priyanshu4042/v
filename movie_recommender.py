import requests
import json
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Global variable to store conversation history
conversation_history = []

def get_gemini_response(prompt_text):
    """
    Sends a prompt to the Gemini API and returns the response.
    """
    # IMPORTANT: Replace with your actual Gemini API Key
    api_key = "AIzaSyC_EuRoyilmZakNX60DS0x3uORa2AY6LdU"
    
    api_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"
    
    chat_history = [
        {"role": "user", "parts": [{"text": prompt_text}]}
    ]
    
    payload = {
        "contents": chat_history
    }
    
    headers = {
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(api_url, headers=headers, data=json.dumps(payload))
        response.raise_for_status()
        
        result = response.json()
        
        if result.get("candidates") and len(result["candidates"]) > 0 and \
           result["candidates"][0].get("content") and \
           result["candidates"][0]["content"].get("parts") and \
           len(result["candidates"][0]["content"]["parts"]) > 0:
            return result["candidates"][0]["content"]["parts"][0]["text"]
        else:
            return "No content received from Gemini."
            
    except requests.exceptions.RequestException as e:
        return f"An error occurred during the API request: {e}"
    except json.JSONDecodeError:
        return "Failed to decode JSON response from API."
    except Exception as e:
        return f"An unexpected error occurred: {e}"

def build_prompt(user_input, mood=3):
    return (
        f"The user input is: \"{user_input}\".\n"
        "If this is a movie plot or description, guess the movie title and return only the name.\n"
        "If the input is about mood or sentiment, suggest the most relatable movie for their mood.\n"
        f"The user's mood is {mood} out of 5 (1 = very sad, 5 = very happy)."
        "\nRespond with only the movie name, no extra explanation."
    )

def get_ten_movie_recommendations():
    """
    Get 10 movie recommendations based on conversation history.
    """
    if not conversation_history:
        return "No conversation history available for recommendations."
    
    # Build the conversation history string
    conversation_text = " ".join(conversation_history)
    
    prompt = (
        f"Based on the list of prompts provided: {conversation_text}\n"
        "Provide me 10 movies that are matching this plot, genre as a list of names separated by commas "
        "and strictly no other information or text."
    )
    
    return get_gemini_response(prompt)

@app.route('/recommend', methods=['POST'])
def recommend_movie():
    try:
        data = request.get_json()
        user_input = data.get('text', '')
        
        if not user_input:
            return jsonify({'error': 'No text provided'}), 400
        
        # Hardcode mood as 3
        mood = 3
        
        # Add to conversation history
        conversation_history.append(user_input)
        
        # Build prompt and get single recommendation
        prompt = build_prompt(user_input, mood)
        single_recommendation = get_gemini_response(prompt)
        
        # Get 10 movie recommendations based on conversation history
        ten_recommendations = get_ten_movie_recommendations()
        
        return jsonify({
            'single_recommendation': single_recommendation,
            'ten_recommendations': ten_recommendations,
            'input': user_input,
            'mood': mood,
            'conversation_count': len(conversation_history)
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/clear-history', methods=['POST'])
def clear_history():
    """Clear conversation history."""
    global conversation_history
    conversation_history = []
    return jsonify({'message': 'Conversation history cleared'})

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True, port=5000) 