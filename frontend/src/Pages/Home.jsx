import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

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
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");

  const handleReadMore = (content) => {
    setPopupContent(content);
    setShowPopup(true);
    document.body.style.overflow = "hidden";
  };

  const closePopup = () => {
    setShowPopup(false);
    document.body.style.overflow = "auto";
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
      <div className="w-full top-0 left-0 z-10 fixed shadow-sm bg-white"></div><br></br>

      {/* Content Section */}
      <div className="text-section mt-24">
        <div className="oval-shape"></div>

        <div className="welcome-circle-container">
          <h2 className="welcome-text">
            <br />
            <br />
            <p></p>
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

        <h1 className="career-text text-5xl pt-4 mb-5 leading-relaxed font-bold">
          Career guidance, all <br /> in one place.
        </h1>
      </div>

      {/* Image Section */}
      <div className="image-section">
        <img src={img} alt="Home Visual" className="big-image" />
      </div>

      {/* Explore Button */}
      <p></p>
      <Link to="/register">
        <button className="explore-button">Sign Up</button>
      </Link>

      {/* Our Services Section */}
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
          <p className="service-description">
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
          <h2 className="dash-title">Personalized Career Progress Dashboard</h2>
          <p className="dash-description">
            Track your career milestones, set goals, and monitor your skill development with 
            a customized dashboard tailored to your professional growth. Stay on top of your 
            progress and plan your next steps effectively.
          </p>
          <button
  className="read-more-btn"
  onClick={() =>
    handleReadMore(
      <div>
        <h2>Personalized Career Progress Dashboard</h2>
        <p>
          The Personalized Career Progress Dashboard is a comprehensive tool designed to give Gen Z students a clear and actionable overview of their career development journey. It leverages AI analytics to adapt to individual learning styles, career goals, and pace.
        </p>
        <h4>Key Features:</h4>
        <ul>
          <li>
            <strong>Dynamic Skill Assessment:</strong> Continuously evaluates student skills through quizzes, project completions, and feedback to highlight strengths and areas for improvement.
          </li>
          <li>
            <strong>Custom Goal Setting & Tracking:</strong> Students can define short-term and long-term career goals, such as mastering specific skills, completing certifications, or gaining internship experience, with real-time progress tracking.
          </li>
          <li>
            <strong>Visual Progress Indicators:</strong> Interactive charts, progress bars, timelines, and badges provide visual motivation and easy monitoring of achievements.
          </li>
          <li>
            <strong>AI-Driven Recommendations:</strong> Based on progress and gaps identified, the dashboard suggests personalized learning resources, networking events, mentorship opportunities, and job openings.
          </li>
          <li>
            <strong>Integration with External Tools:</strong> Sync with popular calendar apps to manage deadlines and interviews, connect with resume builders, and link with job portals and internship platforms for seamless application management.
          </li>
          <li>
            <strong>Collaborative Features:</strong> Enables sharing progress reports with mentors, career counsellors, or parents for feedback and support.
          </li>
          <li>
            <strong>Notifications & Reminders:</strong> Timely alerts about upcoming deadlines, new course recommendations, or application statuses keep students organized and proactive.
          </li>
        </ul>
        <h4>Future Enhancements:</h4>
        <ul>
          <li>
            Incorporation of gamification elements like leaderboards and challenges to boost engagement.
          </li>
          <li>
            Enhanced AI that predicts future skill demands and suggests pivot strategies in response to changing job markets.
          </li>
          <li>
            Personalized mental wellness check-ins to support student motivation and reduce burnout.
          </li>
          <li>
            Mobile app integration for on-the-go progress tracking and notifications.
          </li>
        </ul>
        <p>
          Overall, the dashboard transforms career planning into a transparent, manageable, and motivating process, enabling students to confidently shape their futures with actionable insights and continuous support.
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
          <h2 className="skill-title">Skill Development Platform</h2>
          <p className="skill-description">
            Our Skill Development Platform is designed to empower Gen Z students to build the right skills for their chosen career paths through personalized learning journeys. Using AI-driven insights, it identifies skill gaps and curates customized course recommendations, hands-on projects, and interactive tutorials to ensure meaningful progress.
          </p>
         <button
  className="read-more-btn"
  onClick={() =>
    handleReadMore(
      <div>
        <h2>Skill Development Platform</h2>
        <p>
          Our Skill Development Platform leverages AI to personalize learning experiences for Gen Z students,
          ensuring they build career-relevant skills efficiently and confidently.
        </p>
        <h4>Features & Benefits:</h4>
        <ul>
          <li><strong>AI-Powered Skill Gap Analysis:</strong> Identifies the skills students need to develop based on assessments and progress.</li>
          <li><strong>Customized Course Recommendations:</strong> Suggests courses and tutorials tailored to individual goals and learning preferences.</li>
          <li><strong>Hands-On Projects:</strong> Provides practical assignments that simulate real-world challenges for deeper learning.</li>
          <li><strong>Interactive Tutorials:</strong> Engaging multimedia content that caters to different learning styles.</li>
          <li><strong>Progress Tracking & Feedback:</strong> Visual dashboards and detailed feedback help students stay motivated and aware of their growth.</li>
          <li><strong>Community & Mentorship:</strong> Enables collaboration and guidance from peers and professionals.</li>
        </ul>
        <h4>Examples:</h4>
        <p>
          For instance, a student interested in web development might be recommended courses on HTML, CSS, and JavaScript, along with coding challenges and projects such as building a personal portfolio website.
          Meanwhile, a student aiming for data science could receive tailored resources on Python, statistics, and machine learning fundamentals.
        </p>
        <p>
          This platform ensures every student’s learning path is unique, practical, and aligned with their career ambitions.
        </p>
      </div>
    )
  }
>
  Read more
</button>

        </div>
      </div>

      {/* Contact Section */}
      <h1 className="Contacttitle">
        Contact <span className="Us">Us</span>
      </h1>
      <div id="contact" className="contact-container">
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
    </div>
  );
};

export default Home;