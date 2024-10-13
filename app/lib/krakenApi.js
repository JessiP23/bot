export async function fetchKrakenData(symbol, dataType = 'price') {
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
          name: 'Kraken',
          founded: '2011',
          headquarters: 'San Francisco, USA',
          volume24h: 55000000000,
          markets: 330,
          currencies: 120
        };
      default:
        throw new Error('Invalid data type');
    }
  }
  
  function generatePriceData() {
    const basePrice = 1500;
    return Array.from({ length: 100 }, (_, i) => ({
      timestamp: new Date(Date.now() - (99 - i) * 60000).toISOString(),
      price: basePrice + Math.random() * 50 - 25
    }));
  }
  
  function generateVolumeData() {
    const baseVolume = 750000;
    return Array.from({ length: 30 }, (_, i) => ({
      timestamp: new Date(Date.now() - (29 - i) * 86400000).toISOString(),
      volume: baseVolume + Math.random() * 375000
    }));
  }
  
  function generateOrderBook() {
    const basePrice = 1500;
    const generateOrders = (basePrice, isBid) => 
      Array.from({ length: 10 }, (_, i) => ({
        price: basePrice + (isBid ? -i * 0.5 : i * 0.5),
        amount: Math.random() * 15
      }));
  
    return {
      bids: generateOrders(basePrice, true),
      asks: generateOrders(basePrice, false)
    };
  }