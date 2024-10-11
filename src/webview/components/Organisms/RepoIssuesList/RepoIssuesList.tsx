import React, { useMemo } from 'react';
import './RepoIssuesList.css';
import Link from '../../Atoms/Link/Link';
import { useDictionary } from '../../../hooks/useDictionary';
import PetsIcon from '@mui/icons-material/Pets';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import IssueLine from '../../Molecules/IssueLine/IssueLine';

interface Issue {
  location: number;
  impact: string;
  type: string;
  improvement: string;
}

interface FileIssues {
  fileName: string;
  issues: Issue[];
}

interface RepoIssuesListProps {
  hasSort?: boolean;
  vscode: any;
  issuesData: FileIssues[];
}

interface GroupedIssues {
  [key: string]: {
    count: number;
    issues: Array<{ fileName: string; issue: Issue }>;
  };
}

const RepoIssuesList = ({ hasSort = false, issuesData, vscode }: RepoIssuesListProps) => {
  const d = useDictionary();

  const groupedIssues = useMemo(() => {
    const groups: GroupedIssues = {};
    issuesData.forEach(fileIssue => {
      fileIssue.issues.forEach(issue => {
        if (!groups[issue.type]) {
          groups[issue.type] = { count: 0, issues: [] };
        }
        groups[issue.type].count += 1;
        groups[issue.type].issues.push({ fileName: fileIssue.fileName, issue });
      });
    });
    return groups;
  }, [issuesData]);

  const totalIssues = Object.values(groupedIssues).reduce((total, group) => total + group.count, 0);

  const formatIssueType = (type: string) => {
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

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
          action={() => {
            console.log('History action not implemented');
          }}
        />
      </div>
      <div className="issuesContainer">
        {Object.entries(groupedIssues).map(([issueType, group]) => (
          <div key={issueType} className="issueGroup">
            <div className="issueHeader">
              <div className="issueTitle">
                <PetsIcon sx={{ fontSize: 12 }} htmlColor="FF6D6D" />
                <div>{formatIssueType(issueType)}</div>
              </div>
              <div className="issuePill">
                {group.count} {d('ui.boxes.issueList.issuePillSuffix')}
              </div>
            </div>
            {group.issues.map((item, index) => (
              <IssueLine
                vscode={vscode}
                key={`${issueType}-${index}`}
                fileName={item.fileName}
                lineNum={item.issue.location}
                issueString={`${item.issue.impact} impact - ${item.issue.improvement}`}
                onMoreClick={() => {
                  console.log('More clicked for', item.fileName, item.issue);
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="totalIssues">Total Issues: {totalIssues}</div>
    </div>
  );
};

export default RepoIssuesList;
