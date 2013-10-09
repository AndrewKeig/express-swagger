var swagger = require('swagger-express')
 , express = require('express')
 , config = require('../configuration');

var Swagger = function() { };

Swagger.prototype.generate = function(app) {
	if (app.get('env') === 'production') return;

  app.use(swagger.init(app, {
    apiVersion: '1.0',
    swaggerVersion: '1.2.5',
    basePath: config.get('swagger:basePath'),
    swaggerUI: config.get('swagger:swaggerUi'),
    apis: [
      './lib/routes/product.js',
      './lib/routes/highlight.js',
      './lib/routes/user.js',
      './lib/routes/authentication.js',
      './lib/routes/courseSection.js',
      './lib/routes/lesson.js',
      './lib/routes/appRegistry.js',
      './lib/routes/heartbeat.js',
      './lib/routes/schedule.js'
    ]
  }));

  app.use('/swagger', express.static(__dirname + '/public/docs/swagger_ui'));
};

module.exports = new Swagger();
