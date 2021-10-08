<template>
  <svg
    class="abstract rotating"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 24 24"
    style="enable-background:new 0 0 24 24;"
    xml:space="preserve"
  >
    <circle cx="12" cy="22" r="2" />
    <circle cx="12" cy="2" r="2" />
    <circle cx="22" cy="12" r="2" />
    <circle cx="2" cy="12" r="2" />
    <path
      d="M19,3c1.1,0,2,0.9,2,2c0,1.1-0.9,2-2,2c-1.1,0-2-0.9-2-2C17,3.9,17.9,3,19,3z"
    />
    <path
      d="M19,17c1.1,0,2,0.9,2,2s-0.9,2-2,2c-1.1,0-2-0.9-2-2C17,17.9,17.9,17,19,17z"
    />
    <path d="M5,3c1.1,0,2,0.9,2,2S6.1,7,5,7C3.9,7,3,6.1,3,5S3.9,3,5,3z" />
    <path d="M5,17c1.1,0,2,0.9,2,2s-0.9,2-2,2c-1.1,0-2-0.9-2-2S3.9,17,5,17z" />
  </svg>
</template>

<script>
export default {}
</script>

<style>
.abstract {
  margin: 3rem;
  position: absolute;
  height: 300vh;
  z-index: 0;
  left: 15%;
  top: 15%;
  opacity: 0.1;
  overflow: visible;
}
.shadow {
  filter: drop-shadow(0 0 0.01rem #58c6b5);
}
@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  0% {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    fill: #58c6b5;
    filter: blur(5px);
  }
  25% {
    fill: #ed695f;
  }
  50% {
    -ms-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
    fill: #58c6b5;
    filter: blur(10px);
  }
  75% {
    fill: #ed685f;
  }
  100% {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
    fill: #58c6b5;
    filter: blur(5px);
  }
}
.rotating {
  overflow: visible;
  -webkit-animation: rotating 350s linear infinite;
  -moz-animation: rotating 350s linear infinite;
  -ms-animation: rotating 350s linear infinite;
  -o-animation: rotating 350s linear infinite;
  animation: rotating 350s linear infinite;
}
@keyframes opacityTransform {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
