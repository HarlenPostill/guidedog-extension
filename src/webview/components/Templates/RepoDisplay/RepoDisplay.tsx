import React from 'react';
import WaterLevelPawPrint from '../../Molecules/WaterLevelPawPrint/WaterLevelPawPrint';
import ViolationsOverview from '../../Organisms/ViolationsOverview/ViolationsOverview';
import Divider from '../../Atoms/Divider/Divider';
import RepoIssuesList from '../../Organisms/RepoIssuesList/RepoIssuesList';
import ScoreBreakdown from '../../Molecules/ScoreBreakdown/ScoreBreakdown';

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
      <ScoreBreakdown perc={10} oper={25} unde={20} robu={30} />
      <Divider />
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
