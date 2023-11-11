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
import './CoinList.css';


const CoinList = ({ balance, updateBalance, userCoins, curCoins, updateFunction }) => {
  const [quantity, setQuantity] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [curArtist, setCurArtist] = useState(null); // New state to track the selected artist


  function categorizeCoin(coin) {
    // Customize the categorization logic based on your criteria.
    const marketCap = coin.marketcap;

    if (marketCap < 1e9) {
      return 'Newest Artists'; // Coins with market cap less than 1 billion
    } else if (marketCap < 1e10) {
      return 'Top Gainers'; // Coins with market cap between 1 billion and 10 billion
    } else if (marketCap < 1e11) {
      return 'Large Cap'; // Coins with market cap between 10 billion and 100 billion
    } else {
      return 'Most Traded'; // Coins with market cap greater than or equal to 100 billion
    }
  }

  const selectArtist = (artist) => {
    // Set the current artist when an artist is selected
    setCurArtist(artist);
  };

  const resetArtist = () => {
    // Set the current artist when an artist is selected
    setCurArtist(null);
  };

  // Replace placeholders with actual artist names, use an array for each category, and include image URLs
  const categorizedCoins = {
    'Newest Artists': [],
    'Top Gainers': [],
    'Large Cap': [], // Initialize as an empty array for dynamic content
    'Most Traded': [],
  };



  const artistData = {
    'Drake': {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLKUMfmMV0fyTzTfPziofp2H5IK5xK59gghxbywSLu&s',
      marketCap: 10000000000,
      timeOnPlatform: 100,
      growth: 1,
      buys: 50,
      sells: 30,
    },
    'Adele': {
      image: 'url_to_adele_image',
      marketCap: 8000000000,
      timeOnPlatform: 365,
      growth: 1.3,
      buys: 30,
      sells: 40,
    },
    'Ed Sheeran': {
      image: 'url_to_ed_sheeran_image',
      marketCap: 9500000000,
      timeOnPlatform: 485,
      growth: 0.67,
      buys: 45,
      sells: 25,
    },
    'Div': {
      image: 'url_to_div_image',
      marketCap: 7500000000,
      timeOnPlatform: 234,
      growth: 0.98,
      buys: 20,
      sells: 60,
    },
    'Kanye': {
      image: 'url_to_kanye_image',
      marketCap: 12000000000,
      timeOnPlatform: 128,
      growth: 1.2,
      buys: 70,
      sells: 25,
    },
    'Ariana Grande': {
      image: 'url_to_ariana_grande_image',
      marketCap: 11000000000,
      timeOnPlatform: 236,
      growth: 1.11,
      buys: 60,
      sells: 35,
    },
    'Taylor Swift': {
      image: 'url_to_taylor_swift_image',
      marketCap: 10500000000,
      timeOnPlatform: 1934,
      growth: 1.05,
      buys: 80,
      sells: 15,
    },
    'ArtistX': {
      image: 'url_to_artistx_image',
      marketCap: 12500000000,
      timeOnPlatform: 423,
      growth: 1.0223,
      buys: 55,
      sells: 40,
    },
    'Beyoncé': {
      image: 'url_to_beyonce_image',
      marketCap: 8500000000,
      timeOnPlatform: 1023,
      growth: 1.06,
      buys: 75,
      sells: 30,
    },
    'Justin Bieber': {
      image: 'https://hips.hearstapps.com/hmg-prod/images/justin-bieber-gettyimages-1202421980.jpg?crop=1xw:1.0xh;center,top&resize=640:*',
      marketCap: 9000000000,
      timeOnPlatform: 24,
      growth: 0.98,
      buys: 40,
      sells: 45,
    },
    'Rihanna': {
      image: 'https://cdn.britannica.com/83/211883-050-46933F1A/Rihanna-Barbadian-singer-Robyn-Fenty.jpg',
      marketCap: 9500000000,
      timeOnPlatform: 1,
      growth: 0.96,
      buys: 70,
      sells: 20,
    },
    'Eminem': {
      image: 'url_to_eminem_image',
      marketCap: 10500000000,
      timeOnPlatform: 10500000000,
      growth: 0.94,
      buys: 95,
      sells: 40,
    },
    'Lady Gaga': {
      image: 'url_to_lady_gaga_image',
      marketCap: 10000000000,
      timeOnPlatform: 782,
      growth: 0.99,
      buys: 85,
      sells: 55,
    },
    'The Weeknd': {
      image: 'url_to_the_weeknd_image',
      marketCap: 9900000000,
      timeOnPlatform: 237,
      growth: 0.995,
      buys: 65,
      sells: 35,
    },
  };

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

  const ArtistTab = <h2> {curArtist}</h2>;

  const ArtistTab2 = () => {
    return (
      <div>
        <h2>{curArtist}</h2>
        <button onClick={resetArtist}>Back to Lobby</button>
      </div>
    );
};

  if (curArtist == null) {
    return (
      <div className="coin-list">
        <h2>Available Coins</h2>
        {Object.entries(categorizedCoins).map(([category, artistsInCategory]) => (
          <div key={category}>
            <h3>{category} - Top 3</h3>
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
                        <p>Price is TBD</p>
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
                        <p>Price is TBD</p>
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
    return ArtistTab2()
  };
};

export default CoinList;
