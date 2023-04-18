// get the client
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'udemy-nodejs',
  password: 'K0kos0v14AllpeID',
});

module.exports = pool.promise();
