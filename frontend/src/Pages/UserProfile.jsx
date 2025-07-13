import React from 'react';
import { FaUserGraduate, FaBook, FaTools, FaLightbulb, FaGlobe } from 'react-icons/fa'; 
import Sidebar from '../Components/Sidebar'; 
import "../Styles/Dashboard.css"; 
import profileImage from "../assets/img/profileimg.png"; 

function UserProfile() {
  // Static mock data
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
    <div className="dashboard-container">
      <Sidebar /> 
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '24px',
          maxWidth: '1030px',
          margin: 'auto',
          minHeight: '600px',
        }}
      >
        {/* User Profile Image */}
        <div style={{ marginBottom: '24px' }}>
          <img
            src={profileImage}
            alt="User Profile"
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Student Basic Information */}
        <div style={{ width: '100%', maxWidth: '800px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center' }}>
            <FaUserGraduate style={{ marginRight: '8px' }} /> Basic Information
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
            <div style={{ flex: 1, marginRight: '16px' }}>
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
        </div>

        {/* Field of Study */}
        <div style={{ width: '100%', maxWidth: '800px', marginTop: '24px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center' }}>
            <FaBook style={{ marginRight: '8px' }} /> Field of Study
          </h2>
          <p style={{ marginTop: '8px' }}>Computer Science</p> {/* Placeholder data */}
        </div>

        {/* Skills */}
        <div style={{ width: '100%', maxWidth: '800px', marginTop: '24px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center' }}>
            <FaTools style={{ marginRight: '8px' }} /> Skills
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
            <div style={{ flex: 1, marginRight: '16px' }}>
              <p><strong>Technical Skills:</strong> {userData.technicalSkills.join(', ')}</p>
            </div>
            <div style={{ flex: 1 }}>
              <p><strong>Soft Skills:</strong> {userData.softSkills.join(', ')}</p>
            </div>
          </div>
        </div>

        {/* Career Interests and Goals */}
        <div style={{ width: '100%', maxWidth: '800px', marginTop: '24px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center' }}>
            <FaLightbulb style={{ marginRight: '8px' }} /> Career Interests and Goals
          </h2>
          <p style={{ marginTop: '8px' }}>{userData.careerInterests}</p>
        </div>

        {/* Connected Platforms */}
        <div style={{ width: '100%', maxWidth: '800px', marginTop: '24px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center' }}>
            <FaGlobe style={{ marginRight: '8px' }} /> Connected Platforms
          </h2>
          <p style={{ marginTop: '8px' }}>{userData.connectedPlatforms.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;