import './IssueFix.css';
import React, { useRef, useState, useEffect } from 'react';
import { CloseRounded, DoneRounded } from '@mui/icons-material';
import { useDictionary } from '../../../hooks/useDictionary';
import IssueButton from '../../Atoms/IssueButton/IssueButton';

interface IssueFixProps {
  fileName: string;
  lineNum: number;
  issue: string;
  impact: string;
  issueString: string;
  onMoreClick: () => void;
  onRemove: () => void;
  vscode: any;
  switchToSingleDisplay: () => void;
}

const IssueFix: React.FC<IssueFixProps> = ({
  fileName,
  lineNum,
  issue,
  impact,
  issueString,
  onMoreClick,
  onRemove,
  vscode,
  switchToSingleDisplay,
}) => {
  const [isActive, setIsActive] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const d = useDictionary();

  const handleClick = () => {
    if (!isActive) {
      setIsActive(true);
    }
    vscode.postMessage({
      command: 'openFile',
      fileName: fileName,
      lineNumber: lineNum,
    });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFixClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Fix clicked');
  };

  const handleIgnoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
  };

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

  const getImpactStyle = (impact: string): ImpactKey => {
    const lowerImpact = impact.toLowerCase();
    return (impactStyles.hasOwnProperty(lowerImpact) ? lowerImpact : 'default') as ImpactKey;
  };

  return (
    <div
      ref={componentRef}
      className={`issueFix ${isActive ? 'active' : ''}`}
      onClick={handleClick}>
      <div className="issueContents">
        <div className="issueInfo">
          <div className="lineNo">Ln. {lineNum}</div>
          <div className="issueType" style={{ color: impactStyles[getImpactStyle(impact)].title }}>
            {issue}
          </div>
        </div>
        {isActive && (
          <>
            <div className="fixInfo">
              <div className="fixLine">
                <CloseRounded style={{ color: '#FDA1A2', width: 16, height: 16 }} />
                <div className="issueText">{issueString}</div>
              </div>
              <div className="fixLine">
                <DoneRounded style={{ color: '#4FED95', width: 16, height: 16 }} />
                <div className="issueText">{issueString}</div>
              </div>
            </div>
            <div className="buttons">
              <IssueButton variant="fix" onClick={handleFixClick} />
              <IssueButton variant="ignore" onClick={handleIgnoreClick} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default IssueFix;
