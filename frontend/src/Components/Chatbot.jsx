import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import '../Styles/Chatbot.css';
import Sidebar from '../Components/Sidebar';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Welcome! I'm here to help you explore IT career paths, skills, certifications, and more. Ask me about job roles, tools, or interview tips!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatMessagesRef = useRef(null);
  const lastMessageCountRef = useRef(messages.length);

  // Scroll to the bottom only when new messages are added or user is near the bottom
  const scrollToBottom = (force = false) => {
    if (!chatMessagesRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = chatMessagesRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

    if (force || isNearBottom) {
      setTimeout(() => {
        if (chatMessagesRef.current) {
          chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
      }, 0);
    }
  };

  useEffect(() => {
    if (messages.length > lastMessageCountRef.current) {
      scrollToBottom(true); // Force scroll for new messages
    }
    lastMessageCountRef.current = messages.length;
  }, [messages]);

  useEffect(() => {
    if (isLoading) {
      scrollToBottom(true); // Scroll during loading to show "Thinking..."
    }
  }, [isLoading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chatbot_response/', {
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
      <Sidebar />
      <div className="chat-box">
        <div className="chat-messages" ref={chatMessagesRef}>
          {messages.map((msg, index) => (
            <div className={`chat-message ${msg.sender}`} key={index}>
              {msg.sender === 'bot' && <span className="emoji">🤖</span>}
              <div className={`message-card ${msg.sender === 'user' ? 'user-card' : ''}`}>
                <div className="message-content">
                  {msg.sender === 'bot' ? (
                    <ReactMarkdown
                      components={{
                        h3: ({ node, ...props }) => <h3 className="section-title" {...props} />,
                        ul: ({ node, ...props }) => <ul className="bullet-list" {...props} />,
                        li: ({ node, ...props }) => <li className="bullet-item" {...props} />,
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
              {msg.sender === 'user' && <span className="emoji">🙍‍♂️</span>}
            </div>
          ))}
          {isLoading && (
            <div className="chat-message bot">
              <span className="emoji">🤖</span>
              <div className="message-card">
                <div className="message-content">Thinking...</div>
              </div>
            </div>
          )}
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