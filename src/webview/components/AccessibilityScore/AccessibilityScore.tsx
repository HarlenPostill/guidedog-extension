import React from 'react';
import Divider from '../Divider/Divider';
import './AccessibilityScore.css';

const AccessibilityScore = () => {
  return (
    <div className="accessibility-score-container">
      <div className="accessibility-score-label">Accessibility Score:</div>
      <div className="accessibility-score-value">365/400</div>
      <Divider />
    </div>
  );
};

export default AccessibilityScore;
