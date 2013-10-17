var express = require('express');

function swagger(app, options) {
  if (!options.statics) throw new Error('statics is required.');
  if (!options.index) throw new Error('index is required.');
  if (!options.resources) throw new Error('resources is required.');
  if (!options.title) throw new Error('title is required.');
  if (!options.applicationUrl) throw new Error('applicationUrl is required.');
  if (!options.endPoint) throw new Error('endPoint is required.');

  app.use('/', express.static(process.cwd() + options.statics));

  app.get(options.endPoint, function (req, res, next) {
    var models = require(process.cwd() + options.index);
    models.basePath = options.applicationUrl;
    res.json(200, models);
  });

  app.get('/api-docs.json/:resource', function (req, res, next) {
    var models = require(process.cwd() + options.resources + req.params.resource + '.json');
    models.basePath = options.applicationUrl;
    res.json(200, models);
  });

  app.get(/^\/swagger(\/.*)?$/, function (req, res, next) {
    var model = {
      title: options.title,
      applicationUrl: options.applicationUrl + options.endPoint
    };

    res.render(process.cwd() + options.statics + 'index', model);
  });
}

module.exports = swagger;