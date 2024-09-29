import React from 'react';
import AccessibilityScore from '../../AccessibilityScore/AccessibilityScore';
import ActionItems from '../../ActionItems/ActionItems';
import Icon from '../../Icon/Icon';
import PawGraph from '../../PawGraph/PawGraph';
import WebComparison from '../../WebComparison/WebComparison';

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
