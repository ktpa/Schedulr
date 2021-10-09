<template>
  <div>
    <b-list-group id="meetings_list">
      <b-list-group-item v-for="meeting in meetings" :key="meeting.message">
        <a :href="`meeting/${meeting._id}`">
          <span class="name">{{ meeting.meetingName }}</span>
          <span class="participants"
            >Participants: {{ meeting.participantsList.length }}</span
          >
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
  align-items: center;
  justify-content: center;
}
.name {
  margin-right: 2em;
}
.participants {
  margin-left: 2em;
}
.list-group-item {
  padding: 15px;
  margin-bottom: 10px;
  max-width: 40rem;
  min-width: 20rem;
}
.list-group-item:nth-child(even) {
  display: flex;
  background-color: rgba(9, 92, 215, 1);
  -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  -moz-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
}
.list-group-item:nth-child(odd) {
  display: flex;
  background-color: rgba(8, 83, 196, 1);
  -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  -moz-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
}
a {
  display: flex;
  color: rgba(255, 255, 255, 0.87);
  width: 100%;
  justify-content: space-between;
  transition: 0.2s;
}
a:hover {
  text-decoration: none;
  color: white;
  transition: 0.2s;
}
</style>
