import { Api } from '@/Api'

export const userApi = {
  getProfile: userId => Api.get(`/users/${userId}`),
  updateProfile: (userId, user) => Api.patch(`/users/${userId}`, user)
}
