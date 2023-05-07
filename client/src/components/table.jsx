import React, { useState } from "react";
import "../css/AllCoinsPage.css";

function AllCoinsPage(props) {
  const { coins , currentPage, onPageChange} = props;
  const [darkMode, setDarkMode] = useState(true);

  const handlePrevious = () => {
    onPageChange(currentPage - 1);
  } 

  const handleNext = () => {
    onPageChange(currentPage + 1);
  }


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleButtonClass = `toggle-button ${darkMode ? "dark-mode" : ""}`;
  const pageClass = `page ${darkMode ? "dark-mode" : ""}`;
  console.log(coins);

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
          {coins && coins.map((coin) => (
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
              <td className="td">{coin.high_24h}</td>
              <td className="td">{coin.low_24h}</td>
              <td
                className="td"
                style={{
                  "color": coin.price_change_percentage_24h > 0
                    ? "green"
                    : "red"
                }}
              >
                {coin.price_change_percentage_24h}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    <div>
      <button className='button' style={{backgroundColor: currentPage === 1 ? "gray" : ""}} disabled={currentPage === 1} onClick={() => handlePrevious()}>Previous</button>
      <button className='button' onClick={() => handleNext()}>Next</button>
    </div>
    </div>
          
  );
}

export default AllCoinsPage;






