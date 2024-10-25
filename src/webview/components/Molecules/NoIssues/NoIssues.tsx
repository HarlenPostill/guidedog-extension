import React from 'react';
import './NoIssues.css';
import Button from '../../Atoms/Button/Button';
import Icon from '../../Atoms/Icon/Icon';
import { useDictionary } from '../../../hooks/useDictionary';

interface NoIssuesProps {
  filename: string;
  showHistoryView: () => void;
}

const NoIssues = ({ filename, showHistoryView }: NoIssuesProps) => {
  const d = useDictionary();

  return (
    <div className="noIssuesFrame">
      {/* Paw icons */}
      <div className="night">
        {Array.from({ length: 3 }).map((_, i) => (
          <div className="paw" key={i}>
            <Icon name="Paw" width={24} height={24} />
          </div>
        ))}
      </div>

      <div className="noIssueTitle">
        <div>{d('ui.boxes.noIssues.title')}</div>
        <div className="noIssueTag">
          <div>{d('ui.boxes.noIssues.startString')}</div>
          <div style={{ color: '#FDA1A2' }}>{d('ui.boxes.noIssues.middleString')}</div>
          <div>{d('ui.boxes.noIssues.endString')}</div>
        </div>
      </div>

      <div>{`${filename} ${d('ui.boxes.noIssues.compliance')}`}</div>
      
      {/* Button */}
      <Button text={d('ui.boxes.noIssues.button')} onClick={showHistoryView} />
    </div>
  );
};

export default NoIssues;
