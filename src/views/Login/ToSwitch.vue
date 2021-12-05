<template>
  <div class="to-switch-container">
    <router-link class="item" to="/adminlogin">Admin</router-link>
    |
    <router-link class="item" to="/userilogin">User_I & Loan User</router-link>
    |
    <router-link class="item" to="/useriilogin"
      >User_II & Deposit User</router-link
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState("loginUser", ["data", "isLoading"]),
  methods: {
    loginOut() {
      this.$store.dispatch("loginUser/loginOut");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less" scoped>
.to-switch-container {
  margin-top: 200px;
  text-align: center;
  color: #2c3e50;
  .item {
    display: inline-block;
    width: 300px;
    height: 50px;
    font-size: 1.3em;
    font-weight: bold;
    border: 1px solid blueviolet;
  }
  a.router-link-exact-active {
    color: #42b983;
  }
}
</style>