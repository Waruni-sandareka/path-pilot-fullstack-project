import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../Styles/Contact.css';

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupContent(null);
    document.body.classList.remove("contactpg-modal-open");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      full_name: formData.name,
      user_email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    emailjs.send(
      'service_0sd0ccu',
      'template_qxrjy8r',
      templateParams,
      '2vKpCTymdsuQdQRts'
    )
    .then(() => {
      setLoading(false);
      setPopupContent(
        <div>
          <h2>Success</h2>
          <p>Message sent successfully! Thank you for contacting us.</p>
          <button onClick={closePopup}>OK</button>
        </div>
      );
      setShowPopup(true);
      document.body.classList.add("contactpg-modal-open");
      setFormData({ name: '', email: '', subject: '', message: '' });
    })
    .catch((error) => {
      setLoading(false);
      setPopupContent(
        <div>
          <h2>Error</h2>
          <p>Failed to send message. Please try again later.</p>
          <button onClick={closePopup}>Close</button>
        </div>
      );
      setShowPopup(true);
      document.body.classList.add("contactpg-modal-open");
      console.error('EmailJS error:', error);
    });
  };

  const teamMembers = [
    "Waruni Sandareka",
    "Prabhani Vilochani", 
    "Udeesha Dilshani"
  ];

  return (
    <div className="contactpg-container">
      {showPopup && (
  <div className="contactpg-popup-overlay" style={{ zIndex: 10000 }}>
    <div className="contactpg-popup-box">
      <button className="contactpg-popup-close-btn" onClick={closePopup}>×</button>
      <div className="contactpg-popup-content-area">{popupContent}</div>
    </div>
  </div>
)}

      <div className="contactpg-inner-container">
        
        {/* Hero Section */}
        <div className="contactpg-hero-section">
          <div className="contactpg-hero-icon">
            <svg className="contactpg-icon-lg" viewBox="0 0 24 24" fill="none" stroke="white">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <h1 className="contactpg-hero-title">Contact Our Research Team</h1>
          <p className="contactpg-hero-subtitle">
            Get in touch with us for questions about our final year research project
          </p>
        </div>

        <div className="contactpg-content-grid">
          
          {/* Contact Information */}
          <div className="contactpg-info-section">
            
            {/* Project Info Card */}
            <div className="contactpg-card">
              <div className="contactpg-card-header">
                <h2 className="contactpg-card-title">
                  <svg className="contactpg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                  Project Information
                </h2>
              </div>
              <div className="contactpg-card-content">
                <div className="contactpg-info-item">
                  <div className="contactpg-info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <h3>Institution</h3>
                    <p>University of Colombo, Faculty of Technology</p>
                    <p>Department of Information & Communication Technology</p>
                  </div>
                </div>

                <div className="contactpg-info-item">
                  <div className="contactpg-info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                    </svg>
                  </div>
                  <div>
                    <h3>Project Details</h3>
                    <p>Final Year Research - Group 02</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div className="contactpg-card">
              <div className="contactpg-card-header">
                <h2 className="contactpg-card-title">
                  <svg className="contactpg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  Research Team
                </h2>
              </div>
              <div className="contactpg-card-content">
                <div className="contactpg-team-list">
                  {teamMembers.map((member) => (
                    <div key={member} className="contactpg-team-member">
                      <div className="contactpg-team-avatar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                          <polyline points="22,6 12,13 2,6"/>
                        </svg>
                      </div>
                      <div>
                        <h3>{member}</h3>
                        <p>Research Team Member</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contactpg-form-section">
            <div className="contactpg-form-card">
              <div className="contactpg-form-header">
                <h3>Send us a Message</h3>
              </div>
              <form ref={formRef} onSubmit={handleSubmit} className="contactpg-form">
                <div className="contactpg-form-row">
                  <div className="contactpg-form-field">
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="contactpg-form-field">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="contactpg-form-field">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What is this about?"
                    required
                  />
                </div>

                <div className="contactpg-form-field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your inquiry..."
                    required
                  />
                </div>

                <button type="submit" className="contactpg-submit-btn" disabled={loading}>
                  {loading ? "Sending..." : (
                    <>
                      <svg className="contactpg-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
