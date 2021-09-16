
const OAuth2Server = require('oauth2-server');

const model = {
    // We support returning promises.
    getAccessToken(accessToken) {
        db.queryAccessToken({access_token: accessToken})
            .then(function(token) {
                return Promise.all([
                token,
                db.queryClient({id: token.client_id}),
                db.queryUser({id: token.user_id})
            ]);
            })
            .spread(function(token, client, user) {
                return {
                accessToken: token.access_token,
                accessTokenExpiresAt: token.expires_at,
                scope: token.scope,
                client: client, // with 'id' property
                user: user
            };
        });
    },
  
    // Or, calling a Node-style callback.
    getAuthorizationCode: function(done) {
      done(null, 'works!');
    },
  
    // Or, using generators.
    getClient: function*() {
      yield somethingAsync();
      return 'works!';
    },
  
    // Or, async/wait (using Babel).
    getUser: async function() {
      await somethingAsync();
      return 'works!';
    }
};

const oauth = new OAuth2Server({
    model: model
});

const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;

let request = new Request({/*...*/});
let response = new Response({/*...*/});

oauth.authenticate(request, response)
  .then((token) => {
    // The request was successfully authenticated.
  })
  .catch((err) => {
    // The request failed authentication.
  });

const AccessDeniedError = require('oauth2-server/lib/errors/access-denied-error');

oauth.authorize(request, response)
  .then((code) => {
    // The resource owner granted the access request.
  })
  .catch((err) => {
    if (err instanceof AccessDeniedError) {
      // The resource owner denied the access request.
    } else {
      // Access was not granted due to some other error condition.
    }
  });

oauth.token(request, response)
  .then((token) => {
    // The resource owner granted the access request.
  })
  .catch((err) => {
    // The request was invalid or not authorized.
});