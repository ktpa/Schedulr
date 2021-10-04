<template>
  <div class="profile">
    <div class="update_profile">
      <b-button v-if="disabled" @click="activateProfile">Update Profile</b-button>
    </div>

    <b-form @submit.prevent="onUpdateProfile">
    <div class="profile-details">
    <p>{{this.$store.getters.userId}}</p>
    <p>{{this.user}}</p>
      <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <b-list-group>
      <b-list-group-item v-for="error in errors" :key="error">{{ error }}</b-list-group-item>
    </b-list-group>
  </p>
      <br />
        <b-input
        type="text"
        v-model="user.username" :disabled=true
        placeholder="username"
        id="username"
      />
      <br />
      <b-input
        type="email"
        v-model="user.email" :disabled=true
        placeholder="e-mail"
        id="email"
      />
      <br />
        <b-input
        type="text"
        v-model="user.name" :disabled="disabled"
        placeholder="name"
        id="name"
      />
      <br />
      <b-input
        type="password"
        v-model="user.password" :disabled="disabled"
        placeholder="password"
        id="password"
      />
    </div>
        <div>
    <b-button v-if="!disabled" v-on:click="onCancel">Cancel</b-button>
    <b-button v-if="!disabled" v-on:click="onUpdateProfile">Save Changes</b-button>
    </div>
  </b-form>

  </div>
</template>
<script>
import { userApi } from '@/api/user.js'
export default {
  name: 'profile',
  data() {
    return {
      user: {
        name: '',
        username: '',
        email: '',
        password: '',
        profilePicUrl: ''
      },
      disabled: true,
      errors: []
    }
  },
  beforeCreate() {
    userApi
      .getProfile(this.$store.getters.userId)
      .then(res => {
        const userRes = res.data.data
        this.user.name = userRes.name
        this.user.username = userRes.username
        this.user.email = userRes.email
        this.user.password = userRes.password
        this.user.profilePicUrl = userRes.profilePicUrl
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    activateProfile() {
      this.disabled = !this.disabled
    },
    onUpdateProfile() {
      if (!this.checkForm()) {
        console.log('didnt work')
        return
      }
      this.disabled = !this.disabled
      console.log(this.user.name)
      console.log(this.user.password)
      console.log(this.user)
      userApi.putProfile(this.$store.getters.userId, this.user)
      alert('Your profile has been updated')
      userApi
        .getProfile(this.$store.getters.userId)
        .then(res => {
          const userRes = res.data.data
          this.user.name = userRes.name
          this.user.username = userRes.username
          this.user.email = userRes.email
          this.user.password = userRes.password
          this.user.profilePicUrl = userRes.profilePicUrl
        })
        .catch(err => {
          console.log(err)
        })
    },
    onCancel() {
      this.disabled = !this.disabled
      userApi
        .getProfile(this.$store.getters.userId)
        .then(res => {
          const userRes = res.data.data
          this.user.name = userRes.name
          this.user.username = userRes.username
          this.user.email = userRes.email
          this.user.password = userRes.password
          this.user.profilePicUrl = userRes.profilePicUrl
        })
        .catch(err => {
          console.log(err)
        })
    },
    checkForm() {
      this.errors = []
      if (!this.user.name) {
        this.errors.push('Name required.')
      }
      if (!this.user.password) {
        this.errors.push('Password required.')
      } else if (this.user.password.length < 8) {
        this.errors.push('Password must be a minimum of 8 characters.')
      }
      if (!this.errors.length) {
        return true
      }
    }
  }
}
</script>

<style>
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
