var express = require('express')
  , cons = require('consolidate')
  , http = require('http')
  , swagger = require('../lib/swagger')
  , app = express();

app.engine('html', cons.handlebars);
app.set('view engine', 'html');
app.set('views', 'public');
app.set('port', 3000);
app.use(express.logger({ immediate: true, format: 'dev' }));

swagger(app, {
  statics : '/public/swagger/', 
  index : '/swagger/index.json', 
  resources : '/swagger/', 
  title : 'node swagger', 
  applicationUrl : 'http://127.0.0.1:3000/api-docs.json' 
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
console.log('Swagger on port', app.get('port'));
module.exports = app;