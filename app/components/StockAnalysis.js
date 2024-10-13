'use client'

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchStockData } from '../lib/alphaVantageApi';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


export default function StockAnalysis() {
    const [stock, setStock] = useState('MSFT');
    const [stockData, setStockData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchStockData(stock);
          setStockData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      if (stock) {
        fetchData();
      }
    }, [stock]);
  
    const handleStockChange = (e) => {
      setStock(e.target.value.toUpperCase());
    };
  
    const chartData = {
      labels: stockData ? stockData.map(d => d.date) : [],
      datasets: [
        {
          label: `${stock} Price`,
          data: stockData ? stockData.map(d => d.close) : [],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
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
          text: `${stock} Stock Price Analysis`,
        },
      },
    };
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Stock Analysis</h2>
        <div className="mb-4">
          <input
            type="text"
            value={stock}
            onChange={handleStockChange}
            placeholder="Enter stock symbol"
            className="border border-gray-300 rounded px-2 py-1"
          />
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && stockData && (
          <>
            <Line data={chartData} options={chartOptions} />
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Latest Price</h3>
                <p>${stockData[0].close.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="font-semibold">24h Change</h3>
                <p className={stockData[0].change >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {stockData[0].change.toFixed(2)}%
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    );
}