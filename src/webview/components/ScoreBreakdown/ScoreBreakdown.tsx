import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import './ScoreBreakdown.css';

const ScoreBreakdown: React.FC = () => {
  const donutChartRef = useRef<HTMLCanvasElement | null>(null);
 
  const [data, setData] = useState<{
    overallScore: number;
    categories: { label: string; score: number; }[];
  } | null>(null);
  const colors = ['#FBBF24', '#FB923C', '#F472B6', '#F87171'];
  useEffect(() => {

    // Fetch data from JSON file
    const fetchData = async () => {
      const response = await fetch('src/webview/components/ScoreBreakdown/scorebreakdown.json');
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const ctx = donutChartRef.current?.getContext('2d');
    if (ctx && data) {
      const chartData = {
        datasets: [{
          data: data.categories.map(category => category.score),
          backgroundColor: colors,
          hoverOffset: 4,
          borderWidth: 0,
          cutout: '70%',
        }]
      };

      new Chart(ctx, {
        type: 'doughnut',
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            }
          }
        }
      });
    }
  }, [data]);

  return (

    <div className="container">


      {/* Donut Chart */}
      <div className="donut-chart-container">
        <canvas ref={donutChartRef}></canvas>
        {data && (
          <div className="donut-text-center">
            <span className="donut-text">{data.overallScore}%</span>
            <p className="small-text">Overall score</p>
          </div>
        )}
      </div>


      {/* Breakdown */}
      <div className="breakdown">
        <h2>Breakdowns</h2>
        {data && data.categories.map((category, index) => (
          <div className="breakdown-item" key={index}>
            <span className="circle" style={{ backgroundColor: colors[index] }}></span>
            <p>{category.label}</p>
            <span className="percent">{category.score}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScoreBreakdown;
