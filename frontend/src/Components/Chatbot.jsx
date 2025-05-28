import React from 'react';
import '../Styles/Chatbot.css';

const ChatBot = () => {
  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-messages">
          <div className="chat-message bot">
            <span className="emoji">🤖</span>
            <div className="message-card">
              <div className="message-content">
                Welcome! I'm here to help you explore career paths and reach your goals. How can I assist you today?
              </div>
            </div>
          </div>
          <div className="chat-message user">
            <div className="message-card user-card">
              <div className="message-content">
                Can I know about current job market and most demanded fields?
              </div>
            </div>
            <span className="emoji">🙍‍♂️</span>
          </div>
        </div>
        <div className="chat-input-section">
          <label className="chat-label">Chat With your Career Counsellor</label>
          <div className="chat-input-wrapper">
            <input placeholder="Type your message..." className="chat-input" />
            <button className="send-button">➤</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
