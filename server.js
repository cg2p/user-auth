// server.js
const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const passport = require("passport");

const db = require('./db');
const config = require('./config');

const ping = require("./routes/ping.route");
const users = require("./routes/user.route");

const server = express();

// Bodyparser middleware
server.use(
  bodyParser.urlencoded({
    extended: false
  })
);
server.use(bodyParser.json());

// CORS accept
server.use(cors());

// Passport middleware
server.use(passport.initialize());

// Passport config
require('./passport')(passport);

// Routes
server.use("/", ping);
server.use("/api/users", users);

server.listen(config.app.port, config.app.host, (err) => {
    if (err) {
      return console.log('something bad happened', err)
    }
  
    console.log('the server ready');
  })
