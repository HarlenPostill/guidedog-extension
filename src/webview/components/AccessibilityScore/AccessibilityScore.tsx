import React from 'react';
import Divider from '../Divider/Divider';
import './AccessibilityScore.css';

interface AccessibilityScoreProps {
  score: number;
}

const AccessibilityScore: React.FC<AccessibilityScoreProps> = ({ score }) => {
  // Function to determine gradient colour based on score
  const getScoreColor = (score: number): string => {
    const maxScore = 400;
    const percentage = score / maxScore;

    // Transition colour from #E92E2E to #71BBFF based on score
    const red = Math.round(233 + (113 - 233) * percentage);
    const green = Math.round(46 + (187 - 46) * percentage);
    const blue = Math.round(46 + (255 - 46) * percentage);

    return `rgb(${red}, ${green}, ${blue})`;
  };

  return (
    <div className="accessibility-score-container">
      <div className="accessibility-score-label">Accessibility Score:</div>
      <div className="accessibility-score-value">
        <span
          style={{
            color: getScoreColor(score)
          }}
        >
          {score}
        </span>
        <span
          style={{
            color: '#71BBFF'
          }}
        >
          /400
        </span>
      </div>
      <br />
      <Divider />
    </div>
  );
};

export default AccessibilityScore;
