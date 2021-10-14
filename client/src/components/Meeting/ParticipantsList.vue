<template>
  <div class="participantsList">
    <b-button class="list-button" v-b-toggle.participanstCollapse>
      <div class="button-label">Participants List</div>
      <div class="num-of">{{ participantsList.length }}</div>
    </b-button>
    <b-collapse visible id="participanstCollapse" class="collapse">
      <VirtualList
        style="overflow-y: auto;"
        :data-key="'_id'"
        :data-sources="participantsList"
        :data-component="participantComponent"
      />
    </b-collapse>
  </div>
</template>

<script>
import Participant from './Participant.vue'
import VirtualList from 'vue-virtual-scroll-list'
export default {
  props: ['participantsList', 'onChange'],
  // eslint-disable-next-line vue/no-unused-components
  components: { Participant, VirtualList },
  data() {
    return {
      participantComponent: Participant
    }
  }
}
</script>

<style scoped>
.participantsList {
  width: 300px;
}
.list-button {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 75px;
  width: 300px;
  background-color: #58c6b5;
  border-width: 0;
}
.list-button:hover {
  background-color: #9bddd3;
}
.list-button:active {
  background-color: #58c6b5 !important;
}
.list-button:focus {
  background-color: #58c6b5;
}
.collapse {
  width: 300px;
  border-radius: 5px;
}
.button-label {
  text-align: left;
  font-weight: 500;
  font-size: 15px;
}
.num-of {
  color: black;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 20px;
}
</style>
