const router = require("express").Router();
const app = require("../app");

const userModel = require("../models/users");

var OAuth2Server = require("oauth2-server"),
  Request = OAuth2Server.Request,
  Response = OAuth2Server.Response;

app.auth = new OAuth2Server({
  model: require("../auth/model"),
  accessTokenLifetime: 60 * 60,
  allowBearerTokensInQueryString: true,
});

router.post("/", obtainToken);

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
