<template>
  <div>
    <b-list-group id="meetings_list">
      <b-list-group-item v-for="meeting in meetings" :key="meeting.message">
        <a :href="`meeting/${meeting._id}`">
          <span>{{ meeting.meetingName }}</span>
          <span>Participants: {{ meeting.participantsList.length }}</span>
        </a>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
// @ is an alias to /src
import { meetingApi } from '@/api/meeting.js'

export default {
  name: 'home',
  components: {},
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
    participants: a => {
      console.log(a)
      return a.length
    }
  }
}
</script>

<style scoped>
#meetings_list {
  display: flex;
  align-self: flex-end;
}
.list-group-item {
  padding: 15px;
  margin-bottom: 10px;
}
.list-group-item:nth-child(even) {
  display: flex;
  background-color: #fc7a30;
}
.list-group-item:nth-child(odd) {
  display: flex;
  background-color: #da6b6b;
}
a {
  display: flex;
  color: white;
  width: 100%;
  justify-content: space-between;
}
a:hover {
  text-decoration: none;
}
</style>
