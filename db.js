import mysql from 'mysql2';

// Create a connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'your_db_username',
  password: process.env.DB_PASSWORD || 'your_db_password',
  database: process.env.DB_NAME || 'your_db_name',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the connection pool
export { db };