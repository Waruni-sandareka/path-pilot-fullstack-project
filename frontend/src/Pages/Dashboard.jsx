import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar'; // Import the new Sidebar component
import "../Styles/Dashboard.css"; 
import dashboardImage from "../assets/img/dashbordimg.png";
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('User'); // Default username

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

  return (
    <div className="dashboard-container">
      <Sidebar /> {/* Use the Sidebar component */}
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#D0ADC4',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '1030px',
          margin: 'auto',
          height: '600px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '24px' }}>
          <img 
            src={dashboardImage} 
            alt="Graduation Illustration" 
            style={{ 
              display: 'block', 
              maxWidth: '550px', 
              height: 'auto', 
              marginBottom: '16px'
            }} 
          />
          <h2 className="dashboard-greeting">
            Hi, {username}
          </h2>
        </div>
        <div className="content-box">
          <h2>Welcome!</h2><br /><br />
          <p>
            Tell us about yourself to discover the best career paths for you! Fill out the
            form with your subjects, interests, and skills, and let our AI analyze your
            academic strengths to guide your future career.
          </p> <br /><br />
          <button onClick={() => navigate('/form')}>
  Get Started!
</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;