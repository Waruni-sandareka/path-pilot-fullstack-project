import React, { useState } from 'react';
import '../Styles/ProgressBar.css';


const ProgressForm = () => {
  const totalSteps = 5;
  const [currentStep, setCurrentStep] = useState(1);

  const progressPercent = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h2>Progress Bar Demo</h2>

      {/* ✅ Progress Bar Container */}
      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <p style={{ textAlign: 'center' }}>Step {currentStep} of {totalSteps}</p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={handlePrevious} disabled={currentStep === 1}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentStep === totalSteps}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProgressForm;
