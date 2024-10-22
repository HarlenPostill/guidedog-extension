import { InsertDriveFileOutlined } from '@mui/icons-material';
import React from 'react';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import { useDictionary } from '../../../hooks/useDictionary';
import HistoryIssue from '../../Molecules/HistoryIssue/HistoryIssue';
import '../FileIssuesList/FileIssuesList.css';

interface Issue {
  fileName: string;
  lineNumber: number;
  impact: string;
  type: string;
  improvement: string;
  timeAdded: string;
}

interface FileIssue {
  fileName: string;
  issues: Issue[];
}

interface HistoryIssuesListProps {
  hasSort?: boolean;
  issuesData: FileIssue[];
}

const HistoryIssuesList = ({ hasSort, issuesData }: HistoryIssuesListProps) => {
  const d = useDictionary();
  const totalIssues = issuesData.reduce((sum, fileIssue) => sum + fileIssue.issues.length, 0);

  return (
    <div className="fileIssuesList">
      <div className="headerGroup">
        <div className="title">
          {d('ui.boxes.history.title')}
          {hasSort && <SwapVertOutlinedIcon sx={{ fontSize: 19 }} />}
        </div>
      </div>
      <div className="fileNameContainer">
        <div className="fileName">
          <InsertDriveFileOutlined style={{ width: '16px', height: '16px' }} />
          <div>{d('ui.boxes.history.subTitle')}</div>
        </div>
        <div className="issuePill">
          {totalIssues} {d('ui.boxes.history.issuePillSuffix')}
        </div>
      </div>
      <div className="issuesContainer">
        {issuesData.map(fileIssue => (
          <React.Fragment key={fileIssue.fileName}>
            {fileIssue.issues.map((issue, index) => (
              <HistoryIssue
                key={`${fileIssue.fileName}-${index}`}
                issue={issue.type}
                impact={issue.impact}
                lineNum={issue.lineNumber}
                issueString={issue.improvement}
                timeAdded={issue.timeAdded}
                fileName={issue.fileName || fileIssue.fileName}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default HistoryIssuesList;
