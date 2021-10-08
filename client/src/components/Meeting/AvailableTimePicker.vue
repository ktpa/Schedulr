<template>
  <div class="date-hour-picker">
    <DatePicker
      v-model="selectedDay"
      :first-day-of-week="2"
      :min-date="this.meeting.firstPossibleDay"
      :max-date="this.meeting.lastPossibleDay"
      show-iso-weeknumbers
      is-required
    />
    <HourPicker
      :day="this.selectedDay"
      :hoursList="this.generatedData"
      :onChange="this.updateChangeList"
    />
  </div>
</template>

<script>
import { DatePicker } from 'v-calendar'
import lodash from 'lodash'
import HourPicker from './HourPicker.vue'
import { meetingApi } from '../../api/meeting'
export default {
  // meeting is the original API response
  props: ['meeting', 'onChange'],
  components: {
    DatePicker,
    HourPicker
  },
  data() {
    return {
      selectedDay: new Date(this.meeting.firstPossibleDay),
      changeList: []
    }
  },
  watch: {
    // this is where we update backend with current changes
    // eslint-disable-next-line space-before-function-paren
    changeList: function() {
      const meetingId = this.$route.params.id
      if (this.changeList.length > 0) {
        this.changeList.map(change => {
          if (change.active) {
            return meetingApi
              .addAvailableTimes(meetingId, { availableTime: change.time })
              .then(res => {
                console.log(res)
                this.onChange()
              })
              .catch(err => console.log(err))
          } else {
            let idToDelete = null
            this.meeting.availableTimes.forEach(time => {
              if (
                time.availableTime === change.time &&
                time.user === this.$store.getters.userId
              ) {
                idToDelete = time._id
              }
            })
            return meetingApi
              .deleteAvailableTime(meetingId, idToDelete)
              .then(res => console.log(res))
              .catch(err => console.log(err))
          }
        })

        this.changeList = []
      }
    }
  },
  methods: {
    updateChangeList(change) {
      const index = lodash.findIndex(this.changeList, {
        time: change.time
      })
      // if list has this update
      if (index > -1) {
        return this.changeList.splice(index, 1)
      }
      // if not, add it
      return (this.changeList = [...this.changeList, change])
    }
  },
  computed: {
    // eslint-disable-next-line space-before-function-paren
    generatedData: function() {
      const meeting = this.meeting
      const tempDataList = []
      const AN_HOUR = 1000 * 3600
      const INTERVAL = AN_HOUR / 2

      const start = meeting.firstPossibleHour
      const end = meeting.lastPossibleHour

      const day = new Date(this.selectedDay)
      day.setTime(day.getTime() + AN_HOUR * start)

      for (let intervals = 0; intervals < (end - start) * 2 + 1; intervals++) {
        const date = new Date(day.valueOf())
        date.setTime(date.getTime() + INTERVAL * intervals)
        tempDataList.push({
          time: date.toISOString(),
          numOfAvailable: null
        })
      }

      // our dataList is generated tailored to our needs
      // now we need to fill it with our data
      // end object should look like this
      // hoursList: [{time, active, blocked, numOfAvailable}]

      meeting.availableTimes.map(time => {
        const index = lodash.findIndex(tempDataList, {
          time: time.availableTime
        })
        if (time.user === this.$store.getters.userId) {
          tempDataList[index] = {
            ...tempDataList[index],
            active: true
          }
        }

        if (index > -1) {
          const value =
            typeof tempDataList[index].numOfAvailable === 'undefined'
              ? 0
              : tempDataList[index].numOfAvailable + 1

          return (tempDataList[index] = {
            ...tempDataList[index],
            numOfAvailable: value
          })
        }
        return 0
      })

      meeting.blockedTimes.map(time => {
        const index = lodash.findIndex(tempDataList, {
          time: time.blockedTime
        })
        return (tempDataList[index] = {
          ...tempDataList[index],
          blocked: true
        })
      })
      return tempDataList
    }
  }
}
</script>

<style scoped>
.date-hour-picker {
  display: flex;
  width: 100%;
}

@media (max-width: 768px) {
  .date-hour-picker {
    flex-direction: column;
    align-items: center;
  }
}
</style>
