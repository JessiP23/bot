const yahooFinance = require('yahoo-finance2').default;

async function fetchMarketData() {
  const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'FB', 'TSLA', 'BRK-A', 'V', 'JNJ', 'WMT'];

  try {
    const result = await yahooFinance.quote(symbols);
    const stocks = result.map(stock => ({
      symbol: stock.symbol,
      price: stock.regularMarketPrice,
      change: stock.regularMarketChangePercent,
      marketCap: stock.marketCap,
    }));
    return stocks;
  } catch (error) {
    console.error('Error fetching market data:', error);
    return [];
  }
}

fetchMarketData().then(data => {
  console.log('Market Data:', data);
});

export default fetchMarketData;