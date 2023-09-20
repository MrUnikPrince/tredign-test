document.addEventListener('DOMContentLoaded', function () {
  // Select the dropdown and details container
  const dropdown = document.getElementById('crypto-dropdown');
  const plateformsData = document.querySelector('#plateforms .data');
  const plateformData = document.getElementById('data');

  // Function to fetch cryptocurrency details based on the selected symbol
  const fetchCryptoDetails = (selectedSymbol) => {
    // Make an Ajax request to fetch details for the selected cryptocurrency
    fetch(`/crypto-details/${selectedSymbol}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the plateformsData with the fetched data
        plateformData.innerHTML = `
          <p>1</p>
          <p>WazirS</p>
          <p>${data.last}</p>
          <p>${data.buy} / ${data.sell}</p>
          <p>${data.someDifference}</p>
          <p>${data.savings}</p>
        `;

        // You can also update other sections or tables as needed.
      })
      .catch((error) => {
        console.error('Error fetching cryptocurrency details:', error);
        plateformsData.innerHTML = 'An error occurred while fetching data.';
      });
  };

  // Trigger the fetchCryptoDetails function when the page loads
  fetchCryptoDetails(dropdown.value);

  // Add an event listener for the dropdown's change event
  dropdown.addEventListener('change', function () {
    // Get the selected cryptocurrency symbol
    const selectedSymbol = dropdown.value;

    // Fetch cryptocurrency details based on the selected symbol
    fetchCryptoDetails(selectedSymbol);
  });
});
