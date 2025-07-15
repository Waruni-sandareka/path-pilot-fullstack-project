import React, { useState, useEffect } from 'react';
import '../Styles/Services.css';

import casserol1 from '../assets/img/casserol1.jpeg';
import casserol2 from '../assets/img/casserol2.jpg';
import casserol3 from '../assets/img/casserol3.jpg';

import service1 from '../assets/img/service1.jpg';
import service2 from '../assets/img/service2.jpg';
import service3 from '../assets/img/service3.png';

const carouselImages = [
  {
    src: casserol1,
    alt: 'AI-Powered Career Counsellor',
    title: 'AI-Powered Career Counsellor',
    description: 'Get expert advice through our intuitive AI-driven chatbot.',
  },
  {
    src: casserol2,
    alt: 'Personalized Career Progress Dashboard',
    title: 'Career Progress Dashboard',
    description: 'Track milestones and plan your professional growth.',
  },
  {
    src: casserol3,
    alt: 'Skill Development Platform',
    title: 'Skill Development Platform',
    description: 'Build skills with personalized learning journeys.',
  },
];

const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000); // Slide every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="services-page">
      {/* Carousel */}
      <div className="carousel">
  <div
    className="carousel-slides-container"
    style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
    {carouselImages.map(({ src, alt, title, description }, idx) => (
      <div className="carousel-slide" key={idx}>
        <img src={src} alt={alt} />
        <div className="carousel-caption">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    ))}
  </div>
</div>


      {/* Services Section */}
      <div className="services-container">
        <div className="service-card">
          <img src={service1} alt="AI Career Counseling" />
          <div className="service-content">
            <h3>AI-Powered Career Counsellor</h3>
            <p>
              Access expert career advice and skill development suggestions through our intuitive chatbot.
              Shape your future with personalized support powered by artificial intelligence. Whether you're
              unsure about your career path or looking to level up, our counselor is always ready to guide you.
              <br /><br />
              This service offers real-time suggestions tailored to your preferences and learning history.
              It evaluates your strengths and interests, helping you make informed career choices based on
              modern industry trends.
            </p>
          </div>
        </div>

        <div className="service-card">
          <img src={service2} alt="Career Dashboard" />
          <div className="service-content">
            <h3>Personalized Career Progress Dashboard</h3>
            <p>
              Track your career milestones, set goals, and monitor your skill development with a customized
              dashboard tailored to your professional growth. Stay on top of your progress and plan your next
              steps effectively with smart insights and visual data.
              <br /><br />
              The dashboard dynamically updates based on your achievements, learning activities, and feedback,
              giving you a crystal-clear view of your growth and areas that need attention.
            </p>
          </div>
        </div>

        <div className="service-card">
          <img src={service3} alt="Skill Platform" />
          <div className="service-content">
            <h3>Skill Development Platform</h3>
            <p>
              Our Skill Development Platform empowers Gen Z students to build the right skills for their career
              paths through personalized learning journeys. Using AI-driven insights, it identifies skill gaps
              and curates course recommendations, hands-on projects, and interactive tutorials to ensure
              meaningful progress.
              <br /><br />
              From beginner to advanced learners, the platform adapts content to user level, includes gamified
              learning modules, and supports certifications that enhance employability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
