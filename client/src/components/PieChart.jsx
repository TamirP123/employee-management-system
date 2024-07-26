import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';  // Importing chart.js automatically

function GrowthPieChart() {
  const data = {
    labels: ['United States', 'France', 'Canada', 'Australia'],
    datasets: [
      {
        label: 'Growth',
        data: [300, 50, 100, 200],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Growth by Country',
      },
    },
  };

  return (
    <div className="container mt-5 col-5">
      <div className="pie-chart-card bg-light p-3">
        <h3 className="text-center">Growth Pie Chart</h3>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default GrowthPieChart;