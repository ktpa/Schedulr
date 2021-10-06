<template>
  <div class="date-hour-picker">
    <span>{{ this.meeting }}</span>
    <DatePicker
      v-model="selectedDay"
      :first-day-of-week="2"
      :min-date="this.meeting.firstPossibleDay"
      :max-date="this.meeting.lastPossibleDay"
      show-iso-weeknumbers
      is-required
    />
    <HourPicker :day="this.selectedDay" :hoursList="this.dataList" />
    <b-button @click="log">temporary log button</b-button>
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
      selectedHours: [],
      dataList: []
    }
  },
  methods: {
    log() {
      this.generateDataList(this.meeting)
      console.log(this.dataList)
    },
    generateDataList(meeting) {
      this.dataList = []
      const AN_HOUR = 1000 * 3600
      const INTERVAL = AN_HOUR / 2
      const A_DAY = AN_HOUR * 24

      const start = meeting.firstPossibleHour
      const end = meeting.lastPossibleHour

      const firstDay = new Date(meeting.firstPossibleDay)
      firstDay.setTime(firstDay.getTime() + AN_HOUR * start)
      const lastDay = new Date(meeting.lastPossibleDay)
      const dayDifference = (lastDay.getTime() - firstDay.getTime()) / A_DAY + 1

      for (let days = 0; days < dayDifference; days++) {
        for (
          let intervals = 0;
          intervals < (end - start) * 2 + 1;
          intervals++
        ) {
          const date = new Date(firstDay.valueOf())
          date.setDate(date.getDate() + days)
          date.setTime(date.getTime() + INTERVAL * intervals)
          this.dataList.push({
            time: date
          })
        }
      }
      // our dataList is generated tailored to our needs
      // now we need to fill it with our data
      // end object should look like this
      // hoursList: [{time, active, blocked, numOfAvailable}]
      meeting.availableTimes.map(time => {
        const index = lodash.findIndex(this.dataList, {
          date: time.availableTime
        })
        if (time.user === this.$store.getters.userId) {
          this.dataList[index] = {
            ...this.dataList[index],
            active: true
          }
        }
        // const value =
        //   this.dataList[index].numOfAvailable === undefined
        //     ? 0
        //     : this.dataList[index].numOfAvailable

        return (this.dataList[index] = {
          ...this.dataList[index],
          numOfAvailable: 1
        })
      })
      meeting.blockedTimes.map(time => {
        const index = lodash.findIndex(this.dataList, {
          date: time.blockedTime
        })
        return (this.dataList[index] = {
          ...this.dataList[index],
          blocked: true
        })
      })
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
