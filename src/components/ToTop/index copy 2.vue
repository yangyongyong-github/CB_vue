<template>
  <div @click="handleClick" v-show="Y >= 700" class="to-top-container">Top</div>
</template>

<script>
// var Yy = 
export default {
  computed: {
    Y() {
      return document.documentElement.scrollTop;
    },
  },
  methods: {
    handleClick() {
      //  document.documentElement.scrollTop=0;
      console.log(this.Y);
      this.Y = 0;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.to-top-container {
  background: @primary;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: fixed;
  z-index: 99;
  right: 50px;
  bottom: 50px;
  cursor: pointer;
  line-height: 50px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
</style>
