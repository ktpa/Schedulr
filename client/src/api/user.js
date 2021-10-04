import { Api } from '@/Api'

export const userApi = {
  getProfile: userId => Api.get(`/users/${userId}`),
  putProfile: (userId, user) => Api.put(`/users/${userId}`, user)
}
