import React, { useEffect, useState } from 'react';
import './StatusIndicator.css';
import Icon from '../../Atoms/Icon/Icon';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useDictionary } from '../../../hooks/useDictionary';

interface StatusIndicatorProps {
  percentage?: number;
  vscode: {
    postMessage: (message: { command: string }) => void;
  };
}

interface FileModMessage {
  command: string;
  modTime?: string;
}

const StatusIndicator = ({ percentage, vscode }: StatusIndicatorProps) => {
  const [timeDiff, setTimeDiff] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const d = useDictionary();

  let status = '';
  let colorClass = '';

  if (percentage !== undefined) {
    if (percentage === 0) {
      status = 'perfect';
      colorClass = 'perfect';
    } else if (percentage <= 25) {
      status = 'acceptable';
      colorClass = 'acceptable';
    } else if (percentage <= 50) {
      status = 'moderate';
      colorClass = 'moderate';
    } else if (percentage <= 100) {
      status = 'critical';
      colorClass = 'critical';
    }
  }

  useEffect(() => {
    const getFileModTime = () => {
      vscode.postMessage({ command: 'getFileModTime' });
    };

    const messageListener = (event: MessageEvent<FileModMessage>) => {
      const message = event.data;
      if (message.command === 'fileModTime' && message.modTime) {
        const diff = Math.floor(
          (new Date().getTime() - new Date(message.modTime).getTime()) / 60000
        );
        setTimeDiff(diff);
      }
    };

    window.addEventListener('message', messageListener);
    getFileModTime();
    const interval = setInterval(getFileModTime, 60000);

    return () => {
      window.removeEventListener('message', messageListener);
      clearInterval(interval);
    };
  }, [vscode]);

  const RefreshResults = () => {
    setIsSpinning(true);
    vscode.postMessage({
      command: 'runGuideDogCheck',
    });
  };

  const getTimeDisplay = () => {
    if (timeDiff < 1) {
      return d('ui.time.now');
    }
    if (timeDiff < 60) {
      return (
        <>
          {timeDiff} {timeDiff === 1 ? d('ui.time.minute') : d('ui.time.minutes')}{' '}
          {d('ui.time.suffix')}
        </>
      );
    }
    const hours = Math.floor(timeDiff / 60);
    if (hours < 24) {
      return (
        <>
          {hours} {hours === 1 ? d('ui.time.hour') : d('ui.time.hours')} {d('ui.time.suffix')}
        </>
      );
    }
    const days = Math.floor(hours / 24);
    return (
      <>
        {days} {days === 1 ? d('ui.time.day') : d('ui.time.days')} {d('ui.time.suffix')}
      </>
    );
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
        {d('ui.text.lastUpdated')} <span>{getTimeDisplay()}</span>
        <button className="refresh-button" onClick={RefreshResults}>
          <AutorenewIcon className={isSpinning ? 'spinning' : ''} style={{ fill: '#599CD8' }} />
        </button>
      </div>
    </div>
  );
};

export default StatusIndicator;
