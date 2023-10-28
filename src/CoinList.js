import React, { useState } from 'react';
import './CoinList.css';

const CoinList = ({ balance, updateBalance, userCoins, curCoins, updateFunction }) => {
  const [coins, setCoins] = useState(curCoins);
  const [quantity, setQuantity] = useState('');

  const buyCoin = (coin) => {
    const quantityValue = parseFloat(quantity); // Parse quantity to a float

    if (!isNaN(quantityValue) && balance >= quantityValue) {
      updateBalance(-quantityValue, coin.symbol, quantityValue/coin.price);
      alert(`You've bought ${quantityValue} worth of ${coin.name} coin!`);

      // Simulate a random price change after the purchase
      const updatedCoins = coins.map((c) => {
        if (c.symbol === coin.symbol) {
          const priceChange = (c.price * quantityValue) / c.marketcap; // Simulate a price change between -5 and +5
          return { ...c, price: c.price + priceChange, marketcap: c.marketcap + priceChange * 1000 };
        }
        return c;
      });

      setCoins(updatedCoins);
      updateFunction(updatedCoins);
      setQuantity(''); // Reset quantity to an empty string
    } else {
      alert(`Not enough balance to buy ${coin.name} coin.`);
    }
  };

  const sellCoin = (coin) => {
    const quantityValue = parseFloat(quantity); // Parse quantity to a float

    if (!isNaN(quantityValue) && userCoins[coin.symbol] * coin.price >= quantityValue) {
      updateBalance(quantityValue, coin.symbol, -quantityValue/coin.price);
      alert(`You've sold ${quantityValue} worth of ${coin.name} coin!`);
      // Simulate a random price change after the sale
      const updatedCoins = coins.map((c) => {
        if (c.symbol === coin.symbol) {
          const priceChange = (c.price * quantityValue) / c.marketcap; // Simulate a price change between -5 and +5
          return { ...c, price: c.price - priceChange, marketcap: c.marketcap - priceChange * 1000 };
        }
        return c;
      });

      setCoins(updatedCoins);
      updateFunction(updatedCoins);
      setQuantity(''); // Reset quantity to an empty string
    } else {
      alert(`Not enough coins to sell ${coin.name} coin.`);
    }
  };

  return (
    <div className="stock-list">
      <h2>Available Coins</h2>
      {coins.map((coin, index) => (
        <div key={index} className="stock-item">
          <div className="stock-border">
            <img src={coin.imageurl} alt={coin.name} width="200" height="200" />
            <p>{coin.name} ({coin.symbol})</p>
            <p>Coin Price: ${coin.price.toFixed(3)}</p>
            <p>Market Cap: ${coin.marketcap.toFixed(3)}</p>
            <p>Your Coins: {userCoins[coin.symbol]}</p>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button onClick={() => buyCoin(coin)}>Buy</button>
            <button onClick={() => sellCoin(coin)}>Sell</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoinList;
