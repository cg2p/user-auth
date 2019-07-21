// db.js
const mongoose = require('mongoose');
const config = require('./config');

const { db: { host, port, name } } = config;
const connectionString = `mongodb://${host}:${port}/${name}`;
mongoose.set('useNewUrlParser', true);
mongoose.connect(connectionString)
    .then(() => console.log("successfully connected to mongodb"))
    .catch(err => console.log(err))
;
