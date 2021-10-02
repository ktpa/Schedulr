<template>
  <div>
    <div>
      <h2>Meeting date range</h2>
      <DatePicker v-model="range" :model-config="modelConfig" is-range />
    </div>
    <div>
      <b-button>Hours</b-button>
    </div>
  </div>
</template>

<script>
import { DatePicker } from 'v-calendar'

export default {
  name: 'MeetingPlanner',
  components: {
    DatePicker
  },
  data() {
    return {
      range: {
        start: Date.now(),
        end: Date.now() + 3
      },
      modelConfig: {
        start: {
          timeAdjust: '00:00:00'
        },
        end: {
          timeAdjust: '23:59:59'
        }
      }
    }
  }
}
</script>

<style></style>
