import React, { useEffect, useState } from 'react';
import FileIssuesList from '../../Organisms/FileIssuesList/FileIssuesList';

interface Issue {
  lineNumber: number;
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
  issuesData: FileIssues[];
  showHistoryView: () => void;
}

const SingleDisplay = ({ vscode, issuesData, showHistoryView }: SingleDisplayProps) => {
  const [filePath, setFilePath] = useState<string>('');

  useEffect(() => {
    window.addEventListener('message', event => {
      const message = event.data;
      if (message.command === 'setFilePath') {
        setFilePath(message.filePath);
      }
    });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <FileIssuesList
        hasSort={true}
        vscode={vscode}
        issuesData={issuesData}
        filePath={filePath}
        showHistoryView={showHistoryView}
      />
    </div>
  );
};

export default SingleDisplay;
