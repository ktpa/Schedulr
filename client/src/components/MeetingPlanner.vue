<template>
  <div>
    <div v-if="!this.hoursToggle">
      <h2>Meeting date range</h2>
      <DatePicker
        data-date-picker="deactivated"
        v-model="range"
        :select-attribute="selectDragAttribute"
        :drag-attribute="selectDragAttribute"
        is-range
        @drag="dragValue = $event"
        :first-day-of-week="2"
        show-iso-weeknumbers
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
    <div v-else>
      <h2>Hours</h2>
    </div>
    <div>
      <b-button v-on:click="changeActiveScreen">Next</b-button>
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
      start: '',
      end: '',
      hoursToggle: false,
      range: {
        start: Date.now(),
        end: new Date(Date.now() + 5)
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
  methods: {
    changeActiveScreen() {
      if (!this.hoursToggle) {
        this.hoursToggle = true
        this.registerDates(this.start, this.end)
      } else this.hoursToggle = false
    },
    registerDates(date1, date2) {
      console.log(
        'This is where we register dates, date1: ' +
          date1 +
          ' . date2: ' +
          date2
      )
    }
  },
  computed: {
    selectDragAttribute() {
      return {
        popover: {
          visibility: 'hover',
          isInteractive: false
        }
      }
    }
  }
}
</script>

<style></style>
