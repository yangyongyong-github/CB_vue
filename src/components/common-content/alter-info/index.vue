<template>
  <div class="alter-info-container">
    <div class="title">
      <button @click="alterInfo">修改个人信息</button>
      <div class="select" v-show="alter_area">
        <div class="nav" @click="alterPsw">修改密码</div>
        <div class="nav" @click="alterOther">修改其他信息</div>
      </div>
    </div>

    <div class="input">
      <div class="alter-psw">
        <label for=""
          >原密码
          <input
            ref="oldPsw"
            type="password"
            @blur="isOldPsw"
            v-model="psw.old"
        /></label>
        <label for=""
          >新密码 <input type="password" v-model="psw.psw1"
        /></label>
        <label for=""
          >确认新密码
          <input type="password" ref="errPsw" @blur="newPsw" v-model="psw.psw2"
        /></label>
      </div>
      <div class="other"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      alterFlag: {
        psw: false,
        info: false,
      },
      psw: {
        old: "",
        psw1: "",
        psw2: "",
      },
      inputInfo: {
        newPsw: "",
        newMobile: "",
        newJob: "",
      },
    };
  },
  computed: mapState(["userData"]),
  methods: {
    alterPsw() {
      this.alterFlag.psw = !this.alterFlag.psw;
    },
    alterOther() {
      this.alterFlag.info = !this.alterFlag.info;
    },
    // 验证用户输入的是否为原密码
    isOldPsw() {
      if (this.psw.old !== this.userData.password) {
        this.$refs.oldPsw.className = "psw-error";
        return;
      }
    },
    newPsw() {
      if (this.psw.psw1 !== this.psw.psw2) {
        this.$refs.errPsw.className = "psw-error";
        return;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.alter-info-container {
  .psw-error {
    border: 1px solid red;
    &::after {
      content: "密码不一致";
      font-size: 0.7em;
      color: red;
    }
  }
}
</style>