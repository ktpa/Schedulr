<template>
  <div class="home">
    <b-list-group id="meetings_list">
      <div class="outerMeetingContainer">
        <b-list-group-item v-for="meeting in meetings" :key="meeting.message">
          <a :href="`meeting/${meeting._id}`">
            <div class="innerNameContainer">
              <span class="name">{{ meeting.meetingName }}</span>
            </div>
            <div class="innerParticipantsContainer">
              <span class="participants"
                >Participants: {{ meeting.participantsList.length }}</span
              >
            </div>
          </a>
        </b-list-group-item>
      </div>
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
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
}
.outerMeetingContainer {
  width: 40%;
}
.innerParticipantsContainer {
  text-align: right;
  background-color: rgba(255, 0, 0, 0.3);
}

.innerNameContainer {
  text-align: left;
  background-color: rgba(0, 255, 0, 0.3);
}
.home {
  background-image: linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);
}
.name {
  margin: 2em;
}
.participants {
  margin: 2em;
}
.list-group-item {
  padding: 1em;
  margin: 0.5em;
}
.list-group-item:nth-child(even) {
  background-color: rgba(9, 92, 215, 1);
  -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  -moz-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
}
.list-group-item:nth-child(odd) {
  background-color: rgba(8, 83, 196, 1);
  -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  -moz-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
}
a {
  color: rgba(255, 255, 255, 0.87);
  width: 100%;
  justify-content: space-between;
  transition: 0.2s;
}
a:hover {
  text-decoration: none;
  color: white;
  transition: 0.2s;
  text-shadow: rgba(0, 0, 0, 0.3) 0 1px 5px;
}
</style>
