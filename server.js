const express = require("express");
const serveStatic = require('serve-static')
const path = require('path')
const mongoose = require('mongoose')

const dotenv = require('dotenv');

dotenv.config();

const { Client } = require('mongoose');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
client.connect();
client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

const app = express();
app.use('/', serveStatic(path.join(__dirname, '/dist')))

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
