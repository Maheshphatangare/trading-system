function MarketDataDisplay({ marketData }) {
    return (
      <div className="data-container">
        <div className="data-item">
          <label>Current Price:</label>
          <span>₹{marketData.currentPrice.toFixed(2)}</span>
        </div>
        <div className="data-item">
          <label>5-Period MA:</label>
          <span>₹{marketData.shortMA ? marketData.shortMA.toFixed(2) : 'N/A'}</span>
        </div>
        <div className="data-item">
          <label>20-Period MA:</label>
          <span>₹{marketData.longMA ? marketData.longMA.toFixed(2) : 'N/A'}</span>
        </div>
        <div className={`signal ${marketData.signal.toLowerCase()}`}>
          <label>Trade Signal:</label>
          <span>{marketData.signal}</span>
        </div>
      </div>
    );
  }
  
  export default MarketDataDisplay;