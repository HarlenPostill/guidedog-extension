import React, { useEffect, useState } from 'react';
import './StatusIndicator.css';
import Icon from '../../Atoms/Icon/Icon';
import { useDictionary } from '../../../hooks/useDictionary';

interface StatusIndicatorProps {
  percentage?: number;
  lastUpdated: string;
}

const StatusIndicator = ({ percentage, lastUpdated }: StatusIndicatorProps) => {
  let status = '';
  let colorClass = '';
  if (percentage) {
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

  const d = useDictionary();

  return (
    <div className={`status-indicator ${colorClass}`}>
      <div className="status">
        <span>{d(`ui.headers.status.${status}`)}</span>
        <span className="paw-icon">
          <Icon name="Paw" width={24} height={24} />
        </span>
      </div>
      <div className="last-updated">
        {d('ui.text.lastUpdated')} <span>{lastUpdated}</span>
        <button className="refresh-button">
          <Icon name="RefreshIcon" width={24} height={24} style={{ fill: 'white' }} />
        </button>
      </div>
    </div>
  );
};

export default StatusIndicator;
