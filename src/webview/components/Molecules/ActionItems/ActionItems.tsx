import React from 'react';
import SyncData from '../SyncData/SyncData';
import Button from '../../Atoms/Button/Button';
import Divider from '../../Atoms/Divider/Divider';

const ActionItems = (vscode: any) => {
  const handleClickGit = () => {
    vscode.postMessage({ command: 'buttonGit' });
  };

  return (
    <div style={{ display: 'grid', gap: 15, marginBottom: '0.67em' }}>
      <SyncData vscode={vscode} />
      <Button text="Guide Me" onClick={handleClickGit} />
      <Divider />
    </div>
  );
};

export default ActionItems;
