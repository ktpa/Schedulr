<template>
  <div class="wrapper">
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
      </div>
      <div class="meeting-content">
        <div class="picker">
          <AvailableTimePicker
            v-if="this.meeting"
            :meeting="this.meeting"
            :onChange="this.reFetch"
          />
        </div>
        <div class="utils">
          <ParticipantsList :participantsList="meeting.participantsList" />
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
          <div class="action-form">
            <b-form>
              <b-button
                :disabled="busy"
                ref="submit"
                variant="danger"
                class="delete-button"
                v-if="
                  this.meeting &&
                    this.meeting.createdBy === this.$store.getters.userId
                "
                @click="this.clickDeleteMeeting"
                >Delete Meeting</b-button
              >
              <b-button
                :disabled="busy"
                ref="submit"
                class="delete-button"
                variant="outline-danger"
                v-if="
                  this.meeting &&
                    this.meeting.createdBy !== this.$store.getters.userId
                "
                @click="this.clickLeaveMeeting"
                >Leave Meeting</b-button
              >
              <b-overlay
                :show="busy"
                no-wrap
                @shown="onShown"
                @hidden="onHidden"
              >
                <template #overlay>
                  <div
                    ref="dialog"
                    tabindex="-1"
                    role="dialog"
                    aria-modal="false"
                    aria-labelledby="form-confirm-label"
                    class="text-center p-3"
                  >
                    <p>
                      <strong id="form-confirm-label"
                        >Are you sure about this?</strong
                      >
                    </p>
                    <div class="buttons">
                      <b-button
                        variant="outline-success"
                        class="mr-3"
                        @click="onCancel"
                      >
                        Cancel
                      </b-button>
                      <b-button variant="outline-danger" @click="onOK"
                        >Yes</b-button
                      >
                    </div>
                  </div>
                </template>
              </b-overlay>
            </b-form>
          </div>
        </div>
      </div>
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
import ParticipantsList from '../components/Meeting/ParticipantsList.vue'
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
    QRCode,
    ParticipantsList
  },
  data() {
    return {
      meeting: undefined,
      editing: false,
      title: 'null',
      url: window.location.href,
      onOK: null,
      busy: false
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
    onShown() {
      this.$refs.dialog.focus()
    },
    onHidden() {
      this.$refs.submit.focus()
    },
    onCancel() {
      this.onOK = null
      this.busy = false
    },
    clickDeleteMeeting() {
      this.busy = true
      this.onOK = this.deleteMeeting
    },
    clickLeaveMeeting() {
      this.busy = true
      this.onOK = this.leaveMeeting
    },
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
.wrapper {
  max-width: 1440px;
}
.meeting-content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
}
.picker {
  margin-bottom: 25px;
}

.buttons {
  display: flex;
  justify-content: center;
}
.header {
  display: flex;
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
  width: 300px;
  display: flex;
  flex-direction: row;
  margin-top: 30px;
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
  float: right;
  margin-top: 20px;
  width: 100%;
}
h1 {
  float: left;
}
@media (max-width: 768px) {
  .meeting-content {
    display: flex;
    flex-direction: column;
  }
  .utils {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 0px;
    margin-top: 30px;
  }
  .action-form {
    display: flex;
    justify-content: center;
  }
}
</style>
