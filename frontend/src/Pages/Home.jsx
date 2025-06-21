import React, { useState } from 'react';
import { Link } from "react-router-dom";

import img from "../assets/img/home2.png";
import ourservicebot from "../assets/img/ourservicesbot.png";
import skillimage from "../assets/img/skillimage.png";
import dashimage from "../assets/img/dashimage.png";
import contactIllustration from "../assets/img/contact.png";
import circle1 from "../assets/img/circle1.jpg";
import circle2 from "../assets/img/circle2.jpg";
import circle3 from "../assets/img/circle3.jpg";
import circle4 from "../assets/img/circle4.jpg";
import circle5 from "../assets/img/circle5.jpg";
import "../Styles/Home.css";
import "../Styles/ContactUs.css";

const Home = () => {
  const [activeModal, setActiveModal] = useState(null);

  const serviceDetails = {
    counselor:
      "Our AI-Powered Career Counsellor analyzes your interests, skills, and aspirations to recommend personalized career paths. It uses intelligent algorithms and industry data to help you understand available roles, required competencies, and growth opportunities.",
    dashboard:
      "The Dashboard gives you a clear view of your career trajectory. Track milestones, review accomplishments, and set actionable goals. Visualize your progress, spot trends, and adjust your learning path as needed. Stay motivated and organized as you build the future you deserve.",
    skill:
      "Our Skill Development Platform connects you with resources, courses, and exercises tailored to your needs. Learn at your own pace, build new competencies, and stay relevant in a competitive job market. It's more than learning — it's growth designed for your future success."
  };
  
  return (
    <div className="min-h-screen lg:min-h-[70vh] flex flex-col lg:flex-row items-center bg-purple-100 relative">
      <div className="text-section mt-24">
        <div className="oval-shape"></div>
        <div className="welcome-circle-container">
          <h2 className="welcome-text"><br /><br />Welcome!</h2>
          <div className="circle-container"><br /><br />
            <div className="circle"><img src={circle1} alt="Career 1" /></div>
            <div className="circle"><img src={circle2} alt="Career 2" /></div>
            <div className="circle"><img src={circle3} alt="Career 3" /></div>
            <div className="circle"><img src={circle4} alt="Career 4" /></div>
            <div className="circle"><img src={circle5} alt="Career 5" /></div>
          </div>
        </div>
        <h1 className="career-text text-5xl pt-4 mb-5 leading-relaxed font-bold">
          Career guidance, all <br /> in one place.
        </h1>
      </div>

      <div className="image-section">
        <img src={img} alt="Home Visual" className="big-image" />
      </div>

      <Link to="/explore">
        <button className="explore-button">Explore Now</button>
      </Link>

      <h1 id="services" className="Titleour">Our <span className="Titleservices">Services</span></h1>

      <div className="service-container">
        <div className="service-image">
          <img src={ourservicebot} alt="AI-Powered Career Counsellor" />
        </div>
        <div className="service-text">
          <h2 className="service-title">AI-Powered Career Counsellor</h2>
          <p className="service-description">
            AI-Powered Career Counselor – Access expert career advice and skill 
            development suggestions through our intuitive chatbot. Shape your future with personalized support.
          </p>
          <button className="read-more-btn" onClick={() => setActiveModal('counselor')}>
            Read more
          </button>
        </div>
      </div>

      <div className="dash-container">
        <div className="dash-text">
          <h2 className="dash-title">Personalized Career Progress Dashboard</h2>
          <p className="dash-description">
            Track your career milestones, set goals, and monitor your skill development with 
            a customized dashboard tailored to your professional growth. Stay on top of your 
            progress and plan your next steps effectively.
          </p>
          <button className="read-more-btn" onClick={() => setActiveModal('dashboard')}>
            Read more
          </button>
        </div>
        <div className="dash-image">
          <img src={dashimage} alt="Dashboard" />
        </div>
      </div>

      <div className="skill-container">
        <div className="skill-image">
          <img src={skillimage} alt="Skill Development Platform" />
        </div>
        <div className="skill-text">
          <h2 className="skill-title">Skill Development Platform</h2>
          <p className="skill-description">
            SVG Wave is a minimal svg wave generator with a lot of customization.
            It lets you generate and export PNGs and SVGs of beautiful waves.
          </p>
          <button className="read-more-btn" onClick={() => setActiveModal('skill')}>
            Read more
          </button>
        </div>
      </div>

      <h1 id="contact" className="Contacttitle">Contact <span className="Us">Us</span></h1>
      <div className="contact-container">
        <div className="contact-form">
          <input type="text" className="contact-input" placeholder="Your Name" />
          <input type="email" className="contact-input" placeholder="Your Email" />
          <input type="tel" className="contact-input" placeholder="Your Number" />
          <textarea className="contact-textarea" placeholder="Your Message"></textarea>
          <button className="contact-btn">Submit</button>
        </div>
        <div className="contact-image-container">
          <img src={contactIllustration} alt="Contact Us" className="contact-image" />
        </div>
      </div>

      {activeModal && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>
              {activeModal === 'counselor' && "AI-Powered Career Counsellor"}
              {activeModal === 'dashboard' && "Personalized Career Progress Dashboard"}
              {activeModal === 'skill' && "Skill Development Platform"}
            </h2>
            <p>{serviceDetails[activeModal]}</p>
            <button className="close-button" onClick={() => setActiveModal(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
