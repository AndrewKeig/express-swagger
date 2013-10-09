node-swagger
==================

node-swagger hosts a swagger enabled endpoint; but unlike other implementations of swagger decouples swagger from your application.  The swagger endpoints are hosted on a seperate express application; the endpoints are configured using JSON.

Configuring these endpoints using JSON allows us to use these JSON files for validating swagger requests. see : node-swagger-validation



## setup your application

Lets configure your application to use swagger.

The below file should be stored in your application at location ```./swagger/index.json```. This is the file requested by our swagger host; it contains a list of api endpoints; each one is represented by another JSON file.
The element ```applicationUrl``` is the url where the JSON files are hosted.

```
{
  "apiVersion":"1.0",
  "swaggerVersion":"1.2.5",
  "applicationUrl":"http://127.0.0.1:8000",
  "apis":[
  {
    "path":"/api-docs.json/user",
    "description":"User API - CRUD for Users"
  }
  ]
}
```

The below file ```./swagger/user.json``` is for a ```/api-docs.json/user``` endpoint as described in the ```index.json``` file above; we are hosting this endpoint on port ```8000```.  See the swagger docs on how to configure swagger endpoints [https://github.com/wordnik/swagger-core/wiki](https://github.com/wordnik/swagger-core/wiki)

```
{
  "apiVersion": "1.0",
  "swaggerVersion": "1.2.5",
  "basePath": "http://127.0.0.1:8000",
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

## add swagger endpoints to your application
We will now add a couple of swagger endpoints to your application; these will simply serve the JSON files discussed above.

```note: the swagger client uses AJAX to make requests; as our application and swagger are decoupled and hosted seperately on different ports we need to enable CORS for our swagger host```

```
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Appid, token, Accept-Version");
  
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
});

app.get('/api-docs.json', function (req, res, next) {
  var models = require('../swagger/index.json');
  res.json(200, models);
});

app.get('/api-docs.json/:resource', function (req, res, next) {
  var models = require('../swagger/' + req.params.resource + '.json');
  res.json(200, models);
});
```


## setup node swagger
Now we can configure our node-swagger instance; importantly ```applicationUrl``` should point to your application.

```
{
  "express": {
    "port": 3000
  },
  "swagger": {
    "applicationUrl":  "http://127.0.0.1:8000/api-docs.json",
    "title":  "Express Swagger"
  }
}
```
In order to start the express swagger application run



## Test
With your application and the swagger host running; which hosts the JSON files run the tests.

```
grunt test
```
