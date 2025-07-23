import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Zap, Shield, Award, Palette, Clock } from 'lucide-react';
import Sidebar from '../Components/Sidebar';
import UserCard from '../Components/UserCard';
import DownloadButton from '../Components/DownloadButton';
import FeatureCard from '../Components/FeatureCard';
import resumeHero from '../assets/img/dashimage.png';
import '../Styles/ResumeBuilder.css';

const features = [
  {
    icon: FileText,
    title: "Professional Templates",
    description: "Choose from beautifully crafted resume templates designed by professionals"
  },
  {
    icon: Zap,
    title: "Instant Generation",
    description: "Generate your resume in seconds with our lightning-fast processing"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is encrypted and secure. We never share your information"
  },
  {
    icon: Award,
    title: "ATS Optimized",
    description: "Our resumes are optimized to pass through Applicant Tracking Systems"
  },
  {
    icon: Palette,
    title: "Customizable Design",
    description: "Personalize colors, fonts, and layouts to match your style"
  },
  {
    icon: Clock,
    title: "Quick Export",
    description: "Download your resume as PDF instantly, ready for applications"
  }
];

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: 'User', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please log in.');
        setLoading(false);
        return;
      }

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
          setUser(data);
        } else {
          setError('Failed to fetch user details: ' + (data.error || response.statusText));
        }
      } catch (err) {
        setError('Error fetching user details: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleBuildResume = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to generate a resume');
      return;
    }

    try {
      console.log('Sending request to /api/resume/ with token:', token);
      const response = await fetch('http://localhost:8000/api/resume/', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Accept': 'application/pdf',
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Resume generation failed:', errorData);
        throw new Error(`Failed to generate resume: ${errorData || response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `resume_${user.username.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error in handleBuildResume:', err);
      setError('Error generating resume: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-text">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="resume-builder-container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-gradient" />
          <div className="container">
            <div className="hero-grid">
              <div className="hero-content">
                <h1 className="hero-title">
                  Build Your Perfect Resume
                </h1>
                <p className="hero-description">
                  Create a professional resume that stands out. Our AI-powered builder 
                  helps you craft the perfect resume in minutes.
                </p>
                <UserCard user={user} loading={loading} />
                <div className="hero-button">
                  <DownloadButton onDownload={handleBuildResume} username={user.username} />
                </div>
              </div>
              <div className="hero-image-container">
                <div className="hero-image-gradient" />
                <img 
                  src={resumeHero} 
                  alt="Resume Builder"
                  className="hero-image"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <div className="container">
            <div className="features-header">
              <h2 className="features-title">
                Why Choose Our Resume Builder?
              </h2>
              <p className="features-description">
                Professional, fast, and secure. Everything you need to create the perfect resume.
              </p>
            </div>
            <div className="features-grid">
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <div className="container">
            <div className="cta-card">
              <h3 className="cta-title">Ready to Get Started?</h3>
              <p className="cta-description">
                Join thousands of professionals who have already created their perfect resume with our builder.
              </p>
              <DownloadButton onDownload={handleBuildResume} username={user.username} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;