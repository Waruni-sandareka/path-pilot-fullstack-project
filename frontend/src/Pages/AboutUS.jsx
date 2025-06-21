import React from "react";
import "../Styles/AboutUS.css";
import { Carousel } from "react-bootstrap";

const AboutUs = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About PathPilot</h1>
        <p>Empowering students with AI-driven career guidance — all in one place.</p>
      </section>

      <section className="about-section mission">
        <h2>Our Mission</h2>
        <p>
          At PathPilot, we aim to bridge the gap between education and opportunity by guiding students through
          personalized career pathways using AI, real-world trends, and expert insights.
        </p>
      </section>

      <section className="about-section features">
        <h2>What We Offer</h2>
        <Carousel interval={3000} indicators={false} controls={true}>
          <Carousel.Item>
            <p className="carousel-text">✔️ Smart AI career recommendations</p>
          </Carousel.Item>
          <Carousel.Item>
            <p className="carousel-text">✔️ Interactive chatbot for instant guidance</p>
          </Carousel.Item>
          <Carousel.Item>
            <p className="carousel-text">✔️ Real-time progress tracking</p>
          </Carousel.Item>
          <Carousel.Item>
            <p className="carousel-text">✔️ Collaboration between students, parents & counselors</p>
          </Carousel.Item>
          <Carousel.Item>
            <p className="carousel-text">✔️ Job market insights and academic planning</p>
          </Carousel.Item>
        </Carousel>
      </section>

      <section className="about-section team">
        <h2>Meet Our Team</h2>
        <p>
          We're a group of educators, developers, and AI enthusiasts dedicated to helping students shape their future confidently.
        </p>
        <div className="team-images">
          <img src={require("../assets/img/team1.jpeg")} alt="Team Member 1" />
          <img src={require("../assets/img/team2.jpg")} alt="Team Member 2" />
          <img src={require("../assets/img/team3.jpg")} alt="Team Member 3" />
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
