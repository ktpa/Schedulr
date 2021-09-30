<template>
  <div class="wrapper">
    <div class="inner-addon left-addon">
      <BIconPerson class="input-icon" />
      <b-input
        class="form-input"
        type="text"
        v-model="form.name"
        placeholder="Name"
        id="name"
      />
    </div>

    <div class="inner-addon left-addon">
      <BIconAt class="input-icon" />
      <b-input
        class="form-input"
        type="email"
        v-model="form.email"
        placeholder="E-mail"
        id="email"
      />
    </div>

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

    <b-button class="submit-signup" type="submit" v-on:click="submitSignup()">
      Signup
    </b-button>
  </div>
</template>
<script>
import { BIconAt, BIconShieldLock, BIconHash, BIconPerson } from 'bootstrap-vue'
export default {
  components: {
    BIconHash,
    BIconShieldLock,
    BIconAt,
    BIconPerson
  },
  name: 'signupForm',
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
      this.$store
        .dispatch('signup', user)
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style></style>
