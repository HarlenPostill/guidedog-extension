import React from 'react';
import Button from './components/Button/Button';
import Header from './components/Header';
import SyncData from './components/SyncData/SyncData';

const vscode = acquireVsCodeApi();

const App = () => {
  const handleClick = () => {
    vscode.postMessage({ command: 'buttonClick' });
  };
  const handleClickGit = () => {
    vscode.postMessage({ command: 'buttonGit' });
  };

  return (
    <div>
      <Header title="Welcome to GuideDog" />
      <SyncData />
      <br />
      <Button
        text="Manual Sync"
        onClick={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </div>
  );
};

export default App;
