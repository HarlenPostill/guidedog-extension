import React, { useEffect, useState } from 'react';
import './StatusIndicator.css';
import Icon from '../../Atoms/Icon/Icon';

const StatusIndicator = ({ percentage = 77}) => {
  const [themeBackground, setThemeBackground] = useState('');
  const [themeForeground, setThemeForeground] = useState('');

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    setThemeBackground(rootStyles.getPropertyValue('--vscode-editor-background'));
    setThemeForeground(rootStyles.getPropertyValue('--vscode-editor-foreground'));
  }, []);

  let status = '';
  let colorClass = '';

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
        last updated <span>2s ago</span>
        <Icon name="RefreshIcon" width={24} height={24} />
      </div>
    </div>
  );
};

export default StatusIndicator;
