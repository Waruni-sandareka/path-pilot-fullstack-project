import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/ResumeBuilder.css';
import Sidebar from '../Components/Sidebar'; 

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
  if (error) return <div>{error}</div>;

  return (
    <div className="dashboard-container" style={{ display: 'flex' }}>
      <Sidebar/>
    <div className="resume-builder-container">
      <h2>Resume Builder</h2>
      <div className="user-details">
        <h3>{user.username}</h3>
        <p>Email: {user.email}</p>
      </div>
      <button className="build-resume-btn" onClick={handleBuildResume}>
        Build Resume
      </button>
    </div>
    </div>
  );
};

export default ResumeBuilder;