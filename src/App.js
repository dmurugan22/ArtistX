import React, { useState } from 'react';
import './App.css';
import CoinList from './CoinList';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import PortfolioTab from './PortfolioTab'; // Import the PortfolioTab component
import DiscoveryTab from './DiscoveryTab'; // Import the DiscoveryTab component


function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([
    { username: 'demo1', password: 'password1', coins: {} },
    { username: 'demo2', password: 'password2', coins: {} },
    { username: 'demo3', password: 'password3', coins: {} },
    { username: 'demo4', password: 'password4', coins: {} },
    { username: 'demo5', password: 'password5', coins: {} },
  ]);
  const [currentUser, setCurrentUser] = useState(null);
  const initialBalance = 10000;
  const userWallet = {'DRAKE': 0, 'KANYE': 0, 'MABU': 0};

  const starter = [
    { name: 'Aubrey Drake Graham', symbol: 'DRAKE', price: 150.25, marketcap: 150250, imageurl: "https://hips.hearstapps.com/hmg-prod/images/drake_photo_by_prince_williams_wireimage_getty_479503454.jpg"},
    { name: 'Kanye Omari West', symbol: 'KANYE', price: 2750.30, marketcap: 2570300, imageurl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Kanye_West_at_the_2009_Tribeca_Film_Festival_%28crop_2%29.jpg/1200px-Kanye_West_at_the_2009_Tribeca_Film_Festival_%28crop_2%29.jpg"},
    { name: 'Mathematical Disrespect', symbol: 'MABU', price: 3300.10, marketcap: 3300100, imageurl: "http://t2.gstatic.com/images?q=tbn:ANd9GcQL013wPzhUy9F2qEv6ebofvmeDCyizTkzD16cX1luPJ26cSvJpBs6d2GtaTuF6rcPYmhVRpQ" },
  ];

  const [balance, setBalance] = useState(initialBalance);
  const [userCoins, setUserCoins] = useState(userWallet);
  const [initialCoins, setCoinsGlobal] = useState(starter);

  const [activeTab, setActiveTab] = useState('coinList'); // Track the active tab

  const handleRegister = (username, password) => {
    if (users.some((user) => user.username === username)) {
      alert('Username already taken. Please choose another one.');
    } else {
      setUsers([...users, { username, password, balance: initialBalance, coins: {} }]);
      setIsRegistered(true);
      setCurrentUser({ username, password, balance: initialBalance, coins: {} });
    }
  };

  const handleLogin = (username, password) => {
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const updateBalance = (amount, coinName, boughtOrSold) => {
    setBalance((prevBalance) => prevBalance + amount);

    const updatedUserCoins = { ...userCoins }; // Create a copy of userCoins
    updatedUserCoins[coinName] = updatedUserCoins[coinName] + boughtOrSold;
    setUserCoins(updatedUserCoins);

    setTransactions((prevTransactions) => [
      ...prevTransactions,
      { amount, coinName, timestamp: new Date() },
    ]);
  };

  const updateGlobalCoins = (newCoins) => {
    setCoinsGlobal(newCoins);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setTransactions([]);
  };

  const renderActiveTab = () => {
    if (activeTab === 'coinList') {
      return (
        <CoinList
          balance={balance}
          updateBalance={updateBalance}
          userCoins={userCoins}
          curCoins={initialCoins}
          updateFunction={updateGlobalCoins}
        />
      );
    } else if (activeTab === 'portfolio') {
      return <PortfolioTab userCoins={userCoins} curCoins={initialCoins} />;
    }
    else if (activeTab === 'discovery') {
      return <DiscoveryTab/>;
    }
  };

  return (
    <div className="App">
      <h1>Coin Trading App</h1>
      <div className="tab-buttons">
        <button onClick={() => setActiveTab('coinList')}>Coin List</button>
        <button onClick={() => setActiveTab('portfolio')}>Portfolio</button>
        <button onClick={() => setActiveTab('discovery')}>Discovery</button>
      </div>
      {isLoggedIn ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <div className="balance">Balance: ${balance.toFixed(3)}</div>
          {renderActiveTab()}
        </>
      ) : isRegistered ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <RegisterScreen onRegister={handleRegister} />
      )}
    </div>
  );
}

export default App;
