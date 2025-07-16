import React from 'react';
import '../Styles/AboutUs.css';
import member1 from '../assets/img/waruni.jpg';
import member2 from '../assets/img/prabhani.jpg';
import member3 from '../assets/img/udeesha.jpeg';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
        <p>
          We are final-year students from the <strong>University of Colombo – Faculty of Technology</strong>, 
          Department of ICT. This website is part of our Group 02 research project.
        </p>
      </div>

      <div className="team-section">
        <h2>Our Team</h2>
        <div className="member-cards">
          <div className="member-card">
            <img src={member1} alt="Waruni Sandareka" />
            <h3>Waruni Sandareka</h3>
            <p>Team Member – Developer</p>
          </div>
          <div className="member-card">
            <img src={member2} alt="Prabhani Vilochani" />
            <h3>Prabhani Vilochani</h3>
            <p>Team Member – UI/UX, Research & Documentation & QA</p>
          </div>
          <div className="member-card">
            <img src={member3} alt="Udeesha Dilshani" />
            <h3>Udeesha Dilshani</h3>
            <p>Team Member – UI/UX, Research & Documentation & QA</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
