import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';  // Importing chart.js automatically

function LineChart() {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Revenue Sales',
        data: [12000, 19000, 3000, 5000, 2000, 3000, 7000],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="container mt-5 col-7">
      <div className="revenue-card bg-light p-3">
        <h3 className="text-center">Revenue Sales</h3>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default LineChart;