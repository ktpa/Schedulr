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
export default {
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
