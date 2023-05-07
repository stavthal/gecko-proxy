import React, { useState } from "react";
import "../css/AllCoinsPage.css";

function AllCoinsPage(props) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleButtonClass = `toggle-button ${darkMode ? "dark-mode" : ""}`;
  const pageClass = `page ${darkMode ? "dark-mode" : ""}`;

  return (
    <div className={pageClass}>
      <button className={toggleButtonClass} onClick={toggleDarkMode}>
        {darkMode ? "Light" : "Dark"} Mode
      </button>
      <h1 className="h1">All Coins</h1>
      <span className="span">Click on the row of a coin to view more details about it.</span>
      <table className="table">
        <thead>
          <tr>
            <th className="th">Image</th>
            <th className="th">Symbol</th>
            <th className="th">Name</th>
            <th className="th">Price</th>
            <th className="th">Highest Price (24h)</th>
            <th className="th">Lowest Price (24h)</th>
            <th className="th">Price Change % (24h)</th>
          </tr>
        </thead>
        <tbody>
          {props.coins.map((coin) => (
            <tr className="tr" onClick={() => alert(coin.id)} key={coin.id}>
              <td className="td">
                <img
                  className="coin-image"
                  src={coin.image}
                  alt={coin.name}
                />
              </td>
              <td className="td">{coin.symbol.toUpperCase()}</td>
              <td className="td">{coin.name}</td>
              <td className="td">${coin.current_price.toLocaleString()}</td>
              <td className="td">{coin.high_24h.toFixed(2)}</td>
              <td className="td">{coin.low_24h.toFixed(2)}</td>
              <td
                className="td"
                style={{
                  "color": coin.price_change_percentage_24h > 0
                    ? "green"
                    : "red"
                }}
              >
                {coin.price_change_percentage_24h.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllCoinsPage;






