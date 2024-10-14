import { InsertDriveFileOutlined, MoreHoriz } from '@mui/icons-material';
import React, { useRef, useState } from 'react';
import './IssueFix.css';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { useDictionary } from '../../../hooks/useDictionary';
import IssueButton from '../../Atoms/IssueButton/IssueButton';

interface IssueFixProps {
  fileName: string;
  lineNum: number;
  issueString: string;
  onMoreClick: () => void;
  onRemove: () => void;
  vscode: any;
  switchToSingleDisplay: () => void;
}

const IssueFix = ({
  fileName,
  lineNum,
  issueString,
  onMoreClick,
  onRemove,
  vscode,
  switchToSingleDisplay,
}: IssueFixProps) => {
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
    switchToSingleDisplay();
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

  return (
    <div className="issueFix">
      <div className="issueContents">
        <div className="issueInfo">
          <div className="lineNo">Ln. 45</div>
          <div className="issueType">no label provided</div>
        </div>
        <div className="fixInfo">
          <div className="fixLine">
            <CloseRoundedIcon htmlColor="#FDA1A2" style={{ width: '16', height: '16' }} />
            <div className="issueText">old line text goes here</div>
          </div>
          <div className="fixLine">
            <DoneRoundedIcon htmlColor="#4FED95" style={{ width: '16', height: '16' }} />
            <div className="issueText">new line text goes here</div>
          </div>
        </div>
        <div className="buttons">
          <IssueButton variant="fix" />
          <IssueButton variant="ignore" />
        </div>
      </div>
    </div>
  );
};

export default IssueFix;
