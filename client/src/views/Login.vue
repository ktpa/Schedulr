<template>
  <div class="landing-wrapper">
    <div class="landing">
      <Animation />
      <Animation2 />
      <div class="card opacityTransform">
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
  </div>
</template>
<script>
import LoginForm from '../components/LoginForm.vue'
import SignupForm from '../components/SignupForm.vue'
import Animation from '../components/Animation.vue'
import Animation2 from '../components/Animation2.vue'

export default {
  components: { LoginForm, SignupForm, Animation, Animation2 },
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
.landing-wrapper {
  position: absolute;
  left: 0;
  top: 0;
}
.opacityTransform {
  animation: opacityTransform 0.5s linear normal;
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
