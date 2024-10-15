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
  onRemove: () => void;
  vscode: any;
}

const IssueFix = ({
  fileName,
  lineNum,
  issue,
  impact,
  issueString,
  onRemove,
  vscode,
}: IssueFixProps) => {
  const [isActive, setIsActive] = useState(false);
  const [lineContent, setLineContent] = useState('');
  const [isFixed, setIsFixed] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const messageListener = (event: MessageEvent) => {
      const message = event.data;
      switch (message.command) {
        case 'fileOpened':
          if (message.fileName === fileName && message.lineNumber === lineNum) {
            setLineContent(message.lineContent);
          }
          break;
        case 'lineReplaced':
          if (message.fileName === fileName && message.lineNumber === lineNum) {
            setIsFixed(true);
            setLineContent(issueString);
          }
          break;
      }
    };

    window.addEventListener('message', messageListener);
    return () => window.removeEventListener('message', messageListener);
  }, [fileName, lineNum, issueString]);

  const handleFixClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    vscode.postMessage({
      command: 'replaceLine',
      fileName: fileName,
      lineNumber: lineNum,
      newContent: issueString,
    });
    onRemove();
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

  return (
    <div
      ref={componentRef}
      className={`issueFix ${isActive ? 'active' : ''}`}
      onClick={handleClick}>
      <div className="issueContents">
        <div className="issueInfo">
          <div className="lineNo">Ln. {lineNum}</div>
          <div className="issueType" style={{ color: impactStyles[getImpactStyle(impact)].title }}>
            {formatIssueType(issue)}
          </div>
        </div>
        {isActive && (
          <>
            <div className="fixInfo">
              <div className="fixLine">
                <CloseRounded style={{ color: '#FDA1A2', width: 16, height: 16 }} />
                <div className="issueText">{lineContent}</div>
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
