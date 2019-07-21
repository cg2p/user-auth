// server.js
const restify = require('restify');
const db = require('./db');
const config = require('./config');

const server = restify.createServer({
  name: 'basic-restify-mongodb-server'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/', function (req, res, next) {
  res.json({
    success: "true",
    echo: "ping!" 
  });
  return next();
});

server.get('/echo/:name', function (req, res, next) {
  res.send(req.params);
  return next();
});

server.listen(config.app.port, config.app.host, (err) => {
    if (err) {
      return console.log('something bad happened', err)
    }
  
    console.log('%s ready on %s', server.name, server.url);
  })
