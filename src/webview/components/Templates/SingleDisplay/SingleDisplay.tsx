import React from 'react';
import FileIssuesList from '../../Organisms/FileIssuesList/FileIssuesList';

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

interface SingleDisplayProps {
  vscode: any;
  switchToSingleDisplay: () => void;
  issuesData: FileIssues[];
}

const SingleDisplay = ({ vscode, switchToSingleDisplay, issuesData }: SingleDisplayProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <FileIssuesList
        hasSort={true}
        vscode={vscode}
        switchToSingleDisplay={switchToSingleDisplay}
        issuesData={issuesData}
        filePath="src/pages/HomePage.tsx"
      />
    </div>
  );
};

export default SingleDisplay;
