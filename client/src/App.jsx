import React, { useState, useEffect } from "react";

function AllCoinsPage() {
  const [coins, setCoins] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/coins/markets')
      .then((res) => res.json())
      .then((data) => setCoins(data))
      .catch((error) => console.error(error));
  }, []);

  const tableStyle = {
    borderCollapse: "collapse",
    width: "100%",
    marginTop: "2rem",
    fontFamily: "Arial, sans-serif",
  };

  const thStyle = {
    background: "#5DDEB1",
    color: "white",
    fontWeight: "bold",
    padding: "1rem",
    textAlign: "center",
  };

  const tdStyle = {
    border: "1px solid #5DDEB1",
    padding: "1rem",
    textAlign: "left",
  };

  const imgStyle = {
    width: "2rem",
    marginLeft: "1.0rem",
  };

  const pageStyle = {
    background: darkMode ? "#222" : "#fff",
    color: darkMode ? "#fff" : "#222",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const toggleButtonStyle = {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    background: darkMode ? "#fff" : "#222",
    color: darkMode ? "#222" : "#fff",
    border: "none",
    padding: "0.5rem",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
  };

  return (
    <div style={pageStyle}>
      <button
        style={toggleButtonStyle}
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "Light" : "Dark"} Mode
      </button>
      <h1 style={{ fontSize: "2rem"}}>All Coins</h1>
      <span style={{ fontSize: "1.2rem"}}>Click on the row of a coin to view more details about it.</span>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Image</th>
            <th style={thStyle}>Symbol</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>Highest Price (last 24h)</th>
            <th style={thStyle}>Lowest Price (last 24h)</th>
            <th style={thStyle}>Price Change % (last 24h)</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr onClick={() => alert(coin.id)} key={coin.id}>
              <td style={tdStyle}><img src={coin.image} alt={coin.name} style={imgStyle} /></td>
              <td style={tdStyle}>{coin.symbol.toUpperCase()}</td>
              <td style={tdStyle}>{coin.name}</td>
              <td style={tdStyle}>$ {coin.current_price.toLocaleString()}</td>
              <td style={tdStyle}>{coin.high_24h}</td>
              <td style={tdStyle}>{coin.low_24h}</td>
              <td style={{...tdStyle, color: coin.price_change_percentage_24h > 0 ? "green" : "red" }}>{coin.price_change_percentage_24h.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllCoinsPage;
