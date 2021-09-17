const router = require("express").Router();
const clientModel = require("../models/oauth_clients");

router.post("/client", function (req, res) {
 const client = new clientModel({
    clientId: req.body.clientId,
    clientSecret: req.body.clientSecret,
   // redirectUris: req.body.redirectUris,
    grants: ["password", "authorization_code", "refresh_token"],
 });
   client.save(function (err, client) {
    if (err || !client) {
        res.status(500).json(err)
       }
       const token = Buffer.from(`${client.clientId}:${client.clientSecret}`).toString('base64')
       res.status(200).json({
           Authorization: `Basic ${token}`
       }) 
  });
});

module.exports = router;
