import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/CoinInfo.css";

const CoinInfo = ({match}) => {
  const { id } = match.params;
  const [coinData, setCoinData] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://localhost:5000/api/coins/${id}`);
      setCoinData(result.data);
      console.log(coinData);
    };

    fetchData();
  }, [id]);

  return (
    <div className={`page ${darkMode ? "dark-mode" : ""}`}>
      <img className='coin-logo' src={coinData?.image?.large} alt="coin logo" />
      <h1>{coinData.name}</h1>
      <div className="coin-info">
        <p>{coinData?.description?.en}</p>
      </div>
      <div className="price-info">
        <table>
          <thead>
            <tr>
              <th>Current Price</th>
              <th>Price Change 24h</th>
              <th>Price Change 7d</th>
              <th>Price Change 14d</th>
              <th>Price Change 1m</th>
              <th>Price Change 2m</th>
              <th>Price Change 200d</th>
              <th>Price Change 1y</th>
              <th>Highest Price (24h)</th>
              <th>Lowest Price (24h)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span style={{color: 'green', fontWeight: 800}}>$ </span>{coinData.market_data?.current_price?.usd}</td>
              <td  style={{color: coinData.market_data?.price_change24 > 0 ? "green" : "red"}}>
              <span style={{color: 'green', fontWeight: 800}}>$ </span>{coinData.market_data?.price_change_24h?.toFixed(2)}
              </td>
              <td  style={{color: coinData.market_data?.price_change_percentage_7d > 0 ? "green" : "red"}}>
             {coinData.market_data?.price_change_percentage_7d?.toFixed(2)}<span style={{color: 'gray', fontWeight: 800}}> %</span>
              </td>
              <td  style={{color: coinData.market_data?.price_change_percentage_14d > 0 ? "green" : "red"}}>
                {coinData.market_data?.price_change_percentage_14d?.toFixed(2)}<span style={{color: 'gray', fontWeight: 800}}> %</span>
              </td>
              <td  style={{color: coinData.market_data?.price_change_percentage_1m > 0 ? "green" : "red"}}>
                {coinData.market_data?.price_change_percentage_1m?.toFixed(2)}<span style={{color: 'gray', fontWeight: 800}}> %</span>
              </td>
              <td  style={{color: coinData.market_data?.price_change_percentage_2m > 0 ? "green" : "red"}}>
                {coinData.market_data?.price_change_percentage_2m?.toFixed(2)}<span style={{color: 'gray', fontWeight: 800}}> %</span>
              </td>
              <td  style={{color: coinData.market_data?.price_change_percentage_200d > 0 ? "green" : "red"}}>
                {coinData.market_data?.price_change_percentage_200d?.toFixed(2)}<span style={{color: 'gray', fontWeight: 800}}> %</span>
              </td>
              <td  style={{color: coinData.market_data?.price_change_percentage_1y > 0 ? "green" : "red"}}>
                {coinData.market_data?.price_change_percentage_1y?.toFixed(2)}<span style={{color: 'gray', fontWeight: 800}}> %</span>
              </td>
              <td>
              <span style={{color: 'green', fontWeight: 800}}>$ </span>{coinData.market_data?.high_24h?.usd}
              </td>
              <td>
              <span style={{color: 'green', fontWeight: 800}}>$ </span>{coinData.market_data?.low_24h?.usd}
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{textAlign: 'center'}}>
          <button className="back-button" onClick={() => window.location.href='/'}>Back</button>
        </div>
      </div>
      <button className={`toggle-button ${darkMode ? "dark-mode" : ""}`} onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
};

export default CoinInfo;
