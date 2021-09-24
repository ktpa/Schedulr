<template>
  <div>
    <Profile />
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import Profile from './Profile.vue'

export default {
  name: 'home',
  components: { Profile },
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
