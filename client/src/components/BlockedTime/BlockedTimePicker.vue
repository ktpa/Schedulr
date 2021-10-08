<template>
  <div class="date-hour-picker">
    <span>{{ this.changeList }}</span>
    <DatePicker
      v-model="selectedDay"
      :first-day-of-week="2"
      :min-date="this.meeting.firstPossibleDay"
      :max-date="this.meeting.lastPossibleDay"
      show-iso-weeknumbers
      is-required
    />
    <BlockedHourPicker
      :day="this.selectedDay"
      :hoursList="this.generatedData"
      :onChange="this.updateChangeList"
    />
  </div>
</template>

<script>
import { DatePicker } from 'v-calendar'
import lodash from 'lodash'
import BlockedHourPicker from './BlockedHourPicker.vue'
import { userApi } from '../../api/user'
export default {
  // meeting is the original API response
  props: ['meeting'],
  components: {
    DatePicker,
    BlockedHourPicker
  },
  data() {
    return {
      selectedDay: new Date(),
      changeList: []
    }
  },
  watch: {
    changeList: function () {
      if (this.changeList.length > 0) {
        this.changeList.map(change => {
          if (change.active) {
            return userApi
              .createBlockedTime(this.$store.getters.userId, { availableTime: change.time })
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
            return userApi
              .deleteBlockedTime(this.$store.getters.userId, idToDelete)
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
    generatedData: function () {
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
          time: date.toISOString()
        })
      }

      // our dataList is generated tailored to our needs
      // now we need to fill it with our data
      // end object should look like this
      // hoursList: [{time, active, blocked, numOfAvailable}]

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
