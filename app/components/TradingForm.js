'use client'

import { useState } from 'react';
import { executeTrade } from '../lib/tradingBot';

export default function TradingForm({ api, symbol }) {
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await executeTrade(api, symbol, parseFloat(amount));
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setResult({ error: 'An error occurred while processing your trade.' });
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Execute Trade</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount ($)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-blue-300"
        >
          {isLoading ? 'Processing...' : 'Execute Trade'}
        </button>
      </form>
      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Trade Result:</h3>
          {result.error ? (
            <p className="text-red-600">{result.error}</p>
          ) : (
            <ul className="space-y-2">
              <li><strong>Symbol:</strong> {result.symbol}</li>
              <li><strong>Amount:</strong> ${result.amount}</li>
              <li><strong>Price:</strong> ${result.price}</li>
              <li><strong>Timestamp:</strong> {new Date(result.timestamp).toLocaleString()}</li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}