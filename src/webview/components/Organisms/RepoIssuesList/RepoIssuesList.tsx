import React from 'react';
import './RepoIssuesList.css';
import Link from '../../Atoms/Link/Link';
import { useDictionary } from '../../../hooks/useDictionary';
import PetsIcon from '@mui/icons-material/Pets';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';

interface RepoIssuesListProps {
  hasSort?: boolean;
}

const RepoIssuesList = ({ hasSort = false }: RepoIssuesListProps) => {
  const d = useDictionary();

  return (
    <div>
      <div className="headerGroup">
        <div className="title">
          {d('ui.boxes.issueList.title')}
          {hasSort && <SwapVertOutlinedIcon sx={{ fontSize: 19 }} />}
        </div>
        <Link
          name={d('ui.links.history')}
          hasIcon={true}
          action={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div>
      <div className="issuesContainer">
        <div className="issueGroup">
          <div className="issueHeader">
            <div className="issueTitle">
              <PetsIcon sx={{ fontSize: 12 }} htmlColor="FF6D6D" />
              <div>Missing alt text </div>
            </div>
            <div className="issuePill">5 issues</div>
          </div>
          <span>random text</span>
          <span>random text 2</span>
        </div>
      </div>
    </div>
  );
};

export default RepoIssuesList;
