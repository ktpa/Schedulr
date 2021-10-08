import Vue from 'vue'
import Router from 'vue-router'
import store from './api/store'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Profile from './views/Profile.vue'
import BlockedTimes from './views/BlockedTimes.vue'
import MeetingDetails from './views/MeetingDetails.vue'
import PageNotFound from './views/PageNotFound.vue'
import CreateMeeting from './views/CreateMeeting.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        beforeAuth: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/blocked-times',
      name: 'BlockedTimes',
      component: BlockedTimes,
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/create-meeting',
      name: 'Create Meeting',
      component: CreateMeeting,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/meeting/:id',
      name: 'Meeting',
      component: MeetingDetails,
      meta: {
        requiresAuth: true
      }
    },
    { path: '/:pathMatch(.*)*', component: PageNotFound }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      return next()
    }
    next('/login')
  } else if (to.matched.some(record => record.meta.beforeAuth)) {
    if (store.getters.isLoggedIn) {
      return next('/')
    }
    next()
  } else {
    return next()
  }
})

export default router
