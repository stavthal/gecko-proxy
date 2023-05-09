import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../css/CoinsTable.css";

function CoinsTable() {
  const [darkMode, setDarkMode] = useState(false);
  const [inputPage, setInputPage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [coins, setCoins] = useState([]);
  const [maxPages, setMaxPages] = useState(1);
  const [coinsPerPage, setCoinsPerPage] = useState(100); //a default value of 100 coins per page
  const [inputCoinsPerPage, setInputCoinsPerPage] = useState(100); // same but just for the input use



  //fetch functions

  const getPage = async (page) => {
    const result = await axios(`http://localhost:5000/api/coins/markets/${page}/${coinsPerPage}}`)
    setCoins(result.data);
  }


  const getMaxPages = async () => {
    const result = await axios('http://localhost:5000/api/coins/list');
    console.log(result.data.length);
    setMaxPages(
      Math.ceil(result.data.length / coinsPerPage) || 1 // in order to get the max amount of pages, even if the last page has less than 100 items
    )
  }

  //


  useEffect(() => {
    getPage(currentPage);
    getMaxPages();
  }, [currentPage,coinsPerPage]);


  const topRef = useRef(null); //used for scroll to top afer button press

//handlers

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
    topRef.current.scrollIntoView({ behavior: "smooth" });
  } 

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    topRef.current.scrollIntoView({ behavior: "smooth" });
  }

  const handleGo = () => {
    if (inputPage >= 1 && inputPage <= maxPages ) {
      setCurrentPage(parseInt(inputPage));
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
    else {
      alert(`Invalid number. Try a number between 1 and ${maxPages}`);
      setInputPage("");
    }
    
    setInputPage("");
    topRef.current.scrollIntoView({ behavior: "smooth" });
  }

  const handleInputChange = (event) => {
    setInputPage(event.target.value);
  }

  const handleShow = () => {
    if (inputCoinsPerPage >= 1 && inputCoinsPerPage <= 250 ) {
      setCoinsPerPage(inputCoinsPerPage);
      topRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      alert("Invalid number. Try a number between 1 and 250...");
      setInputCoinsPerPage("");
    }
    
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleCoinsPerPage = (event) => {
      setInputCoinsPerPage(event.target.value);
  } 

  const toggleButtonClass = `toggle-button ${darkMode ? "dark-mode" : ""}`;
  const pageClass = `page ${darkMode ? "dark-mode" : ""}`;

  return (
    <div className={pageClass}>
      <button className={toggleButtonClass} onClick={toggleDarkMode}>
        {darkMode ? "Light" : "Dark"} Mode
      </button>
      <h1 className="h1">All Coins</h1>
      <span className="span">Click on the name of a coin to view more details about it.</span>
      <div ref={topRef} id="top-of-pager"></div>
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
          {coins && coins.map((coin) => {
            return (
              <tr className="tr" key={coin.id}>
                <td className="td">
                  <img
                    className="coin-image"
                    src={coin.image}
                    alt={coin.name} />
                </td>
                <td className="td">{coin.symbol.toUpperCase()}</td>
                {/* I still don't know why the below line had to be written like this, but it took me an hour or so just to find out why the page
                wasn't refreshing when I was using the Link module, so that's why I used an anchor tag with the href.  */}
                <td className="td"><a style={{textDecoration: 'underline'}}onClick={() => {window.location.href=`/coin/${coin.id}`}}>{coin.name}</a></td> 
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
            );
          })}
          
        </tbody>
      </table> 
      { coins.length <= 1 && 
        <div style={{textAlign: 'center'}}>
          <h1>Server error.Try again later</h1>
          <button style={{marginBottom: '5rem'}}onClick={() => window.location.reload()} className="button">Refresh</button>
        </div>}
    <div>
      <div className="input-group">
        <button className='button' style={{width: '100px' , backgroundColor: currentPage === 1 ? "gray" : ""}} disabled={currentPage === 1} onClick={() => handlePrevious()}>Previous</button>
        <button className='button' style={{width: '100px' , backgroundColor: currentPage === maxPages ? "gray" : ""}} disabled={currentPage === maxPages} onClick={() => handleNext()}>Next</button>
      </div>
      <div className="input-group">
          <span className="span">Maximum number of pages: {maxPages}</span><br/>
          <input type="number" value={inputPage} onChange={handleInputChange} placeholder="Enter page number..." />
          <button className="button" onClick={handleGo}>Go</button>
        </div>
        <div className="input-group">
          <input type="number" value={inputCoinsPerPage} onChange={handleCoinsPerPage} placeholder="Coins per page..." />
          <button className="button" onClick={handleShow}>Show</button>
        </div>
      </div>
    </div>
  );
}

export default CoinsTable;


const linkStyle = {
  textDecoration: 'underline',
  color: 'inherit',
  cursor: 'pointer',
  padding: '1rem',
  textAlign: 'left'
};






