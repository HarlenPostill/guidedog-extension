import React from 'react';
import Icon from '../../Atoms/Icon/Icon';
import './ScoreBreakdown.css';

interface Segment {
    label: string;
    value: number;
    color: string;
  }

  
  const Breakdown = ({ segments }: { segments: Segment[] }) => {
    // Function to dynamically generate the conic gradient with gaps between segments
    const generateGradient = () => {
      let gradientString = '';
      let currentAngle = 0;
      const gapSize = 2; // Size of the gap between segments (in percentage)
  
      segments.forEach((segment, index) => {
        const nextAngle = currentAngle + segment.value;

        if (index === segments.length - 1) {
          gradientString += `${segment.color} ${currentAngle}% ${nextAngle}%, transparent ${nextAngle}% 100%, transparent 0% ${gapSize}%, `;
        } else {
          gradientString += `${segment.color} ${currentAngle}% ${nextAngle}%, transparent ${nextAngle}% ${nextAngle + gapSize}%, `;
        }
  
        currentAngle = nextAngle + gapSize;
      });
  
      return `conic-gradient(${gradientString.trim().slice(0, -1)})`;
    };
    const averageScore = segments.reduce((sum, segment) => sum + segment.value, 0) / segments.length;

  return (
    <div className="container">
      <div className="score-container">
        <div className="circle" style={{ background: generateGradient() }}>
          <div className="score-text">
            <h2>{averageScore.toFixed(0)}%</h2>
            <p>overall score</p>
          </div>
        </div>
      </div>
      <div className="details">
        {segments.map((segment, index) => (
          <div key={index} className="item">
            <Icon name = "Paw" width={24} height={24} color={segment.color} />
            <p>{segment.label}</p>
            <span>{segment.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Breakdown;
