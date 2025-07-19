import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import '../../Styles/EducationForm.css';

const EducationForm = () => {
  const [formData, setFormData] = useState({
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.educationLevel || !formData.fieldOfStudy || !formData.yearOfStudy) {
      alert('Please fill in all required fields.');
      return;
    }
    navigate('/form2', { state: { formData } });
  };

  const totalSteps = 4;
  const currentStep = 1;
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="form-container" style={{ marginLeft: '120px', flex: 1 }}>
        <h1>Career Assessment</h1>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <p className="sub-heading">Tell us about your education</p>
        <form onSubmit={handleNext}>
          <label htmlFor="educationLevel">Current Education Level</label>
          <select
            id="educationLevel"
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleChange}
            className="custom-select"
       
          >
            <option value="" disabled hidden>Select your education level</option>
            <option value="High School">High School</option>
            <option value="Diploma">Diploma</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Postgraduate">Postgraduate</option>
          </select>

          <label htmlFor="fieldOfStudy">Field of Study / Major</label>
          <input
            type="text"
            id="fieldOfStudy"
            name="fieldOfStudy"
            placeholder="Enter your major"
            value={formData.fieldOfStudy}
            onChange={handleChange}
            className="custom-select"
           
          />

          <label htmlFor="yearOfStudy">Year of Study</label>
          <select
            id="yearOfStudy"
            name="yearOfStudy"
            value={formData.yearOfStudy}
            onChange={handleChange}
            className="custom-select"
          
          >
            <option value="" disabled hidden>Select year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>

          <div className="buttons">
            <button type="button" className="back-btn" onClick={() => navigate('/')}>
              ⏴ Back to Home
            </button>
            <button type="submit" className="next-btn">Next ⏵</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationForm;