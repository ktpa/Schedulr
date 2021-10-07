<template>
  <div class="hour-picker">
    <TimeSlot
      v-for="slot in slotList"
      :key="slot.time.toString()"
      :time="slot.time"
      :active="slot.active"
      :blocked="slot.blocked"
      :numOfAvailable="slot.numOfAvailable"
      :onSlotClick="slotClickCallback"
    />
  </div>
</template>

<script>
import TimeSlot from './TimeSlot.vue'
import lodash from 'lodash'
export default {
  /* hoursList: [{time, active, blocked, numOfAvailable}] */
  props: ['day', 'hoursList', 'onChange'],
  components: {
    TimeSlot
  },
  watch: {
    // eslint-disable-next-line space-before-function-paren
    hoursList: function(newList) {
      this.slotList = newList
    }
  },
  data() {
    return {
      selectedDay: this.day,
      slotList: this.hoursList
    }
  },
  methods: {
    /* changedSlot : { time, isSelected } */
    slotClickCallback(changedSlot) {
      // find the record from the list
      // update the list with the params

      const index = lodash.findIndex(this.slotList, { time: changedSlot.time })
      if (!this.slotList[index].blocked) {
        if (changedSlot.isSelected) {
          // user selected the slot, update the list
          this.slotList[index].active = 'true'
          this.slotList[index].numOfAvailable += 1
        } else {
          // user unselected the slot, update the list
          this.slotList[index].active = 'false'
          this.slotList[index].numOfAvailable -= 1
        }
        // This is callback, will be defined and passed to this component
        // from the parent component!
        this.onChange(this.slotList[index])
      }
    },
    getNumOfAvailables(time) {
      const index = lodash.findIndex(this.availabilityList, time)
      return this.availabilityList[index].num
    }
  }
}
</script>

<style scoped>
.hour-picker {
  display: flex;
  flex-wrap: wrap;
  width: 280px;
}
</style>
