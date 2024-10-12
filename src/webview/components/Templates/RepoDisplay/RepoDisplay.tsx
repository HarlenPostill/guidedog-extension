import React from 'react';
import WaterLevelPawPrint from '../../Molecules/WaterLevelPawPrint/WaterLevelPawPrint';
import ViolationsOverview from '../../Organisms/ViolationsOverview/ViolationsOverview';
import Divider from '../../Atoms/Divider/Divider';
import RepoIssuesList from '../../Organisms/RepoIssuesList/RepoIssuesList';

interface Issue {
  location: number;
  impact: string;
  type: string;
  improvement: string;
}

interface FileIssues {
  fileName: string;
  issues: Issue[];
}

interface RepoDisplayProps {
  vscode: any;
  switchToSingleDisplay: () => void;
  issuesData: FileIssues[];
}

const RepoDisplay = ({ vscode, switchToSingleDisplay, issuesData }: RepoDisplayProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <ViolationsOverview A={100} AA={50} AAA={100} />
      <Divider />
      <RepoIssuesList
        vscode={vscode}
        switchToSingleDisplay={switchToSingleDisplay}
        issuesData={issuesData}
      />
      <Divider />
    </div>
  );
};

export default RepoDisplay;
