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
  data() {
    return {
      isRouterAlive: true, //控制视图是否显示的变量
    };
  },
  created() {
    this.init();
    console.log("store  : ", this.$store.state);
  },
  components: {
    Home,
    TopBanner,
  },
  /**友好的界面（数据）刷新 */
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload,
    };
  },
  methods: {
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
    async GetBank({ id = "CBNo1" }) {
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