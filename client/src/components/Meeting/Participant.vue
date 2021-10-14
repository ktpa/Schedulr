<template>
  <div class="participant">
    <div>
      <img
        class="profilePic"
        :src="getProfilePicUrl(source.profilePicUrl)"
        alt="user-profile"
      />
      {{ source.name }}
    </div>
    <b-button
      :href="`mailto:${source.email}`"
      size="sm"
      class="mail-to-button"
      variant="outline-primary"
      ><BIconEnvelope
    /></b-button>
  </div>
</template>

<script>
import { BIconEnvelope } from 'bootstrap-vue'
export default {
  components: { BIconEnvelope },
  props: {
    index: {
      type: Number
    },
    source: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      placeholder: require('../../res/images/profilePlaceholder.png')
    }
  },
  methods: {
    getProfilePicUrl: url => url || this.placeholder
  }
}
</script>

<style scoped>
.participant {
  display: flex;
  margin: 10px 10px;
  justify-content: space-between;
}
.profilePic {
  width: 35px;
  height: 35px;
  border-radius: 25px;
  margin-right: 5px;
}
.mail-to-button {
  margin-left: 20px;
}
</style>
