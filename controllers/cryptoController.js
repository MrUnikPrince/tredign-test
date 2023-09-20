const axios = require("axios");
const Crypto = require("../model/cryptoModel");

module.exports.fetchAndStore = async (req, res) => {
  try {
      // Making a get request to the WazirX API
      const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
      // Extract and store data in MongoDB
      const tickers = response.data;
      if (typeof tickers === 'object' && Object.keys(tickers).length > 0) {
          // Get the first 10 keys (symbols) from the tickers object
          const symbolKeys = Object.keys(tickers).slice(0, 10);

          // Iterate over the selected symbols and save them in the database
          for (const symbol of symbolKeys) {
              const ticker = tickers[symbol];
              const last = parseFloat(ticker.last);
              const buy = parseFloat(ticker.buy);
              const sell = parseFloat(ticker.sell);

              if (!isNaN(last) && !isNaN(buy) && !isNaN(sell)) {
                  const cryptoData = new Crypto({
                      name: symbol,
                      last: last,
                      buy: buy,
                      sell: sell,
                  });

                  await cryptoData.save();
              } else {
                  console.error("Invalid high or low price in API Data for symbol:", symbol);
              }
          }

          console.log("Data fetched and stored successfully.");
          res.json({ message: "Data fetched and stored successfully." });
      } else {
          console.error("API response is not valid:", tickers);
          res.status(500).json({ error: "Invalid API response." });
      }
  } catch (err) {
      console.error("Error fetching and storing data:", err);
      res.status(500).json({ error: "An Error Occurred." });
  }
};


// Controller to fetch cryptocurrency details based on user's selection
exports.getCryptoDetails = async (req, res) => {
    const { symbol } = req.params;
  
    try {
      // Fetch cryptocurrency data by symbol from MongoDB
      const crypto = await Crypto.findOne({ name: symbol });
      if (crypto) {
        // Respond with JSON data for the selected cryptocurrency
        res.json({
          name: crypto.name,
          last: crypto.last,
          buy: crypto.buy,
          sell: crypto.sell,
          volume: crypto.volume // Use the correct property name here
        });
        
      } else {
        // If the cryptocurrency is not found, respond with a 404 status
        res.status(404).json({ error: 'Cryptocurrency not found.' });
      }
    } catch (error) {
      // Handle any errors that occur during the database query
      console.error('Error fetching cryptocurrency details:', error);
      res.status(500).json({ error: 'An error occurred.' });
    }
  };