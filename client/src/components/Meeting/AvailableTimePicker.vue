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
    <HourPicker :day="this.selectedDay" :hoursList="this.generatedData" />
  </div>
</template>

<script>
import { DatePicker } from 'v-calendar'
import lodash from 'lodash'
import HourPicker from './HourPicker.vue'
export default {
  // meeting is the original API response
  props: ['meeting'],
  components: {
    DatePicker,
    HourPicker
  },
  data() {
    return {
      selectedDay: new Date(this.meeting.firstPossibleDay),
      selectedHours: []
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

        if (index > 0) {
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
      tempDataList.map(a => console.log(a.time))
      return tempDataList
    }
  }
}
</script>

<style scoped>
.date-hour-picker {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
