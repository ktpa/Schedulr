<template>
  <div class="profile">
    <h1>Welcome {{ this.currName }}</h1>
    <b-form ref="form" @submit="onUpdateProfile">
      <div class="profile-details">
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <b-list-group>
            <b-list-group-item v-for="error in errors" :key="error">{{
              error
            }}</b-list-group-item>
          </b-list-group>
        </p>
        <br />
        <div class="pic-upload">
          <b-img
            v-bind="pictureProps"
            :src="user.profilePicUrl"
            rounded="circle"
          />
          <input
            type="file"
            accept=".jpg"
            class="file-upload"
            @change="upload"
          />
        </div>
        <div class="forms">
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
            :disabled="true"
            placeholder="e-mail"
            id="email"
          />
          <br />
          <b-input
            type="text"
            v-model="user.name"
            :disabled="disabled"
            placeholder="name"
            id="name"
          />
          <br />
          <b-input
            type="password"
            v-model="user.password"
            :disabled="disabled"
            placeholder="password"
            id="password"
            v-if="!disabled"
          />
        </div>
      </div>

      <b-button v-if="disabled" @click="activateProfile"
        >Update Profile</b-button
      >
      <b-button
        class="form_button1"
        v-if="!disabled"
        variant="danger"
        v-on:click="onCancel"
        >Cancel</b-button
      >
      <b-button
        class="form_button2"
        v-if="!disabled"
        variant="success"
        v-on:click="onUpdateProfile"
        >Save Changes</b-button
      >
    </b-form>
  </div>
</template>
<script>
import { userApi } from '@/api/user.js'
import { imageApi } from '@/api/imageUpload.js'

export default {
  name: 'profile',
  data() {
    return {
      user: {
        name: '',
        username: '',
        email: '',
        password: '',
        profilePicUrl: ''
      },
      pictureProps: {
        blank: false,
        blankColor: '#177',
        width: 100,
        height: 100,
        class: 'm1' // Get default picture and replace source if src is missing.
      },
      file: null,
      currName: '',
      disabled: true,
      errors: []
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
    getProfile() {
      userApi
        .getProfile(this.$store.getters.userId)
        .then(res => {
          const userRes = res.data.data
          this.user.name = userRes.name
          this.user.username = userRes.username
          this.user.email = userRes.email
          this.user.password = '******'
          this.user.profilePicUrl = userRes.profilePicUrl
          this.currName = userRes.name
        })
        .catch(err => {
          console.log(err)
        })
    },
    upload(e) {
      const image = e.target.files[0]
      imageApi.upload(image).then(res => {
        console.log(res.data.link)
      })
    },
    activateProfile() {
      this.disabled = !this.disabled
    },
    onUpdateProfile() {
      if (!this.checkForm()) {
        return
      }
      this.disabled = !this.disabled
      userApi
        .updateProfile(this.$store.getters.userId, {
          name: this.user.name,
          password: this.user.password
        })
        .then(updatedProfile => {
          this.user.name = updatedProfile.data.name
          this.currName = updatedProfile.data.name
          this.user.password = '******'
        })
      alert('Your profile has been updated')
    },
    onCancel() {
      this.disabled = !this.disabled
      this.errors = []
      this.getProfile()
    },
    checkForm() {
      this.errors = []
      if (!this.user.name) {
        this.errors.push('Name required.')
      }
      if (!this.user.password) {
        this.errors.push('Password required.')
      } else if (this.user.password.length < 8) {
        this.errors.push('Password must be a minimum of 8 characters.')
      }
      if (!this.errors.length) {
        return true
      }
    }
  }
}
</script>

<style>
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.forms {
  margin: 20px;
}
.file-upload {
  z-index: 1;
  border-radius: 20px;
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  opacity: 0;
}
.pic-upload {
  position: relative;
  height: 100px;
  width: 100px;
}
.pic-upload:hover {
  opacity: 0.8;
}
.profile-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
