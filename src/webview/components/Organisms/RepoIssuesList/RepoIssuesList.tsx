import React from 'react';
import './RepoIssuesList.css';
import Link from '../../Atoms/Link/Link';
import { useDictionary } from '../../../hooks/useDictionary';

const RepoIssuesList = () => {
  const d = useDictionary();

  return (
    <div>
      <div className="headerGroup">
        <div className="title">{d('ui.boxes.issueList.title')}</div>
        <Link
          name={d('ui.links.history')}
          hasIcon={true}
          action={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div>
    </div>
  );
};

export default RepoIssuesList;
