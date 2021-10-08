<template>
  <div class="page">
    <BlockedTimePicker :blockedTimes="this.blockedTimes" :onChange="this.reFetch"/>
  </div>
</template>

<script>
import BlockedTimePicker from '../components/BlockedTime/BlockedTimePicker.vue'
import { userApi } from '../api/user.js'
export default {
  components: {
    BlockedTimePicker
  },
  beforeCreate() {
    userApi.getBlockedTime(this.$store.getters.userId)
      .then(res => {
        this.blockedTimes = res.data
        console.log(this.blockedTimes)
      })
      .catch(err => console.log(err))
  },
  data() {
    return {
      blockedTimes: []
    }
  },
  methods: {
    reFetch() {
      userApi.getBlockedTime(this.$store.getters.userId)
        .then(res => {
          this.blockedTimes = res.data
          console.log(this.blockedTimes)
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
.page {
  min-height: 100vh;
}
</style>
