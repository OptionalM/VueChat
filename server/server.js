// dependencies
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
// create an express app
const app = express();
// create a server
const http = require('http').createServer(app);
// put socket.io on the server
const io = require('socket.io')(http);
// Mongoose models
const { Message } = require('./models/Message');

const port = 4200;

// Use native Node promises
mongoose.Promise = global.Promise;

// connect to DB
mongoose.connect('mongodb://localhost/crappyChat', { useNewUrlParser: true })
  .then(() => console.log('connected to DB'))
  .catch((err) => console.log(err));

/**
 * Express stuff
 */

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

// serve previous messages
app.get('/msgs.json', (req, res) => {
  Message.find()
    .then((msgs) => { res.send(msgs); });
});


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

/**
 * IO stuff
 */
io.on('connection', (socket) => {
  // a user connected
  socket.on('name', (n) => {
    socket.username = n;
    socket.emit('redirect', { status: 200, payload: n });
  });
  socket.on('msg', (text) => {
    if (socket.username === undefined) {
      socket.emit('redirect', 'No username set.');
    } else {
      const newMsg = new Message({ text, name: socket.username });
      newMsg.save().then((m) => {
        io.emit('msg', m);
      });
    }
  });
});


// start the server
http.listen(port, () => console.log(`Server listening on port ${port}!`));
