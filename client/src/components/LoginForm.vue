<template>
  <div class="wrapper">
    <div class="inner-addon left-addon">
      <BIconHash class="input-icon" />
      <b-input
        class="form-input"
        type="text"
        v-model="form.username"
        placeholder="Username"
        id="username"
      />
    </div>

    <div class="inner-addon left-addon">
      <BIconShieldLock class="input-icon" />
      <b-input
        class="form-input"
        type="password"
        v-model="form.password"
        placeholder="Password"
        id="password"
      />
    </div>

    <b-button class="submit-login" type="submit" v-on:click="submitLogin()">
      Login
    </b-button>
  </div>
</template>
<script>
import { BIconHash, BIconShieldLock } from 'bootstrap-vue'

export default {
  components: {
    BIconHash,
    BIconShieldLock
  },
  name: 'loginForm',
  data: () => ({
    form: {
      username: '',
      password: ''
    }
  }),

  methods: {
    submitLogin() {
      const user = {
        username: this.form.username,
        password: this.form.password
      }
      this.$store
        .dispatch('login', user)
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style></style>
