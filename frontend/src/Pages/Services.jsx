import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  TrendingUp, 
  FileText, 
  Target,
  Search,
  GraduationCap,
  School,
  MessageCircle,
  BarChart3,
  PieChart,
  FileBarChart,
  Table,
  Download,
  Upload,
  Zap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import '../Styles/Services.css';

const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const services = [
    {
      id: 1,
      title: "AI-Powered Career Counsellor",
      subtitle: "Your Virtual Career Assistant",
      description: "Get tailored career guidance and recommendations powered by advanced AI technology.",
      features: [
        { icon: Search, text: "Career Recommendations: Suggests suitable career paths and trending job roles based on user data" },
        { icon: GraduationCap, text: "Learning Resources: Offers course, certification, and skill-building suggestions" },
        { icon: School, text: "Education Guidance: Recommends colleges or universities aligned with career goals" },
        { icon: MessageCircle, text: "Interview Prep: Provides tips, mock questions, and resume feedback" },
        { icon: TrendingUp, text: "Industry Insights: Keeps students updated with real-time market and industry trends" }
      ],
      color: "from-blue-600 to-purple-600"
    },
    {
      id: 2,
      title: "Real-Time Career Trends",
      subtitle: "Stay Ahead of Market Demands",
      description: "Keep informed on current and emerging careers using live data and AI analytics.",
      features: [
        { icon: BarChart3, text: "Top Career Search Volume: Displays which jobs are trending using bar charts" },
        { icon: PieChart, text: "Trend Distribution: Donut charts show how interest spreads across professions" },
        { icon: FileBarChart, text: "Career Analytics Summary: Provides concise insights, role descriptions, and stats" },
        { icon: Table, text: "Summary Table: Quick-reference career trends table" }
      ],
      color: "from-green-600 to-blue-600"
    },
    {
      id: 3,
      title: "Resume Builder",
      subtitle: "Professional Resume Creation",
      description: "Automatically creates professional resumes using your student profile data.",
      features: [
        { icon: FileText, text: "Automatic Data Integration: Pulls education, skills, and experience from student profile" },
        { icon: FileText, text: "Organized Sections: Automatically formats resumes into Education, Skills, Experience, and Projects" },
        { icon: FileText, text: "Professional Formatting: Uses modern, recruiter-friendly designs" },
        { icon: Download, text: "Easy Export: Download-ready in PDF or other formats" }
      ],
      color: "from-purple-600 to-pink-600"
    },
    {
      id: 4,
      title: "Career Predictor",
      subtitle: "AI-Powered Career Matching",
      description: "Analyzes uploaded CVs and matches them to the best career options.",
      features: [
        { icon: Upload, text: "CV Analysis: Reads uploaded CVs to assess qualifications and skills" },
        { icon: Target, text: "Exact Career Match: Suggests careers that fit the student's profile perfectly" },
        { icon: Zap, text: "Instant Feedback: Delivers immediate results after upload" }
      ],
      color: "from-orange-600 to-red-600"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [services.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % services.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <div className="services-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">AI-Powered Career Services</h1>
          <p className="hero-subtitle">
            Revolutionizing career guidance with cutting-edge artificial intelligence
          </p>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="carousel-section">
        <div className="carousel-container">
          <div className="carousel-header">
            <h2>Our Core Services</h2>
            <p>Discover how our AI-driven platform transforms career development</p>
          </div>

          <div className="carousel-wrapper">
            <button className="carousel-nav prev" onClick={prevSlide}>
              <ChevronLeft size={24} />
            </button>

            <div className="carousel-content">
              <div 
                className="carousel-slides"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {services.map((service) => (
                  <div key={service.id} className="carousel-slide">
                    <div className={`service-card gradient-${service.id}`}>
                      <div className="service-header">
                        <h3>{service.title}</h3>
                        <p className="service-subtitle">{service.subtitle}</p>
                        <p className="service-description">{service.description}</p>
                      </div>
                      <div className="service-features">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="feature-item">
                            <feature.icon className="feature-icon" size={20} />
                            <span>{feature.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="carousel-nav next" onClick={nextSlide}>
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="carousel-indicators">
            {services.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-section">
        <div className="container">
          <div className="section-header">
            <h2>Complete Career Development Suite</h2>
            <p>Everything you need to succeed in your career journey</p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-grid-card">
                <div className={`card-header gradient-${service.id}`}>
                  <h3>{service.title}</h3>
                  <p>{service.subtitle}</p>
                </div>
                
                <div className="card-content">
                  <p className="card-description">{service.description}</p>
                  <div className="feature-list">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="feature-item-grid">
                        <feature.icon className="feature-icon-grid" size={18} />
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <div className="benefits-content">
            <h2>Why Choose Our AI Career Platform?</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <Brain className="benefit-icon" size={32} />
                <h3>AI-Powered Intelligence</h3>
                <p>Advanced algorithms analyze your profile and market trends to provide personalized recommendations.</p>
              </div>
              <div className="benefit-card">
                <TrendingUp className="benefit-icon" size={32} />
                <h3>Real-Time Data</h3>
                <p>Stay updated with live market insights and emerging career opportunities in your field.</p>
              </div>
              <div className="benefit-card">
                <Target className="benefit-icon" size={32} />
                <h3>Precise Matching</h3>
                <p>Get matched with careers that perfectly align with your skills, interests, and goals.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
