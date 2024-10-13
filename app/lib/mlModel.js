import { fetchStockData } from './alphaVantageApi';

export async function predictPrice(symbol) {
  const historicalData = await fetchStockData(symbol);
  
  // This is a very simple prediction model
  // In a real-world scenario, you'd use a more sophisticated ML model
  const lastPrice = historicalData[historicalData.length - 1].close;
  const avgChange = calculateAverageChange(historicalData);

  const predictions = [];
  let currentDate = new Date();
  let currentPrice = lastPrice;

  for (let i = 0; i < 7; i++) {
    currentDate.setDate(currentDate.getDate() + 1);
    currentPrice *= (1 + avgChange);
    predictions.push({
      date: currentDate.toISOString().split('T')[0],
      price: currentPrice
    });
  }

  return predictions;
}

function calculateAverageChange(data) {
  let totalChange = 0;
  for (let i = 1; i < data.length; i++) {
    totalChange += (data[i].close / data[i-1].close) - 1;
  }
  return totalChange / (data.length - 1);
}