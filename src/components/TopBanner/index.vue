<template>
  <div id="home-container">
    <div id="nav">
      <div class="logo" @click="toIntroduce">
        <img src="@/assets/bk-logo.png" alt="" />
      </div>

      <!-- 右侧的，登录信息展示区域 -->
      <div class="login-info">
        <a v-if="isLoading">
          Loading
          <!-- {{ language.Loading[la] }} -->
          ...</a
        >
        <template v-else-if="userData">
          <span>{{ userData.name }}</span> <br />
          <span>
            用户类型：
            <!-- {{ language.UserIdentify[la] }} -->
            {{ userData.flag }}
          </span>
          <button @click="loginOut">
            注销
            <!-- {{ language.loginOut[la] }} -->
          </button>
        </template>
        <router-link v-else to="/login">
          <Icon class="log" type="info" />
          <!-- 请先登录 -->
          {{ language.PleaseFirstLogin[lang] }}</router-link
        >
        <!-- 切换语言 -->
        <button @click="handleSwtichLang">
          {{ lang | switchLang }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Icon from "@/components/Icon";
export default {
  data(){
    return {
      // la:this.$store.state.lang
    }
  },
  components: {
    Icon,
  },
  computed: mapState(["userData", "isLoading", "lang", "language"]),
  filters: {
    switchLang(value) {
      if (value === "cn") {
        // 切换为英文
        return "切换为 英文";
        // language.To[lang] + language.English[lang];
      } else if (value === "en") {
        // toChinese
        return "toChinese";
        // language.To[lang] + language.Chinese[lang];
      }
    },
  },
  methods: {
    loginOut() {
      this.$store.dispatch("loginOut");
      this.$router.push("/");
    },
    toIntroduce() {
      //指定跳转的路由的名字下
      this.$router.replace({ name: "introduce" });
    },
    // 点击切换语言
    handleSwtichLang() {
      if (this.lang === "en") {
        this.$store.commit("setLang", "cn");
      } else if (this.lang === "cn") {
        this.$store.commit("setLang", "en");
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>

