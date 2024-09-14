import React from 'react';
import Button from '../Button/Button';
import LastSync from '../LastSync/LastSync';

const SyncData = (vscode: any) => {
  const handleClick = () => {
    vscode.postMessage({ command: 'buttonClick' });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
      <Button text="Manual Sync" variant="outlined" onClick={handleClick} />
      <LastSync />
    </div>
  );
};

export default SyncData;
