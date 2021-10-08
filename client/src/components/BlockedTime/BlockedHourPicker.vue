<template>
  <div class="hour-picker">
    <BlockedTimeSlot
      v-for="slot in slotList"
      :key="slot.time.toString()"
      :time="slot.time"
      :active="slot.active"
      :onSlotClick="slotClickCallback"
    />
  </div>
</template>

<script>
import BlockedTimeSlot from './BlockedTimeSlot.vue'
import lodash from 'lodash'
export default {
  /* hoursList: [{time, active, blocked, numOfAvailable}] */
  name: 'BlockedHourPicker',
  props: ['day', 'hoursList', 'onChange'],
  components: {
    BlockedTimeSlot
  },
  watch: {
    hoursList: function (newList) {
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
          this.slotList[index].active = true
        } else {
          // user unselected the slot, update the list
          this.slotList[index].active = false
        }
        // This is callback, will be defined and passed to this component
        // from the parent component!
        this.onChange(this.slotList[index])
      }
    }
  }
}
</script>

<style scoped>
.hour-picker {
  display: flex;
  flex-wrap: wrap;
  width: 280px;
  align-content: flex-start;
  margin-left: 50px;
}

@media (max-width: 768px) {
  .hour-picker {
    margin-top: 50px;
    margin-left: 25px;
  }
}
</style>
