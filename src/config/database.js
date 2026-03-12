const mysql = require("mysql2/promise");
require("dotenv").config();
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST || 'localhost',
//   port:  process.env.DB_PORT,
//   user:  process.env.DB_USER,
//   password:  process.env.DB_PASSWORD,
//   database:  process.env.DB_NAME,
// });
const connection = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
(async () => {
    const conn = await connection.getConnection();
    console.log('Connected to DB:', process.env.DB_NAME);
    conn.release();
})();

module.exports = connection;
