<template>
  <div class="page">
    <h1>{{ this.meeting.meetingName }}</h1>
    <AvailableTimePicker v-if="this.meeting" :meeting="this.meeting" />
  </div>
</template>

<script>
import AvailableTimePicker from '../components/Meeting/AvailableTimePicker.vue'
import { meetingApi } from '@/api/meeting.js'
export default {
  components: {
    AvailableTimePicker
  },
  data() {
    return {
      meeting: undefined
    }
  },
  beforeCreate() {
    meetingApi
      .getOne(this.$route.params.id)
      .then(res => {
        this.meeting = res.data
      })
      .catch(err => {
        console.log(err)
        this.$router.push('/404')
      })
  }
}
</script>

<style scoped>
h1 {
  float: left;
}
</style>
