import React from 'react';
import './RepoIssuesList.css';
import Link from '../../Atoms/Link/Link';
import ToolTip from '../../Atoms/ToolTip/ToolTip';
import { useDictionary } from '../../../hooks/useDictionary';

const RepoIssuesList = () => {
  const d = useDictionary();

  return (
    <div>
      <div className="headerGroup">
        <div className="title">
          <div>{d('ui.boxes.guideLinesViolations.title')}</div>
          <ToolTip text={d('ui.toolTips.WCAG')} />
        </div>
        <Link
          name={'See All'}
          action={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div>
    </div>
  );
};

export default RepoIssuesList;
