<template>
  <div id="app">
    <Header v-if="isLoggedIn()" />
    <router-view />
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
</style>
