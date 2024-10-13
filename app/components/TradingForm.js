'use client'

import { useState } from 'react';

export default function TradingForm() {
  const [symbol, setSymbol] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/trade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol, amount: parseFloat(amount) }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setResult({ error: 'An error occurred while processing your trade.' });
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-gray-800">
      <h2 className="text-2xl font-semibold mb-4">Execute Trade</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="symbol" className="block text-sm font-medium text-gray-700">Symbol</label>
          <input
            type="text"
            id="symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
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
              <li><strong>Shares:</strong> {result.shares}</li>
              <li><strong>Price:</strong> ${result.price}</li>
              <li><strong>Profit/Loss:</strong> ${result.profit}</li>
              <li><strong>Timestamp:</strong> {new Date(result.timestamp).toLocaleString()}</li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}