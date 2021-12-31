<template>
  <div class="top-banner-container">
    <div id="nav">
      <div class="logo" @click="toIntroduce">
        <img src="@/assets/bk-logo.png" alt="" />
      </div>

      <div class="middle">
        <!-- 占位 用来显示 TopTip -->
      </div>
      <!-- 右侧的，登录信息展示区域 -->
      <div class="login-info">
        <a v-if="isLoading">
          <!-- Loading -->
          {{ language.Loading[lang] }}
          ...</a
        >
        <template v-else-if="userData">
          <span>{{ userData.name }}</span> <br />
          <div>
            <!-- 用户类型 -->
            <!-- <span class="indicate">{{ language.UserCategory[lang] }}</span> : -->
            {{ userData.flag }}
          </div>
          <button @click="loginOut" class="indicate">
            <!-- 注销 -->
            {{ language.LoginOut[lang] }}
          </button>
        </template>
        <router-link v-else to="/login">
          <div class="log-div">
            <Icon class="log" type="info" />
            <!-- 请先登录 -->
            <span class="log-span indicate" >
              {{ language.PleaseFirstLogin[lang] }}
            </span>
          </div>
        </router-link>
      </div>

      <div class="right-tip">
        <div class="line">
          <button @click="back" class="indicate">
            <!-- 返回 -->
            {{ language.Back[lang] }}
          </button>
          <button @click="home" class="indicate">
            <!-- 首页 -->
            {{ language.Home[lang] }}
          </button>
        </div>

        <!-- 切换语言 -->
        <button class="btn-lang indicate" @click="handleSwtichLang">
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
    back() {
      this.$router.go(-1);
    },
    home() {
      this.$router.push("/");
    },
  },
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>

