import MarketDataDisplay from './MarketDataDisplay.jsx';

function Dashboard({ marketData }) {
  return (
    <div className="dashboard">
      <h1>BTC/USDT Trading Dashboard</h1>
      <MarketDataDisplay marketData={marketData} />
    </div>
  );
}

export default Dashboard;