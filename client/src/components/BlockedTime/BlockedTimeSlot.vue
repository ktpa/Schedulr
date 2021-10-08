<template>
  <div class="time-slot">
    <div class="time-slot-text">
      <span>{{ this.getLabel(this.timePeriod) }}</span>
    </div>
    <div
      v-bind:class="[
        isSelected ? 'blocked' : 'idle',
        'time-slot-button'
      ]"
      @click="statusChange()"
    >
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'TimeSlot',
  props: ['time', 'active', 'onSlotClick'],
  watch: {
    // eslint-disable-next-line space-before-function-paren
    active: function(newData) {
      this.isSelected = newData
    }
  },
  data() {
    return {
      timePeriod: this.time,
      isSelected: this.active
    }
  },
  methods: {
    statusChange() {
      this.isSelected = !this.isSelected
      // NOTE(numank): This is callback, will be defined and passed to this component
      // from the parent component!
      this.onSlotClick({
        time: this.timePeriod,
        isSelected: this.isSelected
      })
    },
    getLabel(date) {
      return moment(date)
        .format('HH:mm')
        .toString()
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
