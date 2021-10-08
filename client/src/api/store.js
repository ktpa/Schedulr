import Vue from 'vue'
import Vuex from 'vuex'
import { authApi } from '@/api/auth.js'
import { Api } from '@/Api.js'
import cookie from 'vue-cookies'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    status: '',
    token: cookie.get('token') || '',
    userId: cookie.get('userId') || ''
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, payload) {
      state.status = 'success'
      state.userId = payload.userId
      state.token = payload.token
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        authApi
          .login(user)
          .then(res => {
            const token = res.data.accessToken
            const userId = res.data.user
            const payload = {
              token: token,
              userId: userId
            }
            Vue.$cookies.set('token', token)
            Vue.$cookies.set('userId', userId)
            Api.defaults.headers.common.Authorization = `Bearer ${token}`
            commit('auth_success', payload)
            resolve(res)
          })
          .catch(err => {
            commit('auth_error')
            Vue.$cookies.remove('token')
            Vue.$cookies.remove('userId')
            reject(err)
          })
      })
    },
    signup({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        authApi
          .signup(user)
          .then(() => {
            return authApi.login({
              username: user.username,
              password: user.password
            })
          })
          .then(res => {
            const token = res.data.accessToken
            const userId = res.data.user
            const payload = {
              token: token,
              userId: userId
            }
            Vue.$cookies.set('token', token)
            Vue.$cookies.set('userId', userId)
            Api.defaults.headers.common.Authorization = `Bearer ${token}`
            commit('auth_success', payload)
            resolve(res)
          })
          .catch(err => {
            commit('auth_error', err)
            Vue.$cookies.remove('token')
            Vue.$cookies.remove('userId')
            reject(err)
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        Vue.$cookies.remove('token')
        Vue.$cookies.remove('userId')
        delete Api.defaults.headers.common.Authorization
        resolve()
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    userId: state => state.userId,
    token: state => state.token
  }
})
