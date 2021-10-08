import { Api } from '@/Api'

export const meetingApi = {
  getMeetings: () => Api.get('/meetings'),
  createMeeting: meeting => Api.post('/meetings', meeting)
}
