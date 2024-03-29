// enviornment configuration
require('dotenv').config();
const Promise = require('bluebird');
// dependencies
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
// create an express app
const app = express();
// create a server
const http = require('http').createServer(app);
// put socket.io on the server
const io = require('socket.io')(http);
// Mongoose models
const { Message } = require('./models/Message');
const { User } = require('./models/User');

// promisify jwt.verify
const jwtV = Promise.promisify(jwt.verify, jwt);
// Use native Node promises
mongoose.Promise = global.Promise;

// connect to DB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
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

// create account
app.post('/register', (req, res) => {
  if (
    req.body.username !== undefined
    && req.body.password !== undefined
    && req.body.username.length > 0
    && req.body.username.length < 16
    && req.body.password.length > 0 // security risk
    && req.body.password.length < 30
  ) {
    User.findOne({ username: { $regex: req.body.username, $options: 'i' } })
      .then(() => res.send.status(409).send('User already exists.'))
      .catch(() => {
        const newUser = new User({ username: req.body.username, password: req.body.password });
        newUser.save()
          .then(() => {
            res.send('Account created');
          })
          .catch((e) => {
            console.log(e);
            res.status(500).send('DB Error');
          });
      });
  } else {
    res.status(400).send('Incorrect lengths for Username or Password');
  }
});

// verify account and get token
app.post('/login', (req, res) => {
  if (
    req.body.username !== undefined
    && req.body.password !== undefined
    && req.body.username.length > 0
    && req.body.username.length < 16
    && req.body.password.length > 0 // security risk
    && req.body.password.length < 30
  ) {
    let user;
    User.findOne({ username: { $regex: req.body.username, $options: 'i' } })
      .then((u) => {
        user = u;
        return u.checkPassword(req.body.password);
      })
      .then((r) => {
        if (r) {
          const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (20), // valid for 20 seconds
            data: { username: user.username },
          },
          process.env.JWT_SECRET);
          res.send(token);
        } else {
          res.status(402).send('Incorrect Username or Password');
        }
      })
      .catch((e) => { console.log(e); res.status(402).send('Incorrect Username or Password'); });
  } else {
    res.status(400).send('Incorrect lengths for Username or Password');
  }
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
  socket.on('auth', (payload) => {
    jwtV(payload, process.env.JWT_SECRET)
      .then((token) => {
        socket.username = token.data.username;
        socket.emit('system', { status: 200, msg: 'Verified token.' });
      })
      .catch(() => { socket.emit('system', { status: 402, msg: 'Invalid token.' }); });
  });
  socket.on('msg', (text) => {
    if (socket.username === undefined) {
      socket.emit('system', { status: 402, msg: 'Auth required.' });
    } else {
      const newMsg = new Message({ text, name: socket.username });
      newMsg.save()
        .then((m) => {
          // eslint-disable-next-line no-underscore-dangle
          io.emit('msg', { id: m._id, text: m.text, name: m.name });
        })
        .catch((e) => { console.log(e); });
    }
  });
});


// start the server
http.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}!`));
