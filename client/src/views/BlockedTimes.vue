<template>
  <div class="page">
    <div class="header">
      <h1>
        Blocked Times
      </h1>
    </div>
    <BlockedTimePicker
      :blockedTimes="this.blockedTimes"
      :onChange="this.reFetch"
    />
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
    userApi
      .getBlockedTime(this.$store.getters.userId)
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
      userApi
        .getBlockedTime(this.$store.getters.userId)
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
  text-align: left;
}
.header {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 20px 0px;
}
</style>
