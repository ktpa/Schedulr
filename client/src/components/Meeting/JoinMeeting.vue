<template>
  <div class="page-wrapper">
    <div class="join-wrapper">
      <h2>{{ this.meeting.meetingName }}</h2>
      <h5>{{ `participants: ${this.meeting.participantsList.length}` }}</h5>
      <h4>Would you like to join to this meeting?</h4>
      <div class="button-wrapper">
        <b-button class="yes-button" variant="success" @click="this.accept"
          >Yes</b-button
        >
        <b-button variant="outline-danger" @click="this.decline">No</b-button>
      </div>
    </div>
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

<style scoped>
.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.join-wrapper {
  display: flex;
  flex-direction: column;
  border: 1px solid #00000030;
  border-radius: 5px;
  max-width: 500px;
  padding: 10px;
}
.button-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.yes-button {
  margin-right: 15px;
}
h4 {
  margin-top: 30px;
  margin-bottom: 20px;
}
</style>
