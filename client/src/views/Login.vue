<template>
  <div class="landing">
    <LoginForm v-if="isLogin" />
    <SignupForm v-if="!isLogin" />
    <b-button variant="link" @click="switchForm">
      Click here if you would like to {{ isLogin ? 'sign up.' : 'login' }}
    </b-button>
  </div>
</template>
<script>
import LoginForm from '../components/LoginForm.vue'
import SignupForm from '../components/SignupForm.vue'

export default {
  components: { LoginForm, SignupForm },
  name: 'login',
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
