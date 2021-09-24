import { Api } from '@/Api'

export const userApi = {
  getProfile: gameId => Api.get(`/users/${gameId}`)
}
