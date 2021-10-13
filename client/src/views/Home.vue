<template>
  <div class="home">
    <b-list-group id="meetings_list">
      <b-list-group-item v-for="meeting in meetings" :key="meeting.message">
        <a :href="`meeting/${meeting._id}`">
          <div class="topContainer">
            <span class="name">{{
              formatMeetingName(meeting.meetingName)
            }}</span>
            <span class="participants"
              >Participants: {{ meeting.participantsList.length }}</span
            >
          </div>
          <div class="middleContainer">
            <!-- Get user that created the meeting, show as owner + name. -->
            <b-img
              v-bind="mainProps"
              rounded="circle"
              alt="Circle image"
              class="creatorImage"
            ></b-img>
            <span class="creator">Placeholder Creator</span>
            <!-- Get participants of meeting, show concatenated. -->
            <!-- Get dates of meeting, display earliest meeting day -->
          </div>
        </a>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
// @ is an alias to /src
import { meetingApi } from '@/api/meeting.js'
import { truncate } from 'lodash'

export default {
  name: 'home',
  components: {},
  data() {
    return {
      meetings: [],
      mainProps: {
        blank: true,
        blankColor: '#777',
        width: 50,
        height: 50,
        class: 'm1'
      }
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
    },
    formatMeetingName(name) {
      console.log(name)
      name = truncate(name, {
        length: '25'
      })
      console.log('Truncated: ' + name)
      return name
    }
  }
}
</script>

<style scoped>
#meetings_list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, auto));
  gap: 5%;
}
.middleContainer {
}
.creatorImage {
  margin: 5px;
}
.topContainer {
  display: flex;
  justify-content: space-between;
}
.home {
}
.name {
  text-align: left;
  max-width: 75%;
  margin: 10px;
  font-size: 1.8em;
}
.participants {
  margin: 10px;
}
.list-group-item {
  align-self: center;
  justify-self: center;
  text-align: left;
  height: 200px;
  width: 500px;
  gap: 2%;
  padding: 0px;
}
.list-group-item:nth-child(even) {
  background-color: rgba(9, 92, 215, 1);
  -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  -moz-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  transition: 0.3s;
}
.list-group-item:nth-child(odd) {
  background-color: rgba(8, 83, 196, 1);
  -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  -moz-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  transition: 0.3s;
}
.list-group-item:nth-child(odd):hover {
  background-color: rgb(14, 87, 197);
  -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 2px 3px;
  -moz-box-shadow: rgba(0, 0, 0, 0.3) 0 2px 3px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 2px 3px;
  transition: 0.3s;
}
.list-group-item:nth-child(even):hover {
  background-color: rgb(15, 96, 216);
  -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 2px 3px;
  -moz-box-shadow: rgba(0, 0, 0, 0.3) 0 2px 3px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 2px 3px;
  transition: 0.3s;
}
a {
  display: flex;
  flex-direction: column;
  color: rgba(255, 255, 255, 0.87);
  width: 100%;
  height: 100%;
  transition: 0.2s;
}
a:hover {
  text-decoration: none;
  color: white;
  transition: 0.2s;
  text-shadow: rgba(0, 0, 0, 0.3) 0 1px 5px;
}
</style>
