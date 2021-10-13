<template>
  <div class="create-meeting">
    <MeetingPlanner />
  </div>
</template>

<script>
// @ is an alias to /src
import MeetingPlanner from '../components/MeetingPlanner.vue'

export default {
  components: { MeetingPlanner },
  name: 'CreateMeeting'
}
</script>

<style>
.create-meeting {
  display: flex;
  align-content: center;
  justify-content: center;
  height: 100%;
}
</style>
