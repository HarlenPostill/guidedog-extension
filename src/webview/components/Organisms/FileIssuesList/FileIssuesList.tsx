import React, { useMemo } from 'react';
import './FileIssuesList.css';
import Link from '../../Atoms/Link/Link';
import { useDictionary } from '../../../hooks/useDictionary';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import { InsertDriveFileOutlined } from '@mui/icons-material';
import IssueLine from '../../Molecules/IssueLine/IssueLine';

interface Issue {
  location: number;
  impact: string;
  type: string;
  improvement: string;
}

interface FileIssue {
  fileName: string;
  issues: Issue[];
}

interface FileIssuesListProps {
  hasSort?: boolean;
  vscode: any;
  switchToSingleDisplay: () => void;
  issuesData: FileIssue[];
  filePath: string;
}

const FileIssuesList = ({
  hasSort = false,
  issuesData,
  vscode,
  switchToSingleDisplay,
  filePath,
}: FileIssuesListProps) => {
  const d = useDictionary();

  const fileIssues = useMemo(() => {
    const file = issuesData.find(file => file.fileName === filePath);
    return file ? file.issues : [];
  }, [issuesData, filePath]);

  const fileName = filePath.split('/').pop() || '';

  return (
    <div className="fileIssuesList">
      <div className="headerGroup">
        <div className="title">
          {d('ui.boxes.issueList.title')}
          {hasSort && <SwapVertOutlinedIcon sx={{ fontSize: 19 }} />}
        </div>
        <Link
          name={d('ui.links.history')}
          hasIcon={true}
          action={() => {
            console.log('History not implemented');
          }}
        />
      </div>
      <div className="fileNameContainer">
        <div className="fileName">
          <InsertDriveFileOutlined style={{ width: '16px', height: '16px' }} />
          <div>{fileName}</div>
        </div>
        <div className="issuePill">
          {fileIssues.length} {d('ui.boxes.issueList.issuePillSuffix')}
        </div>
      </div>
      <div className="issuesContainer">
        {fileIssues.map((issue, index) => (
          <IssueLine
            key={index}
            fileName={filePath}
            lineNum={issue.location}
            issueString={issue.improvement}
            onMoreClick={() => {
              console.log('More clicked for', filePath, issue);
            }}
            switchToSingleDisplay={switchToSingleDisplay}
            vscode={vscode}
            onRemove={() => {
              console.log('Remove clicked for', filePath, issue);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FileIssuesList;
