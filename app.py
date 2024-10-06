from flask import Flask, render_template, send_from_directory, request, jsonify
import os
from groq import Groq
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Groq Client Setup
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@app.route('/')
def index():
    return render_template('bot.html')

# Serve CSS file
@app.route('/styles.css')
def styles():
    return send_from_directory('.', 'styles.css')

# Serve JavaScript file
@app.route('/scripts.js')
def scripts():
    return send_from_directory('.', 'scripts.js')

# Chat endpoint to handle chat requests
@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')

    # Interact with Groq-powered Llama model
    chat_completion = client.chat.completions.create(
        messages=[{"role": "user", "content": user_message}],
        model="llama3-8b-8192"
    )
    
    bot_reply = chat_completion.choices[0].message.content
    return jsonify({'reply': bot_reply})

if __name__ == '__main__':
    app.run(debug=True)
