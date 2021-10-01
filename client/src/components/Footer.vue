<template>
  <div>
    <footer v-if="isLoggedIn()" class="footer">
      <p>All rights reserved 2021</p>
      <p>Contact us at: MaidenUpName@email.com</p>
    </footer>
  </div>
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
.footer {
  display: flex;
  align-self: flex-end;
  justify-content: space-between;
  color: #2c3e50;
  padding: 10%;
}
</style>
