import React from 'react';

const StepIndicator = ({ number, label, isActive = false }) => {
  return (
    <div className={`step ${isActive ? 'active' : ''}`}>
      <div className="step-number">{number}</div>
      <span className="step-label">{label}</span>
    </div>
  );
};

export default StepIndicator;