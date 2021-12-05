<template>
  <div class="user-container">
    <div class="input-area">
      <p><b>业务部分</b></p>
      <!-- 业务部分 -->
      <div class="item">
        <label> 账号： </label
        ><input
          type="text"
          v-model="userInfoTemp.account"
          @blur="accountIsUseable"
          autocomplete="new-password"
        />
        <!-- 去数据库中验证 -->
        <span class="format-tip">格式为 【{{ formatData.account }}】</span>
      </div>
      <!-- 业务部分 -->
      <div class="item">
        <label> 密码： </label>
        <!-- 先存储在temp中，验证通过了再存储到信息中 -->
        <input type="password" v-model="userInfoTemp.ps1" />
        <span class="format-tip">格式为【 {{ formatData.loginPwd }}】</span>
      </div>
      <!-- 业务部分 -->
      <div class="item">
        <label> 确认密码： </label
        ><input
          type="password"
          v-model="userInfoTemp.ps2"
          @blur="rules_passwordConfirme"
        />
      </div>

      <p><b>个人信息部分</b></p>

      <!-- 个人信息部分 -->
      <div class="item">
        <label> 姓名： </label><input type="text" v-model="userInfo.name" />
      </div>

      <div class="item">
        <label>性别：</label>
        <label>男</label>
        <input type="radio" name="sex" v-model="userInfo.sex" value="true" />
        <label>女</label>
        <input type="radio" name="sex" v-model="userInfo.sex" value="false" />
      </div>

      <div class="item">
        <label>出生日期</label>
        <input type="date" v-model="userInfo.birthday" />
      </div>

      <div class="item">
        <label for="">工作</label>
        <input type="text" v-model="userInfo.job" />
      </div>

      <div class="item">
        <label for="">联系电话：</label>
        <input
          type="number"
          v-model="userInfoTemp.mobile"
          @blur="rules_mobile"
        />
      </div>

      <div class="item">
        <label>所在单位：（学校或公司）</label>
        <input type="text" v-model="userInfo.company" />
      </div>
      <button class="submit-btn" @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        // 业务部分
        account: "", // 需要验证 数据库中验证通过后一起赋值
        loginId: "", // 需要验证

        loginPwd: "", // 需要验证
        // 个人信息
        name: "",
        sex: true,
        birthday: "",
        job: "",
        company: "",
        mobile: "", // 需要验证
        // 固定上传部分
        isFreezed: false,
        cage: "II",
        deposit: 0,
        interest: 0,
      },
      // 验证信息存储中介
      userInfoTemp: {
        account: "", // 数据库中去验证
        ps1: "",
        ps2: "",
        mobile: "",
      },
      // 参照格式
      formatData: {
        account: "姓名拼音+数字，示例:yangxiang01",
        // loginId: "", // 账号输入即可
        loginPwd: "账号+'.p', 示例:yangxiang01.p",
      },
    };
  },
  // updated() {
  //   console.log('updated()', this.userInfo);
  // },
  methods: {
    /*  验证必须是可用字符，通用
      英文单词，数字下划线组成
   */
    compliance() {
      // 符合性
    },
    // 去数据库中验证 账号是否可用
    async accountIsUseable() {
      console.log("to db valiable .");
      const user = await this.$store.dispatch("userii_loginUser/query", {
        account: this.userInfoTemp.account,
      });

      if (user) {
        alert("该账号已被注册，请重新填写！");
        this.userInfoTemp.account = "";
        return;
      }
      // 验证通过，赋值
      this.userInfo.account = this.userInfoTemp.account; //
      this.userInfo.loginId = this.userInfoTemp.account; //
    },
    //   密码确认
    rules_passwordConfirme() {
      if (this.userInfoTemp.ps1 !== this.userInfoTemp.ps2) {
        alert("密码不一致,请重新填写！");
        this.userInfoTemp.ps1 = "";
        this.userInfoTemp.ps2 = "";
        return;
      }
      // return this.userInfoTemp.ps2;
      this.userInfo.loginPwd = this.userInfoTemp.ps2;
    },
    //   联系电话 验证
    rules_mobile() {
      // const result =
      //   /^1(3[0-9]|4[01456879]|5[0-3,5-9]|6[2567]|7[0-8]|8[0-9]|9[0-3,5-9])d{8}$/.test(
      //     this.userInfoTemp.mobile
      //   );
      // console.log(result);
      // 暂时不予验证
      // if (result) {
      this.userInfo.mobile = this.userInfoTemp.mobile;
      // } else {
      //   alert("电话号码有问题，请重新填写！");
      //   this.userInfoTemp.mobile = "";
      //   return;
      // }
    },
    // 提交按钮
    async submit() {
      console.log(this.userInfo, this.userInfoTemp);

      /* add done 后 给点反馈啊：
        这里只是post一个东西，错误时报错，成功式无显示
        方式一： 要不再执行一遍查询该账号?
        方式二：try catch 没有出错则证明 done
      */
      try {
        const userObj = this.userInfo;
        const user = await this.$store.dispatch("userii/adduser", userObj);
        alert("adduser done");

        // 跳转到 个人中心页面
        this.$router.replace("/userii");

        // 清空用户输入的信息
        this.userInfo.account = "";
        this.userInfo.loginId = "";
        this.userInfo.loginPwd = "";
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
@import "./styles/user.less";
</style>