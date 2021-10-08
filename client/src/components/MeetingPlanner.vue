<template>
  <div>
    <div>
      <h2>Select a meeting date</h2>
      <DatePicker
        v-model="range"
        @drag="dragValue = $event"
        :select-attribute="selectDragAttribute"
        :drag-attribute="selectDragAttribute"
        :first-day-of-week="2"
        show-iso-weeknumbers
        class="neatShadow"
        is-range
        drag="dragValue = $event"
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
      <p class="errorText h6">Date has not been set.</p>
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
import { meetingApi } from '@/api/meeting.js'

export default {
  name: 'MeetingPlanner',
  components: {
    DatePicker
  },
  data() {
    return {
      form: {
        name: ''
      },
      incorrect: false,
      range: {
        start: Date.now(),
        end: Date.now()
      },
      dragValue: null,
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
      if (this.range.start instanceof Date && this.range.end instanceof Date) {
        console.log('Date is defined.')
        this.incorrect = false
        const meeting = {
          firstPossibleDay: this.range.start.toISOString().split('T')[0],
          lastPossibleDay: this.range.end.toISOString().split('T')[0],
          firstPossibleHour: 0,
          lastPossibleHour: 23,
          meetingName: this.form.name
        }
        console.log(meeting)
        meetingApi
          .createMeeting(meeting)
          .then(res => {
            this.$router.push(`/meeting/${res.data._id}`)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        console.log('Date is not defined.')
        this.incorrect = true
      }
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
.errorText {
  color: red;
}
.successful {
  color: rgb(56, 187, 56);
}
</style>
