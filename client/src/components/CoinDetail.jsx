import React, { useEffect, useState } from 'react';

const CoinDetail = (props) => {
  const { id } = props.match.params;
  const [coinData, setCoinData] = useState();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getCoinData = async () => {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/coins/${id}}`);
      const data = await response.json();
      (data != null) && setCoinData(data);
      (coinData != null) && setLoading(false);
    };
    getCoinData();
  }, [coinData]);

  return (
    <div className="coin-detail">
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <img src={coinData?.image?.small} alt={coinData?.name} />
          <h1>{coinData?.name}</h1>
          <p>{coinData?.description?.en}</p>
          <h2>Current Price: {coinData?.market_data?.current_price?.usd} USD</h2>
          <ul>
            <li>Price Change (24h): {coinData?.market_data?.price_change_percentage_24h?.toFixed(2)}%</li>
            <li>Price Change (7d): {coinData?.market_data?.price_change_percentage_7d?.toFixed(2)}%</li>
            <li>Price Change (14d): {coinData?.market_data?.price_change_percentage_14d?.toFixed(2)}%</li>
            <li>Price Change (1m): {coinData?.market_data?.price_change_percentage_1m?.toFixed(2)}%</li>
            <li>Price Change (2m): {coinData?.market_data?.price_change_percentage_2m?.toFixed(2)}%</li>
            <li>Price Change (200d): {coinData?.market_data?.price_change_percentage_200d?.toFixed(2)}%</li>
            <li>Price Change (1y): {coinData?.market_data?.price_change_percentage_1y?.toFixed(2)}%</li>
            <li>Highest Price (24h): {coinData?.market_data?.high_24h?.usd} USD</li>
            <li>Lowest Price (24h): {coinData?.market_data?.low_24h?.usd} USD</li>
          </ul>
        </>
      )}
    </div>
  );
};

export default CoinDetail;
