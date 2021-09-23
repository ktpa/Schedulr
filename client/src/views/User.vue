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
        v-on:click="submit(name, email, username, password)"
        >Submit</b-button
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
import { Api } from '@/Api'

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
    submit(name, email, username, password) {
      console.log(name)
      const user = {
        username: username,
        email: email,
        password: password,
        name: name
      }

      Api.post('/users', user)
        .then(response => {
          console.log(response)
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
