<template>
  <div class="switch-container">
    <div class="one">
      <slot name="one"></slot>
    </div>
    <div class="two">
      <slot name="two"></slot>
    </div>
    <div class="three">
      <slot name="three"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
.switch-container {
  .self-center();
  width: 400px;
  height: 100px;
  border-radius: 40px;
  background-color: rgb(207, 205, 205);
  display: flex;
  justify-content: space-around;
  align-items: center;
  div{
     display: flex;align-items: center;
  justify-content: space-around;
    width: 100px;
    height: 30px;
    border-radius: 20px;
    // background-color: rgb(240, 217, 185);
    cursor: pointer;
  }
}
</style>