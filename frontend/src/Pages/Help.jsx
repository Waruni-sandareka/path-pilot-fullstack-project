import React, { useState } from 'react';
import '../Styles/Help.css';
import { FiMessageCircle, FiMail, FiPhone, FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';

const HelpPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'How do I reset my password?',
      answer: 'To reset your password, go to the login page and click on "Forgot Password" to receive a reset link.'
    },
    {
      question: 'Where can I view my career recommendations?',
      answer: 'You can view your career recommendations on your dashboard after completing your profile and CV upload.'
    },
    {
      question: 'How does the career prediction work?',
      answer: 'Our platform uses AI and NLP to analyze your profile and CV data to match you with suitable career paths.'
    }
  ];

  const openPhoneDialer = () => {
    window.location.href = 'tel:07723212322';
  };

  return (
    <div className="help-container">
      <div className="hero-section">
        <h1><FiMessageCircle className="hero-icon" /> Help Center</h1>
        <p>Find answers to common questions, get support, and learn how to make the most of our career analysis platform.</p>
      </div><br />
      <br />

      <div className="support-options">
        <div className="option-card">
          <FiMessageCircle className="option-icon" />
          <h3>Live Chat</h3>
          <p>Get instant help from our support team</p>
          <button className="option-btn" onClick={() => setShowChatModal(true)}>Ask Question</button>
        </div>
        <div className="option-card">
          <FiMail className="option-icon" />
          <h3>Email Support</h3>
          <p>Send us an email and we'll get back to you</p>
          <button className="option-btn" onClick={() => setShowEmailModal(true)}>Send Email</button>
        </div>
        <div className="option-card">
          <FiPhone className="option-icon" />
          <h3>Phone Support</h3>
          <p>Call us for immediate assistance</p>
          <button className="option-btn" onClick={openPhoneDialer}>Call Now</button>
        </div>
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <p className="faq-intro">Can’t find what you’re looking for? Browse our most commonly asked questions below.</p>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div className="faq-item" key={index} onClick={() => toggleFAQ(index)}>
              <div className="faq-question">
                {faq.question}
                {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              {activeIndex === index && <div className="faq-answer">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="help-forum">
        <h2>Still need help?</h2>
        <p>Ask a question and we’ll get back to you.</p>
        <button className="submit-btn" onClick={() => setShowChatModal(true)}>Submit a Question</button>
      </div>

      {/* Chat Modal */}
      {showChatModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="modal-close" onClick={() => setShowChatModal(false)}><FiX /></button>
            <h3>Ask a Question</h3>
            <textarea placeholder="Type your question here..." className="modal-textarea" />
            <button className="modal-submit">Send</button>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="modal-close" onClick={() => setShowEmailModal(false)}><FiX /></button>
            <h3>Email Us</h3>
            <textarea placeholder="Type your message here..." className="modal-textarea" />
            <button className="modal-submit">Send Email</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpPage;
