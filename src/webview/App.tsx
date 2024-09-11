import React from 'react';

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
      <h1>GuideDog Sidebar</h1>
      <button onClick={handleClick}>Initialise GuideDog</button>
      <button onClick={handleClickGit}>Runs Git</button>
    </div>
  );
};

export default App;
