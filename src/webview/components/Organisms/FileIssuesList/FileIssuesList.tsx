import React, { useMemo, useState, useEffect } from 'react';
import './FileIssuesList.css';
import Link from '../../Atoms/Link/Link';
import { useDictionary } from '../../../hooks/useDictionary';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import { InsertDriveFileOutlined } from '@mui/icons-material';
import IssueFix from '../../Molecules/IssueFix/IssueFix';
import NoIssues from '../../Molecules/NoIssues/NoIssues';
import Confetti from '../../Atoms/Confetti/Confetti';

interface Issue {
  lineNumber: number;
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
  issuesData: FileIssue[];
  filePath: string;
  showHistoryView: () => void;
}

const FileIssuesList = ({
  hasSort = false,
  issuesData,
  vscode,
  filePath,
  showHistoryView,
}: FileIssuesListProps) => {
  const d = useDictionary();
  const [localIssues, setLocalIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const file = issuesData.find(file => file.fileName === filePath);
    setLocalIssues(file ? file.issues : []);
  }, [issuesData, filePath]);

  const fileName = filePath.split('/').pop() || '';

  const handleRemove = (issueToRemove: Issue) => {
    setLocalIssues(prevIssues => prevIssues.filter(issue => issue !== issueToRemove));
    vscode.postMessage({
      command: 'removeIssue',
      fileName: filePath,
      lineNumber: issueToRemove.lineNumber,
      issueType: issueToRemove.type,
    });
  };

  return (
    <div className="fileIssuesList">
      {localIssues.length === 0 && <Confetti />} 

      <div className="headerGroup">
        <div className="title">
          {d('ui.boxes.issueList.title')}
          {hasSort && <SwapVertOutlinedIcon sx={{ fontSize: 19 }} />}
        </div>
        <Link name={d('ui.links.history')} hasIcon={true} action={showHistoryView} />
      </div>

      {localIssues.length === 0 ? (
        <NoIssues filename={fileName} showHistoryView={showHistoryView} />
      ) : (
        <div>
          <div className="fileNameContainer">
            <div className="fileName">
              <InsertDriveFileOutlined style={{ width: '16px', height: '16px' }} />
              <div>{fileName}</div>
            </div>
            <div className="issuePill">
              {localIssues.length} {d('ui.boxes.issueList.issuePillSuffix')}
            </div>
          </div>
          <div className="issuesContainer">
            {localIssues.map((issue, index) => (
              <IssueFix
                key={`${issue.lineNumber}-${index}`}
                fileName={filePath}
                issue={issue.type}
                impact={issue.impact}
                lineNum={issue.lineNumber}
                issueString={issue.improvement}
                vscode={vscode}
                onRemove={() => handleRemove(issue)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileIssuesList;
