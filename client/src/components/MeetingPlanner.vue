<template>
  <div class="meeting-planner">
    <div class="left">
      <span class="label">
        1. Enter meeting name
      </span>
      <b-input
        class="form-input"
        type="text"
        size="lg"
        v-model="form.name"
        placeholder="Meeting name"
        id="name"
      />

      <span class="label">
        2. Select meeting date
      </span>
      <DatePicker
        v-model="range"
        @drag="dragValue = $event"
        :select-attribute="selectDragAttribute"
        :drag-attribute="selectDragAttribute"
        :first-day-of-week="2"
        :min-date="minDate"
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
    <div class="right">
      <span class="label">
        3. Select meeting time
      </span>

      <span class="label-sm">
        First possible hour
      </span>
      <b-time
        class="b-time"
        v-model="firstHour"
        :hour12="false"
        :minutes-step="30"
        :hide-header="true"
        locale="en"
      ></b-time>

      <span class="label-sm">
        Last possible hour
      </span>
      <b-time
        v-model="lastHour"
        :hour12="false"
        :minutes-step="30"
        :hide-header="true"
        locale="en"
      ></b-time>
      <b-button
        v-on:click="createMeeting()"
        class="confirmBtn"
        variant="outline-primary"
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
      minDate: Date.now(),
      form: {
        name: 'New Meeting'
      },
      incorrect: false,
      range: {
        start: new Date(Date.now()),
        end: new Date(Date.now() + 60 * 60 * 24 * 1000) // tomorrow
      },
      firstHour: '09:00',
      lastHour: '17:00',
      dragValue: null
    }
  },
  methods: {
    createMeeting() {
      if (this.range.start instanceof Date && this.range.end instanceof Date) {
        this.incorrect = false
        const meeting = {
          firstPossibleDay: this.range.start.toISOString().split('T')[0],
          lastPossibleDay: this.range.end.toISOString().split('T')[0],
          firstPossibleHour: this.firstHour.split(':')[0],
          lastPossibleHour: this.lastHour.split(':')[0],
          meetingName: this.form.name
        }
        meetingApi
          .createMeeting(meeting)
          .then(res => {
            this.$router.push(`/meeting/${res.data._id}`)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
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
.enter-title {
  margin-bottom: 15px;
}
.label {
  font-size: 15px;
  font-weight: 700;
  text-align: left;
  margin-bottom: 10px;
  color: #3751fe;
}
.label-sm {
  font-size: 12px;
  font-weight: 500;
  text-align: left;
  margin-bottom: 5px;
  opacity: 0.6;
}
.b-time {
  margin-bottom: 10px;
}
.meeting-planner {
  display: flex;
  flex-direction: row;
}
.left {
  display: flex;
  flex-direction: column;
}
.right {
  display: flex;
  flex-direction: column;
  margin-left: 100px;
}

.form-input {
  margin-bottom: 15px;
  max-width: 25em;
  -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  -moz-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
}
.confirmBtn {
  margin-top: 10px;
  -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  -moz-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
}
.neatShadow {
  -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  -moz-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
}
@media (max-width: 768px) {
  .meeting-planner {
    display: flex;
    flex-direction: column;
  }
  .right {
    margin-left: 0px;
    margin-top: 15px;
  }
}
</style>
