import React, { useState } from "react";
import { LucideIcon } from "lucide-react";

const ServiceCard = ({ icon: Icon, title, description, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isIconHovered, setIsIconHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const cardStyle = {
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    background: 'linear-gradient(to bottom right, #ffffff, #f3e8f0)',
    border: '1px solid #E9D8FD',
    borderRadius: '16px',
    height: '100%',
    transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
    boxShadow: isHovered 
      ? '0 8px 30px -8px rgba(90, 52, 117, 0.2)' 
      : '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  const contentStyle = {
    padding: '32px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '20px',
    marginBottom: '20px'
  };

  const iconContainerStyle = {
    padding: '14px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg,rgb(160, 93, 153) 0%,rgb(198, 187, 211) 100%)',
    color: '#ffffff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    transform: isIconHovered ? 'scale(1.15)' : 'scale(1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const titleStyle = {
    fontWeight: '600',
    fontSize: '20px',
    color: isHovered ? '#5a3475' : '#261631',
    marginBottom: '10px',
    transition: 'color 0.3s ease'
  };

  const descriptionStyle = {
    color: '#333333',
    fontSize: '16px',
    lineHeight: '1.6'
  };

  const buttonContainerStyle = {
    marginTop: 'auto'
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    border: isButtonHovered ? '1px solid #D0ADC4' : '1px solid #f1f1f1',
    borderRadius: '10px',
    background: isButtonHovered 
      ? 'linear-gradient(135deg, #D0ADC4 0%, #E9D8FD 100%)'
      : '#fdfdf2',
    color: isButtonHovered ? '#ffffff' : '#261631',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '16px',
    fontWeight: '500'
  };

  return (
    <div 
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={contentStyle}>
        <div style={headerStyle}>
          <div 
            style={iconContainerStyle}
            onMouseEnter={() => setIsIconHovered(true)}
            onMouseLeave={() => setIsIconHovered(false)}
          >
            <Icon size={28} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={titleStyle}>
              {title}
            </h3>
            <p style={descriptionStyle}>
              {description}
            </p>
          </div>
        </div>
        <div style={buttonContainerStyle}>
          <button 
            onClick={onClick}
            style={buttonStyle}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;