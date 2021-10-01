<template>
  <div class="profile-button-wrapper">
    <img :src="user.profilePicUrl" class="profile-pic" alt="profile pic" />
    {{ user.name }}
  </div>
</template>

<script>
import { userApi } from '@/api/user.js'
export default {
  name: 'ProfileButton',
  data() {
    return {
      user: {
        name: '',
        profilePicUrl: ''
      },
      placeholder: require('../res/images/profilePlaceholder.png')
    }
  },
  beforeCreate() {
    userApi
      .getProfile(this.$store.getters.userId)
      .then(res => {
        const userRes = res.data.data
        this.user.name = userRes.name
        this.user.profilePicUrl = userRes.profilePicUrl
        this.user.profilePicUrl = this.user.profilePicUrl
          ? this.user.profilePicUrl
          : this.placeholder
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style>
.profile-button-wrapper {
  display: flex;
  flex-direction: row;
}
.profile-pic {
  height: 35px;
  width: 35px;
  object-fit: cover;
  border-radius: 100%;
  margin-top: -5px;
  margin-right: 10px;
}
</style>
