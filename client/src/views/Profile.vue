<template>
  <div class="profile">
    <div class="header">
      <b-button @click="log">userId</b-button>
      <b-button @click="log2">token</b-button
      ><b-button @click="logout">Logout</b-button>
    </div>
    <div class="profile-details">
      <b-input
        type="text"
        v-model="user.name"
        placeholder="name"
        id="name"
        disabled
      />
      <br />
      <b-input
        type="email"
        v-model="user.email"
        placeholder="e-mail"
        id="email"
        disabled
      />
      <br />
      <b-input
        type="text"
        v-model="user.username"
        placeholder="username"
        id="username"
        disabled
      />
      <br />
      <b-input
        type="password"
        v-model="user.password"
        placeholder="password"
        id="password"
        disabled
      />
    </div>
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
      }
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
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/login')
      })
    },
    log() {
      console.log(this.$store.getters.userId)
    },
    log2() {
      console.log(this.$store.getters.token)
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
