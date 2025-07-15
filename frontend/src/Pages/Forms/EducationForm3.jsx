import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import '../../Styles/EducationForm3.css';

const skillsList = [
  "Time Management",
  "Project Management",
  "Communication",
  "Problem Solving",
  "Public Speaking",
  "Creativity",
  "Leadership",
  "Teamwork",
  "Critical Thinking",
  "Networking",
  "Others"
];

const EducationForm3 = () => {
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
  const [otherSoftSkill, setOtherSoftSkill] = useState(formData.otherSoftSkill || '');
  const navigate = useNavigate();

  const handleSkillChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      softSkills: prev.softSkills.includes(value)
        ? prev.softSkills.filter((skill) => skill !== value)
        : [...prev.softSkills, value]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.softSkills.length && !otherSoftSkill) {
      alert('Please select at least one soft skill or enter an other skill.');
      return;
    }
    const updatedFormData = { ...formData, otherSoftSkill };
    navigate('/form4', { state: { formData: updatedFormData } });
  };

  const totalSteps = 4;
  const currentStep = 3;
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <div className="education-form-layout">
      <Sidebar />
      <div className="career-container">
        <h1>Career Assessment</h1>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <form onSubmit={handleSubmit}>
          <p className="subtitle">Which soft skills do you consider your greatest strengths?</p>
          <p className="note">Select all that apply (choose at least one)</p>
          <br />
          <div className="checkbox-grid">
            {skillsList.map((skill, index) => (
              <label key={index} className="checkbox-label">
                <input
                  type="checkbox"
                  value={skill}
                  checked={formData.softSkills.includes(skill)}
                  onChange={handleSkillChange}
                />
                {skill}
              </label>
            ))}
          </div>
          <input
            type="text"
            className="other-skill-input"
            placeholder="Enter other soft skills"
            value={otherSoftSkill}
            onChange={(e) => setOtherSoftSkill(e.target.value)}
          />
          <div className="button-group">
            <button type="button" className="back-btn" onClick={() => navigate('/form2')}>
              ⏴ Previous
            </button>
            <button type="submit" className="next-btn">Next ⏵</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationForm3;