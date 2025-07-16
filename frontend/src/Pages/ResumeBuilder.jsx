import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/ResumeBuilder.css';

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: 'User', email: '' });
  const [assessmentHtml, setAssessmentHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please log in.');
        setLoading(false);
        navigate('/login');
        return;
      }

      try {
        // Fetch user details
        const userResponse = await fetch('http://localhost:8000/api/user/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        });

        if (!userResponse.ok) {
          const errorData = await userResponse.json();
          throw new Error('Failed to fetch user details: ' + (errorData.error || userResponse.statusText));
        }
        const userData = await userResponse.json();
        setUser(userData);

        // Fetch career assessment details
        const assessmentResponse = await fetch('http://localhost:8000/api/career-assessment/details/', {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`,
            'Accept': 'text/html',
          },
        });

        if (!assessmentResponse.ok) {
          const errorData = await assessmentResponse.text();
          if (assessmentResponse.status === 404) {
            setError('No career assessment found. Please complete the career assessment form.');
          } else {
            throw new Error('Failed to fetch career assessment: ' + (errorData || assessmentResponse.statusText));
          }
        } else {
          const htmlContent = await assessmentResponse.text();
          setAssessmentHtml(htmlContent);
        }
      } catch (err) {
        setError('Error fetching data: ' + err.message);
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleBuildResume = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to generate a resume');
      navigate('/login');
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
      link.download = `resume_${user.username}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error in handleBuildResume:', err);
      setError('Error generating resume: ' + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return (
    <div className="resume-builder-container">
      <div className="error">{error}</div>
      {error.includes('No career assessment found') && (
        <button onClick={() => navigate('/form')}>
          Complete Career Assessment
        </button>
      )}
    </div>
  );

  return (
    <div className="resume-builder-container">
      <h2>Resume Builder</h2>
      <div className="user-details">
        <h3>{user.username}</h3>
        <p>Email: {user.email}</p>
      </div>
      <div className="assessment-details">
        <h3>Career Assessment Details</h3>
        <div dangerouslySetInnerHTML={{ __html: assessmentHtml }} />
      </div>
      <button className="build-resume-btn" onClick={handleBuildResume}>
        Build Resume
      </button>
    </div>
  );
};

export default ResumeBuilder;