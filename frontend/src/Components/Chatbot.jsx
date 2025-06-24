import React, { useState, useEffect, useRef } from 'react';
import '../Styles/Chatbot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Welcome! I'm here to help you explore IT career paths, skills, certifications, and more. Ask me about job roles, tools, or interview tips!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chatbot/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      if (response.ok) {
        const botReply = data.reply || 'Sorry, I had trouble understanding that. Try asking about IT careers or skills!';
        setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
      } else {
        const errorMessage = data.error || 'Something went wrong. Please try again.';
        setMessages((prev) => [...prev, { sender: 'bot', text: `Error: ${errorMessage}` }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Network error. Please check your connection and try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div className={`chat-message ${msg.sender}`} key={index}>
              {msg.sender === 'bot' && <span className="emoji">🤖</span>}
              <div className={`message-card ${msg.sender === 'user' ? 'user-card' : 'bot-card'}`}>
                <div className="message-content">{msg.text}</div>
              </div>
              {msg.sender === 'user' && <span className="emoji">🙍‍♂️</span>}
            </div>
          ))}
          {isLoading && (
            <div className="chat-message bot">
              <span className="emoji">🤖</span>
              <div className="message-card bot-card">
                <div className="message-content">Thinking...</div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input-section">
          <label className="chat-label">Chat With Your IT Career Counselor</label>
          <div className="chat-input-wrapper">
            <input
              placeholder="Ask about IT careers, skills, or certifications..."
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
              disabled={isLoading}
            />
            <button
              className="send-button"
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;