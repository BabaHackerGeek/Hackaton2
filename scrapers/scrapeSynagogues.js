const axios = require('axios');
const cheerio = require('cheerio');
const saveSynagoguesToDB = require('./db');  // Import the function to insert data into the database

async function scrapeSynagogues() {
  try {
    const { data } = await axios.get('https://minyan.world/synagogues');
    const $ = cheerio.load(data);  // Load the HTML content

    const synagogues = [];

    // Use the correct selectors to extract synagogue information
    $('.synagogue-card').each((index, element) => {
      const name = $(element).find('.synagogue-name').text().trim();
      const address = $(element).find('.synagogue-address').text().trim();
      const city = $(element).find('.synagogue-city').text().trim();
      const category = $(element).find('.synagogue-category').text().trim();

      synagogues.push({
        name,
        address,
        city,
        category
      });
    });

    console.log(synagogues);  // Log the results in the console

    // Save the synagogues to the database
    await saveSynagoguesToDB(synagogues);

  } catch (error) {
    console.error('Error during synagogue scraping:', error);
  }
}

scrapeSynagogues();  // Call the scraping function
