'use client'

import { useState } from 'react';
import ApiSelector from './components/ApiSelector';
import TradingForm from './components/TradingForm';
import PriceChart from './components/PriceChart';
import VolumeChart from './components/VolumeChart';
import OrderBook from './components/OrderBook';
import CompanyInfo from './components/CompanyInfo';

export default function Home() {
  const [selectedApi, setSelectedApi] = useState('binance');
  const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Advanced Crypto Trader AI</h1>
      <ApiSelector selectedApi={selectedApi} onSelectApi={setSelectedApi} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <PriceChart api={selectedApi} symbol={selectedSymbol} />
        </div>
        <div>
          <CompanyInfo api={selectedApi} />
        </div>
        <div>
          <TradingForm api={selectedApi} symbol={selectedSymbol} />
        </div>
        <div>
          <VolumeChart api={selectedApi} symbol={selectedSymbol} />
        </div>
        <div>
          <OrderBook api={selectedApi} symbol={selectedSymbol} />
        </div>
      </div>
    </div>
  );
}