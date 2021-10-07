import { Api } from '@/Api'

export const meetingApi = {
  getMeetings: () => Api.get('/meetings'),
  getOne: meetingId => Api.get(`/meetings/${meetingId}`)
}
