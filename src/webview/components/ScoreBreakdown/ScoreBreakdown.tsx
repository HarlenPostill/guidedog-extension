import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import './ScoreBreakdown.css';

interface Breakdown {
  label: string;
  value: number;
}

interface ChartData {
  overallScore: number;
  breakdowns: Breakdown[];
}

const ScoreBreakdown: React.FC = () => {
  const donutChartRef = useRef<HTMLCanvasElement | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);

  // Predefined colors array
  const colors = ['#FBBF24', '#FB923C', '#F472B6', '#F87171'];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/scorebreakdown.json');
      const data: ChartData = await response.json();
      setChartData(data);
    };

    fetchData();
  }, []);

  // Initialize chart when data is available
  useEffect(() => {
    if (chartData && donutChartRef.current) {
      const ctx = donutChartRef.current.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            datasets: [{
              data: chartData.breakdowns.map(item => item.value),
              backgroundColor: colors,
              hoverOffset: 4,
              borderWidth: 0,
              cutout: '70%',
            }]
          },
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
    }
  }, [chartData]);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (

    <div className="container">
      {/* Donut Chart */}
      <div className="donut-chart-container">
        <canvas ref={donutChartRef}></canvas>
        <div className="donut-text-center">
          <span className="donut-text">{chartData.overallScore}%</span>
          <p className="small-text">Overall score</p>
        </div>
      </div>


      {/* Breakdown */}
      <div className="breakdown">
        <h2>Breakdowns</h2>
        {chartData.breakdowns.map((item, index) => (
          <div className="breakdown-item" key={index}>
            <span className={`circle color-${index + 1}`}></span>
            <p>{item.label}</p>
            <span className="percent">{item.value}%</span>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ScoreBreakdown;
