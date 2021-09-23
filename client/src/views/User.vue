<template>
  <div>
    <b-jumbotron>
      <input
        @input="handleInput($event.target.value)"
        type="text"
        v-model="name"
        placeholder="name"
        id="name"
      />
      <br />
      <input type="email" v-model="email" placeholder="e-mail" id="email" />
      <br />
      <input
        type="text"
        v-model="username"
        placeholder="username"
        id="username"
      />
      <br />
      <input
        type="password"
        v-model="password"
        placeholder="password"
        id="password"
      />
      <br />
      <b-button
        type="submit"
        v-on:click="submitSignup(name, email, username, password)"
        >Signup</b-button
      >
      <b-button type="submit" v-on:click="submitLogin(username, password)"
        >Login</b-button
      >
      <p>
        Your typed name:<br />
        {{ nameField }}
      </p>
    </b-jumbotron>
  </div>
</template>
<script>
// @ is an alias to /src
import { signup, login } from '@/Api'

export default {
  name: 'user',
  data() {
    return {
      nameField: 'none'
    }
  },
  methods: {
    handleInput(value) {
      this.nameField = value
    },
    submitSignup(name, email, username, password) {
      const user = {
        username: username,
        email: email,
        password: password,
        name: name
      }
      signup(user).then(res => (this.message = res))
    },
    submitLogin(username, password) {
      const user = {
        username: username,
        password: password
      }
      login(user).then(res => console.log(res))
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
