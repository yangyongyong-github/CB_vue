<template>
  <div id="home-container">
    <div id="nav">
      <div class="logo" @click="toIntroduce">
        <img src="@/assets/bk-logo.png" alt="" />
      </div>
      <div class="mid">
        <!-- 下面为受保护的页面，必须先对应登录后才能进去 -->
        <div>
          <Icon type="qq" /> <router-link to="/admin"> Admin</router-link>
        </div>
        <div>
          <Icon type="qq" /><router-link to="/useri">User_I</router-link>
        </div>
        <div>
          <Icon type="qq" /><router-link to="/userii">User_II</router-link>
        </div>
      </div>
      <!-- 右侧的，登录信息展示区域 -->
      <div class="login-info">
        <a v-if="isLoading">Loading...</a>
        <template v-else-if="data">
          <span>{{ data.name }}</span> <br />
          <span> 用户类型：{{ data.cage }} </span>
          <!-- <span>{{ data.cage === "I" ? "loan" : "deposit" }}</span> -->
          <button @click="loginOut">注销</button>
        </template>
        <router-link v-else to="/toswitch">
          <Icon class="log" type="info" />请先登录</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  computed: mapState("userii_loginUser", ["data", "isLoading"]), //user ii
  // computed: mapState("loginUser", ["data", "isLoading"]), //admin login
  // computed: {
  //   // admin: () => mapState("loginUser", ["data", "isLoading"]),
  //   // useri: () => mapState("useriloginUser", ["data", "isLoading"]),
  //   ...mapState({
  //     isLoading: ()=>
  // })
  // },
  methods: {
    loginOut() {
      this.$store.dispatch("loginUser/loginOut"); //admin
      // this.$store.dispatch("userii_loginUser/loginOut");
      this.$router.push("/"); // home pages
    },
    // click to Introduce pages
    toIntroduce() {
      //指定跳转的路由的名字下
      this.$router.replace({ name: "introduce" });
    },
  },
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>

