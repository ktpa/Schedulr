<template>
  <div class="meetingCreationPage">
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
.meetingCreationPage {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  background-image: linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);
}
</style>
