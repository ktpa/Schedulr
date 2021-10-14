import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import { Api } from '@/Api.js'
import store from './api/store'
import VueCookies from 'vue-cookies'
import VueClipboard from 'vue-clipboard2'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueCookies)
Vue.use(VueClipboard)

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
  render(h) {
    return h(App)
  }
}).$mount('#app')
