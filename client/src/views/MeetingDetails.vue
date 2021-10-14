<template>
  <div>
    <div v-if="this.meeting && isParticipant()">
      <div class="header">
        <div class="title">
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
        <div class="participants">
          <b>Participants:</b> {{ this.numOfParticipants }}
        </div>
      </div>
      <div class="meeting-content">
        <AvailableTimePicker
          v-if="this.meeting"
          :meeting="this.meeting"
          :onChange="this.reFetch"
        />
        <div class="share">
          <span class="share-label">Share Meeting</span>
          <div class="qr">
            <QRCode />
          </div>
          <div class="copy-to-clipboard">
            <b-button
              variant="outline-primary"
              class="copy-button"
              v-clipboard:copy="url"
              v-clipboard:success="onCopy"
              ><BIconClipboard
            /></b-button>
          </div>
        </div>
      </div>
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
import {
  BIconPencilFill,
  BIconCheckCircle,
  BIconX,
  BIconClipboard
} from 'bootstrap-vue'
import lodash from 'lodash'
import QRCode from '../components/QRCode/QRCode.vue'
export default {
  components: {
    AvailableTimePicker,
    JoinMeeting,
    BIconPencilFill,
    BIconCheckCircle,
    BIconX,
    BIconClipboard,
    QRCode
  },
  data() {
    return {
      meeting: undefined,
      editing: false,
      title: 'null',
      numOfParticipants: 1,
      url: window.location.href
    }
  },
  beforeCreate() {
    meetingApi
      .getOne(this.$route.params.id)
      .then(res => {
        this.meeting = res.data
        this.title = res.data.meetingName
        this.numOfParticipants = res.data.participantsList.length
      })
      .catch(err => {
        console.log(err)
        this.$router.push('/404')
      })
  },
  methods: {
    onCopy() {
      this.$bvToast.toast('You copied the meeting link!', {
        autoHideDelay: 2500,
        noCloseButton: true,
        variant: 'success',
        noHoverPause: true
      })
    },
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
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 20px 0px;
}
.title {
  display: flex;
  align-items: center;
}
.share {
  padding: 20px;
  border-style: solid;
  border-radius: 5px;
  border-width: 1px;
  border-color: #00000030;
  width: 295px;
  display: flex;
  flex-direction: row;
}
.share-label {
  white-space: nowrap;
  font-size: 15px;
  line-height: 15px;
  display: block;

  writing-mode: vertical-rl;
  transform: rotate(180deg);
}
.qr {
  margin-left: 15px;
  height: 100px;
  width: 100px;
}
.copy-to-clipboard {
  margin-left: 25px;
}
.copy-button {
  height: 100px;
  width: 100px;
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
