var mongoose = require("mongoose");
const { Schema } = mongoose;

const oauthClientSchema = new Schema({
  clientId: { type: String },
  clientSecret: { type: String },
  redirectUris: { type: Array },
  grants: { type: Array },
});

module.exports = mongoose.model("OAuthClient", oauthClientSchema);
