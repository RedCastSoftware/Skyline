const express = require('express');
const axios = require('axios');

const app = express();

// Hardcoded browserless API key — replace with your new key
const BROWSERLESS_API_KEY = '2SdFEhnaPBuKA2R3ee2a3c3e1c4d40b8b9dacb62697a45cc7';
const BROWSERLESS_URL = `https://chrome.browserless.io/content?token=${BROWSERLESS_API_KEY}`;

app.get('/', (req, res) => {
  res.send('Browserless.io proxy server is running');
});

app.get('/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('No URL specified');

  try {
    const response = await axios.post(BROWSERLESS_URL, { url: url });
    res.send(response.data);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy listening on port ${PORT}`);
});
