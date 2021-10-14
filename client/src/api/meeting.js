import { Api } from '@/Api'

export const meetingApi = {
  getMeetings: () => Api.get('/meetings'),
  getOne: meetingId => Api.get(`/meetings/${meetingId}`),
  createMeeting: meeting => Api.post('/meetings', meeting),
  addAvailableTimes: (meetingId, times) =>
    Api.post(`/meetings/${meetingId}/availableTimes`, times),
  deleteAvailableTime: (meetingId, availableTimeId) =>
    Api.delete(`/meetings/${meetingId}/availableTimes/${availableTimeId}`),
  update: (meetingId, update) => Api.patch(`/meetings/${meetingId}`, update),
  joinOrLeave: (meetingId, userId) =>
    Api.patch(`/meetings/${meetingId}/users/${userId}`),
  delete: meetingId => Api.delete(`/meetings/${meetingId}`),
  deleteAll: () => Api.delete('/meetings')
}
