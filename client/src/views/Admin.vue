<template>
  <div class="admin">
    <h4 v-if="this.info">{{ this.info }}</h4>
    <b-form class="position-relative p-3">
      <b-button
        variant="danger"
        ref="submit"
        :disabled="busy"
        @click="this.clickDeleteMeetings"
        >Delete All Meetings</b-button
      >
      <b-button
        variant="danger"
        ref="submit"
        @click="this.clickDeleteUsers"
        :disabled="busy"
        >Delete All Users</b-button
      >

      <b-overlay :show="busy" no-wrap @shown="onShown" @hidden="onHidden">
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
              <strong id="form-confirm-label">{{ message }}</strong>
            </p>
            <div class="d-flex">
              <b-button
                variant="outline-success"
                class="mr-3"
                @click="onCancel"
              >
                Cancel
              </b-button>
              <b-button variant="outline-danger" @click="onOK">OK</b-button>
            </div>
          </div>
        </template>
      </b-overlay>
    </b-form>
  </div>
</template>
<script>
import { userApi } from '@/api/user.js'
import { meetingApi } from '@/api/meeting.js'

export default {
  name: 'admin',
  data() {
    return {
      info: '',
      busy: false,
      onOK: null,
      message: ''
    }
  },
  methods: {
    onShown() {
      this.$refs.dialog.focus()
    },
    onHidden() {
      this.$refs.submit.focus()
    },
    onCancel() {
      this.message = ''
      this.onOK = null
      this.busy = false
    },
    clickDeleteMeetings() {
      this.message =
        'You are about to delete all meetings. This action cannot be reverted!'
      this.busy = true
      this.onOK = this.deleteAllMeetings
    },
    clickDeleteUsers() {
      this.message =
        'You are about to delete all users including Admin. You will be logged out afterwards. This action cannot be reverted!'
      this.busy = true
      this.onOK = this.deleteAllUsers
    },
    deleteAllUsers() {
      userApi
        .deleteAll()
        .then(res => {
          this.$store.dispatch('logout').then(() => {
            this.$router.push('/login')
          })
        })
        .catch(err => console.log(err))
    },
    deleteAllMeetings() {
      meetingApi.deleteAll().then(res => {
        this.info = 'All meetings deleted!'
        this.busy = false
      })
    }
  }
}
</script>

<style></style>
