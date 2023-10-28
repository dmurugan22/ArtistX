import React from 'react';

const PortfolioTab = ({ userCoins, curCoins }) => {
  // Updated curCoins data to include artist information
  const updatedCurCoins = [
    {
      name: 'Aubrey Drake Graham',
      symbol: 'DRAKE',
      price: 150.25,
      marketcap: 150250,
      imageurl: 'https://hips.hearstapps.com/hmg-prod/images/drake_photo_by_prince_williams_wireimage_getty_479503454.jpg',
    },
    {
      name: 'Kanye Omari West',
      symbol: 'KANYE',
      price: 2750.30,
      marketcap: 2570300,
      imageurl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Kanye_West_at_the_2009_Tribeca_Film_Festival_%28crop_2%29.jpg/1200px-Kanye_West_at_the_2009_Tribeca_Film_Festival_%28crop_2%29.jpg',
    },
    {
      name: 'Mathematical Disrespect',
      symbol: 'MABU',
      price: 3300.10,
      marketcap: 3300100,
      imageurl: 'http://t2.gstatic.com/images?q=tbn:ANd9GcQL013wPzhUy9F2qEv6ebofvmeDCyizTkzD16cX1luPJ26cSvJpBs6d2GtaTuF6rcPYmhVRpQ',
    },
  ];

  // Calculate the total portfolio value
  const portfolioValue = Object.keys(userCoins).reduce((totalValue, coinName) => {
    const coin = updatedCurCoins.find((c) => c.symbol === coinName);
    return totalValue + coin.price * userCoins[coinName];
  }, 0);

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
          {updatedCurCoins.map((coin) => (
            <tr key={coin.symbol}>
              <td>
                <img src={coin.imageurl} alt={coin.name} width="250" height="250" />
              </td>
              <td>{coin.name} ({coin.symbol})</td>
              <td>{userCoins[coin.symbol]}</td>
              <td>${(coin.price * userCoins[coin.symbol]).toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total Portfolio Value: ${portfolioValue.toFixed(3)}</p>
    </div>
  );
};

export default PortfolioTab;
