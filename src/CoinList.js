/*
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
*/


import React, { useState } from 'react';
import axios from 'axios';
import './CoinList.css';


const CoinList = () => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [curArtist, setCurArtist] = useState(null); // New state to track the selected artist
  const [followers, setEm] = useState(0);
  const [token, setToken] = useState("BQDfgJF1uGDsn5KROq0Uk7BYXoHvBtH2bpbkOeKZYLiRWin_qL51GnEWXAUqcMeAcjdIE79_bMaslromsgMbVRQBiSo2vJRSr8mszAOuKg2R5Yhg-IsT5vYRgZnIunMG1C7JUxsW5gOC51Yu6DhLscq_xBsEEkv5moVUKpKDmDL4WvQdgsjBR8gMpPAafqg")
  const [buyAmount, setBuyAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [balance, setBalance] = useState(10000);


  const selectArtist = (artist) => {
    // Set the current artist when an artist is selected
    setCurArtist(artist);
  };

  const handleClick = () => {
    axios.get('http://127.0.0.1:5000/api/getData')
      .then(response => {
        setData(response.data.artistData);
        setBalance(response.data.balance);
      })
      .catch(error => {
        setData("blocked");
      });
  };

  const handleClick2 = () => {
    axios.get('http://127.0.0.1:5000/api/account')
      .then(response => {
        setData(response.data.message);
      })
      .catch(error => {
        setData("blocked");
      });
  };

  const resetArtist = () => {
    // Set the current artist when an artist is selected
    setCurArtist(null);
  };
  
  const setFollowers = (followers) => {
    setEm(followers);
  }

  // Replace placeholders with actual artist names, use an array for each category, and include image URLs
  const categorizedCoins = {
    'Newest Artists': [],
    'Top Gainers': [],
    'Large Cap': [], // Initialize as an empty array for dynamic content
    'Most Traded': [],
  };
  
  const [artistData, setData] = useState(null)

  if (artistData == null) {
    handleClick()
    return 1
  }
  // Sort artists by market cap and select the top 3 for the 'Large Cap' category
  const largeCapArtists = Object.keys(artistData)
    .sort((a, b) => artistData[b]['marketCap'] - artistData[a]['marketCap'])
    .map((name) => ({ name, image: `url_to_${name}_image` }));

  // Update 'Large Cap' category with the top 3 artists
  categorizedCoins['Large Cap'] = largeCapArtists;


  // Sort artists by market cap and select the top 3 for the 'Large Cap' category
  const newestArtists = Object.keys(artistData)
    .sort((a, b) => artistData[a]['timeOnPlatform'] - artistData[b]['timeOnPlatform'])
    .map((name) => ({ name, image: `url_to_${name}_image` }));

  // Update 'Large Cap' category with the top 3 artists
  categorizedCoins['Newest Artists'] = newestArtists;

  // Sort artists by market cap and select the top 3 for the 'Large Cap' category
  const topGainers = Object.keys(artistData)
    .sort((a, b) => artistData[b]['growth'] - artistData[a]['growth'])
    .map((name) => ({ name, image: `url_to_${name}_image` }));

  // Update 'Large Cap' category with the top 3 artists
  categorizedCoins['Top Gainers'] = topGainers;

  const mostTraded = Object.keys(artistData)
    .sort((a, b) => artistData[b]['sells'] + artistData[b]['buys'] - artistData[a]['buys'] - artistData[a]['sells'])
    .map((name) => ({ name, image: `url_to_${name}_image` }));

  // Update 'Large Cap' category with the top 3 artists
  categorizedCoins['Most Traded'] = mostTraded;


  // Combine buys and sells to calculate total trades


  const toggleCategoryExpansion = (category) => {
    setExpandedCategories((prevExpanded) => ({
      ...prevExpanded,
      [category]: !prevExpanded[category],
    }));
  };

  const ArtistTab = async () => {
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
          q: curArtist,
          type: "artist"
        }
    })
    setFollowers(data.artists.items[0].followers.total)
  };

  const ArtistTab2 = () => {
    return (
      <div>
        <h2>{curArtist}</h2>
        <h3>Total Followers: {followers.toLocaleString('en-US')}</h3>
        <button onClick={resetArtist}>Back to Lobby</button>
        <input
          type="number"
          placeholder="Buy Amount"
          value={buyAmount}
          onChange={(e) => setBuyAmount(e.target.value)}
        />
        <button onClick={handleBuy}>Buy</button>
        <input
          type="number"
          placeholder="Sell Amount"
          value={sellAmount}
          onChange={(e) => setSellAmount(e.target.value)}
        />
        <button onClick={handleSell}>Sell</button>
      </div>
    );
  };

  const handleBuy = () => {
    const buyValue = parseInt(buyAmount);
    if (balance - buyValue * artistData[curArtist]['price'] >= 0) {
      axios.get('http://127.0.0.1:5000/api/buy', {
      params: {
        artist: curArtist,
        buyAmount: buyValue
      },
    })
      .then(response => {
        // Handle the response data
        setData(response.data.artistData);
        setBalance(response.data.balance);
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });
    }
    else {
      alert('not enough!')
    }

  };

  const handleSell = () => {
    const sellValue = parseInt(sellAmount);
    if (artistData[curArtist]['coins'] + sellValue <= 50000) {
      axios.get('http://127.0.0.1:5000/api/sell', {
      params: {
        artist: curArtist,
        sellAmount: sellValue
      },
    })
      .then(response => {
        // Handle the response data
        setData(response.data.artistData);
        setBalance(response.data.balance);
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });
    }
    else {
      alert('not enough!')
    }
  };

  if (curArtist == null) {
    return (
      <div className="coin-list">
        <h2>{balance}</h2>
        <h2>Available Coins</h2>
        {Object.entries(categorizedCoins).map(([category, artistsInCategory]) => (
          <div key={category}>
            <h3>{category} - {expandedCategories[category] ? 'All' : 'Top 3'}</h3>
            <button onClick={() => toggleCategoryExpansion(category)}>
              {expandedCategories[category] ? 'See Less' : 'See All'}
            </button>
            <h5></h5>
            {expandedCategories[category]
              ? artistsInCategory.map((artist, index) => (
                <div className="container">
                <div key={index} className="image-with-text-container">
                      <img className="left-image" src={artistData[artist.name]['image']} alt={artist.name} 
                      onClick={() => {
                        selectArtist(artist.name);
                      }}
                      />
                      <div className="right-text">
                        <h2>{artist.name}</h2>
                        <p>Price is {artistData[artist.name]['price']}</p>
                        <p>Number of coins is: {artistData[artist.name]['coins']}</p>
                      </div>
                </div>
                </div>
                ))
              : artistsInCategory.slice(0, 3).map((artist, index) => (
                <div className="container">
                <div key={index} className="image-with-text-container">
                      <img className="left-image" src={artistData[artist.name]['image']} alt={artist.name} 
                      onClick={() => {
                        selectArtist(artist.name);
                      }}
                      />
                      <div className="right-text">
                        <h2>{artist.name}</h2>
                        <p>Price is {artistData[artist.name]['price']}</p>
                        <p>Number of coins is: {artistData[artist.name]['coins']}</p>
                      </div>
                </div>
                </div>
                ))}
          </div>
        ))}
      </div>
    );
  }
  else {
    ArtistTab();
    return ArtistTab2();
  };
};

export default CoinList;
