export async function fetchCoinGeckoData(symbol, dataType = 'price') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
  
    switch (dataType) {
      case 'price':
        return generatePriceData();
      case 'volume':
        return generateVolumeData();
      case 'orderbook':
        return generateOrderBook();
      case 'info':
        return {
          name: 'CoinGecko',
          founded: '2014',
          headquarters: 'Singapore',
          volume24h: 68000000000,
          markets: 500,
          currencies: 7000
        };
      default:
        throw new Error('Invalid data type');
    }
  }
  
  function generatePriceData() {
    const basePrice = 3000;
    return Array.from({ length: 100 }, (_, i) => ({
      timestamp: new Date(Date.now() - (99 - i) * 60000).toISOString(),
      price: basePrice + Math.random() * 100 - 50
    }));
  }
  
  function generateVolumeData() {
    const baseVolume = 500000;
    return Array.from({ length: 30 }, (_, i) => ({
      timestamp: new Date(Date.now() - (29 - i) * 86400000).toISOString(),
      volume: baseVolume + Math.random() * 250000
    }));
  }
  
  function generateOrderBook() {
    const basePrice = 3000;
    const generateOrders = (basePrice, isBid) => 
      Array.from({ length: 10 }, (_, i) => ({
        price: basePrice + (isBid ? -i : i),
        amount: Math.random() * 5
      }));
  
    return {
      bids: generateOrders(basePrice, true),
      asks: generateOrders(basePrice, false)
    };
  }