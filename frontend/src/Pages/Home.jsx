import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

import img from "../assets/img/home2.png";
import ourservicebot from "../assets/img/ourservicesbot.png";
import skillimage from "../assets/img/skillimage.png";
import dashimage from "../assets/img/dashimage.png";
import predictor from "../assets/img/predictor.png"
import contactIllustration from "../assets/img/contact.png";
import circle1 from "../assets/img/circle1.jpg";
import circle2 from "../assets/img/circle2.jpg";
import circle3 from "../assets/img/circle3.jpg";
import circle4 from "../assets/img/circle4.jpg";
import circle5 from "../assets/img/circle5.jpg";
import "../Styles/Home.css";
import "../Styles/ContactUs.css";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");

  const handleReadMore = (content) => {
    setPopupContent(content);
    setShowPopup(true);
    document.body.classList.add("modal-open");   
  };

  const closePopup = () => {
    setShowPopup(false);
    document.body.classList.remove("modal-open");
  };

  return (
    <div className="min-h-screen lg:min-h-[70vh] flex flex-col lg:flex-row items-center bg-purple-100 relative">
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="popup-close" onClick={closePopup}>×</button>
            <div className="popup-content">{popupContent}</div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <Navbar />



      {/* Content Section */}
     <div className="text-section relative z-10 mt-0">
<div style={{ position: "relative", width: "100%" }}>
        <div className="oval-shape"></div>

        <div className="welcome-circle-container">
          
          <h2 className="welcome-text">
            
            Welcome!
          </h2>

          <div className="circle-container">
            <br />
            <br />
            <div className="circle"><img src={circle1} alt="Career 1" /></div>
            <div className="circle"><img src={circle2} alt="Career 2" /></div>
            <div className="circle"><img src={circle3} alt="Career 3" /></div>
            <div className="circle"><img src={circle4} alt="Career 4" /></div>
            <div className="circle"><img src={circle5} alt="Career 5" /></div>
          </div>
        </div>
        </div>


        <h1 className="career-text text-5xl pt-4 mb-5 leading-relaxed font-bold">
          Career guidance, all <br /> in one place.
        </h1>
      </div>


      <div className="image-section">
        <img src={img} alt="Home Visual" className="big-image" />
      </div>

      <Link to="/register">
        <button className="explore-button">Sign Up</button>
      </Link>


      <h1 className="Titleour">
        Our <span className="Titleservices">Services</span>
      </h1>

      {/* AI-Powered Career Counsellor */}
      <div className="service-container">
        <div className="service-image">
          <img src={ourservicebot} alt="AI-Powered Career Counsellor" />
        </div>
        <div className="service-text">
          <h2 className="service-title">AI-Powered Career Counsellor</h2>
          <p className="career-description">
            AI-Powered Career Counselor – Access expert career advice and skill 
            development suggestions through our intuitive chatbot. Shape your future with personalized support.
          </p>
          <button
  className="read-more-btn"
  onClick={() =>
    handleReadMore(
      <div>
        <h2>AI-Powered Career Counsellor</h2>
        <p>
          The AI-Powered Career Counsellor is an intelligent virtual assistant designed to help Gen Z
          students navigate their career journey. Using machine learning and natural language processing,
          it provides personalized guidance based on a student’s interests, academic background, and strengths.
        </p>
        <h4>Key Use Cases:</h4>
        <ul>
          <li>Recommends career paths and in-demand job roles.</li>
          <li>Suggests learning resources, certifications, and courses to build required skills.</li>
          <li>Provides college or university suggestions aligned with goals.</li>
          <li>Offers interview preparation and resume feedback.</li>
          <li>Gives real-time updates on industry trends.</li>
        </ul>
        <h4>Future Roadmap:</h4>
        <ul>
          <li>Integration with LinkedIn and other job platforms for real-time opportunities.</li>
          <li>Deeper personality assessments using psychometric AI models.</li>
          <li>Voice-based interaction support for accessibility.</li>
          <li>AI-driven mentorship matchmaking with real professionals.</li>
        </ul>
        <p>
          This smart counsellor ensures that every student gets the guidance they need to plan confidently
          for their future.
        </p>
      </div>
    )
  }
>
  Read more
</button>

        </div>
      </div>

      {/* Dashboard Section */}
      <div className="dash-container">
        <div className="dash-text">
          <h2 className="dash-title">Real-Time Career Trends</h2>
<p className="dash-description">
  Stay ahead of the curve with live updates on which careers are trending. 
  Our platform uses AI-driven analytics to show what job roles are in demand, 
  making it easier for students and professionals to align their skills with 
  real-world opportunities.
</p>

<button
  className="read-more-btn"
  onClick={() =>
    handleReadMore(
      <div>
        <h2>Real-Time Career Trends</h2>
        <p>
          The Real-Time Career Trends feature transforms raw search and market 
          data into actionable insights, helping users understand which careers 
          are gaining momentum and which ones are steady or declining.
        </p>

        <h4>Key Insights Provided:</h4>
        <ul>
          <li>
            <strong>📊 Top Career Search Volume:</strong> A bar chart ranking 
            the most-searched careers like <em>AI Engineer</em>, 
            <em>Data Scientist</em>, and <em>UX Designer</em>, providing a clear 
            snapshot of interest levels.
          </li>
          <li>
            <strong>🎯 Career Trend Distribution:</strong> A donut chart showing 
            how user interest is distributed across different professions, 
            helping students spot emerging fields.
          </li>
          <li>
            <strong>📈 Career Analytics Summary:</strong> A quick-view panel with 
            role descriptions, search stats, and icons for easy understanding.
          </li>
          <li>
            <strong>📋 Summary Table:</strong> A structured list of trending 
            careers, search volume, and descriptions, perfect for quick reference.
          </li>
        </ul>

        <h4>How It Helps Users:</h4>
        <ul>
          <li>🎓 Guides students toward in-demand skills and career paths.</li>
          <li>📌 Supports educators and mentors with live market insights.</li>
          <li>🚀 Enables job seekers to target growing industries for better opportunities.</li>
        </ul>

        <p>
          By combining graphs, charts, and AI analysis, this feature keeps career 
          planning relevant and data-driven — empowering users to make informed 
          decisions based on real-time trends.
        </p>
      </div>
    )
  }
>
  Read more
</button>

        </div>
        <div className="dash-image">
          <img src={dashimage} alt="Dashboard" />
        </div>
      </div>

      {/* Skill Development Section */}
      <div className="skill-container">
        <div className="skill-image">
          <img src={skillimage} alt="Skill Development Platform" />
        </div>
        <div className="skill-text">
          <h2 className="skill-title">Resume Builder</h2>
<p className="resume-description">
  Our Resume Builder automatically generates a professional resume using the data students have already entered through the student forum. It streamlines the process by organizing their academic background, skills, experiences, and achievements into a clean, ready-to-use format.
</p>
<button
  className="read-more-btn"
  onClick={() =>
    handleReadMore(
      <div>
        <h2>Resume Builder</h2>
        <p>
          The Resume Builder simplifies the resume creation process by leveraging existing student data collected via the student forum. It compiles this information into a polished resume format, saving time and ensuring consistency.
        </p>
        <h4>Key Features:</h4>
        <ul>
          <li><strong>Automatic Data Integration:</strong> Pulls information from student profiles and forum submissions to populate the resume.</li>
          <li><strong>Organized Sections:</strong> Structures the resume into clear sections such as Education, Skills, Experience, and Projects.</li>
          <li><strong>Professional Formatting:</strong> Applies a clean, modern design that is suitable for job applications and academic purposes.</li>
          <li><strong>Easy Export:</strong> Allows students to download their resume in common formats like PDF for immediate use.</li>
        </ul>
        <p>
          By using data already entered by students, the Resume Builder ensures a fast, efficient, and accurate resume creation experience.
        </p>
      </div>
    )
  }
>
  Read More
</button>

        </div>
      </div>

{/* Dashboard Section */}
      <div className="dash-container">
        <div className="dash-text">
          <h2 className="dash-title">Career Predictor</h2>
<p className="career-description">
  Our Career Predictor analyzes a student's uploaded CV to provide an exact career match based on their skills, experience, and achievements. It helps students understand which career paths best align with their profile.
</p>
<button
  className="read-more-btn"
  onClick={() =>
    handleReadMore(
      <div>
        <h2>Career Predictor</h2>
        <p>
          The Career Predictor uses AI to examine the CV students upload, scanning through their education, skills, work history, and accomplishments to identify the most suitable career matches. 
        </p>
        <h4>Key Features:</h4>
        <ul>
          <li><strong>CV Analysis:</strong> Reviews the uploaded resume to assess skills, qualifications, and experience levels.</li>
          <li><strong>Exact Career Match:</strong> Suggests the most fitting career paths that align with the student’s profile.</li>
          <li><strong>Instant Feedback:</strong> Delivers results immediately after the CV is uploaded.</li>
        </ul>
        <p>
          By simply uploading their CV, students gain clarity on where their current qualifications can lead them, empowering smarter career decisions.
        </p>
      </div>
    )
  }
>
  Read more
</button>

        </div>
        <div className="predictor-image">
          <img src={predictor} alt="Predictor" />
        </div>
      </div>
      

      {/* Contact Section */}
      <h1 className="Contacttitle">
        Contact <span className="Us">Us</span>
      </h1>
      <div id="contact" className="home-contact-section">
        <div className="form-wrapper">
          <form className="home-contact-form">
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <input type="text" placeholder="Your Number" />
            <textarea placeholder="Your Message" rows="4" />
            <button type="submit">Submit</button>
          </form>
          <div className="home-contact-image-wrapper">
            <img src={contactIllustration} alt="Contact" className="home-contact-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;