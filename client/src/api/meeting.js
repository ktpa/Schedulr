import { Api } from '@/Api'

export const meetingApi = {
  getMeetings: () => Api.get('/meetings'),
  getOne: meetingId => Api.get(`/meetings/${meetingId}`),
  createMeeting: meeting => Api.post('/meetings', meeting),
  addAvailableTimes: (meetingId, times) =>
    Api.post(`/meetings/${meetingId}/availableTimes`, times),
  deleteAvailableTime: (meetingId, availableTimeId) =>
    Api.delete(`/meetings/${meetingId}/availableTimes/${availableTimeId}`),
  update: (meetingId, update) => Api.put(`/meetings/${meetingId}`, update),
  // TODO(numank): Yeah this is pretty stupid, I should update the backend.
  joinOrLeave: (meetingId, userId) =>
    Api.patch(`/meetings/${meetingId}/users/${userId}`),
  delete: meetingId => Api.delete(`/meetings/${meetingId}`)
}
