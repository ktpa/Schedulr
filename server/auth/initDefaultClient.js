const clients = require('../models/oauth_clients.js');

module.exports = initDefClient = async () => {
    await clients
    .findOne({ clientId: 'application', clientSecret:'secret' }, function (err, defaultClient) {

      if (err) {
        console.log(err)
      }
      if (defaultClient === null) {
        
        const client = new clients({
            clientId: 'application',
            clientSecret: 'secret',
           // redirectUris: req.body.redirectUris,
            grants: ["password", "authorization_code", "refresh_token"],
         });
           client.save().then(() => console.log("Default oauth client created!"));
        
      }
    })
           
}
     