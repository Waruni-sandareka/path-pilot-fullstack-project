import React, { useState } from 'react';
import '../Styles/Chatbot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Welcome! I'm here to help you explore career paths and reach your goals. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('http://localhost:8000/api/chatbot/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botReply = data.reply || 'Sorry, I had trouble understanding that.';
      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div className={`chat-message ${msg.sender}`} key={index}>
              {msg.sender === 'bot' && <span className="emoji">🤖</span>}
              <div className={`message-card ${msg.sender === 'user' ? 'user-card' : ''}`}>
                <div className="message-content">{msg.text}</div>
              </div>
              {msg.sender === 'user' && <span className="emoji">🙍‍♂️</span>}
            </div>
          ))}
        </div>
        <div className="chat-input-section">
          <label className="chat-label">Chat With your Career Counsellor</label>
          <div className="chat-input-wrapper">
            <input
              placeholder="Type your message..."
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className="send-button" onClick={sendMessage}>➤</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
