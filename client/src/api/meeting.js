import { Api } from '@/Api'

export const meetingApi = {
  getMeetings: () => Api.get('/meetings')
}
