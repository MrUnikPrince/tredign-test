document.addEventListener('DOMContentLoaded', function () {
  // Select the dropdown and details container
  const dropdown = document.getElementById('crypto-dropdown');
  const detailsContainer = document.getElementById('crypto-details-container');
  const tableBody = document.getElementById('crypto-table-body');

  // Function to fetch cryptocurrency details based on the selected symbol
  const fetchCryptoDetails = (selectedSymbol) => {
    // Make an Ajax request to fetch details for the selected cryptocurrency
    fetch(`/crypto-details/${selectedSymbol}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the details container with the fetched data
        detailsContainer.innerHTML = `
          <h2>${data.name}</h2>
          <p>Last Price: ${data.last}</p>
          <p>Buy Price: ${data.buy}</p>
          <p>Sell Price: ${data.sell}</p>
        `;

        // Update the table with the cryptocurrency data
        updateCryptoTable(data);
      })
      .catch((error) => {
        console.error('Error fetching cryptocurrency details:', error);
        detailsContainer.innerHTML = 'An error occurred while fetching data.';
      });
  };

  // Add an event listener for the dropdown's change event
  dropdown.addEventListener('change', function () {
    // Get the selected cryptocurrency symbol
    const selectedSymbol = dropdown.value;

    // Fetch cryptocurrency details based on the selected symbol
    fetchCryptoDetails(selectedSymbol);
  });

  // Calculate and display the average price
  const updateBestTradePrice = () => {
    // Your logic to calculate the best trade price here, using the cryptocurrencies data
    // For example, you can iterate through cryptocurrencies and find the best trade price

    // Update the best trade price container with the calculated price
    const bestTradePriceContainer = document.querySelector('.best-trade-price');
    bestTradePriceContainer.textContent = `Best Trade Price: $1234.56 (Example)`;
  };

  
  // Function to calculate percentage change
  const calculatePercentageChange = (buyPrice, sellPrice) => {
    if (buyPrice && sellPrice) {
      const percentageChange = ((sellPrice - buyPrice) / buyPrice) * 100;
      return percentageChange.toFixed(2) + '%';
    }
    return 'N/A';
  };

  // Function to update the cryptocurrency data table
  const updateCryptoTable = (cryptoData) => {
    // Clear existing table rows
    tableBody.innerHTML = '';

    // Calculate percentage change
    const percentageChange = calculatePercentageChange(
      parseFloat(cryptoData.buy),
      parseFloat(cryptoData.sell)
    );

    // Create a new table row with the cryptocurrency data
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>#</td>
      <td>${cryptoData.name}</td>
      <td>${cryptoData.last}</td>
      <td>${cryptoData.buy} / ${cryptoData.sell}</td>
      <td>${percentageChange}</td>
      <td>${parseFloat(cryptoData.buy - cryptoData.sell).toFixed(2)}</td>
    `;

    // Append the new row to the table body
    tableBody.appendChild(newRow);
  };

  // Trigger the fetchCryptoDetails function when the page loads
  fetchCryptoDetails(dropdown.value);

  // Calculate and display the average price
  updateBestTradePrice();
});
