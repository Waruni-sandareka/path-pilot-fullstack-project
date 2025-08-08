import React, { useState, useEffect } from "react";
import Sidebar from '../Components/Sidebar';
import ServiceCard from "../Components/ServiceCard";
import { useNavigate } from "react-router-dom";
import { 
  Book, 
  Bot, 
  User, 
  FileText, 
  TrendingUp, 
  Brain,
  ArrowRight
} from "lucide-react";
import dashboardImage from "../assets/img/dashbordimg.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('User');
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:8000/api/user/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`,
            },
          });

          const data = await response.json();
          if (response.ok) {
            setUsername(data.username || 'User');
          } else {
            console.error('Failed to fetch user details:', data);
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchUserDetails();
  }, []);

  const services = [
    {
      icon: Book,
      title: "Academic Records",
      description: "Track and manage your academic performance, grades, and educational achievements.",
      path: "/academicrecords"
    },
    {
      icon: Bot,
      title: "AI ChatBot",
      description: "Get instant career advice and guidance from our intelligent assistant.",
      path: "/chatbot"
    },
    {
      icon: User,
      title: "Profile Management",
      description: "Update your personal information, preferences, and career goals.",
      path: "/userprofile"
    },
    {
      icon: FileText,
      title: "Resume Builder",
      description: "Create professional resumes tailored to your target careers.",
      path: "/resume"
    },
    {
      icon: TrendingUp,
      title: "Career Trends",
      description: "Explore current job market trends and in-demand skills.",
      path: "/trends"
    },
    {
      icon: Brain,
      title: "Career Predictor",
      description: "Use AI to predict the best career paths based on your profile.",
      path: "/cvupload"
    }
  ];

  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f3e8f0',
    paddingLeft: '250px',
    paddingTop: '0px',
    boxSizing: 'border-box'
  };

  const contentStyle = {
    flex: 1,
    padding: '40px',
    background: 'linear-gradient(135deg, hsl(260, 60%, 92%) 0%, hsl(300, 50%, 95%) 100%)',
  };

  const maxWidthStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px'
  };

  const heroCardStyle = {
    background: 'linear-gradient(135deg, #D0ADC4 0%, #E9D8FD 100%)',
    color: 'hsl(0, 0%, 98%)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: 'none',
    borderRadius: '20px'
  };

  const heroContentStyle = {
    padding: '32px'
  };

  const heroGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
    gap: '32px',
    alignItems: 'center'
  };

  const heroTextSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  };

  const greetingStyle = {
    fontSize: '36px',
    fontWeight: '700',
    color: '#5a3475',
    marginBottom: '10px'
  };

  const welcomeTextStyle = {
    color: 'hsl(267, 27.10%, 27.50%)',
    fontSize: '20px'
  };

  const callToActionBoxStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(8px)',
    borderRadius: '16px',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  };

  const ctaHeadingStyle = {
    fontSize: '24px',
    fontWeight: '600',
    color: '#2d2d2d'
  };

  const ctaTextStyle = {
    color: '#333333',
    fontSize: '16px',
    lineHeight: '1.6',
    textAlign: 'justify'
  };

  const ctaButtonStyle = {
    background: isButtonHovered ? '#f3f3db' : '#fdfdf2',
    color: '#000',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: 'fit-content'
  };

  const imageContainerStyle = {
    display: 'flex',
    justifyContent: 'center'
  };

  const imageStyle = {
    maxWidth: '600px',
    height: 'auto',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  const servicesSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  };

  const servicesHeaderStyle = {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  };

  const servicesHeadingStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: '#5a3475'
  };

  const servicesSubtextStyle = {
    color: '#333333',
    fontSize: '18px'
  };

  const servicesGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '32px'
  };

  return (
    <div style={containerStyle}>
      <Sidebar />
      <div style={contentStyle}>
        <div style={maxWidthStyle}>
          {/* Hero Section */}
          <div style={heroCardStyle}>
            <div style={heroContentStyle}>
              <div style={heroGridStyle}>
                <div style={heroTextSectionStyle}>
                  <div>
                    <h1 style={greetingStyle}>
                      Hi, {username}! 👋
                    </h1>
                    <p style={welcomeTextStyle}>
                      Welcome to your career guidance dashboard
                    </p>
                  </div>
                  <div style={callToActionBoxStyle}>
                    <h2 style={ctaHeadingStyle}>Ready to shape your future?</h2>
                    <p style={ctaTextStyle}>
                      Tell us about yourself to discover the best career paths for you! Fill out the
                      form with your subjects, interests, and skills, and let our AI analyze your
                      academic strengths to guide your future career.
                    </p>
                    <button 
                      onClick={() => navigate('/form')}
                      style={ctaButtonStyle}
                      onMouseEnter={() => setIsButtonHovered(true)}
                      onMouseLeave={() => setIsButtonHovered(false)}
                    >
                      Get Started
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
                <div style={imageContainerStyle}>
                  <img 
                    src={dashboardImage} 
                    alt="Career Guidance Illustration" 
                    style={imageStyle}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div style={servicesSectionStyle}>
            <div style={servicesHeaderStyle}>
              <h2 style={servicesHeadingStyle}>Our Services</h2>
              <p style={servicesSubtextStyle}>
                Explore our comprehensive suite of career guidance tools
              </p>
            </div>
            <div style={servicesGridStyle}>
              {services.map((service) => (
                <ServiceCard
                  key={service.path}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  onClick={() => navigate(service.path)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;