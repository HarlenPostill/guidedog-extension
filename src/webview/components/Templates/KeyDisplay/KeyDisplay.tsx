import React, { useEffect, useState } from 'react';
import { useDictionary } from '../../../hooks/useDictionary';
import './KeyDisplay.css';

interface KeyDisplayProps {
  vscode: any;
  keyDisplayComplete: (isValid: boolean) => void;
}

const KeyDisplay = ({ vscode, keyDisplayComplete }: KeyDisplayProps) => {
  const d = useDictionary();
  const [key, setKey] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [installStatus, setInstallStatus] = useState<'idle' | 'installing' | 'complete' | 'error'>(
    'idle'
  );
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
    setIsValid(null);
    setError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (key.length < 10) {
      setIsValid(false);
      setError(d('ui.boxes.keyDisplay.tooShort'));
      return;
    }

    setIsValid(true);
    setInstallStatus('installing');

    // Trigger the installation process
    vscode.postMessage({
      command: 'initGuidedog',
      apiKey: key,
    });
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;

      if (message.command === 'installStatus') {
        setInstallStatus(message.status);
        if (message.progress !== undefined) {
          setProgress(message.progress);
        }
        if (message.error) {
          setError(message.error);
        }
        if (message.status === 'complete') {
          // Wait a moment to show completion before moving on
          setTimeout(() => {
            keyDisplayComplete(true);
          }, 1000);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [keyDisplayComplete]);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="onboarding-container">
      <h1 className={`key ${isAnimating ? 'animate' : ''}`}>
        <span className="title" style={{ marginBottom: '20px' }}>
          {d('ui.boxes.keyDisplay.title')}
        </span>
      </h1>

      <input
        type="text"
        disabled={installStatus === 'installing'}
        placeholder={d('ui.boxes.keyDisplay.input')}
        value={key}
        onChange={handleKeyChange}
        onKeyUp={handleKeyPress}
        className={`placeholder ${isValid === false ? 'error' : ''}`}
      />

      {error && <div className="error-message">{error}</div>}

      {installStatus !== 'idle' && (
        <div className="install-status">
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{
                width: `${progress}%`,
                backgroundColor: installStatus === 'error' ? '#ff4444' : '#4CAF50',
              }}
            />
          </div>
          <div className="status-text">
            {installStatus === 'installing' && d('ui.boxes.keyDisplay.installing')}
            {installStatus === 'complete' && d('ui.boxes.keyDisplay.installComplete')}
            {installStatus === 'error' && d('ui.boxes.keyDisplay.installError')}
          </div>
        </div>
      )}
    </div>
  );
};
export default KeyDisplay;
