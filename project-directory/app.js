const postgres = require('postgres');
require('dotenv').config();

// Environment variables from .env
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT, ENDPOINT_ID } = process.env;

// Create a new Postgres client using `postgres` library
const sql = postgres({
  host: PGHOST,
  port: PGPORT || 5432, // Use 5432 or any other specified port
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  ssl: { rejectUnauthorized: false },  // Set to false if not using a verified SSL cert
  connection: {
    options: `project=${ENDPOINT_ID}` // Neon-specific project options for the connection
  }
});

// Define a function to get the Postgres version to test the connection
async function getPgVersion() {
  try {
    const result = await sql`SELECT version()`;
    console.log(result);  // Log the result to the console
  } catch (error) {
    console.error("Error connecting to the database:", error);  // Log any errors
  }
}

// Call the function to check the database connection
getPgVersion();
