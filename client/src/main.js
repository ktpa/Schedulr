import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import { Api } from '@/Api.js'
import store from './api/store'
import VueCookies from 'vue-cookies'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueCookies)

Vue.$cookies.config('30d')

Vue.config.productionTip = false

Vue.prototype.$http = Api

const token = Vue.$cookies.get('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = `Bearer ${token}`
}

new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  },
  created: function () {
    /*
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err
      })
    }) */
  }
}).$mount('#app')
