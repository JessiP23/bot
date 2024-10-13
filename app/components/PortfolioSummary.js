'use client'

import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioSummary() {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    // In a real application, you would fetch this data from your backend
    const mockPortfolio = [
      { symbol: 'AAPL', value: 10000 },
      { symbol: 'GOOGL', value: 8000 },
      { symbol: 'MSFT', value: 12000 },
      { symbol: 'AMZN', value: 9000 },
      { symbol: 'FB', value: 7000 },
    ];
    setPortfolio(mockPortfolio);
  }, []);

  const chartData = {
    labels: portfolio ? portfolio.map(stock => stock.symbol) : [],
    datasets: [
      {
        data: portfolio ? portfolio.map(stock => stock.value) : [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Portfolio Allocation',
      },
    },
  };

  const totalValue = portfolio ? portfolio.reduce((sum, stock) => sum + stock.value, 0) : 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Portfolio  Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Pie data={chartData} options={chartOptions} />
        </div>
        <div>
          <h3 className="font-semibold mb-2">Holdings</h3>
          <ul className="space-y-2">
            {portfolio && portfolio.map(stock => (
              <li key={stock.symbol} className="flex justify-between">
                <span>{stock.symbol}</span>
                <span>${stock.value.toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t">
            <p className="font-semibold">Total Value: ${totalValue.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}