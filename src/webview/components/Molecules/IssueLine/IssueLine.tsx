import React, { useState } from 'react';
import { InsertDriveFileOutlined, MoreHoriz } from '@mui/icons-material';
import './IssueLine.css';

interface IssueLineProps {
  fileName: string;
  lineNum: number;
  issueString: string;
  onMoreClick: () => void;
}

const IssueLine = ({ fileName, lineNum, issueString, onMoreClick }: IssueLineProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`issueFrame ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="issueInfo">
        <div className="issueFile">
          <InsertDriveFileOutlined style={{ width: '16px', height: '16px' }} />
          <div className="fileName">{fileName}</div>
        </div>
        <div className="issueLine">
          <div className="fileName">Line {lineNum}</div>
          <div className="issueDesc">{issueString}</div>
        </div>
        <MoreHoriz
          style={{ width: '16px', height: '16px', cursor: 'pointer' }}
          onClick={onMoreClick}
        />
      </div>
    </div>
  );
};

export default IssueLine;
