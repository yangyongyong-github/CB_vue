<template>
  <div id="goTop" class="to-top-container">
    <transition name="fade">
      <div class="to-top" v-show="goTopShow" @click="goTop">
        <!-- <i class="goTopIcon"></i> -->
      </div>
    </transition>
  </div>
</template>
 
<script>
export default {
  name: "goTop",
  data() {
    return {
      scrollTop: "",
      goTopShow: false,
    };
  },
  methods: {
    handleScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (this.scrollTop > 500) {
        this.goTopShow = true;
      } else {
        this.goTopShow = false;
      }
    },
    goTop() {
      let timer = null,
        _that = this;
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        if (_that.scrollTop > 0) {
          _that.scrollTop -= 50;
          document.body.scrollTop = document.documentElement.scrollTop =
            _that.scrollTop;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
          _that.goTopShow = false;
        }
      });
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
 
<style lang="less" scoped>
@import './index.less';
</style>