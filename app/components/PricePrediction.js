'use client'

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { predictPrice } from '../lib/mlModel';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function PricePrediction({ stock }) {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrediction = async () => {
      setLoading(true);
      const data = await predictPrice(stock);
      setPrediction(data);
      setLoading(false);
    };

    fetchPrediction();
  }, [stock]);

  const chartData = {
    labels: prediction ? prediction.map(d => d.date) : [],
    datasets: [
      {
        label: `${stock} Predicted Price`,
        data: prediction ? prediction.map(d => d.price) : [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
        text: `${stock} Price Prediction (Next 7 Days)`,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Price Prediction</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Line data={chartData} options={chartOptions} />
          <div className="mt-4">
            <h3 className="font-semibold">7-Day Forecast</h3>
            <p>Start: ${prediction[0].price.toFixed(2)}</p>
            <p>End: ${prediction[prediction.length - 1].price.toFixed(2)}</p>
            <p className={prediction[prediction.length - 1].price >= prediction[0].price ? 'text-green-600' : 'text-red-600'}>
              Predicted Change: {((prediction[prediction.length - 1].price / prediction[0].price - 1) * 100).toFixed(2)}%
            </p>
          </div>
        </>
      )}
    </div>
  );
}