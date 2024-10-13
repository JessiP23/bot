'use client'

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function TradingChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Stock Price',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newPrice = Math.random() * 100 + 50;
      setChartData(prevData => ({
        labels: [...prevData.labels, new Date().toLocaleTimeString()].slice(-20),
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data, newPrice].slice(-20)
          }
        ]
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Real-time Stock Price Simulation',
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">Market Trends</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}