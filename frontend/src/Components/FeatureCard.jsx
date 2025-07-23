import React from 'react';
import '../Styles/ResumeBuilder.css';

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <div className="feature-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="feature-content">
        <div className="feature-icon-container">
          <Icon className="feature-icon" />
        </div>
        <div className="feature-text">
          <h3 className="feature-title">{title}</h3>
          <p className="feature-description">{description}</p>
        </div>
      </div>
      <div className="feature-overlay" />
    </div>
  );
};

export default FeatureCard;