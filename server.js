const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());


app.get('/api/coins/list', async (req,res) => {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/list'
    );
    const data = await response.json();
    console.log(data.length);
    res.send(data);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server Error' });
  }
});

app.get('/api/coins/markets/:page/:coins_per_page', async (req, res) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${req.params.coins_per_page}&page=${req.params.page}&sparkline=false`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


//This route should only be enabled for demonstration use, after commenting out the relevant route to this one.
//The purpose of this route is to use the data.json file in order to view a saved file of the API payload.
// app.get('/api/coins/markets/:page/:coins_per_page', async (req, res) => {
//   const data = require('./data.json');
//   res.json(data);
// });

app.get('/api/coins/:id', async (req, res) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${req.params.id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
