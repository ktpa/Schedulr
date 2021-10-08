<template>
  <div class="plswork"></div>
</template>

<script>
export default {
  name: 'circle',
  data: () => ({
    isSelected: false
  })
  // :class="[{ selected: isSelected }, deselected, circleDiv]
  // if isSelected is true, then deselected is the class of the div.
}
</script>

<style>
.selected {
  background-color: green;
}
.deselected {
  background-color: red;
}
.circleDiv {
  border-radius: 5em;
  height: 50em;
  width: 50em;
}
.plswork {
  background-color: black;
  height: 25em;
  width: 25em;
  z-index: 5em;
  position: center;
}
</style>
