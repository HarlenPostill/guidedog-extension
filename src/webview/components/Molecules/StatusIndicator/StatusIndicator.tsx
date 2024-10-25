import React, { useEffect, useState } from 'react';
import './StatusIndicator.css';
import Icon from '../../Atoms/Icon/Icon';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useDictionary } from '../../../hooks/useDictionary';

interface StatusIndicatorProps {
  percentage?: number;
  lastUpdated: string;
  vscode: any;
}

const StatusIndicator = ({ percentage, lastUpdated, vscode }: StatusIndicatorProps) => {
  let status = '';
  let colorClass = '';
  if (percentage !== undefined) {
    if (percentage <= 25) {
      status = 'acceptable';
      colorClass = 'acceptable';
    } else if (percentage <= 50) {
      status = 'moderate';
      colorClass = 'moderate';
    } else if (percentage <= 100) {
      status = 'critical';
      colorClass = 'critical';
    } else if ((percentage = 0)) {
      status = 'perfect';
      colorClass = 'perfect';
    }
  }

  const d = useDictionary();

  const RefreshResults = () => {
    vscode.postMessage({
      command: 'runGuideDogCheck',
    });
  };

  return (
    <div className={`status-indicator-container ${colorClass}`}>
      <div className="status-bar">
        <span>{d(`ui.headers.status.${status}`)}</span>
        <span className="paw-icon">
          <Icon name="Paw" width={24} height={24} />
        </span>
      </div>
      <div className="divider"></div>
      <div className="last-updated">
        {d('ui.text.lastUpdated')} <span>{lastUpdated}</span>
        <button className="refresh-button" onClick={() => RefreshResults()}>
          <AutorenewIcon width={24} height={24} style={{ fill: '#599CD8' }} />
        </button>
      </div>
    </div>
  );
};

export default StatusIndicator;
