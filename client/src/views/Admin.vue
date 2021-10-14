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
      <br />
      <br />
      <b-input
        type="text"
        v-model="user.username"
        :disabled="true"
        placeholder="username"
        id="username"
      />
      <br />
      <b-input
        type="email"
        v-model="user.email"
        placeholder="e-mail"
        id="email"
      />
      <br />
      <b-input type="text" v-model="user.name" placeholder="name" id="name" />
      <br />
      <b-input
        type="password"
        v-model="user.password"
        placeholder="password"
        id="password"
      />
      <br />
      <b-button
        variant="danger"
        ref="submit"
        @click="this.clickPutUser"
        :disabled="busy"
        >Put User</b-button
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
      message: '',
      user: {
        name: '',
        username: '',
        email: '',
        password: '',
        profilePicUrl: ''
      }
    }
  },
  beforeCreate() {
    userApi
      .getProfile(this.$store.getters.userId)
      .then(res => {
        const userRes = res.data.data
        this.user.name = userRes.name
        this.user.username = userRes.username
        this.user.email = userRes.email
        this.user.password = userRes.password
        this.user.profilePicUrl = userRes.profilePicUrl
        this.currName = userRes.name
      })
      .catch(err => {
        console.log(err)
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
    clickPutUser() {
      this.message =
        'You are about to update your user account according to the fields filled in using a PUT request. How do you feel about that? '
      this.busy = true
      this.onOK = this.putUser
    },
    putUser() {
      userApi.putUpdateProfile(this.$store.getters.userId, { user: this.user })
      this.busy = false
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
