var mongoose = require("mongoose");
const { Schema } = mongoose;

const accessTokenSchema = new Schema({
  accessToken: { type: String },
  accessTokenExpiresAt: { type: Date },
  client: { type: Object },
  refreshToken: { type: String },
  refreshTokenExpiresAt: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("AccessToken", accessTokenSchema);
