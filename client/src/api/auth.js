import { Api } from '@/Api'
import qs from 'qs'

const OAUTH_CLIENT_CONFIG = {
  headers: {
    Authorization: 'Basic YXBwbGljYXRpb246c2VjcmV0',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

export const authApi = {
  signup: payload => Api.post('/users', payload),
  login: payload => {
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
}
