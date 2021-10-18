<template>
  <div class="home">
    <b-list-group id="meetings_list">
      <b-list-group-item
        class="list-group-item"
        v-for="meeting in meetings"
        :key="meeting.message"
      >
        <a :href="`meeting/${meeting._id}`">
          <div>
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
                  } ${
                    new Date(meeting.lastPossibleDay).toString().split(' ')[2]
                  }`
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
      meetingKey: 0,
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
      name = truncate(name, this.length)
      return name
    },
    getProfilePic(img) {
      return img || placeholder
    }
  }
}
</script>

<style scoped>
.home {
  width: 100%px;
}
#meetings_list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, auto));
  border-radius: 15px;
  gap: 25px;
}
.creatorImage {
  margin: 5px;
  border-style: solid;
  border-width: 3px;
  border-color: #0d185b80;
}
.participantImage {
  margin-right: -15px;
  margin-left: 5px;
  margin-top: 10px;
  border-style: solid;
  border-width: 2px;
  border-color: #0d185b60;
}
.creator {
  margin-left: 15px;
  color: rgb(0, 0, 0);
  font-size: 1.1em;
}
.meetingDate {
  font-weight: 500;
  color: #3852fe;
  opacity: 0.95;
  margin-top: 20px;
  margin-right: 10px;
  font-size: 0.9em;
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
  border-radius: 15px;
}
.name {
  color: #0d185b;
  text-align: left;
  max-width: 60%;
  margin: 10px;
  font-size: 1.8em;
  font-weight: 600;
}
.participants {
  color: #775f99;
  margin: 10px;
  float: right;
}
.participants-icon {
  color: #775f99;
  margin-right: 5px;
}
.list-group-item {
  transition: 0.1s;
  align-self: center;
  justify-self: center;
  text-align: left;
  height: 200px;
  width: 450px;
  padding: 5px;
  border-radius: 15px;
  margin-bottom: 25px;
  box-shadow: 7px 7px 7px #00000015;
  border-width: 0px;
  background-color: #bee5eb50;
}

.list-group-item:hover {
  background-color: #bee5eb80;
}

a {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
@media (max-width: 768px) {
  #meetings_list {
    grid-template-columns: repeat(auto-fill, minmax(350px, auto));
    gap: 25px 50px;
  }
  .list-group-item {
    width: 350px;
    height: 180px;
  }
  .name {
    font-size: 1.2em;
    font-weight: 500;
  }
  .creator {
    font-size: 1.05em;
  }
}
</style>
