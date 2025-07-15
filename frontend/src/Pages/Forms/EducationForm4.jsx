import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import '../../Styles/EducationForm4.css';

const EducationForm4 = () => {
  const { state } = useLocation();
  const [formData, setFormData] = useState(state?.formData || {
    educationLevel: '',
    fieldOfStudy: '',
    yearOfStudy: '',
    technicalSkills: [],
    otherTechnicalSkill: '',
    softSkills: [],
    otherSoftSkill: '',
    areasOfInterest: '',
    exploration: '',
    careerGoals: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    if (!token) {
      setMessage('Please log in to submit the career assessment.');
      console.error('No token found in localStorage');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    // Map camelCase to snake_case for backend compatibility
    const payload = {
      education_level: formData.educationLevel,
      field_of_study: formData.fieldOfStudy,
      year_of_study: formData.yearOfStudy,
      technical_skills: formData.technicalSkills.join(','),
      other_technical_skill: formData.otherTechnicalSkill,
      soft_skills: formData.softSkills.join(','),
      other_soft_skill: formData.otherSoftSkill,
      areas_of_interest: formData.areasOfInterest,
      exploration: formData.exploration,
      career_goals: formData.careerGoals
    };

    console.log('Payload sent to backend:', payload); // Debug payload

    try {
      const response = await fetch('http://localhost:8000/api/career-assessment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Career assessment submitted successfully!');
        console.log('Submission successful:', data);
        setTimeout(() => navigate('/'), 2000);
      } else {
        if (response.status === 401) {
          setMessage('Unauthorized: Please log in again.');
          console.error('Unauthorized request, token may be invalid');
          localStorage.removeItem('token');
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setMessage(data.message || 'Submission failed: ' + JSON.stringify(data));
          console.error('Submission failed:', data);
        }
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Error during submission:', error);
    }
  };

  const totalSteps = 4;
  const currentStep = 4;
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="form-container" style={{ marginLeft: '120px', flex: 1 }}>
        <h1>Career Assessment</h1>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <p className="sub-heading">Tell us about your goals and interests</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="areasOfInterest">Which areas of work or study do you find most engaging? What aspects of them inspire or motivate you？</label>
          <input
            type="text"
            id="areasOfInterest"
            name="areasOfInterest"
            placeholder="EX: I’m particularly interested in leveraging data analysis and software development to solve complex challenges..."
            value={formData.areasOfInterest}
            onChange={handleChange}
            className="custom-select"
            required
          />
          <label htmlFor="exploration">Are there any areas or topics where you would like additional guidance, clarity, or exploration?</label>
          <input
            type="text"
            id="exploration"
            name="exploration"
            placeholder="EX: I’m currently unsure about specializing in front-end or back-end development, would appreciate opportunities..."
            value={formData.exploration}
            onChange={handleChange}
            className="custom-select"
            required
          />
          <label htmlFor="careerGoals">What are your career goals?</label>
          <input
            type="text"
            id="careerGoals"
            name="careerGoals"
            placeholder="EX: My career goal is to work in a role that combines data analysis and software development..."
            value={formData.careerGoals}
            onChange={handleChange}
            className="custom-select"
            required
          />
          <div className="buttons">
            <button type="button" className="back-btn" onClick={() => navigate('/form3')}>
              ⏴ Previous
            </button>
            <button type="submit" className="next-btn">Get My Recommendations ⏵</button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default EducationForm4;