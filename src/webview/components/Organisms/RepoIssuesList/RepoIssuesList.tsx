import React, { useMemo, useState } from 'react';
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
  switchToSingleDisplay: () => void;

  issuesData: FileIssues[];
}

interface GroupedIssues {
  [key: string]: {
    count: number;
    issues: Array<{ fileName: string; issue: Issue; id: string }>;
  };
}

const RepoIssuesList = ({
  hasSort = false,
  issuesData,
  vscode,
  switchToSingleDisplay,
}: RepoIssuesListProps) => {
  const d = useDictionary();
  const [removedIssues, setRemovedIssues] = useState<Set<string>>(new Set());

  const groupedIssues = useMemo(() => {
    const groups: GroupedIssues = {};
    issuesData.forEach((fileIssue, fileIndex) => {
      fileIssue.issues.forEach((issue, issueIndex) => {
        if (!groups[issue.type]) {
          groups[issue.type] = { count: 0, issues: [] };
        }
        const id = `${fileIndex}-${issueIndex}`;
        if (!removedIssues.has(id)) {
          groups[issue.type].count += 1;
          groups[issue.type].issues.push({ fileName: fileIssue.fileName, issue, id });
        }
      });
    });

    Object.keys(groups).forEach(key => {
      if (groups[key].count === 0) {
        delete groups[key];
      }
    });

    return groups;
  }, [issuesData, removedIssues]);

  const formatIssueType = (type: string) => {
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleRemoveIssue = (id: string, issueType: string) => {
    setRemovedIssues(prev => {
      const newSet = new Set(prev).add(id);
      const updatedGroupIssues = groupedIssues[issueType].issues.filter(item => item.id !== id);
      if (updatedGroupIssues.length === 0) {
        setTimeout(() => setRemovedIssues(new Set(newSet)), 0);
      }

      return newSet;
    });
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
            console.log('History not implemented');
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
            {group.issues.map(item => (
              <IssueLine
                key={item.id}
                fileName={item.fileName}
                lineNum={item.issue.location}
                issueString={`${item.issue.impact} impact - ${item.issue.improvement}`}
                onMoreClick={() => {
                  console.log('More clicked for', item.fileName, item.issue);
                }}
                switchToSingleDisplay={switchToSingleDisplay}
                onRemove={() => handleRemoveIssue(item.id, issueType)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepoIssuesList;
