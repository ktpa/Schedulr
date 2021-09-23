<template>
  <div>
    <b-jumbotron>
      <b-input
        type="text"
        v-model="form.username"
        placeholder="username"
        id="username"
      />
      <br />
      <b-input
        type="password"
        v-model="form.password"
        placeholder="password"
        id="password"
      />
      <br />
      <b-button type="submit" v-on:click="submitLogin()">
        Login
      </b-button>
    </b-jumbotron>
  </div>
</template>
<script>
import { authApi } from '@/api/auth.js'

export default {
  name: 'login',
  data: () => ({
    form: {
      username: '',
      password: ''
    }
  }),

  methods: {
    submitLogin(form) {
      const user = {
        username: this.form.username,
        password: this.form.password
      }
      authApi
        .login(user)
        .then(response => {
          document.cookie =
            'SESSION=' +
            response.data.accessToken +
            ';' +
            response.data.accessTokenExpiresAt +
            ';path=/'
          this.$router.push('/')
        })
        .catch(error => {
          return error
        })
    }
  }
}
</script>

<style></style>
