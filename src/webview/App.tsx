import React from 'react';
import Header from './components/Header';
import ActionItems from './components/ActionItems/ActionItems';
import AccessibilityScore from './components/AccessibilityScore/AccessibilityScore';

const vscode = acquireVsCodeApi();

const App = () => {
  return (
    <div>
      <Header title="Welcome to GuideDog" />
      <ActionItems vscode={vscode} />
      <AccessibilityScore />
    </div>
  );
};

export default App;
