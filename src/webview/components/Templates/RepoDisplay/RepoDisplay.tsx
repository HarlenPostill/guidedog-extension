import React, { useMemo } from 'react';
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
        perc: (critical / total) * 100 || 0,
        oper: (serious / total) * 100 || 0,
        unde: (moderate / total) * 100 || 0,
        robu: (minor / total) * 100 || 0,
      },
      violationsOverview: {
        A: minor,
        AA: critical + moderate,
        AAA: serious,
      },
    };
  }, [issuesData]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <ScoreBreakdown {...scoreBreakdown} />
      <Divider />
      <ViolationsOverview {...violationsOverview} />
      <Divider />
      <RepoIssuesList
        vscode={vscode}
        switchToSingleDisplay={switchToSingleDisplay}
        issuesData={issuesData}
      />
      <Divider />
    </div>
  );
};

export default RepoDisplay;
