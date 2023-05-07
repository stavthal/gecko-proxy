const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Define the routes
// app.get('/api/coins/markets', async (req, res) => {
//   try {
//     const response = await fetch(
//       'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
//     );
//     const response = await fetch('data.json');
//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

app.get('/api/coins/markets', (req, res) => {
  const data = require('./data.json');
  res.json(data);
});

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
