express-swagger
==================

express-swagger hosts swagger enabled endpoints via express; but unlike other implementations your API is respresented by raw swagger JSON files.

Configuring these endpoints using JSON allows us to use these JSON files for validating swagger requests. todo : express-swagger-validate


## install

```npm install express-swagger ``


## install SwaggerUI client
You will need to install the client for swagger

```npm install swagger-ui ```


## add swagger endpoints to your application
We will now add swagger to your application; these endpoints will serve the swagger assets and the JSON files that represent your API.

1. statics is the location of the swagger client files
2. index is the location of the index.json file
3. is the location of your resources
4. title is the name given to th swagger web site
5. applicationUrl is the url of your application
5. endPoint is the api endpoint which returns the index file
 
```
swagger(app, {
  statics : '/test/public/swagger/', 
  index : '/test/swagger/index.json', 
  resources : '/test/swagger/', 
  title : 'node swagger', 
  applicationUrl : 'http://127.0.0.1:3000',
  endPoint : '/api-docs.json' 
});
```


Here is a full listing; we also include a templating engine so that we can set the ```applicationUrl``` in our ```public/swagger/index.html``` file.      

```
var express = require('express')
  , cons = require('consolidate')
  , http = require('http')
  , swagger = require('express-swagger')
  , app = express();

app.engine('html', cons.handlebars);
app.set('view engine', 'html');
app.set('views', 'public');
app.set('port', 3000);

swagger(app, {
  statics : '/test/public/swagger/', 
  index : '/test/swagger/index.json', 
  resources : '/test/swagger/', 
  title : 'node swagger', 
  applicationUrl : 'http://127.0.0.1:3000',
  endPoint : '/api-docs.json' 
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
module.exports = app;

```


## swagger index file

Lets define a list of swagger endpoints in an index file.

This file is requested by swagger at the following endpoint:

[http://127.0.0.1:3000/api-docs.json](http://127.0.0.1:3000/api-docs.json)

This file contains a list of api endpoints; each one is represented by another JSON file.  The element ```basePath``` is the url where the JSON files are hosted.

```
{
  "apiVersion":"1.0",
  "swaggerVersion":"1.2.5",
  "basePath":"",
  "apis":[
  {
    "path":"/api-docs.json/user",
    "description":"User API - CRUD for Users"
  }
  ]
}
```

## swagger resource file

The below file ```./swagger/user.json``` is for a ```/api-docs.json/user``` endpoint as described in the ```index.json``` file above; we are hosting this endpoint on port ```3000```.  See the swagger docs on how to configure swagger endpoints [https://github.com/wordnik/swagger-core/wiki](https://github.com/wordnik/swagger-core/wiki)

```
{
  "apiVersion": "1.0",
  "swaggerVersion": "1.2.5",
  "basePath": "",
  "apis": [
    {
      "path": "/user",
      "description": "Get user",
      "operations": [
        {
          "httpMethod": "GET",
          "summary": "Get user",
          "notes": "Returns a user based on a token",
          "responseClass": "User",
          "nickname": "getUser",
          "consumes": [
            "application/json"
          ],
          "produces": [
            "application/json",
            "application/xml"
          ],
          "protocols": [
            "http"
          ],
          "authorizations": [
            "authByOAuth"
          ],
          "parameters": [
            {
              "name": "token",
              "description": "Token",
              "paramType": "header",
              "required": true,
              "dataType": "String"
            }
          ],
          "errorResponses": [
            {
              "code": 401,
              "reason": "Unauthorised"
            },
            {
              "code": 400,
              "reason": "Bad request"
            },
            {
              "code": 404,
              "reason": "Not Found"
            },
            {
              "code": 500,
              "reason": "An internal server error"
            }
          ]
        }
      ]
    }
  ],
  "resourcePath": "/user",
  "models": {
    "User": {
      "id": "User",
      "properties": {
        "userId": {
          "type": "Int"
        },
        "name": {
          "type": "String"
        }
      }
    }
  }
}
```


## run test
Start the express application:

```node test/app.js```

Now run the tests:

```grunt test```
