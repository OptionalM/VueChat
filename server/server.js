// dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');


const app = express();
const port = 4200;

// Allow cross origin requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to ../cient/dist
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

// start the server
server.listen(port, () => console.log(`Server listening on port ${port}!`));
