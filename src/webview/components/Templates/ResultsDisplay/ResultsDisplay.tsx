import React, { useEffect, useMemo } from 'react';
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

  // Calculate impact counts per file
  const impactData = useMemo(() => {
    const impacts = ['critical', 'serious', 'moderate', 'minor'];
    const impactCounts = impacts.map(impact => {
      let maxCount = 0;
      let fileName = '';

      issuesData.forEach(file => {
        const count = file.issues.filter(issue => issue.impact === impact).length;
        if (count > maxCount) {
          maxCount = count;
          fileName = file.fileName.split('/').pop() || file.fileName;
        }
      });

      return {
        impact,
        count: maxCount,
        fileName,
      };
    });

    return impactCounts;
  }, [issuesData]);

  const dailyData = useMemo(() => {
    const dateIssues = new Map();

    issuesData.forEach(file => {
      file.issues.forEach(issue => {
        if (issue.timeAdded) {
          const date = new Date(issue.timeAdded).toLocaleDateString();
          dateIssues.set(date, (dateIssues.get(date) || 0) + 1);
        }
      });
    });

    const sortedDates = Array.from(dateIssues.keys()).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    return {
      dates: sortedDates,
      counts: sortedDates.map(date => dateIssues.get(date)),
    };
  }, [issuesData]);

  const totalIssues = issuesData.reduce((sum, fileIssue) => sum + fileIssue.issues.length, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <AccessibilityScore score={totalIssues} />
      <Divider />
      <BarChart
        series={[
          {
            data: impactData.map(d => d.count),
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
        }}
        xAxis={[
          {
            data: impactData.map(d => `${d.fileName}\n(${d.impact})`),
            scaleType: 'band',
            colorMap: {
              type: 'ordinal',
              colors: ['#FF6D6D', '#FF9D68', '#FDA1A2', '#FFF568'],
            },
            tickLabelStyle: {
              angle: 45,
              textAnchor: 'start',
              fontSize: 12,
            },
          },
        ]}
        margin={{ top: 10, bottom: 70, left: 40, right: 10 }}
      />
      <Divider />
      <LineChart
        xAxis={[
          {
            data: dailyData.dates,
            scaleType: 'point',
            tickLabelStyle: {
              angle: 45,
              textAnchor: 'start',
              fontSize: 12,
            },
          },
        ]}
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
            data: dailyData.counts,
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
        }}
        margin={{ top: 10, bottom: 70, left: 40, right: 10 }}
      />
    </div>
  );
};

export default ResultsDisplay;
