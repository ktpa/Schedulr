<template>
  <div class="home">
    <b-list-group id="meetings_list">
      <b-list-group-item
        class="list-group-item list-group-item-action list-group-item-info"
        v-for="meeting in meetings"
        :key="meeting.message"
      >
        <a :href="`meeting/${meeting._id}`">
          <div class="topContainer">
            <span class="name">{{
              formatMeetingName(meeting.meetingName)
            }}</span>
            <span class="meetingDate">
              <BIconCalendarWeekFill />
              {{
                `${
                  new Date(meeting.firstPossibleDay).toString().split(' ')[1]
                } ${
                  new Date(meeting.firstPossibleDay).toString().split(' ')[2]
                }`
              }}
              -
              {{
                `${
                  new Date(meeting.lastPossibleDay).toString().split(' ')[1]
                } ${new Date(meeting.lastPossibleDay).toString().split(' ')[2]}`
              }}</span
            >
          </div>
          <div class="middleContainer">
            <!-- Get user that created the meeting, show as owner + name. -->
            <b-img
              v-bind="creatorProps"
              :src="getProfilePic(meeting.createdBy.profilePicUrl)"
              rounded="circle"
              alt=""
              class="creatorImage slick-shadow"
            ></b-img>
            <span class="creator">{{ meeting.createdBy.name }}</span>
            <div class="midText"></div>
            <!-- Get dates of meeting, display earliest meeting day -->
          </div>
          <div class="bottomContainer">
            <b-img
              v-for="participant in meeting.participantsList"
              :key="participant._id"
              :src="getProfilePic(participant.profilePicUrl)"
              v-bind="participantProps"
              rounded="circle"
              alt=""
              class="participantImage slick-shadow"
            ></b-img>
            <span class="participants" :id="`tooltip-${meeting._id}`"
              ><BIconPeopleFill class="participants-icon" />Participants:
              {{ meeting.participantsList.length }}</span
            >
            <b-tooltip :target="`tooltip-${meeting._id}`" triggers="hover">
              <span v-for="user in meeting.participantsList" :key="user._id">
                {{ user.name }}<br />
              </span>
            </b-tooltip>
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
import { BIconCalendarWeekFill, BIconPeopleFill } from 'bootstrap-vue'
const placeholder = require('../res/images/profilePlaceholder.png')
export default {
  name: 'home',
  components: { BIconCalendarWeekFill, BIconPeopleFill },
  data() {
    return {
      meetings: [],
      creatorProps: {
        blank: false,
        blankColor: '#177',
        width: 35,
        height: 35,
        class: 'm1'
      },
      participantProps: {
        blank: false,
        blankColor: '#242',
        width: 25,
        height: 25,
        class: 'm1',
        background: 'black'
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
      name = truncate(name, {
        length: '28'
      })
      return name
    },
    getProfilePic(img) {
      return img || placeholder
    }
  }
}
</script>

<style scoped>
#meetings_list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, auto));
  gap: 5%;
  border-radius: 15px;
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
  margin-left: 15px;
  color: rgb(0, 0, 0);
  font-size: 1.1em;
}
.meetingDate {
  font-weight: 500;
  color: #3852fe;
  margin-top: 20px;
  margin-right: 10px;
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
  margin-top: 30px;
  border-radius: 15px;
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
.participants-icon {
  margin-right: 5px;
}
.list-group-item {
  align-self: center;
  justify-self: center;
  text-align: left;
  height: 200px;
  width: 500px;
  gap: 2%;
  padding: 5px;
  border-radius: 15px;
  margin: 5px;
}
.list-group-item:nth-child(even) {
  transition: 0.1s;
}
.list-group-item:nth-child(odd) {
  transition: 0.1s;
}
.list-group-item:nth-child(odd):hover {
  transition: 0.1s;
}
.list-group-item:nth-child(even):hover {
  transition: 0.1s;
}
a {
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.95);
  width: 100%;
  height: 100%;
  transition: 0.2s;
}
a:hover {
  text-decoration: none;
  color: rgba(0, 0, 0, 1);
  transition: 0.2s;
}
.slick-shadow {
  -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  -moz-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
}
</style>
