var config = require('../configuration')
  , express = require('express')
  , cons = require('consolidate')
  , http = require('http')
  , app = express();

app.engine('html', cons.handlebars);
app.set('view engine', 'html');
app.set('views', 'public');
app.set('port', config.get('express:port'));
app.use(express.logger({ immediate: true, format: 'dev' }));
app.use('/', express.static('public/swagger/'));

app.get(/^\/swagger(\/.*)?$/, function (req, res, next) {
  var model = {
    title: config.get('swagger:title'),
    applicationUrl: config.get('swagger:applicationUrl')
  };

  res.render('swagger/index', model);
});

app.use(app.router);
http.createServer(app).listen(app.get('port'));
module.exports = app;