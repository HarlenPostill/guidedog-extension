import React, { useEffect } from 'react';
import FileIssuesList from '../../Organisms/FileIssuesList/FileIssuesList';
import HistoryIssuesList from '../../Organisms/HistoryIssuesList/HistoryIssuesList';

interface Issue {
  fileName: string;
  lineNumber: number;
  impact: string;
  type: string;
  improvement: string;
  timeAdded: string;
}

interface FileIssues {
  fileName: string;
  issues: Issue[];
}

interface SingleDisplayProps {
  issuesData: FileIssues[];
  refreshHistory: () => void;
}

const HistoryDisplay = ({ issuesData, refreshHistory }: SingleDisplayProps) => {
  useEffect(() => {
    refreshHistory();
  }, [refreshHistory]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <HistoryIssuesList hasSort={false} issuesData={issuesData} />
    </div>
  );
};

export default HistoryDisplay;
