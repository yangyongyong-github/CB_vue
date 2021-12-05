<template>
  <div id="app-container">
    <div class="top-banner"><TopBanner /></div>
    <RouterView v-if="isRouterAlive" />
  </div>
</template>

<script>
import TopBanner from "@/components/TopBanner";
import Home from "@/views/Home";
export default {
  // name: App,
  components: {
    Home,
    TopBanner,
  },
  /**以下用来友好的界面（数据）刷新 */
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true, //控制视图是否显示的变量
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false; //先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true; //再打开
      });
    },
  },
};
</script>

<style lang="less" scoped>
#app-container {
  width: 100%;
  overflow-x: hidden;
  .top-banner {
    width: 100%;
    // height: 100px;
    background-color: bisque;
  }
}
</style>