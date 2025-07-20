import React from 'react';
import { FaUserGraduate, FaBook, FaTools, FaLightbulb, FaGlobe } from 'react-icons/fa';
import Sidebar from '../Components/Sidebar';
import "../Styles/Dashboard.css";
import profileImage from "../assets/img/profileimg.png";
import "../Styles/Userprofile.css";

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
    <div className="dashboard-container">
      <Sidebar />
      <div className="user-profile-wrapper">
        <div className="profile-card">
          <div className="profile-image-wrapper">
 <div className="profile-header-bar">
  <img
    src={profileImage}
    alt="User Profile"
    className="profile-image"
  />
  <h1 className="profile-name">{userData.fullName}</h1>
  <p className="profile-username">@{userData.username}</p>
</div>

</div>

          <div className="profile-section">
            <Section title="Basic Information" icon={<FaUserGraduate />}>
              <div className="info-columns">
                <div>
                  <p><strong>Education Level:</strong> {userData.educationLevel}</p>
                  <p><strong>Institution:</strong> {userData.institution}</p>
                  <p><strong>Location:</strong> {userData.location}</p>
                  <p><strong>Graduation Year:</strong> {userData.graduationYear}</p>
                </div>
              </div>
            </Section>

            <Section title="Field of Study" icon={<FaBook />}>
              <p>Computer Science</p>
            </Section>

            <Section title="Skills" icon={<FaTools />}>
              <div className="info-columns">
                <div>
                  <p><strong>Technical Skills:</strong> {userData.technicalSkills.join(', ')}</p>
                </div>
                <div>
                  <p><strong>Soft Skills:</strong> {userData.softSkills.join(', ')}</p>
                </div>
              </div>
            </Section>

            <Section title="Career Interests and Goals" icon={<FaLightbulb />}>
              <p>{userData.careerInterests}</p>
            </Section>

            <Section title="Connected Platforms" icon={<FaGlobe />}>
              <p>{userData.connectedPlatforms.join(', ')}</p>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div className="profile-section-item">
      <h2 className="profile-section-title">
        {icon}
        <span>{title}</span>
      </h2>
      <div>{children}</div>
    </div>
  );
}

export default UserProfile;
