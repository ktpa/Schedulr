import axios from 'axios'

const ImgurApi = axios.create({
  baseURL: 'https://api.imgur.com/3/'
})

const IMGUR_CLIENT_CONFIG = {
  headers: {
    Authorization: '4b324dc8161ea3ddd737d2c86f19cedd290b7547'
  }
}

export const imageApi = {
  upload: image => ImgurApi.post('/upload', image, IMGUR_CLIENT_CONFIG)
}
