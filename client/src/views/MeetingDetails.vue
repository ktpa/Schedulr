<template>
  <div class="page">
    <div class="header">
      <h1 v-if="this.meeting && !this.editing">
        {{ this.title }}
      </h1>
      <b-input v-model="title" v-if="this.meeting && this.editing" />
      <b-button
        v-if="
          this.meeting && this.meeting.createdBy === this.$store.getters.userId
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
    <AvailableTimePicker v-if="this.meeting" :meeting="this.meeting" />
    <b-button
      class="delete-button"
      v-if="
        this.meeting && this.meeting.createdBy === this.$store.getters.userId
      "
      @click="this.deleteMeeting"
      >Delete Meeting</b-button
    >
  </div>
</template>

<script>
import AvailableTimePicker from '../components/Meeting/AvailableTimePicker.vue'
import { meetingApi } from '@/api/meeting.js'
import { BIconPencilFill, BIconCheckCircle, BIconX } from 'bootstrap-vue'
export default {
  components: {
    AvailableTimePicker,
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
    fetchMeeting() {}
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
