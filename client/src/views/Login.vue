<template>
  <div class="landing">
    <img class="abstract rotating" src="../res/images/loading.svg" />
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
  height: 150vh;
  z-index: 0;
  left: 33%;
  top: 33%;
  opacity: 0.3;
  top: 33%;
  filter: blur(10px);
  fill: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(237, 105, 95, 1) 0%,
    rgba(88, 198, 181, 1) 100%
  );
  stroke: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(237, 105, 95, 1) 0%,
    rgba(88, 198, 181, 1) 100%
  );
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
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
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
