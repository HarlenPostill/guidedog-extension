import React from 'react';
import './WebComparison.css';
import BarChart from '../../Atoms/BarChart/BarChart';
import Button from '../../Atoms/Button/Button';

const WebComparison = (vscode: any) => {
  const websites = [
    { name: 'Amazon.com', score: 364 },
    { name: 'Apple.com', score: 380 },
    { name: 'ebay.com', score: 300 },
    { name: 'UTS.com.au', score: 260 },
  ];

  const handleClickGit = () => {
    vscode.postMessage({ command: 'buttonGit' });
  };

  return (
    <div className="web-comparison-container">
      <div className="web-comparison-label">Score Vs the Web:</div>
      <BarChart websites={websites} yourSiteScore={340} />
      <Button text="Compare Another Website" variant="outlined" onClick={handleClickGit} />
    </div>
  );
};

export default WebComparison;
