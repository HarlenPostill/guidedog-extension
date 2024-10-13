import React from 'react';
import './FileIssuesList.css';
import Link from '../../Atoms/Link/Link';
import { useDictionary } from '../../../hooks/useDictionary';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import { InsertDriveFileOutlined } from '@mui/icons-material';

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
          <div>main.js</div>
        </div>
        <div className="issuePill">1 {d('ui.boxes.issueList.issuePillSuffix')}</div>
      </div>
      <div className="issuesContainer">{/* where the issue lines will go */}</div>
    </div>
  );
};

export default FileIssuesList;
