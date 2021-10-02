<template>
  <div>
    <div>
      <h2>Meeting date range</h2>
      <DatePicker
        v-model="range"
        :select-attribute="selectDragAttribute"
        :drag-attribute="selectDragAttribute"
        is-range
        @drag="dragValue = $event"
      >
        <template v-slot:day-popover="{ format }">
          <div>
            {{ format(dragValue ? dragValue.start : range.start, 'MMM D') }}
            -
            {{ format(dragValue ? dragValue.end : range.end, 'MMM D') }}
          </div>
        </template>
      </DatePicker>
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
  },
  computed: {
    selectDragAttribute() {
      return {
        popover: {
          visibility: 'hover',
          isInteractive: false // Defaults to true when using slot
        }
      }
    }
  }
}
</script>

<style></style>
