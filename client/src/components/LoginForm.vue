<template>
  <div class="wrapper">
    <div class="inner-addon left-addon">
      <BIconHash class="input-icon" />
      <b-input
        class="form-input"
        type="text"
        v-model="form.username"
        placeholder="Username"
        id="input-username"
        :state="state"
      />
    </div>

    <div class="inner-addon left-addon">
      <BIconShieldLock class="input-icon" />
      <b-input
        class="form-input"
        type="password"
        v-model="form.password"
        placeholder="Password"
        id="input-password"
        :state="state"
      />

      <b-form-invalid-feedback id="input-live-feedback">
        Username or Password incorrect
      </b-form-invalid-feedback>
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
    },
    state: null
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
        .catch(() => (this.state = false))
    }
  }
}
</script>

<style></style>
