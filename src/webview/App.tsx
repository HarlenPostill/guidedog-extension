import React from 'react';
import Button from './components/Button';
import Header from './components/Header';

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
      <Header title="GuideDog Sidebar (React)" />
      <Button text="Click Me!" onClick={handleClick} />
      <button onClick={handleClick}>Initialise GuideDog</button>
      <button onClick={handleClickGit}>Runs Git</button>
    </div>
  );
};

export default App;
