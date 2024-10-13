import TradingForm from './components/TradingForm';
import TradingChart from './components/TradingChart';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">AlgoTrader AI</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TradingForm />
        <TradingChart />
      </div>
    </div>
  );
}