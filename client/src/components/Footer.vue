<template>
  <footer v-if="isLoggedIn()" id="footer">
    <p>Copyright © 2021, Schedulr All rights reserved.</p>
    <p><a href="mailTo:info@schedulr.email">Contact us</a></p>
  </footer>
</template>

<script>
export default {
  methods: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  }
}
</script>

<style scoped>
#footer {
  display: flex;
  width: 100%;
  align-self: flex-end;
  justify-content: space-between;
  color: #2c3e50;
  padding: 10px 20px;
}
</style>
