import React from 'react';
import AccessibilityScore from '../../Molecules/AccessibilityScore/AccessibilityScore';
import ActionItems from '../../Molecules/ActionItems/ActionItems';
import WebComparison from '../../Molecules/WebComparison/WebComparison';

const SingleDisplay = (vscode: any) => {
  return (
    <>
      <ActionItems vscode={vscode} />
      <AccessibilityScore score={100} />
      <WebComparison vscode={vscode} />
    </>
  );
};

export default SingleDisplay;
