import React from 'react';
import WaterLevelPawPrint from '../../Molecules/WaterLevelPawPrint/WaterLevelPawPrint';
import ViolationsOverview from '../../Organisms/ViolationsOverview/ViolationsOverview';
import Divider from '../../Atoms/Divider/Divider';
import RepoIssuesList from '../../Organisms/RepoIssuesList/RepoIssuesList';

const RepoDisplay = (vscode: any) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <ViolationsOverview A={100} AA={50} AAA={100} />
      <Divider />
      <RepoIssuesList />
      <Divider />
    </div>
  );
};

export default RepoDisplay;
