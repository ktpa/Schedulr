<template>
  <div class="time-slot">
    <div class="time-slot-text">
      <span>{{ this.getLabel(this.timePeriod) }}</span>
    </div>
    <div
      v-bind:class="[
        isBlocked ? 'blocked' : isSelected ? 'available' : 'idle',
        'time-slot-button'
      ]"
      @click="statusChange()"
    >
      <span v-if="this.numOfAvailable && this.numOfAvailable > 0">{{
        this.numOfAvailable
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeSlot',
  props: ['time', 'active', 'blocked', 'numOfAvailable', 'onSlotClick'],
  data() {
    return {
      timePeriod: this.time,
      isSelected: this.active,
      isBlocked: this.blocked,
      num: this.numOfAvailable
    }
  },
  methods: {
    statusChange() {
      if (!this.isBlocked) {
        this.isSelected = !this.isSelected
        // NOTE(numank): This is callback, will be defined and passed to this component
        // from the parent component!
        this.onSlotClick({
          time: this.timePeriod,
          isSelected: this.isSelected
        })
      }
    },
    getLabel(date) {
      const hours = date.split('T')[1]
      return `${hours.split(':')[0]}:${hours.split(':')[1]}`
    }
  }
}
</script>

<style scoped>
.time-slot {
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  margin-bottom: 5px;
  width: 32px;
}

.time-slot-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  border-radius: 100%;
  font-size: 14px;
  font-weight: 700;
}
.time-slot-button:hover {
  opacity: 0.6;
}
.time-slot-button:active {
  opacity: 0.8;
}
.time-slot-text {
  display: flex;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
}
.time-slot-text span,
.time-slot-button span {
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

.available {
  background-color: #58c6b5;
}
.blocked {
  background-color: #ed695f;
}
.blocked:hover {
  opacity: 1 !important;
}
.idle {
  background-color: rgb(226, 226, 226);
}
</style>
