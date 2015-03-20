// config
var MONGO_URL = "mongodb://localhost:27017/trivial-ractive-demo";
var PORT = 8080;


var path = require('path'),
  express = require('express'),
  bodyParser = require('body-parser'),
  compression = require('compression'),
  mongoose = require('mongoose');

var app = express();

app.use(compression())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', require('./api'));

app.use(express.static(path.join(__dirname, 'client')))

// connect to mongo, run app
mongoose.connect(MONGO_URL);
var db = mongoose.connection;

db.on('error', function(error) {
  console.error('DB connection error', error);
  process.exit(1);
});

db.on('open', function() {
  app.listen(PORT);
  console.log('Running on', PORT);
});
