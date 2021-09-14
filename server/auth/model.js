var mongoose = require("mongoose");

var client = require("../models/oauth_client"),
  tokenModel = require("../models/access_token"),
  userModel = require("../models/user");

const model = {
  getClient: function (clientId, clientSecret, callback) {
    client
      .findOne({
        clientId: clientId,
        clientSecret: clientSecret,
      })
      .lean()
      .exec(
        function (callback, err, client) {
          if (!client) {
            console.error("Client not found");
          }
          callback(err, client);
        }.bind(null, callback)
      );
  },

  getUser: function (username, password, callback) {
    userModel
      .findOne({
        username: username,
      })
      .lean()
      .exec(
        function (callback, err, user) {
          if (!user) {
            callback({ error: "User not found!" });
          } else {
            // NOTE(numank) user should be a doc but user.comparePassword is undefined.
            // We might find a better way than creating a temp user here.
            // Furter testing required.
            const tempUser = new userModel(user);
            tempUser.comparePassword(password, function (matchError, isMatch) {
              if (matchError) {
                callback({ error: "Something went wrong!" });
              } else if (!isMatch) {
                callback({ error: "Username or password is wrong!" });
              } else {
                callback(err, user);
              }
            });
          }
        }.bind(null, callback)
      );
  },

  getAccessToken: function (token, callback) {
    tokenModel
      .findOne({
        accessToken: token,
      })
      .lean()
      .exec(
        function (callback, err, token) {
          if (!token) {
            console.error("Token not found");
          }
          callback(err, token);
        }.bind(null, callback)
      );
  },

  saveToken: function (token, client, user, callback) {
    token.client = {
      id: client.clientId,
    };

    token.user = user._id;
    console.log(token.user);

    var tokenInstance = new tokenModel(token);
    tokenInstance.save(
      function (callback, err, token) {
        if (!token) {
          console.error("Token not saved");
        } else {
          callback(err, token);
        }
      }.bind(null, callback)
    );
  },
};
module.exports = model;
