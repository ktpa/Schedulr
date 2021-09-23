import axios from 'axios'
import qs from 'qs'

const Api = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT || 'http://localhost:3000/api'
})

const OAUTH_CLIENT_CONFIG = {
  headers: {
    Authorization: 'Basic YXBwbGljYXRpb246c2VjcmV0',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

export const signup = payload => {
  Api.post('/users', payload)
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
}

export const login = payload => {
  payload = {
    ...payload,
    grant_type: 'password'
  }
  Api.post('/auth', qs.stringify(payload), OAUTH_CLIENT_CONFIG)
    .then(response => {
      document.cookie =
        'SESSION=' +
        response.data.accessToken +
        ';' +
        response.data.accessTokenExpiresAt +
        ';path=/'
      return response
    })
    .catch(error => {
      return error
    })
}
