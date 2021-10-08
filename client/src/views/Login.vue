<template>
  <div class="landing">
    <svg
      class="abstract rotating"
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
      <path
        d="M5,17c1.1,0,2,0.9,2,2s-0.9,2-2,2c-1.1,0-2-0.9-2-2S3.9,17,5,17z"
      />
    </svg>
    <div class="card">
      <div class="left-section">
        <div class="logo">
          <img src="../res/images/logo.png" alt="logo" class="login-logo" />
        </div>

        <LoginForm v-if="isLogin" />
        <SignupForm v-if="!isLogin" />
        <b-link class="switch-forms" variant="link" sm @click="switchForm">
          Click here if you would like to {{ isLogin ? 'sign up' : 'login' }}
        </b-link>
      </div>
      <div class="right-section">
        <div class="motto">
          <h2>Time is precious!</h2>
          <h5 class="sub">
            Let <i>Schedulr</i> arrange all your meetings<br />
            and get-togethers!
          </h5>
        </div>
        <img
          class="landing-vector"
          src="../res/images/landingVector.svg"
          alt="landing vector"
        />
      </div>
    </div>
  </div>
</template>
<script>
import LoginForm from '../components/LoginForm.vue'
import SignupForm from '../components/SignupForm.vue'

export default {
  components: { LoginForm, SignupForm },
  name: 'login',
  data() {
    return {
      isLogin: true
    }
  },

  methods: {
    switchForm() {
      this.isLogin = !this.isLogin
    }
  }
}
</script>

<style>
.abstract {
  position: absolute;
  height: 600vh;
  z-index: 0;
  left: -66%;
  top: -20%;
  opacity: 0.1;
}
@-webkit-keyframes rotating /* Safari and Chrome */ {
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
  -webkit-animation: rotating 450s linear infinite;
  -moz-animation: rotating 450s linear infinite;
  -ms-animation: rotating 450s linear infinite;
  -o-animation: rotating 450s linear infinite;
  animation: rotating 450s linear infinite;
}
.landing {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);
}
.login-logo {
  height: 50px;
}
.card {
  display: flex;
  flex-direction: row !important;
  background-color: white;
  border-radius: 5px;
  box-shadow: 10px 10px 10px #00000030;
  justify-content: center;
  align-content: center;
  height: 600px;
  width: 1000px;
  margin: 20px 20px 20px 20px;
}
.left-section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  height: 100%;
  min-width: 40%;
  padding: 0 50px;
}
.logo {
  display: flex;
  margin-top: 50px;
  align-content: flex-start;
}

.right-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  height: 100%;
  min-width: 60%;
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  background-size: 100%;
}
@media (max-width: 768px) {
  .card {
    width: 80%;
  }
  .left-section {
    width: 100%;
    padding: 0 20px;
  }
  .right-section {
    display: none;
  }
  .logo {
    display: flex;
    justify-content: center;
  }
}

.motto {
  text-align: left;
  margin-left: 50px;
}
.sub {
  margin-top: 20px;
  margin-bottom: 20px;
}

.landing-vector {
  position: relative;
  aspect-ratio: 16/9;
  margin-left: -110px;
  max-height: 340px;
}

.switch-forms {
  display: flex;
  align-self: center;
  margin-bottom: 50px;
  font-size: 12px !important;
  text-decoration: none !important;
  z-index: 2;
}
.switch-forms:hover {
  text-decoration: none !important;
}
.wrapper {
  width: 100%;
}
.form-input {
  margin-bottom: 10px;
}
.inner-addon {
  position: relative;
}

.inner-addon .input-icon {
  position: absolute;
  padding: 10px;
  margin-top: 2px;
  pointer-events: none;
}

.left-addon .input-icon {
  left: 0px;
}

.left-addon input {
  padding-left: 35px;
}

.landing-vector {
  pointer-events: none;
}
</style>
