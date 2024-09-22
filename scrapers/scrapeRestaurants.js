const axios = require('axios');
const cheerio = require('cheerio');
const saveRestaurantsToDB = require('../project-directory/db');  // Import the function to insert data into the database

async function scrapeKosherRestaurants() {
  try {
    const { data } = await axios.get('https://www.totallyjewishtravel.com/kosher-restaurants');
    const $ = cheerio.load(data);  // Load the HTML content

    const restaurants = [];

    // Use appropriate selectors to extract restaurant information
    $('.restaurant-item').each((index, element) => {
      const name = $(element).find('.restaurant-name').text().trim();
      const address = $(element).find('.restaurant-address').text().trim();
      const city = $(element).find('.restaurant-city').text().trim();
      const category = $(element).find('.restaurant-category').text().trim();  // Halavi (Dairy) or Bassari (Meat)

      restaurants.push({
        name,
        address,
        city,
        category,
      });
    });

    console.log(restaurants);  // Display the results for verification

    // Save the restaurants to the database
    await saveRestaurantsToDB(restaurants);

  } catch (error) {
    console.error('Error during restaurant scraping:', error);
  }
}

scrapeKosherRestaurants();  // Call the function
