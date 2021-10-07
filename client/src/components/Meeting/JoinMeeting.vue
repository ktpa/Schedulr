<template>
  <div>
    <h2>{{ this.meeting.meetingName }}</h2>
    <h4>{{ `participants: ${this.meeting.participantsList.length}` }}</h4>
    <h4>Would you like to join to this meeting?</h4>
    <b-button @click="this.accept">Yes</b-button>
    <b-button @click="this.decline">No</b-button>
  </div>
</template>

<script>
import { meetingApi } from '@/api/meeting.js'
export default {
  name: 'JoinMeeting',
  props: ['meeting'],
  data() {
    return {}
  },
  methods: {
    accept() {
      meetingApi.joinOrLeave(this.meeting._id, this.$store.getters.userId).then(
        res => this.$router.go(this.$router.currentRoute),
        err => {
          console.log(err)
          this.$router.push('/')
        }
      )
      this.$router.go(this.$router.currentRoute)
    },
    decline() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped></style>
