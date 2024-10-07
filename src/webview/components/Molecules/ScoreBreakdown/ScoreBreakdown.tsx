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
  
        // For the last segment, we need to handle the transition from the end to the start
        if (index === segments.length - 1) {
          // Handle the last segment wrapping around
          gradientString += `${segment.color} ${currentAngle}% ${nextAngle}%, transparent ${nextAngle}% 100%, transparent 0% ${gapSize}%, `;
        } else {
          // For other segments, add the segment and then the transparent gap
          gradientString += `${segment.color} ${currentAngle}% ${nextAngle}%, transparent ${nextAngle}% ${nextAngle + gapSize}%, `;
        }
  
        currentAngle = nextAngle + gapSize;
      });
  
      // Trim the final trailing comma and space
      return `conic-gradient(${gradientString.trim().slice(0, -1)})`;
    };

  return (
    <div className="container">
      <div className="score-container">
        <div className="circle" style={{ background: generateGradient() }}>
          <div className="score-text">
            <h2>40%</h2>
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
