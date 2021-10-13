import Vue from 'vue'
import Vuex from 'vuex'
import { authApi } from '@/api/auth.js'
import { userApi } from '@/api/user.js'
import { Api } from '@/Api.js'
import cookie from 'vue-cookies'

Vue.use(Vuex)
export default new Vuex.Store({
  // isAdmin is not the real way to do this, but It'll do the trick for us
  // No matter what, we don't let them access admin page if they are not
  state: {
    status: '',
    token: cookie.get('token') || '',
    userId: cookie.get('userId') || '',
    isAdmin: cookie.get('isAdmin') || ''
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, payload) {
      state.status = 'success'
      state.userId = payload.userId
      state.token = payload.token
      state.isAdmin = payload.isAdmin
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
            Vue.$cookies.set('token', token)
            Vue.$cookies.set('userId', userId)
            Api.defaults.headers.common.Authorization = `Bearer ${token}`
            // delete this when we are graded
            userApi
              .getProfile(userId)
              .then(res => {
                if (res.data.data.username === 'admin') {
                  Vue.$cookies.set('isAdmin', true)
                  const payload = {
                    token: token,
                    userId: userId,
                    isAdmin: true
                  }
                  commit('auth_success', payload)
                  return resolve(res)
                }
                const payload = {
                  token: token,
                  userId: userId
                }
                commit('auth_success', payload)
                resolve(res)
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(err => {
            commit('auth_error')
            Vue.$cookies.remove('token')
            Vue.$cookies.remove('userId')
            // delete this when we are graded
            Vue.$cookies.remove('isAdmin')
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
        // delete this when we are graded
        Vue.$cookies.remove('isAdmin')
        resolve()
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    userId: state => state.userId,
    token: state => state.token,
    isAdmin: state => state.isAdmin
  }
})
