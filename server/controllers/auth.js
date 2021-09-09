const router = require("express").Router();
const app = require("../app");

const userModel = require("../models/user");
/*
const clientModel = require("../models/oauth_client"),
  tokenModel = require("../models/access_token");
*/
var OAuth2Server = require("oauth2-server"),
  Request = OAuth2Server.Request,
  Response = OAuth2Server.Response;

app.auth = new OAuth2Server({
  model: require("../auth/model"),
  accessTokenLifetime: 60 * 60,
  allowBearerTokensInQueryString: true,
});

router.post("/", obtainToken);

router.get("/test", authenticateRequest, function (req, res) {
  res.send("Congratulations, you are in a secret area!");
});

function obtainToken(req, res) {
  var request = new Request(req);
  var response = new Response(res);

  return app.auth
    .token(request, response)
    .then(function (token) {
      res.json(token);
    })
    .catch(function (err) {
      res.status(err.code || 500).json(err);
    });
}

function authenticateRequest(req, res, next) {
  var request = new Request(req);
  var response = new Response(res);

  return app.auth
    .authenticate(request, response)
    .then(function (token) {
      req.token = token;
      next();
    })
    .catch(function (err) {
      res.status(err.code || 500).json(err);
    });
}

function getUserFromToken(token) {
  // NOTE(numank): Returns a promise!
  return userModel.findById(token.user, { password: 0, __v: 0 });
}

module.exports = {
  router: router,
  obtainToken: obtainToken,
  authenticateRequest: authenticateRequest,
  getUserFromToken: getUserFromToken,
};
/*
const loadExampleData = function () {
  var client1 = new clientModel({
    clientId: "application",
    clientSecret: "secret",
    redirectUris: [],
    grants: ["password", "authorization_code", "refresh_token"],
  });

  var user = new userModel({
    username: "testUser",
    password: "testPassword",
  });

  client1.save(function (err, client) {
    if (err) {
      return console.error(err);
    }
    console.log("Created client", client);
  });

  user.save(function (err, user) {
    if (err) {
      return console.error(err);
    }
    console.log("Created user", user);
  });
};
loadExampleData();

var dump = function () {
  clientModel.find(function (err, clients) {
    if (err) {
      return console.error(err);
    }
    console.log("clients", clients);
  });

  tokenModel.find(function (err, tokens) {
    if (err) {
      return console.error(err);
    }
    console.log("tokens", tokens);
  });

  userModel.find(function (err, users) {
    if (err) {
      return console.error(err);
    }
    console.log("users", users);
  });
};
dump();*/
