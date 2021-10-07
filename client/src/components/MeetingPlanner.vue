<template>
  <div>
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
    </div>
  </div>
</template>

<script>
import { DatePicker } from 'v-calendar'

export default {
  name: 'MeetingPlanner',
  incorrect: false,
  components: {
    DatePicker
  },
  data() {
    return {
      form: {
        name: ''
      },
      meeting: '',
      date: Date.now(),
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
      }
    }
  }
}
</script>

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
