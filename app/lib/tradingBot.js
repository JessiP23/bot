import { fetchBinanceData } from './binanceApi';
import { fetchCoinGeckoData } from './coinGeckoApi';
import { fetchKrakenData } from './krakenApi';

const apiMap = {
  binance: fetchBinanceData,
  coingecko: fetchCoinGeckoData,
  kraken: fetchKrakenData,
};

export async function executeTrade(api, symbol, amount) {
  const fetchData = apiMap[api];
  const data = await fetchData(symbol);
  
  // This is a mock trade execution
  return {
    symbol,
    amount,
    price: data.price,
    timestamp: new Date().toISOString()
  };
}

export async function fetchPriceData(api, symbol) {
  const fetchData = apiMap[api];
  return await fetchData(symbol, 'price');
}

export async function fetchVolumeData(api, symbol) {
  const fetchData = apiMap[api];
  return await fetchData(symbol, 'volume');
}

export async function fetchOrderBook(api, symbol) {
  const fetchData = apiMap[api];
  return await fetchData(symbol, 'orderbook');
}

export async function fetchCompanyInfo(api) {
  const fetchData = apiMap[api];
  return await fetchData(null, 'info');
}