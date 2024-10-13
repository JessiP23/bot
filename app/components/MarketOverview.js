'use client'

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import fetchMarketData from '../lib/yahooFinanceApi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MarketOverview() {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchMarketData();
      setMarketData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const chartData = {
    labels: marketData ? marketData.map(d => d.symbol) : [],
    datasets: [
      {
        label: 'Market Cap (Billions USD)',
        data: marketData ? marketData.map(d => d.marketCap / 1e9) : [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top 10 Stocks by Market Cap',
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Market Overview</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Bar data={chartData} options={chartOptions} />
          <div className="mt-4 grid grid-cols-2 gap-4">
            {marketData.map(stock => (
              <div key={stock.symbol} className="border-b pb-2">
                <h3 className="font-semibold">{stock.symbol}</h3>
                <p>Price: ${stock.price.toFixed(2)}</p>
                <p className={stock.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                  Change: {stock.change.toFixed(2)}%
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}