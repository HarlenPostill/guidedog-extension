import React from 'react';
import './RepoIssuesList.css';
import Link from '../../Atoms/Link/Link';
import { useDictionary } from '../../../hooks/useDictionary';
import PetsIcon from '@mui/icons-material/Pets';

import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import { MoreHoriz, InsertDriveFileOutlined } from '@mui/icons-material';
import IssueLine from '../../Molecules/IssueLine/IssueLine';
interface RepoIssuesListProps {
  hasSort?: boolean;
}

const RepoIssuesList = ({ hasSort = false }: RepoIssuesListProps) => {
  const d = useDictionary();

  return (
    <div className="repoIssuesList">
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
          {/* the component will go here*/}
          <IssueLine
            fileName={'Page.js'}
            lineNum={47}
            issueString={'big long issue here'}
            onMoreClick={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
          <IssueLine
            fileName={'Page.js'}
            lineNum={47}
            issueString={'super long issue desctipions is here and you know what i mean'}
            onMoreClick={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
          <IssueLine
            fileName={'Page.js'}
            lineNum={47}
            issueString={'big long issue here'}
            onMoreClick={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RepoIssuesList;
