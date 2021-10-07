<template>
  <div class="page">
    <h1 v-if="this.meeting">{{ this.meeting.meetingName }}</h1>
    <AvailableTimePicker v-if="this.meeting" :meeting="this.meeting" />
    <b-button
      v-if="
        this.meeting && this.meeting.createdBy === this.$store.getters.userId
      "
      @click="this.deleteMeeting"
      >Delete Meeting</b-button
    >
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
  },
  methods: {
    deleteMeeting() {
      if (this.meeting) {
        if (this.meeting.createdBy === this.$store.getters.userId) {
          meetingApi
            .delete(this.$route.params.id)
            .then(res => this.$router.push('/'))
            .catch(err => {
              console.log(err)
            })
        }
      }
    }
  }
}
</script>

<style scoped>
.page {
  float: left;
}
h1 {
  float: left;
}
</style>
