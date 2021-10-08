import { Api } from '@/Api'

export const userApi = {
  getProfile: userId => Api.get(`/users/${userId}`),
  createBlockedTime: (userId, blockedTimeId) => Api.post(`/users/${userId}/blockedTimes`),
  deleteBlockedTime: (userId, blockedTimeId) => Api.delete(`/users/${userId}/blockedTimes/${blockedTimeId}`),
  updateProfile: (userId, user) => Api.patch(`/users/${userId}`, user)
}
