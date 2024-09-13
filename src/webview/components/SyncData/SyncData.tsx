import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';

const SyncData: React.FC = () => {
  const [lastSyncTime, setLastSyncTime] = useState<string>('');

  useEffect(() => {
    const formatTime = (date: Date) => {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    };

    // Set the last sync time when component mounts
    const now = new Date();
    setLastSyncTime(formatTime(now));

    // Update the time every second
    const interval = setInterval(() => {
      const newTime = new Date();
      setLastSyncTime(formatTime(newTime));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
      <Button
        text="Sync Files"
        onClick={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <div>
        <span style={{ fontSize: '12px' }}>Time since last sync:</span>
        <br />
        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{lastSyncTime}</span>
      </div>
    </div>
  );
};

export default SyncData;
