import React from 'react';
import './AccessibilityScore.css';
import { useDictionary } from '../../../hooks/useDictionary';

interface AccessibilityScoreProps {
  score: number;
}

const AccessibilityScore = ({ score }: AccessibilityScoreProps) => {
  const d = useDictionary();
  return (
    <div className="accessibility-score-container">
      <div className="accessibility-score-label">{d('ui.boxes.AccessibilityScore.title')}</div>
      <div className="accessibility-score-value">
        <span
          style={{
            color: '#FDA1A2',
          }}>
          {score}
        </span>
      </div>
    </div>
  );
};

export default AccessibilityScore;
