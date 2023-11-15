import React, { useState } from 'react';
import axios from 'axios';

const PortfolioTab = ({ userCoins, curCoins }) => {
  
  const [portfolio, setPortfolio] = useState(0);
  const handleClick = () => {
    axios.get('http://127.0.0.1:5000/api/getData')
      .then(response => {
        setList(response.data.artistList);
        setPortfolio(response.data.portfolio);
      })
      .catch(error => {
        setList("blocked");
      });
  };

  const [artistList, setList] = useState(null)
  if (artistList == null) {
    handleClick()
    return 1
  }

  return (
    <div>
      <h2>Your Portfolio</h2>
      <table>
        <thead>
          <tr>
            <th>Artist</th>
            <th>Coin</th>
            <th>Quantity</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {artistList.map((coin) => (
            <tr key={coin.growth}>
              <td>
                <img src={coin.image} alt={coin.name} width="400" />
              </td>
              <td>{coin.name}</td>
              <td>{coin.held}</td>
              <td>{coin.held * coin.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total Portfolio Value: ${portfolio}</p>
    </div>
  );
};

export default PortfolioTab;
