var express = require('express');

function swagger(app, options) {
  if (!options.statics) throw new Error('statics is required.');
  if (!options.index) throw new Error('index is required.');
  if (!options.resources) throw new Error('resources is required.');
  if (!options.title) throw new Error('title is required.');
  if (!options.applicationUrl) throw new Error('applicationUrl is required.');

  app.use('/', express.static(process.cwd() + options.statics));

  app.get('/api-docs.json', function (req, res, next) {
    var models = require(process.cwd() + options.index);
    res.json(200, models);
  });

  app.get('/api-docs.json/:resource', function (req, res, next) {
    var models = require(process.cwd() + options.resources + req.params.resource + '.json');
    res.json(200, models);
  });

  app.get(/^\/swagger(\/.*)?$/, function (req, res, next) {
    var model = {
      title: options.title,
      applicationUrl: options.applicationUrl
    };

    res.render(process.cwd() + options.statics + 'index', model);
  });
}

module.exports = swagger;