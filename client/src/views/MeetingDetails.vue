<template>
  <div>
    <div class="page" v-if="this.meeting && isParticipant()">
      <div class="header">
        <h1 v-if="this.meeting && !this.editing">
          {{ this.title }}
        </h1>
        <b-input v-model="title" v-if="this.meeting && this.editing" />
        <b-button
          v-if="
            this.meeting &&
              this.meeting.createdBy === this.$store.getters.userId
          "
          size="sm"
          class="edit-button"
          variant="outline-secondary"
          @click="this.editMeeting"
          ><BIconPencilFill v-if="!this.editing" />
          <BIconCheckCircle v-if="this.editing" />
        </b-button>
        <b-button
          v-if="
            this.meeting &&
              this.meeting.createdBy === this.$store.getters.userId &&
              this.editing
          "
          size="sm"
          class="edit-button"
          variant="outline-secondary"
          @click="this.cancelEdit"
          ><BIconX />
        </b-button>
      </div>
      <AvailableTimePicker
        v-if="this.meeting"
        :meeting="this.meeting"
        :onChange="this.reFetch"
      />
      <b-button
        class="delete-button"
        v-if="
          this.meeting && this.meeting.createdBy === this.$store.getters.userId
        "
        @click="this.deleteMeeting"
        >Delete Meeting</b-button
      >
      <b-button
        class="delete-button"
        v-if="
          this.meeting && this.meeting.createdBy !== this.$store.getters.userId
        "
        @click="this.leaveMeeting"
        >Leave Meeting</b-button
      >
    </div>
    <JoinMeeting
      v-if="this.meeting && !isParticipant()"
      :meeting="this.meeting"
    />
  </div>
</template>

<script>
import AvailableTimePicker from '../components/Meeting/AvailableTimePicker.vue'
import JoinMeeting from '../components/Meeting/JoinMeeting.vue'
import { meetingApi } from '@/api/meeting.js'
import { BIconPencilFill, BIconCheckCircle, BIconX } from 'bootstrap-vue'
import lodash from 'lodash'
export default {
  components: {
    AvailableTimePicker,
    JoinMeeting,
    BIconPencilFill,
    BIconCheckCircle,
    BIconX
  },
  data() {
    return {
      meeting: undefined,
      editing: false,
      title: 'null'
    }
  },
  beforeCreate() {
    meetingApi
      .getOne(this.$route.params.id)
      .then(res => {
        this.meeting = res.data
        this.title = res.data.meetingName
      })
      .catch(err => {
        console.log(err)
        this.$router.push('/404')
      })
  },
  methods: {
    deleteMeeting() {
      if (this.meeting) {
        if (this.meeting.createdBy === this.$store.getters.userId) {
          meetingApi
            .delete(this.$route.params.id)
            .then(res => this.$router.push('/'))
            .catch(err => {
              console.log(err)
            })
        }
      }
    },
    leaveMeeting() {
      if (this.meeting) {
        if (this.meeting.createdBy !== this.$store.getters.userId) {
          meetingApi
            .joinOrLeave(this.meeting._id, this.$store.getters.userId)
            .then(
              res => this.$router.go(this.$router.currentRoute),
              err => {
                console.log(err)
                this.$router.push('/')
              }
            )
          this.$router.push('/')
        }
      }
    },
    editMeeting() {
      if (this.meeting) {
        if (this.meeting.createdBy === this.$store.getters.userId) {
          if (this.editing) {
            meetingApi
              .update(this.$route.params.id, { meetingName: this.title })
              .then(res => {
                this.meeting.meetingName = res.data.meetingName
                this.editing = false
              })
              .catch(err => {
                console.log(err)
                this.editing = false
              })
          } else {
            this.editing = true
          }
        }
      }
    },
    cancelEdit() {
      this.title = this.meeting.meetingName
      this.editing = false
    },
    isParticipant() {
      return (
        lodash.findIndex(this.meeting.participantsList, {
          _id: this.$store.getters.userId
        }) > -1
      )
    },
    // this is not a good practice!
    reFetch() {
      meetingApi
        .getOne(this.$route.params.id)
        .then(res => {
          this.meeting = res.data
        })
        .catch(err => {
          console.log(err)
          this.$router.push('/404')
        })
    }
  }
}
</script>

<style scoped>
.page {
  margin-left: 20px;
  float: left;
}
.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 0px;
}
.edit-button {
  margin-left: 20px;
}
.delete-button {
  float: left;
  margin-top: 20px;
}
h1 {
  float: left;
}
</style>
