import React, { useState, useEffect } from 'react';
import './PawLoadingDisplay.css';
import WaterLevelPawPrint from '../../Molecules/WaterLevelPawPrint/WaterLevelPawPrint';
import { useDictionary } from '../../../hooks/useDictionary';

interface PawLoadingDisplayProps {
  loadingComplete: () => void;
  vscode: any;
}

const PawLoadingDisplay = ({ loadingComplete, vscode }: PawLoadingDisplayProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [checkStatus, setCheckStatus] = useState<'idle' | 'running' | 'complete' | 'error'>('idle');
  const d = useDictionary();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      if (message.command === 'checkStatus') {
        setCheckStatus(message.status);

        if (message.status === 'complete' || message.status === 'error') {
          setTimeout(() => {
            loadingComplete();
          }, 10000);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [loadingComplete]);

  useEffect(() => {
    setIsAnimating(true);
    vscode.postMessage({ command: 'runGuideDogCheck' });
  }, [vscode]);

  return (
    <div className="loading-container">
      <div className="background-layer-1"></div>
      <div className="background-layer-2"></div>
      <div className={`paw-loading ${isAnimating ? 'animate' : ''}`}>
        <WaterLevelPawPrint value1={2} value2={1} value3={1} speed={500} />
      </div>
      <h1 className={`title-loading ${isAnimating ? 'animate' : ''}`}>
        {checkStatus === 'running'
          ? d('ui.boxes.guideOnboarding.checkingText')
          : d('ui.boxes.guideOnboarding.loadingText')}
      </h1>
      <p className={`subtext-loading ${isAnimating ? 'animate' : ''}`}>
        {checkStatus === 'error'
          ? d('ui.boxes.guideOnboarding.errorText')
          : d('ui.boxes.guideOnboarding.subtitle')}
      </p>
    </div>
  );
};

export default PawLoadingDisplay;
