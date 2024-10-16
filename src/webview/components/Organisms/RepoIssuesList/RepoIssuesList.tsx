import React, { useMemo, useState } from 'react';
import './RepoIssuesList.css';
import Link from '../../Atoms/Link/Link';
import { useDictionary } from '../../../hooks/useDictionary';
import PetsIcon from '@mui/icons-material/Pets';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import IssueLine from '../../Molecules/IssueLine/IssueLine';

interface Issue {
  lineNumber: number;
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

const impactStyles = {
  critical: {
    icon: '#FF6D6D',
    title: '#FF6D6D',
    pillBackground: '#743A3A',
    pillText: '#FDA1A2',
  },
  serious: {
    icon: '#FF9D68',
    title: '#FF9D68',
    pillBackground: '#734E39',
    pillText: '#FF9D68',
  },
  moderate: {
    icon: '#FDA1A2',
    title: '#FDA1A2',
    pillBackground: '#744F4F',
    pillText: '#FDA1A2',
  },
  minor: {
    icon: '#FFF568',
    title: '#FFF568',
    pillBackground: '#747038',
    pillText: '#FEFEB8',
  },
  default: {
    icon: '#CCCCCC',
    title: '#CCCCCC',
    pillBackground: '#444444',
    pillText: '#FFFFFF',
  },
};

type ImpactKey = keyof typeof impactStyles;

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

  const handleRemoveIssue = (
    id: string,
    issueType: string,
    fileName: string,
    lineNumber: number
  ) => {
    setRemovedIssues(prev => {
      const newSet = new Set(prev).add(id);
      const updatedGroupIssues = groupedIssues[issueType].issues.filter(item => item.id !== id);
      if (updatedGroupIssues.length === 0) {
        setTimeout(() => setRemovedIssues(new Set(newSet)), 0);
      }
      return newSet;
    });

    vscode.postMessage({
      command: 'removeIssue',
      fileName: fileName,
      lineNumber: lineNumber,
      issueType: issueType,
    });
  };

  const getImpactStyle = (impact: string): ImpactKey => {
    const lowerImpact = impact.toLowerCase();
    return (impactStyles.hasOwnProperty(lowerImpact) ? lowerImpact : 'default') as ImpactKey;
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
        {Object.entries(groupedIssues).map(([issueType, group]) => {
          const firstIssueImpact = group.issues[0]?.issue.impact || 'default';
          const styleKey = getImpactStyle(firstIssueImpact);

          return (
            <div key={issueType} className="issueGroup">
              <div className="issueHeader">
                <div className="issueTitle" style={{ color: impactStyles[styleKey].title }}>
                  <PetsIcon sx={{ fontSize: 12 }} htmlColor={impactStyles[styleKey].icon} />
                  <div>{formatIssueType(issueType)}</div>
                </div>
                <div
                  className="issuePill"
                  style={{
                    backgroundColor: impactStyles[styleKey].pillBackground,
                    color: impactStyles[styleKey].pillText,
                  }}>
                  {group.count} {d('ui.boxes.issueList.issuePillSuffix')}
                </div>
              </div>
              {group.issues.map(item => (
                <IssueLine
                  key={item.id}
                  fileName={item.fileName}
                  lineNum={item.issue.lineNumber}
                  issueString={item.issue.improvement}
                  onMoreClick={() => {
                    console.log('More clicked for', item.fileName, item.issue);
                  }}
                  switchToSingleDisplay={switchToSingleDisplay}
                  vscode={vscode}
                  onRemove={() =>
                    handleRemoveIssue(item.id, issueType, item.fileName, item.issue.lineNumber)
                  }
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RepoIssuesList;
