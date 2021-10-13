<template>
  <div class="home">
    <b-list-group id="meetings_list">
      <b-list-group-item v-for="meeting in meetings" :key="meeting.message">
        <a :href="`meeting/${meeting._id}`">
          <div class="topContainer">
            <span class="name">{{
              formatMeetingName(meeting.meetingName)
            }}</span>
          </div>
          <div class="middleContainer">
            <!-- Get user that created the meeting, show as owner + name. -->
            <b-img
              v-bind="creatorProps"
              rounded="circle"
              alt="Circle image"
              class="creatorImage slick-shadow"
            ></b-img>
            <span class="creator">Placeholder Creator's meeting</span>
            <div class="midText">
              <span class="meetingDate"
                >First: DD-MM-YYYY<br />Last: DD-MM-YYYY</span
              >
            </div>
            <!-- Get dates of meeting, display earliest meeting day -->
          </div>
          <div class="bottomContainer">
            <b-img
              v-bind="participantProps"
              rounded="circle"
              alt="Circle image"
              class="participantImage slick-shadow"
            ></b-img>
            <b-img
              v-bind="participantProps"
              rounded="circle"
              alt="Circle image"
              class="participantImage"
            ></b-img>
            <span class="participants"
              >Participants: {{ meeting.participantsList.length }}</span
            >
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
      creatorProps: {
        blank: true,
        blankColor: '#277',
        width: 35,
        height: 35,
        class: 'm1'
      },
      participantProps: {
        blank: true,
        blankColor: '#277',
        width: 25,
        height: 25,
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
        length: '28'
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
  border-radius: 25px;
}
.creatorImage {
  margin: 5px;
  border-style: solid;
  border-width: 3px;
}
.participantImage {
  margin-right: -15px;
  margin-left: 5px;
  margin-top: 10px;
  border-style: solid;
  border-width: 2px;
}
.creator {
  color: rgb(0, 0, 0);
  font-size: 1.1em;
}
.meetingDate {
  color: rgb(0, 0, 0);
}
.midText {
  display: flex;
  float: right;
  padding-right: 5px;
}
.topContainer {
  display: flex;
  justify-content: space-between;
}
.bottomContainer {
  height: inherit;
  border-radius: 25px;
}
.name {
  text-align: left;
  max-width: 75%;
  margin: 10px;
  font-size: 1.8em;
}
.participants {
  margin: 10px;
  float: right;
}
.list-group-item {
  align-self: center;
  justify-self: center;
  text-align: left;
  height: 200px;
  width: 500px;
  gap: 2%;
  padding: 0px;
  border-radius: 25px;
}
.list-group-item:nth-child(even) {
  background-color: rgb(253, 253, 253);
  -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  -moz-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  transition: 0.2s;
}
.list-group-item:nth-child(odd) {
  background-color: rgb(253, 253, 253);
  -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  -moz-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  transition: 0.2s;
}
.list-group-item:nth-child(odd):hover {
  background-color: rgb(255, 255, 255);
  -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 2px 3px;
  -moz-box-shadow: rgba(0, 0, 0, 0.3) 0 2px 3px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 2px 3px;
  transition: 0.2s;
}
.list-group-item:nth-child(even):hover {
  background-color: rgb(255, 255, 255);
  -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 2px 3px;
  -moz-box-shadow: rgba(0, 0, 0, 0.3) 0 2px 3px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 2px 3px;
  transition: 0.2s;
}
a {
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.87);
  width: 100%;
  height: 100%;
  transition: 0.2s;
}
a:hover {
  text-decoration: none;
  color: rgba(0, 0, 0, 1);
  text-shadow: rgba(0, 0, 0, 0.3) 0 0.1px 1px;
  transition: 0.2s;
}
.slick-shadow {
  -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  -moz-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
}
</style>
