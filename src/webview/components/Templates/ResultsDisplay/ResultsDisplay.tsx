import React, { useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import AccessibilityScore from '../../Molecules/AccessibilityScore/AccessibilityScore';
import Divider from '../../Atoms/Divider/Divider';

interface Issue {
  fileName: string;
  lineNumber: number;
  impact: string;
  type: string;
  improvement: string;
  timeAdded: string;
}

interface FileIssues {
  fileName: string;
  issues: Issue[];
}

interface ResultsDisplayProps {
  issuesData: FileIssues[];
  refreshHistory: () => void;
}

const ResultsDisplay = ({ issuesData, refreshHistory }: ResultsDisplayProps) => {
  useEffect(() => {
    refreshHistory();
  }, [refreshHistory]);

  const totalIssues = issuesData.reduce((sum, fileIssue) => sum + fileIssue.issues.length, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <AccessibilityScore score={totalIssues} />
      <Divider />
      <BarChart
        series={[{ data: [35, 44, 24, 34] }]}
        height={250}
        sx={{
          [`.${axisClasses.root}`]: {
            [`.${axisClasses.tick}, .${axisClasses.line}`]: {
              stroke: '#455A6E',
              strokeWidth: 2,
            },
            [`.${axisClasses.tickLabel}`]: {
              fill: '#455A6E',
            },
          },
        }}
        xAxis={[
          {
            data: ['qtip.xlsx', 'button.tsx', 'index.html', 'Index.tsx'],
            scaleType: 'band',
            colorMap: {
              type: 'ordinal',
              colors: ['#FF6D6D', '#FF9D68', '#FDA1A2', '#FFF568'],
            },
          },
        ]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
      <Divider />
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        yAxis={[
          {
            colorMap: {
              type: 'continuous',
              min: -10,
              max: 10,
              color: ['#fda1a226', '#FDA1A2'],
            },
          },
        ]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
            area: true,
          },
        ]}
        height={250}
        sx={{
          [`.${axisClasses.root}`]: {
            [`.${axisClasses.tick}, .${axisClasses.line}`]: {
              stroke: '#455A6E',
              strokeWidth: 2,
            },
            [`.${axisClasses.tickLabel}`]: {
              fill: '#455A6E',
            },
          },
          '& .MuiAreaElement-series-Germany': {
            fill: "url('#myGradient')",
          },
        }}
      />
    </div>
  );
};

export default ResultsDisplay;
