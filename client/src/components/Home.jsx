import { useState } from "react";
import '../css/Home.css';

const HomePage = () => {
    const [coinList, setCoinList] = useState([]);
    const [searchInput, setSearchInput] = useState('');


    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    }

    const handleSearch = () => {
      searchInput != "" ? window.location.href=`/coin/${searchInput}` : alert("The field cannot be empty...")
    }

return (
    <div className="home">
      <h1 className="heading">
        Welcome to our Crypto App!<br/>
        <span style={{fontSize: '16px', color: "gray"}}>Powered by CoinGecko</span>
      </h1>
      <div>
        <button className="button" onClick={() => window.location.href='/coins'}>View All Coins</button>
        <div>
            <div className="or">Or.</div>
          <label>Search for a single coin:</label><br/>
          <input className="search-bar" type="text" value={searchInput} onChange={handleInputChange} placeholder="e.g bitcoin, ethereum ... "/><br/>
          <button className="button" onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;