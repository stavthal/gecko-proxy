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



  //fetch functions

  const getPage = async (page) => {
    await axios(`http://localhost:5000/api/coins/markets/${page}&${coinsPerPage}`)
    .then((res) => res.json())
    .then((data) => setCoins(data))
    .catch((error) => console.error(error));
  }


  const getMaxPages = async () => {
    await fetch('http://localhost:5000/api/coins/list')
    .then((res) => res.json())
    .then((data) => setMaxPages(
      Math.ceil(data.length / coinsPerPage) || 1 // in order to get the max amount of pages, even if the last page has less than 100 items
    ))
    .then((error) => console.error(error));
  }

  //


  useEffect(() => {
    getPage(currentPage);
    getMaxPages();
  }, [currentPage, coinsPerPage]);


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
    setCurrentPage(parseInt(inputPage));
    setInputPage("");
    topRef.current.scrollIntoView({ behavior: "smooth" });
  }

  const handleInputChange = (event) => {
    if (event.target.value < 1 && event.target.value > maxPages) {
      //code to not allow the user to set a page above the max number of the pages
      alert(`Invalid Number. Try a number between 1 and ${maxPages}...`);
      event.target.value = "";
    } else {
      
    }
    
  }



  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handlePagesInput = (event) => {
    if (event.target.value >= 1 && event.target.value <= 250 ) {
      setCoinsPerPage(event.target.value);
    } else {
      alert(`Invalid Number. Try a number between 1 and 250...`);
      setCoinsPerPage(100);
    }
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
          {(coins != null) && coins.map((coin) => {
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
          <input type="number" value={coinsPerPage} onChange={handlePagesInput} placeholder="Coins per page..." />
          <button className="button" onClick={() => setCoinsPerPage(coinsPerPage)}>Show</button>
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






