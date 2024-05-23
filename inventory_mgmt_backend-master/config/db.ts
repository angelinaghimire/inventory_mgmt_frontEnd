import mysqlPromise from "mysql2/promise.js";
import dotenv from "dotenv";
dotenv.config();

const pool = mysqlPromise.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to get a database connection from the pool
async function getConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Connection established");
    return connection;
  } catch (error) {
    console.error(`Error getting connection from pool: ${error}`);
    return null;
  }
}

// Function to end a database connection
async function endConnection() {
  try {
    await pool.end();
    console.log("Connection ended");
    return;
  } catch (error) {
    console.error(`Error ending connection: ${error}`);
    return;
  }
}

export { getConnection, endConnection };
