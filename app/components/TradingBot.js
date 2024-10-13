'use client'

import { useState, useEffect } from 'react';
import { executeTrade } from '../lib/tradingStrategy';

export default function TradingBot({ stock }) {
  const [lastTrade, setLastTrade] = useState(null);
  const [isTrading, setIsTrading] = useState(false);

  useEffect(() => {
    let interval;
    if (isTrading) {
      interval = setInterval(async () => {
        const trade = await executeTrade(stock);
        setLastTrade(trade);
      }, 60000); // Execute trade every minute
    }
    return () => clearInterval(interval);
  }, [isTrading, stock]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Trading Bot</h2>
      <button
        onClick={() => setIsTrading(!isTrading)}
        className={`px-4 py-2 rounded-md ${
          isTrading ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
        } text-white`}
      >
        {isTrading ? 'Stop Trading' : 'Start Trading'}
      </button>
      {lastTrade && (
        <div className="mt-4">
          <h3 className="font-semibold">Last Trade</h3>
          <p>Action: {lastTrade.action}</p>
          <p>Stock: {lastTrade.stock}</p>
          <p>Price: ${lastTrade.price.toFixed(2)}</p>
          <p>Quantity: {lastTrade.quantity}</p>
          <p>Timestamp: {new Date(lastTrade.timestamp).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}