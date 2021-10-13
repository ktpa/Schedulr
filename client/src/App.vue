<template>
  <div id="app">
    <Header v-if="isLoggedIn()" />
    <div id="root">
      <router-view />
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from './components/Header'
import Footer from './components/Footer.vue'
export default {
  components: { Header, Footer },
  methods: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  }
}
</script>
<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#root {
  min-height: calc(100vh - 122px);
  margin: 20px 50px;
}
@media (max-width: 768px) {
  #root {
    margin: 20px 10px;
  }
}
</style>
