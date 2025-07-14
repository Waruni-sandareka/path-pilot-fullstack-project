import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../Styles/EducationForm3.css';
import Sidebar from '../../Components/Sidebar';

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
    if (otherSkill.trim()) {
      allSkills.push(otherSkill.trim());
    }

    // Log or store the submitted soft skills
    console.log("Submitted soft skills:", allSkills);

    // ✅ Navigate to Form4
    navigate('/form4');
  };

  const totalSteps = 4;
  const currentStep = 3; // Since this is Form3
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
          <p className="subtitle">
            Which soft skills do you consider your greatest strengths?
          </p>
          <p className="note">
            Select all that apply (choose at least one)
          </p>
          <br />
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
            placeholder="Enter other soft skills"
            value={otherSkill}
            onChange={(e) => setOtherSkill(e.target.value)}
          />

          <div className="button-group">
            <button
              type="button"
              className="back-btn"
              onClick={() => navigate('/form2')}
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

export default EducationForm3;
