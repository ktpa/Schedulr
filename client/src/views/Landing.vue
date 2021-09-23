<template>
  <div class="landing">
    <Login v-if="isLogin" />
    <Signup v-if="!isLogin" />
    <b-button variant="link" @click="switchForm">
      Click here if you would like to {{ isLogin ? 'sign up.' : 'login' }}
    </b-button>
  </div>
</template>
<script>
import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'

export default {
  components: { Login, Signup },
  name: 'landing',
  data() {
    return {
      isLogin: true
    }
  },

  methods: {
    switchForm() {
      this.isLogin = !this.isLogin
    }
  }
}
</script>

<style>
.landing {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
