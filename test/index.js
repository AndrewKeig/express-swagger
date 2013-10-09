var assert = require('assert')
 , config = require('../lib/configuration')
 , RestSupport = require('./support');

describe('swagger api', function(){
  describe('when requesting swagger', function(){
    var me = this;
    var body, response, statusCode;
    var url = config.get('swagger:hostUrl');

    it('should respond with 200', function(done){
      RestSupport.get(url + 'swagger', function(err, body, response){
        body = body;
        response = response;
        statusCode = response.statusCode;
        assert.equal(200, statusCode);
        done();
      });
    });
  });

  describe('when requesting swagger api-docs.json', function(){
    var me = this;
    var body, response, statusCode;
    var url = config.get('swagger:applicationUrl');

    it('should respond with 200', function(done){
      RestSupport.get(url + 'api-docs.json', function(err, body, response){
        body = body;
        response = response;
        statusCode = response.statusCode;
        assert.equal(200, statusCode);
        done();
      });
    });
  });

  describe('when requesting swagger api-docs.json/heartbeat', function(){
    var me = this;
    var body, response, statusCode;
    var url = config.get('swagger:applicationUrl');

    it('should respond with 200', function(done){
      RestSupport.get(url + 'api-docs.json/heartbeat', function(err, body, response){
        body = body;
        response = response;
        statusCode = response.statusCode;
        assert.equal(200, statusCode);
        done();
      });
    });
  });
});