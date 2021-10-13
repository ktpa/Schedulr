<template>
  <div class="home">
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, auto));
  gap: 2%;
}
.home {
}
.name {
  text-align: left;
  max-width: 75%;
}
.list-group-item {
  align-self: center;
  justify-self: center;
  height: 200px;
  width: 500px;
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
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.87);
  width: 100%;
  transition: 0.2s;
}
a:hover {
  text-decoration: none;
  color: white;
  transition: 0.2s;
  text-shadow: rgba(0, 0, 0, 0.3) 0 1px 5px;
}
</style>
