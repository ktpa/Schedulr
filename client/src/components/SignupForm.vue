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
        :state="state.name"
        v-on:keyup.enter="submitSignup"
      />
      <b-form-invalid-feedback id="name">
        {{ this.error.name }}
      </b-form-invalid-feedback>
    </div>

    <div class="inner-addon left-addon">
      <BIconAt class="input-icon" />
      <b-input
        class="form-input"
        type="email"
        v-model="form.email"
        placeholder="E-mail"
        id="email"
        :state="state.email"
        v-on:keyup.enter="submitSignup"
      />
      <b-form-invalid-feedback id="email">
        {{ this.error.email }}
      </b-form-invalid-feedback>
    </div>

    <div class="inner-addon left-addon">
      <BIconHash class="input-icon" />
      <b-input
        class="form-input"
        type="text"
        v-model="form.username"
        placeholder="Username"
        id="username"
        :state="state.username"
        v-on:keyup.enter="submitSignup"
      />
      <b-form-invalid-feedback id="username">
        {{ this.error.username }}
      </b-form-invalid-feedback>
    </div>

    <div class="inner-addon left-addon">
      <BIconShieldLock class="input-icon" />
      <b-input
        class="form-input"
        type="password"
        v-model="form.password"
        placeholder="Password"
        id="password"
        :state="state.password"
        v-on:keyup.enter="submitSignup"
      />
      <b-form-invalid-feedback id="password">
        {{ this.error.password }}
      </b-form-invalid-feedback>
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
    },
    state: {
      name: null,
      email: null,
      username: null,
      password: null
    },
    error: {
      name: '',
      email: '',
      username: '',
      password: '',
      emptyField: ''
    },
    // Adapted from https://regexr.com/2rhq7
    regX: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  }),

  methods: {
    submitSignup() {
      let valid = true
      if (this.form.name === '') {
        this.state.name = false
        this.error.name = 'Name cannot be empty'
        valid = false
      }
      if (this.form.email === '') {
        this.state.email = false
        this.error.email = 'Email cannot be empty'
        valid = false
      } else if (!this.regX.exec(this.form.email)) {
        this.state.email = false
        this.error.email = 'Invalid email'
        valid = false
      }
      if (this.form.username === '') {
        this.state.username = false
        this.error.username = 'Username cannot be empty'
        valid = false
      }
      if (this.form.password === '') {
        this.state.password = false
        this.error.password = 'Password cannot be empty'
        valid = false
      }

      if (valid) {
        const user = {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password,
          name: this.form.name
        }
        this.$store
          .dispatch('signup', user)
          .then(() => this.$router.push('/'))
          .catch(err => {
            console.log(err.response.data)
            if (err.response.data.errorMessage === 'insecure_password') {
              this.error.password = 'Password must be at least 8 characters'
              this.state.password = false
            }
            if (err.response.data.errorMessage === 'username_in_use') {
              this.error.username = 'Username already in use'
              this.state.username = false
            }
            if (err.response.data.errorMessage === 'email_in_use') {
              this.error.email = 'Email already in use'
              this.state.email = false
            }
          })
      }
    }
  }
}
</script>

<style></style>
