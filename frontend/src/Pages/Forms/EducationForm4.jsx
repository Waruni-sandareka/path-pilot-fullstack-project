import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import '../../Styles/EducationForm4.css';

const EducationForm4 = () => {
  const [formData, setFormData] = useState({
    educationLevel: '',
    fieldOfStudy: '',
    yearOfStudy: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate(''); // Navigate to next step
  };

  // Progress bar step — since this is page 1 of, say, 3
  const totalSteps = 4;
  const currentStep = 4;
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />

      <div className="form-container" style={{ marginLeft: '120px', flex: 1 }}>
        <h1>Career Assessment</h1>

        {/* ✅ Progress bar */}
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <p className="sub-heading">Tell us about your goals and interests</p>

        <form onSubmit={handleNext}>
          <label htmlFor="educationLevel">Which areas of work or study do you find most engaging? what aspects of them inspire or motivate you?"</label>
          <input
            type="text"
            id="fieldOfStudy"
            name="fieldOfStudy"
            placeholder="EX : I’m particularly interested in leveraging data analysis and software development to solve complex challenges..."
            onChange={handleChange}
            className="custom-select"
          />

          <label htmlFor="fieldOfStudy">Are there any areas or topics where you would like additional guidance, clarity, or exploration? </label>
          <input
            type="text"
            id="fieldOfStudy"
            name="fieldOfStudy"
            placeholder=" EX :I’m currently unsure about specializing in front-end or back-end development,
            would appreciate opportunities ..."
            onChange={handleChange}
            className="custom-select"
          />

          <label htmlFor="yearOfStudy">What are your caree goals ?</label>
          <input
            type="text"
            id="fieldOfStudy"
            name="fieldOfStudy"
            placeholder=" EX :My career goal is to work in a role that combines data analysis and software development ..."
            onChange={handleChange}
            className="custom-select"
          />

          <div className="buttons">
            <button type="button" className="back-btn" onClick={() => navigate('/form3')}>
              ⏴ Previous
            </button>
            <button type="submit" className="next-btn" >Get My Recommendations ⏵</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationForm4;
