'use client'

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchVolumeData } from '../lib/tradingBot';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function VolumeChart({ api, symbol }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Volume',
        data: [],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchVolumeData(api, symbol);
      setChartData({
        labels: data.map(d => new Date(d.timestamp).toLocaleDateString()),
        datasets: [
          {
            ...chartData.datasets[0],
            data: data.map(d => d.volume)
          }
        ]
      });
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, [api, symbol]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${symbol} Volume Chart`,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Bar data={chartData} options={options} />
    </div>
  );
}