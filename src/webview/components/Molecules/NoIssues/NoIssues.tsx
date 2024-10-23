import React from 'react';
import './NoIssues.css';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import Button from '../../Atoms/Button/Button';
import { useDictionary } from '../../../hooks/useDictionary';
interface NoIssuesProps {
  filename: string;
  showHistoryView: () => void;
}

const NoIssues = ({ filename, showHistoryView }: NoIssuesProps) => {
  const d = useDictionary();

  return (
    <div className="noIssuesFrame">
      <AccessibleForwardIcon style={{ width: '100px', height: '100px' }} />
      <div className="noIssueTitle">
        <div>{d('ui.boxes.noIssues.title')}</div>
        <div className="noIssueTag">
          <div>{d('ui.boxes.noIssues.startString')}</div>
          <div style={{ color: '#FDA1A2' }}>{d('ui.boxes.noIssues.middleString')}</div>
          <div>{d('ui.boxes.noIssues.endString')}</div>
        </div>
      </div>
      <div>{`${filename} ${d('ui.boxes.noIssues.compliance')}`}</div>
      <Button text={d('ui.boxes.noIssues.button')} onClick={showHistoryView} />
    </div>
  );
};

export default NoIssues;
