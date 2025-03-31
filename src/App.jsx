import { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './components/Dashboard.jsx';

function App() {
  const [marketData, setMarketData] = useState({
    currentPrice: 0,
    shortMA: 0,
    longMA: 0,
    signal: 'Hold',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/market-data');
        setMarketData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return <Dashboard marketData={marketData} />;
}

export default App;