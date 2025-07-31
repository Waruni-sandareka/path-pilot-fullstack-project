import React from 'react';
import '../Styles/AboutUs.css';

const About = () => {
  const teamMembers = [
    "Waruni Sandareka",
    "Prabhani Vilochani",
    "Udeesha Dilshani"
  ];

  return (
    <div className="about-container">
      {/* Main Content */}
      <div className="about-inner-container">
        {/* Hero Section */}
        <div className="about-hero-section">
          <div className="about-hero-icon">
            <svg className="about-icon-lg" viewBox="0 0 24 24" fill="none" stroke="white">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <h1 className="about-hero-title">About Our Research</h1>
          <p className="about-hero-subtitle">
            Final year research project from the University of Colombo, Faculty of Technology
          </p>
        </div>

        {/* Project Information Card */}
        <div className="about-card">
          <div className="about-card-header">
            <h2 className="about-card-title">
              <svg className="about-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              Project Information
            </h2>
          </div>
          <div className="about-card-content">
            <div className="about-info-grid">
  <div className="about-info-item">
    <h3>Institution</h3>
    <p>University of Colombo, Faculty of Technology</p>
  </div>
  
  <div className="about-info-item">
    <h3>Department</h3>
    <p>Department of Information & Communication Technology</p>
  </div>
  <div className="about-info-item">
    <h3>Project Type</h3>
    <p>Final Year Research</p>
  </div>
  <div className="about-info-item">
    <h3>Group</h3>
    <p>Group 02</p>
  </div>
</div>

           
          </div>
        </div>

        {/* Team Section Card */}
        <div className="about-card">
          <div className="about-card-header">
            <h2 className="about-card-title">
              <svg className="about-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Research Team
            </h2>
          </div>
          <div className="about-card-content">
            <div className="about-team-grid">
              {teamMembers.map((member) => (
                <div key={member} className="about-team-card">
                  <div className="about-team-avatar">
                    <svg className="about-icon-xl" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <h3 className="about-team-name">{member}</h3>
                  <p className="about-team-role">Research Team Member</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
