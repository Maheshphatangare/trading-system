const express = require('express');
const app = express();
const port = 3001;

// Enable CORS for frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Mock price history (20 periods)
let priceHistory = generateMockPrices(20);

// Endpoint to return mock market data
app.get('/api/market-data', (req, res) => {
  // Simulate price movement by shifting and adding a new price
  priceHistory.shift(); // Remove oldest price
  priceHistory.push(generateNextPrice(priceHistory[priceHistory.length - 1]));

  // Calculate moving averages
  const shortMA = calculateMA(priceHistory, 5);
  const longMA = calculateMA(priceHistory, 20);
  const currentPrice = priceHistory[priceHistory.length - 1];

  // Determine trade signal
  const prevShortMA = calculateMA(priceHistory.slice(0, -1), 5);
  const prevLongMA = calculateMA(priceHistory.slice(0, -1), 20);
  let signal = 'Hold';
  if (prevShortMA <= prevLongMA && shortMA > longMA) signal = 'Buy';
  if (prevShortMA >= prevLongMA && shortMA < longMA) signal = 'Sell';

  res.json({
    currentPrice,
    shortMA,
    longMA,
    signal,
  });
});

// Generate initial mock prices (starting around $60,000)
function generateMockPrices(count) {
  const prices = [];
  let lastPrice = 60000; // Starting price
  for (let i = 0; i < count; i++) {
    lastPrice += (Math.random() - 0.5) * 200; // Random fluctuation ±$100
    prices.push(lastPrice);
  }
  return prices;
}

// Generate next price based on the last price
function generateNextPrice(lastPrice) {
  return lastPrice + (Math.random() - 0.5) * 200; // Random fluctuation ±$100
}

// Simple moving average calculation
function calculateMA(prices, period) {
  if (prices.length < period) return null;
  const slice = prices.slice(-period);
  return slice.reduce((sum, price) => sum + price, 0) / period;
}

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});