import React from 'react';
import AccessibilityScore from '../../Molecules/AccessibilityScore/AccessibilityScore';
import ActionItems from '../../Molecules/ActionItems/ActionItems';
import Icon from '../../Atoms/Icon/Icon';
import PawGraph from '../../Molecules/PawGraph/PawGraph';
import WebComparison from '../../Molecules/WebComparison/WebComparison';

const SingleDisplay = (vscode: any) => {
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

export default SingleDisplay;
