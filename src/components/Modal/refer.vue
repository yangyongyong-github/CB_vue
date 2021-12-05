<template>
  <div class="mask">
    <div class="poster">
      <div class="inner-mask"></div>
      <img :src="url" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  props: ["url"],
  data() {
    return {};
  },
};
</script>
<style lang="less">
.mask {
  width: 100%;
  height: 100%;
  position: relative;
  .poster {
    position: relative;
    width: 100%;
    // height: 100%;
    .inner-mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      background: rgba(0, 0, 0, 1);
      opacity: 0.4;
      height: 100%;
      width: 100%;
      filter: alpha(opacity=60);
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>