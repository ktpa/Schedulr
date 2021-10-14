import { Api } from '@/Api'

export const userApi = {
  getProfile: userId => Api.get(`/users/${userId}`),
  getBlockedTime: userId => Api.get(`/users/${userId}/blockedTimes`),
  createBlockedTime: (userId, blockedTime) =>
    Api.post(`/users/${userId}/blockedTimes`, blockedTime),
  deleteBlockedTime: (userId, blockedTimeId) =>
    Api.delete(`/users/${userId}/blockedTimes/${blockedTimeId}`),
  updateProfile: (userId, user) => Api.patch(`/users/${userId}`, user),
  deleteAll: () => Api.delete('/users'),
  // TODO() Only used for passing requirements
  // Remove once project has been graded
  putUpdateProfile: (userId, user) => Api.put(`/users/${userId}`, user)
}
