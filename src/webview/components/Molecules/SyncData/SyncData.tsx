import React from 'react';
import Button from '../../Atoms/Button/Button';
import LastSync from '../../Atoms/LastSync/LastSync';

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
