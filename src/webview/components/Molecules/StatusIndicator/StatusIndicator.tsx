import React, { useEffect, useState } from 'react';
import './StatusIndicator.css';
import Icon from '../../Atoms/Icon/Icon';

interface StatusIndicatorProps {
  percentage?: number;
  lastUpdated: string; 
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ percentage, lastUpdated }) => {
  const [themeBackground, setThemeBackground] = useState('');
  const [themeForeground, setThemeForeground] = useState('');

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    setThemeBackground(rootStyles.getPropertyValue('--vscode-editor-background'));
    setThemeForeground(rootStyles.getPropertyValue('--vscode-editor-foreground'));
  }, []);

  let status = '';
  let colorClass = '';
if(percentage){
  
  if (percentage <= 25) {
    status = 'Perceivable';
    colorClass = 'perceivable';
  } else if (percentage <= 50) {
    status = 'Operable';
    colorClass = 'operable';
  } else if (percentage <= 75) {
    status = 'Understandable';
    colorClass = 'understandable';
  } else {
    status = 'Critical';
    colorClass = 'critical';
  }
}

  return (
    <div
      className={`status-indicator ${colorClass}`}
      style={{ backgroundColor: themeBackground, color: themeForeground }}
    >
      <div className="status">
        <span>{status}</span>
        <span className="paw-icon">
          <Icon name="Paw" width={24} height={24} />
        </span>
      </div>
      <div className="last-updated">
        last updated <span>{lastUpdated}</span> {/* Use the lastUpdated prop */}
        <button className="refresh-button">
          <Icon name="RefreshIcon" width={24} height={24} style={{ fill: 'white' }} />
        </button>
      </div>
    </div>
  );
};

export default StatusIndicator;
