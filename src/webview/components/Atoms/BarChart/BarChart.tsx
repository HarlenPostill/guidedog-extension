import React from 'react';
import './BarChart.css'; // For styling

interface WebsiteData {
  name: string;
  score: number;
}

interface BarChartProps {
  websites: WebsiteData[]; // add up to 4 websites
  yourSiteScore: number; // Score for "Your Site"
}

const BarChart: React.FC<BarChartProps> = ({ websites, yourSiteScore }) => {
  const getPercentage = (score: number) => {
    return Math.round((score / 400) * 100);
  };

  return (
    <div className="bar-chart-container">
      {/* "Your Site" is always there by default */}
      <div className="bar-column">
        <div className="bar-score" style={{ color: '#71BBFF' }}>
          {getPercentage(yourSiteScore)}%
        </div>
        <div
          className="bar"
          style={{ background: '#71BBFF', height: `${getPercentage(yourSiteScore)}%` }}
        />
        <div className="bar-label">Your Site</div>
      </div>

      {/* Map through the provided websites and render their bars */}
      {websites.map((website, index) => (
        <div className="bar-column" key={index}>
          <div className="bar-score">{getPercentage(website.score)}%</div>
          <div className="bar" style={{ height: `${getPercentage(website.score)}%` }} />
          <div className="bar-label">{website.name}</div>
        </div>
      ))}
    </div>
  );
};

export default BarChart;
