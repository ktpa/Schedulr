a<template>
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
      <b-button type="submit" v-on:click="submitSignup()">
        Signup
      </b-button>
    </b-jumbotron>
  </div>
</template>
<script>
import { authApi } from '@/api/auth.js'

export default {
  name: 'user',
  data: () => ({
    form: {
      username: '',
      email: '',
      password: '',
      name: ''
    }
  }),

  methods: {
    submitSignup() {
      const user = {
        username: this.form.username,
        email: this.form.email,
        password: this.form.password,
        name: this.form.name
      }
      authApi
        .signup(user)
        .then(res => console.log(res))
        .catch(err => console.log(err.response.data))
    }
  }
}
</script>

<style></style>
