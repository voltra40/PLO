const express = require("express");

const cryptoRouter = express();

const rp = require('request-promise');

cryptoRouter.get('/', async(req, res) => {
  const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
    headers: {
      'X-CMC_PRO_API_KEY': 'f963b29f-80ac-4790-903c-b9ba5e511ca4'
    },
    qs: {
      'id': '1027',
    },
    json: true,
    gzip: true
  };
  const prices = await rp(requestOptions);
  try {
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = cryptoRouter;