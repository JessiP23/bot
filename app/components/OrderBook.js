'use client'

import { useState, useEffect } from 'react';
import { fetchOrderBook } from '../lib/tradingBot';

export default function OrderBook({ api, symbol }) {
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOrderBook(api, symbol);
      setOrderBook(data);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, [api, symbol]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Order Book</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-green-600">Bids</h3>
          <ul className="space-y-1">
            {orderBook.bids.slice(0, 5).map((bid, index) => (
              <li key={index} className="text-sm">
                {bid.price} - {bid.amount}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-red-600">Asks</h3>
          <ul className="space-y-1">
            {orderBook.asks.slice(0, 5).map((ask, index) => (
              <li key={index} className="text-sm">
                {ask.price} - {ask.amount}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}