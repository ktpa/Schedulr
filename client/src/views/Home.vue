<template>
  <div>
    <b-list-group id="meetings_list">
    <b-list-group-item v-for="meeting in meetings" :key="meeting.message">
    <span>{{meeting.meetingName}}</span>
    <span>Participants: {{meeting.participantsList.length}}</span>
    </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
// @ is an alias to /src
import { meetingApi } from '@/api/meeting.js'

export default {
  name: 'home',
  components: { },
  data() {
    return {
      meetings: []
    }
  },
  beforeCreate() {
    meetingApi
      .getMeetings()
      .then(res => {
        this.meetings = res.data.data
      })
      .catch(err => console.log(err))
  },
  methods: {
    participants: (a) => {
      console.log(a)
      return a.length
    }
  }
}
</script>

<style>
#meetings_list {
  display: flex;
  align-self: flex-end;
}
.list-group-item {
  display: flex;
  padding: 15px;
  justify-content: space-between;
}
.list-group-item:nth-child(even) {
  display: flex;
  background-color: #FC7A30;
}
.list-group-item:nth-child(odd) {
  display: flex;
  background-color: #DA6B6B;
}
</style>
