import { Api } from '@/Api'

export const userApi = {
  getProfile: userId => Api.get(`/users/${userId}`)
}
