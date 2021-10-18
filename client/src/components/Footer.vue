<template>
  <footer v-if="isLoggedIn()" id="footer">
    <div class="content">
      <p>Copyright © 2021, Schedulr All rights reserved.</p>
      <p><a href="mailTo:info@schedulr.email">Contact us</a></p>
    </div>
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
  justify-content: center;

  color: #2c3e50;
  padding: 10px 20px;
}
.content {
  display: flex;
  width: 1440px;
  justify-content: space-between;
}
</style>
