<template>
  <div id="app">
    <!-- Render the content of the current page view -->
    <router-view />
    <Footer />
  </div>
</template>
<script>
import Footer from './components/Footer.vue'
export default {
  components: { Footer }
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
