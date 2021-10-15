import axios from 'axios'

const ImgurApi = axios.create({
  baseURL: 'https://api.imgur.com/3/'
})

const IMGUR_CLIENT_CONFIG = {
  headers: {
    Authorization: 'Client-ID 3eec201d5f67dcc',
    'Content-Type': 'multipart/form-data'
  }
}

export const imageApi = {
  upload: image => {
    return ImgurApi.post('/image', image, IMGUR_CLIENT_CONFIG)
  }
}
