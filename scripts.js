// DOM elements
const chatbotBubble = document.getElementById('chatbot-bubble');
const chatPanel = document.getElementById('chat-panel');
const closeChat = document.getElementById('close-chat');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatContent = document.getElementById('chat-content');

// Show chat panel on bubble click
chatbotBubble.addEventListener('click', () => {
    chatPanel.style.display = 'flex';
});

// Close chat panel
closeChat.addEventListener('click', () => {
    chatPanel.style.display = 'none';
});

// Send message to Groq API when clicking send button
sendBtn.addEventListener('click', () => {
    const userMessage = userInput.value;
    if (userMessage) {
        addMessageToChat('user', userMessage); // Add user message first
        userInput.value = ''; // Clear input field
        
        // Introduce a short delay before sending the bot response to simulate actual response time
        setTimeout(() => {
            sendMessageToGroq(userMessage); // Send the message to Groq after showing the user message
        }, 200);
    }
});

// Add message to the chat display
function addMessageToChat(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.className = sender === 'user' ? 'user-message' : 'bot-message';
    messageElement.innerText = message;
    chatContent.appendChild(messageElement);
    chatContent.scrollTop = chatContent.scrollHeight; // Auto-scroll to bottom
}

// Send the user's message to the Groq-powered chatbot using Python API
async function sendMessageToGroq(message) {
    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        if (!response.ok) {
            throw new Error('Failed to communicate with the chatbot.');
        }

        const data = await response.json();
        addMessageToChat('bot', data.reply); // Add bot reply after the user message
    } catch (error) {
        console.error('Error:', error);
        addMessageToChat('bot', 'Sorry, something went wrong. Please try again later.');
    }
}
