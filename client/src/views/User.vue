<template>
  <div>
    <b-jumbotron>
      <b-input type="text" v-model="form.name" placeholder="name" id="name" />
      <br />
      <b-input
        type="email"
        v-model="form.email"
        placeholder="e-mail"
        id="email"
      />
      <br />
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
      <b-button type="submit" v-on:click="submitSignup(form)">
        Signup
      </b-button>
      <b-button type="submit" v-on:click="submitLogin(form)">
        Login
      </b-button>
    </b-jumbotron>
  </div>
</template>
<script>
import { authApi } from '@/api/auth.js'

export default {
  name: 'user',
  data: () => ({ form: {} }),

  methods: {
    submitSignup(form) {
      const user = {
        username: form.username,
        email: form.email,
        password: form.password,
        name: form.name
      }
      authApi
        .signup(user)
        .then(res => console.log(res))
        .catch(err => console.log(err.response.data))
    },
    submitLogin(form) {
      const user = {
        username: form.username,
        password: form.password
      }
      authApi.login(user).then(res => console.log(res))
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
