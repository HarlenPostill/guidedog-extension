import React from 'react';
import ActionItems from '../../ActionItems/ActionItems';
import AccessibilityScore from '../../AccessibilityScore/AccessibilityScore';
import Icon from '../../Icon/Icon';
import PawGraph from '../../PawGraph/PawGraph';
import WebComparison from '../../WebComparison/WebComparison';

const ResultsDisplay = (vscode: any) => {
  return (
    <>
      <ActionItems vscode={vscode} />
      <AccessibilityScore score={100} />
      <WebComparison vscode={vscode} />
      <PawGraph aViolations={200} aaViolations={70} aaaViolations={30} />
      <Icon name={'ZoomOutIcon'} />
    </>
  );
};

export default ResultsDisplay;
