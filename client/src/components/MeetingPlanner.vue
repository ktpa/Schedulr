<template>
  <div>
<<<<<<< HEAD
    <div>
      <h2>Select a meeting date</h2>
      <DatePicker
        v-model="date"
        @drag="dragValue = $event"
        :first-day-of-week="2"
        show-iso-weeknumbers
        class="neatShadow"
      />
    </div>
    <div>
      <h2>
        {{ new Intl.DateTimeFormat('en-GB').format(this.date) }}
      </h2>
    </div>
    <div>
      <b-input
        class="form-input"
        type="text"
        v-model="form.name"
        placeholder="Meeting name"
        id="name"
      />
    </div>
    <div v-if="this.incorrect">
      <p class="errorText">Date has not been set.</p>
    </div>
    <div>
      <b-button v-on:click="createMeeting()" class="confirmBtn"
        >Create Meeting</b-button
      >
=======
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
>>>>>>> b765c0a34f44325a5ac929c1725859323a24b76c
    </div>
  </div>
</template>

<script>
import { DatePicker } from 'v-calendar'

export default {
  name: 'MeetingPlanner',
<<<<<<< HEAD
  incorrect: false,
=======
>>>>>>> b765c0a34f44325a5ac929c1725859323a24b76c
  components: {
    DatePicker
  },
  data() {
    return {
<<<<<<< HEAD
      form: {
        name: ''
      },
      meeting: '',
      date: Date.now(),
=======
      hoursToggle: false,
      range: {
        start: Date.now(),
        end: new Date(Date.now() + 5)
      },
>>>>>>> b765c0a34f44325a5ac929c1725859323a24b76c
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
<<<<<<< HEAD
    createMeeting() {
      if (this.date instanceof Date) {
        console.log('Date is defined.')
        this.incorrect = false
        this.meeting = {
          userID: this.$store.userID,
          day: this.date,
          firstPossibleHour: 0,
          lastPossibleHour: 23,
          meetingName: this.form.meetingName,
          participantsList: this.$store.userID
        }
      } else {
        console.log('Date is not defined.')
        this.incorrect = true
=======
    changeActiveScreen() {
      if (!this.hoursToggle) {
        this.hoursToggle = true
        this.registerDates()
      } else this.hoursToggle = false
    },
    registerDates() {
      console.log(this.range.start)
    }
  },
  computed: {
    selectDragAttribute() {
      return {
        popover: {
          visibility: 'hover',
          isInteractive: false
        }
>>>>>>> b765c0a34f44325a5ac929c1725859323a24b76c
      }
    }
  }
}
</script>

<<<<<<< HEAD
<style scoped>
.form-input {
  max-width: 25em;
  -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  -moz-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
}
.confirmBtn {
  -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  -moz-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
}
.neatShadow {
  -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  -moz-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
}
</style>
=======
<style></style>
>>>>>>> b765c0a34f44325a5ac929c1725859323a24b76c
