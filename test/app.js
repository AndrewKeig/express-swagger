var express = require('express')
  , cons = require('consolidate')
  , http = require('http')
  , app = express();

app.engine('html', cons.handlebars);
app.set('view engine', 'html');
app.set('views', 'public');
app.set('port', 8000);
app.use(express.logger({ immediate: true, format: 'dev' }));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, token");
  
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
});

app.get('/api-docs.json', function (req, res, next) {
  var models = require('./swagger/index.json');
  res.json(200, models);
});

app.get('/api-docs.json/:resource', function (req, res, next) {
  var models = require('./swagger/' + req.params.resource + '.json');
  res.json(200, models);
});


app.get('/heartbeat', function (req, res, next) {
  res.json(200, 'OK');
});

app.get('/user', function (req, res, next) {
  var user = {
    "userId" : "12345"
    , "name" : "airasoul"
  };

  res.json(200, user);
});

app.use(app.router);
http.createServer(app).listen(app.get('port'));
console.log('Application on port', app.get('port'));
module.exports = app;