<template>
  <div class="profile">
    <b-button @click="log">userId</b-button>
    <b-button @click="log2">token</b-button
    ><b-button @click="logout">Logout</b-button>
  </div>
</template>
<script>
export default {
  name: 'profile',
  data() {
    return {}
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

<style></style>
