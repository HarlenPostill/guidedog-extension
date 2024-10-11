import React, { useState } from 'react';
import { InsertDriveFileOutlined, MoreHoriz } from '@mui/icons-material';
import './IssueLine.css';
import { useDictionary } from '../../../hooks/useDictionary';

interface IssueLineProps {
  fileName: string;
  lineNum: number;
  issueString: string;
  onMoreClick: () => void;
}

declare const acquireVsCodeApi: () => {
  postMessage: (message: any) => void;
};

const vscode = acquireVsCodeApi();

const IssueLine = ({ fileName, lineNum, issueString, onMoreClick }: IssueLineProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const d = useDictionary();
  const extractedFileName = fileName.split('/').pop();

  const handleClick = () => {
    vscode.postMessage({
      command: 'openFile',
      fileName: fileName,
      lineNumber: lineNum,
    });
  };

  return (
    <div
      className={`issueFrame ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}>
      <div className="issueInfo">
        <div className="issueFile">
          <InsertDriveFileOutlined style={{ width: '16px', height: '16px' }} />
          <div className="fileName">{extractedFileName}</div>
        </div>
        <div className="issueLine">
          <div className="fileName">
            {d('ui.boxes.issueList.linePrefix')}
            {lineNum}
          </div>
          <div className="issueDesc">{issueString}</div>
        </div>
        <MoreHoriz
          style={{ width: '16px', height: '16px', cursor: 'pointer' }}
          onClick={e => {
            e.stopPropagation();
            onMoreClick();
          }}
        />
      </div>
    </div>
  );
};

export default IssueLine;
