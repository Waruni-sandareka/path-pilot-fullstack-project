import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../Styles/EducationForm2.css';
import Sidebar from '../../Components/Sidebar';

const skillsList = [
  "Web Development(HTML,CSS, javaScript)",
  "Project Management",
  "Cyber security",
  "Programming (Python ,java ,c++)",
  "Data Analysis",
  "UI/UX Design",
  "Mobile Development",
  "Cloud Computing",
  "Machine Learning/AI",
  "Database Management",
  "Others"
];

const EducationForm2 = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [otherSkill, setOtherSkill] = useState("");
  const navigate = useNavigate();

  const handleSkillChange = (e) => {
    const value = e.target.value;
    setSelectedSkills((prev) =>
      prev.includes(value)
        ? prev.filter((skill) => skill !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allSkills = [...selectedSkills];
    if (otherSkill.trim()) allSkills.push(otherSkill.trim());

    // Log skills for now (or send to API)
    console.log("Submitted skills:", allSkills);

    // ✅ Navigate to Form3
    navigate('/form3');
  };

  const totalSteps = 4;
  const currentStep = 2; // If this is Form2
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <div className="education-form-layout">
      <Sidebar />
      <div className="career-container">
        <h1>Career Assessment</h1>

        {/* ✅ Progress bar */}
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <form onSubmit={handleSubmit}>
          <p className="subtitle">What technology skills do you have?</p>
          <p className="note">Select all that apply (choose at least one)</p><br />

          <div className="checkbox-grid">
            {skillsList.map((skill, index) => (
              <label key={index} className="checkbox-label">
                <input
                  type="checkbox"
                  value={skill}
                  checked={selectedSkills.includes(skill)}
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
            value={otherSkill}
            onChange={(e) => setOtherSkill(e.target.value)}
          />

          <div className="button-group">
            <button
              type="button"
              className="back-btn"
              onClick={() => navigate('/form')}
            >
              ⏴ Previous
            </button>

            <button type="submit" className="next-btn">
              Next ⏵
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationForm2;
