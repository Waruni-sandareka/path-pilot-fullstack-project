import React from 'react';
import { FaUserGraduate, FaBook, FaTools, FaLightbulb, FaGlobe } from 'react-icons/fa'; 
import Sidebar from '../Components/Sidebar'; 
import "../Styles/Dashboard.css"; 
import profileImage from "../assets/img/profileimg.png"; 

function UserProfile() {
  const userData = {
    username: 'johndoe',
    fullName: 'John Doe',
    educationLevel: 'Undergraduate',
    institution: 'Example University',
    location: 'New York, USA',
    graduationYear: '2025',
    technicalSkills: ['Python', 'JavaScript', 'React'],
    softSkills: ['Communication', 'Teamwork', 'Problem Solving'],
    careerInterests: 'Software Development, AI Research',
    connectedPlatforms: ['LinkedIn', 'GitHub', 'Twitter'],
  };

  return (
    <div className="dashboard-container" style={{ display: 'flex' }}>
      <Sidebar />
      <div
        style={{
          flexGrow: 1,
          padding: '32px',
          backgroundColor: '#f5f5f5',
          minHeight: '120vh',
        }}
      >
        <div
          style={{
            backgroundColor: '#D0ADC4',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            maxWidth: '1000px',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src={profileImage}
            alt="User Profile"
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: '20px',
              border: '4px solid #744B93',
            }}
          />

          {/* Basic Info */}
          <Section title="Basic Information" icon={<FaUserGraduate />}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
              <div style={{ flex: 1 }}>
                <p><strong>Full Name:</strong> {userData.fullName}</p>
                <p><strong>Username:</strong> {userData.username}</p>
              </div>
              <div style={{ flex: 1 }}>
                <p><strong>Education Level:</strong> {userData.educationLevel}</p>
                <p><strong>Institution:</strong> {userData.institution}</p>
                <p><strong>Location:</strong> {userData.location}</p>
                <p><strong>Graduation Year:</strong> {userData.graduationYear}</p>
              </div>
            </div>
          </Section>

          {/* Field of Study */}
          <Section title="Field of Study" icon={<FaBook />}>
            <p>Computer Science</p>
          </Section>

          {/* Skills */}
          <Section title="Skills" icon={<FaTools />}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
              <div style={{ flex: 1 }}>
                <p><strong>Technical Skills:</strong> {userData.technicalSkills.join(', ')}</p>
              </div>
              <div style={{ flex: 1 }}>
                <p><strong>Soft Skills:</strong> {userData.softSkills.join(', ')}</p>
              </div>
            </div>
          </Section>

          {/* Career Interests */}
          <Section title="Career Interests and Goals" icon={<FaLightbulb />}>
            <p>{userData.careerInterests}</p>
          </Section>

          {/* Connected Platforms */}
          <Section title="Connected Platforms" icon={<FaGlobe />}>
            <p>{userData.connectedPlatforms.join(', ')}</p>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div style={{ width: '100%', marginBottom: '32px' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', color: '#4b2f61' }}>
        {icon}
        <span style={{ marginLeft: '8px' }}>{title}</span>
      </h2>
      <div>{children}</div>
    </div>
  );
}

export default UserProfile;
