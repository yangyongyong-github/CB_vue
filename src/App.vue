<template>
  <div id="app-container" ref="mainContainer">
    <div class="main" v-show="webLoaded">
      <!-- v-loading="isLoading" -->
      <TopBanner />
      <RouterView v-if="isRouterAlive" />
      <ToTop />
    </div>
    <WebLoading v-show="!webLoaded" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import TopBanner from "@/components/common-content/top-banner";
import ToTop from "@/components/common/ToTop";
import Home from "@/views/Home";
import WebLoading from "@/components/common-content/web-loading";

export default {
  // name: App,
  data() {
    return {
      webLoaded: false, // 初始网站数据是否加载完毕
      isRouterAlive: true, //控制视图是否显示的变量
    };
  },
  created() {
    this.webLoad();
  },
  components: {
    Home,
    TopBanner,
    ToTop,
    WebLoading,
  },
  computed: mapState(["isLoading"]),
  /**友好的界面（数据）刷新 */
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload,
    };
  },
  methods: {
    /**
     * 初始化加载网站的数据
     */
    async webLoad() {
      // this.webLoaded = true;
      await this.init();
      this.webLoaded = true;
      console.log("store  : ", this.$store.state);
      if (this.webLoaded) console.log("网站数据加载完成");
    },
    reload() {
      this.isRouterAlive = false; //先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true; //再打开
      });
    },
    // --------------- init store data from server ------------------------------
    async init() {
      await this.GetRate(1);
      await this.GetBank("CBNo1");
      await this.GetUsers();
      console.log("init data done .");
    },
    async GetRate({ id = 1 }) {
      const rateInfo = await this.$store.dispatch("getRate", { id });
      if (rateInfo) {
        // 通过该id 拿到了对应的 数据
        console.log("init [rate] data : ", rateInfo);
      }
    },
    async GetBank({ id = "cb1" }) {
      const bankInfo = await this.$store.dispatch("getBank", { id });
      if (bankInfo) {
        // 通过该id 拿到了对应的 数据
        console.log("init [bank] data : ", bankInfo);
      }
    },
    async GetUsers() {
      const usersInfo = await this.$store.dispatch("getUsers");
      if (usersInfo) {
        // 通过该id 拿到了对应的 数据
        console.log("init [users] data : ", usersInfo);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

#app-container {
  width: @base-container-width;
  margin: 0 auto;

  .main {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
