<template>
  <svg
    class="abstract2 rotating2"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
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
.abstract2 {
  position: absolute;
  height: 400vh;
  z-index: 0;
  left: -140%;
  top: -120%;
  opacity: 0.1;
}
@-webkit-keyframes rotating2 /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    fill: blue;
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
    fill: red;
  }
}
@keyframes rotating2 {
  0% {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    fill: #ed695f;
    filter: blur(5px);
  }
  25% {
    fill: #58c6b5;
  }
  50% {
    -ms-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
    fill: #ed685f;
    filter: blur(10px);
  }
  75% {
    fill: #58c6b5;
  }
  100% {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
    fill: #ed695f;
    filter: blur(5px);
  }
}
.rotating2 {
  -webkit-animation: rotating2 450s linear infinite;
  -moz-animation: rotating2 450s linear infinite;
  -ms-animation: rotating2 450s linear infinite;
  -o-animation: rotating2 450s linear infinite;
  animation: rotating2 450s linear infinite;
}
</style>
