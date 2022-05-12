<template>
  <div class="web-loading-container">
    <div class="img">
      <img class="bank-logo" src="@/assets/bk-logo.png" alt="" />
      <img src="@/assets/loading.gif" alt="" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";

.web-loading-container {
  width: 100%;
  height: 100%;
  .img {
    .self-center();
  }
}
</style>