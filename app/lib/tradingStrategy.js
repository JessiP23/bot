import { fetchStockData } from './alphaVantageApi';

export async function executeTrade(symbol) {
  const data = await fetchStockData(symbol);
  const lastPrice = data[data.length - 1].close;
  const sma5 = calculateSMA(data, 5);
  const sma20 = calculateSMA(data, 20);

  let action;
  if (sma5 > sma20) {
    action = 'BUY';
  } else if (sma5 < sma20) {
    action = 'SELL';
  } else {
    action = 'HOLD';
  }

  return {
    action,
    stock: symbol,
    price: lastPrice,
    quantity: Math.floor(10000 / lastPrice), // Assuming $10,000 per trade
    timestamp: new Date().toISOString()
  };
}

function calculateSMA(data, period) {
  const prices = data.slice(-period).map(d => d.close);
  return prices.reduce((sum, price) => sum + price, 0) / period;
}