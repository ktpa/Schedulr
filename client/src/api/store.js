import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { authApi } from '@/api/auth.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    userId: localStorage.getItem('userId') || ''
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
            localStorage.setItem('token', token)
            localStorage.setItem('userId', userId)
            axios.defaults.headers.common.Authorization = token
            commit('auth_success', payload)
            resolve(res)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    signup({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        authApi
          .signup(user).then(() => {
            return authApi.login({ username: user.username, password: user.password })
          })
          .then(res => {
            const token = res.data.accessToken
            const userId = res.data._id
            const payload = {
              token: token,
              userId: userId
            }
            localStorage.setItem('token', token)
            localStorage.setItem('userId', userId)
            axios.defaults.headers.common.Authorization = token
            commit('auth_success', payload)
            resolve(res)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common.Authorization
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
