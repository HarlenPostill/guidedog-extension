import './HistoryIssue.css';
import React, { useRef, useState, useEffect } from 'react';
import { useDictionary } from '../../../hooks/useDictionary';
import { InsertDriveFileOutlined, MoreHoriz } from '@mui/icons-material';
import ActionDropdown from '../../Atoms/ActionDropdown/ActionDropdown';
import { getTimeOrDate } from '../../../helpers/timeHelper';

interface HistoryIssueProps {
  fileName?: string;
  lineNum: number;
  issue: string;
  impact: string;
  issueString: string;
  timeAdded: string;
}

const impactStyles = {
  critical: {
    title: '#FF6D6D',
  },
  serious: {
    title: '#FF9D68',
  },
  moderate: {
    title: '#FDA1A2',
  },
  minor: {
    title: '#FFF568',
  },
  default: {
    title: '#CCCCCC',
  },
};

type ImpactKey = keyof typeof impactStyles;

const formatIssueType = (type: string) => {
  return type
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const getImpactStyle = (impact: string): ImpactKey => {
  const lowerImpact = impact.toLowerCase();
  return (impactStyles.hasOwnProperty(lowerImpact) ? lowerImpact : 'default') as ImpactKey;
};

const HistoryIssue = ({
  fileName,
  lineNum,
  issueString,
  issue,
  impact,
  timeAdded,
}: HistoryIssueProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const d = useDictionary();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const extractedFileName = fileName ? fileName.split('/').pop() : 'Unknown File';

  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleActionClick = (action: string, e: React.MouseEvent) => {
    e.stopPropagation();
    switch (action) {
      case 'Navigate':
        console.log('Navigate');
        break;
      case 'Ignore':
        console.log('Ignore');
        break;
      case 'Fix':
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
      className={`issueFrame-history ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="historyIssueInfo">
        <div className="infoText" style={{ color: impactStyles[getImpactStyle(impact)].title }}>
          {formatIssueType(issue)}
        </div>
        <div className="infoText">{getTimeOrDate(timeAdded)}</div>
      </div>
      <div className="historyIssueInfo">
        <div className="issueFile">
          <InsertDriveFileOutlined style={{ width: '16px', height: '16px' }} />
          <div className="fileName" style={{ color: impactStyles[getImpactStyle(impact)].title }}>
            {extractedFileName}
          </div>
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
            fileName={fileName || ''}
            lineNum={lineNum}
          />
        </div>
      </div>
    </div>
  );
};

export default HistoryIssue;
