<template>
  <div class="page">
    <BlockedTimePicker :meeting="this.meeting"/>
  </div>
</template>

<script>
import BlockedTimePicker from '../components/BlockedTime/BlockedTimePicker.vue'
export default {
  components: {
    BlockedTimePicker
  },
  data() {
    return {
      meeting: {
        participantsList: [
          '615d39980007d1573c0afbf6'
        ],
        _id: '615ef1157f0c016594e25612',
        createdBy: '615d39980007d1573c0afbf6',
        firstPossibleDay: '2022-09-25T00:00:00.000Z',
        lastPossibleDay: '2022-09-30T00:00:00.000Z',
        firstPossibleHour: 0,
        lastPossibleHour: 15,
        meetingName: 'My First Meeting'
      }
    }
  }
}
</script>

<style scoped>
.page {
  min-height: 100vh;
}
</style>
