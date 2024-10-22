import React, { useMemo, useRef } from 'react';
import WaterLevelPawPrint from '../../Molecules/WaterLevelPawPrint/WaterLevelPawPrint';
import ViolationsOverview from '../../Organisms/ViolationsOverview/ViolationsOverview';
import Divider from '../../Atoms/Divider/Divider';
import RepoIssuesList from '../../Organisms/RepoIssuesList/RepoIssuesList';
import ScoreBreakdown from '../../Molecules/ScoreBreakdown/ScoreBreakdown';

interface Issue {
  lineNumber: number;
  impact: 'critical' | 'serious' | 'moderate' | 'minor';
  type: string;
  improvement: string;
}

interface FileIssues {
  fileName: string;
  issues: Issue[];
}

interface RepoDisplayProps {
  vscode: any;
  switchToSingleDisplay: () => void;
  issuesData: FileIssues[];
}

const RepoDisplay = ({ vscode, switchToSingleDisplay, issuesData }: RepoDisplayProps) => {
  const repoIssuesListRef = useRef<HTMLDivElement>(null);

  const { scoreBreakdown, violationsOverview } = useMemo(() => {
    let critical = 0,
      serious = 0,
      moderate = 0,
      minor = 0;

    issuesData.forEach(file => {
      file.issues.forEach(issue => {
        switch (issue.impact) {
          case 'critical':
            critical++;
            break;
          case 'serious':
            serious++;
            break;
          case 'moderate':
            moderate++;
            break;
          case 'minor':
            minor++;
            break;
        }
      });
    });

    const total = critical + serious + moderate + minor;

    return {
      scoreBreakdown: {
        perc: minor,
        oper: moderate,
        unde: serious,
        robu: critical,
        total: total
      },
      violationsOverview: {
        A: minor,
        AA: critical + moderate,
        AAA: serious,
      },
    };
  }, [issuesData]);

  const scrollToRepoIssuesList = () => {
    repoIssuesListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <ScoreBreakdown {...scoreBreakdown} />
      <Divider />
      <ViolationsOverview {...violationsOverview} onSeeAllClick={scrollToRepoIssuesList} />
      <Divider />
      <div ref={repoIssuesListRef}>
        <RepoIssuesList
          vscode={vscode}
          switchToSingleDisplay={switchToSingleDisplay}
          issuesData={issuesData}
        />
      </div>
      <Divider />
    </div>
  );
};

export default RepoDisplay;
