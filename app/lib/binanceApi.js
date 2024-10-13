export async function fetchBinanceData(symbol, dataType = 'price') {
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
          name: 'Binance',
          founded: '2017',
          headquarters: 'Cayman Islands',
          volume24h: 76000000000,
          markets: 1200,
          currencies: 365
        };
      default:
        throw new Error('Invalid data type');
    }
  }
  
  function generatePriceData() {
    const basePrice = 50000;
    return Array.from({ length: 100 }, (_, i) => ({
      timestamp: new Date(Date.now() - (99 - i) * 60000).toISOString(),
      price: basePrice + Math.random() * 1000 - 500
    }));
  }
  
  function generateVolumeData() {
    const baseVolume = 1000000;
    return Array.from({ length: 30 }, (_, i) => ({
      timestamp: new Date(Date.now() - (29 - i) * 86400000).toISOString(),
      volume: baseVolume + Math.random() * 500000
    }));
  }
  
  function generateOrderBook() {
    const basePrice = 50000;
    const generateOrders = (basePrice, isBid) => 
      Array.from({ length: 10 }, (_, i) => ({
        price: basePrice + (isBid ? -i * 10 : i * 10),
        amount: Math.random() * 10
      }));
  
    return {
      bids: generateOrders(basePrice, true),
      asks: generateOrders(basePrice, false)
    };
  }