import React from 'react';

const vscode = acquireVsCodeApi();

const App = () => {
  const handleClick = () => {
    vscode.postMessage({ command: 'buttonClick' });
  };

  return (
    <div>
      <h1>GuideDog Sidebar (React)</h1>
      <button onClick={handleClick}>Click Me!</button>
    </div>
  );
};

export default App;
