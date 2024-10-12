import React from 'react';
import ActionItems from '../../Molecules/ActionItems/ActionItems';
import AccessibilityScore from '../../Molecules/AccessibilityScore/AccessibilityScore';
import WebComparison from '../../Molecules/WebComparison/WebComparison';

const ResultsDisplay = (vscode: any) => {
  return (
    <>
      <ActionItems vscode={vscode} />
      <AccessibilityScore score={100} />
      <WebComparison vscode={vscode} />
    </>
  );
};

export default ResultsDisplay;
