import React, { useState } from 'react';

const DiscoveryTab = () => {
  const [artists, setArtists] = useState([
    {
      name: 'Taylor Swift',
      imageUrl: 'https://m.media-amazon.com/images/M/MV5BZGM0YjhkZmEtNGYxYy00OTk0LThlNDgtNGQzM2YwNjU0NDQzXkEyXkFqcGdeQXVyMTU3ODQxNDYz._V1_.jpg',
      followers: 25000000, // Replace with actual follower count
    },
    {
      name: 'Ed Sheeran',
      imageUrl: 'https://cdn.britannica.com/17/249617-050-4575AB4C/Ed-Sheeran-performs-Rockefeller-Plaza-Today-Show-New-York-2023.jpg',
      followers: 30000000, // Replace with actual follower count
    },
    {
      name: 'Ariana Grande',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Ariana_Grande_Grammys_Red_Carpet_2020.png',
      followers: 35000000, // Replace with actual follower count
    },
    {
        name: 'Post Malone',
        imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb6be070445b03e0b63147c2c1',
        followers: 12000000, // Replace with actual follower count
      },
    // Add more artists with their names, image URLs, and followers
  ]);

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle artist search
  const handleSearch = () => {
    const results = artists.filter((artist) =>
      artist.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="discovery-tab">
      <h2>Discover Artists</h2>
      <input
        type="text"
        placeholder="Search for artists"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {searchResults.map((artist, index) => (
          <li key={index}>
            <img src={artist.imageUrl} alt={artist.name} height="350"/>
            <div>
              <p>Name: {artist.name}</p>
              <p>Followers: {artist.followers} on Spotify</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiscoveryTab;
