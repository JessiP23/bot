'use client'

import { useState } from 'react';
import StockAnalysis from './StockAnalysis';
import TradingBot from './TradingBot';
import MarketOverview from './MarketOverview';
import PricePrediction from './PricePrediction';
import PortfolioSummary from './PortfolioSummary';

export default function Dashboard() {
  const [selectedStock, setSelectedStock] = useState('AAPL');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <StockAnalysis stock={selectedStock} onSelectStock={setSelectedStock} />
      </div>
      <div>
        <TradingBot stock={selectedStock} />
      </div>
      <div className="lg:col-span-2">
        <MarketOverview />
      </div>
      <div>
        <PricePrediction stock={selectedStock} />
      </div>
      <div className="lg:col-span-3">
        <PortfolioSummary />
      </div>
    </div>
  );
}