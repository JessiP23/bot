'use strict'


export async function fetchStockData(symbol) {
  try {
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`);
    const data = await response.json();


    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }

    const timeSeriesData = data['Time Series (Daily)'];
    
    if (!timeSeriesData) {
      throw new Error('No time series data available');
    }

    return Object.entries(timeSeriesData).map(([date, values]) => ({
      date,
      open: parseFloat(values['1. open']),
      high: parseFloat(values['2. high']),
      low: parseFloat(values['3. low']),
      close: parseFloat(values['4. close']),
      volume: parseInt(values['5. volume']),
      change: ((parseFloat(values['4. close']) / parseFloat(values['1. open']) - 1) * 100)
    })).reverse().slice(0, 30); // Last 30 days
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
}