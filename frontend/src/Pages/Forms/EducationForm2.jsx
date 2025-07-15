import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import '../../Styles/EducationForm2.css';

const skillsList = [
  "Web Development(HTML,CSS,JavaScript)",
  "Project Management",
  "Cyber security",
  "Programming (Python,Java,C++)",
  "Data Analysis",
  "UI/UX Design",
  "Mobile Development",
  "Cloud Computing",
  "Machine Learning/AI",
  "Database Management",
  "Others"
];

const EducationForm2 = () => {
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
  const [otherTechnicalSkill, setOtherTechnicalSkill] = useState(formData.otherTechnicalSkill || '');
  const navigate = useNavigate();

  const handleSkillChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      technicalSkills: prev.technicalSkills.includes(value)
        ? prev.technicalSkills.filter((skill) => skill !== value)
        : [...prev.technicalSkills, value]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.technicalSkills.length && !otherTechnicalSkill) {
      alert('Please select at least one technical skill or enter an other skill.');
      return;
    }
    const updatedFormData = { ...formData, otherTechnicalSkill };
    navigate('/form3', { state: { formData: updatedFormData } });
  };

  const totalSteps = 4;
  const currentStep = 2;
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
          <p className="subtitle">What technology skills do you have?</p>
          <p className="note">Select all that apply (choose at least one)</p>
          <br />
          <div className="checkbox-grid">
            {skillsList.map((skill, index) => (
              <label key={index} className="checkbox-label">
                <input
                  type="checkbox"
                  value={skill}
                  checked={formData.technicalSkills.includes(skill)}
                  onChange={handleSkillChange}
                />
                {skill}
              </label>
            ))}
          </div>
          <input
            type="text"
            className="other-skill-input"
            placeholder="Enter other technical skills"
            value={otherTechnicalSkill}
            onChange={(e) => setOtherTechnicalSkill(e.target.value)}
          />
          <div className="button-group">
            <button type="button" className="back-btn" onClick={() => navigate('/form')}>
              ⏴ Previous
            </button>
            <button type="submit" className="next-btn">Next ⏵</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationForm2;