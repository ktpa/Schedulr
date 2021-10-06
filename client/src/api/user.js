import { Api } from '@/Api'

export const userApi = {
  getProfile: userId => Api.get(`/users/${userId}`),
  createBlockedTime: (userId, blockedTimeId) => Api.post(`/users/${userId}/blockedTimes/${blockedTimeId}`),
  deleteBlockedTime: (userId, blockedTimeId) => Api.delete(`/users/${userId}/blockedTimes/${blockedTimeId}`)
}
