<template>
  <div id="fourohfour">
    <!-- Render the content of the current page view -->
    <div class="left">
      <img src="../res/images/404.svg" alt="404" class="img" />
    </div>
    <div class="right">
      <h1>Hello brave adventurer!</h1>
      <h2>You've reached places that never existed!</h2>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
#fourohfour {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
}
.img {
  height: 50vh;
}
.left {
  display: flex;
  justify-content: flex-end;
  width: 50%;
  margin-right: 50px;
}
.right {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 50%;
  text-align: left;
  margin-left: 50px;
}
h1 {
  color: #274d76;
}
h2 {
  color: #93b4f6;
}
@media (max-width: 768px) {
  #fourohfour {
    display: flex;
    flex-direction: column;
  }
  .img {
    height: 80vw;
  }
  .left {
    margin-right: 0px;
    justify-content: center;
    margin-bottom: 20px;
  }
  .right {
    justify-content: center;
    margin-left: 0px;
    text-align: center;
    width: 100%;
  }
}
</style>
