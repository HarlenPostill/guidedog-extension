import React, { useState, useRef, useEffect } from 'react';
import { InsertDriveFileOutlined, MoreHoriz } from '@mui/icons-material';
import './IssueLine.css';
import { useDictionary } from '../../../hooks/useDictionary';
import ActionDropdown from '../../Atoms/ActionDropdown/ActionDropdown';

interface IssueLineProps {
  fileName: string;
  lineNum: number;
  issueString: string;
  onMoreClick: () => void;
  onRemove: () => void;
}
declare const acquireVsCodeApi: () => {
  postMessage: (message: any) => void;
};

const vscode = acquireVsCodeApi();

const IssueLine = ({ fileName, lineNum, issueString, onMoreClick, onRemove }: IssueLineProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const d = useDictionary();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const extractedFileName = fileName.split('/').pop();

  const handleClick = () => {
    vscode.postMessage({
      command: 'openFile',
      fileName: fileName,
      lineNumber: lineNum,
    });
  };

  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
    onMoreClick();
  };

  const handleActionClick = (action: string, e: React.MouseEvent) => {
    e.stopPropagation();
    switch (action) {
      case 'Navigate':
        handleClick();
        break;
      case 'Ignore':
        onRemove();
        break;
      case 'Fix':
        // nothing for now
        console.log('Fix clicked');
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <MoreHoriz
            style={{ width: '16px', height: '16px', cursor: 'pointer' }}
            onClick={handleMoreClick}
          />
          <ActionDropdown
            isOpen={isDropdownOpen}
            onClose={() => setIsDropdownOpen(false)}
            onActionClick={(action: string, e: React.MouseEvent<Element, MouseEvent>) =>
              handleActionClick(action, e)
            }
            fileName={fileName}
            lineNum={lineNum}
          />
        </div>
      </div>
    </div>
  );
};

export default IssueLine;
