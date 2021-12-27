<template>
  <div class="user-container">
    <div class="select-indent">
      <h3>用户注册页面</h3>

      <b>请选择用户身份 </b>
      <select v-model="userFlag">
        <option value="useri">I</option>
        <option value="userii">II</option>
      </select>
      <b> {{ userFlag | FilterFlag }} </b>
    </div>

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
      <!-- =============================================== -->
      <!-- 具体涉及到业务不同的 -->
      <div class="different">
        <!-- --------------- user_i----------------- -->
        <div class="useri" v-if="userFlag === 'useri'">
          <!-- limited = none-input -->
          <!-- isFreezed  = none-input  -->
          <!-- indet 1 person /2 -->
          <!-- loan = 0 = none-input -->
          <!-- interest = 0 = none-input -->
          <div class="item">
            <!-- company -->
            <label>所在单位：（学校或公司）</label>
            <input type="text" v-model="userInfo.company" />
          </div>
          <!-- cause = none-input - -->
        </div>
        <!-- --------------- user_ii----------------- -->
        <div class="userii" v-else>
          <!-- isFreezed  =  none-input  -->
          <!-- loan = 0 = none-input -->
          <!-- interest = 0 = none-input -->
        </div>
      </div>

      <p class="btn">
        <button class="submit-btn" @click="submit">提交</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userFlag: "userii",
      userInfo: {
        /**
         * 基本思路： 信息全部输入，等到向后台发送数据的时候，再选择发送相应类型的用户信息
         */
        // 业务部分
        flag: this.userFlag,
        account: "", // 需要验证 数据库中验证通过后一起赋值
        loginId: "", // 需要验证

        loginPwd: "", // 需要验证
        // 个人信息
        name: "",
        sex: true,
        birthday: "",
        job: "",
        company: "", // I
        mobile: "", // 需要验证
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
  filters: {
    /**
     * 过滤用户选择的身份类型
     */
    FilterFlag(value) {
      if (value === "useri") {
        return "Loan User";
      } else if (value === "userii") {
        return "Deposit User";
      } else {
        return "Error";
      }
    },
  },
  methods: {
    /*  验证必须是可用字符，通用
      英文单词，数字下划线组成
   */
    compliance() {
      // 符合性
    },
    // 用户注册完成后，清空输入框
    clearInput() {
      // 清空用户输入的信息
      // this.userInfo = null;// 无效
      this.userInfo.account = null;
      this.userInfo.loginId = null;
      this.userInfo.loginPwd = null;
      this.userInfo.name = null;
      this.userInfo.mobile = null;
      this.userInfo.sex = null;
      this.userInfo.birthday = null;
      this.userInfo.job = null;
      this.userInfo.company = null;
    },
    // 去数据库中验证 账号是否可用
    async accountIsUseable() {
      console.log("to db valiable .");
      const user = await this.$store.dispatch("query", {
        account: this.userInfoTemp.account,
        flag: this.userFlag,
      });

      if (user) {
        alert("该账号已被注册，请重新填写！");
        this.userInfoTemp.account = "";
        this.userInfoTemp.ps1 = "";
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

      if (this.userFlag === "useri") {
        // ------------ useri to register ---------------
        console.log("register : I");

        const userIObj = {
          account: this.userInfo.account,
          loginId: this.userInfo.account,
          loginPwd: this.userInfo.loginPwd,
          name: this.userInfo.name,
          sex: this.userInfo.sex,
          birthday: this.userInfo.birthday,
          job: this.userInfo.job,
          mobile: this.userInfo.mobile,
          company: this.userInfo.company, // I
          // 固定上传部分
          cause: null,
          isFreezed: false,
          loan: 0, //I
          interest: 0,
          limited: true, //I
          cause: null,
          flag: "useri",
        };

        // write to db

        try {
          const user = await this.$store.dispatch("adduser", userIObj);
          alert("adduser I done ");

          this.clearInput();

          // 注册完成后，直接 跳转到 个人中心页面
          const goto = window.confirm("to enter center page I ?");
          if (goto) {
            this.$store.commit("setUserData", userIObj);
            this.$router.push(`/${userIObj.flag}`);
            console.log("arrive at I center");
          } else {
            this.$router.push("/");
          }
          this.clearInput();
        } catch (error) {
          console.log(error);
        }

        // -------------- userii to register --------------------------
      } else if (this.userFlag === "userii") {
        console.log("register : II");

        const userIIObj = {
          account: this.userInfo.account,
          loginId: this.userInfo.account,
          loginPwd: this.userInfo.loginPwd,
          name: this.userInfo.name,
          sex: this.userInfo.sex,
          birthday: this.userInfo.birthday,
          job: this.userInfo.job,
          mobile: this.userInfo.mobile,
          // 固定上传部分
          cause: null,
          isFreezed: false,
          interest: 0,
          deposit: 0, // II
          flag: "userii",
        };

        // write to db

        try {
          const user = await this.$store.dispatch("adduser", userIIObj);
          alert("adduser II done ");

          // 注册完成后，直接 跳转到 个人中心页面
          const goto = window.confirm("to enter center page II ?");
          if (goto) {
            this.$store.commit("setUserData", userIIObj);
            this.$router.push(`/${userIIObj.flag}`);
            console.log("arrive at II center");
          } else {
            this.$router.push("/");
          }
          this.clearInput();
        } catch (error) {
          console.log(error);
        }
      } else {
        return;
      }
      /* add done 后 给点反馈啊：
        这里只是post一个东西，错误时报错，成功式无显示
        方式一： 要不再执行一遍查询该账号?
        方式二：try catch 没有出错则证明 done
      */
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.user-container {
  width: 100%;
  // common
  .format-tip {
    color: @gray;
    margin-left: 10px;
    font-size: 0.8em;
  }
  button {
    padding: 3px 10px;
  }

  // top 下拉框
  .select-indent {
    width: 100%;
    margin-top: 30px;
    text-align: center;
  }
  // middle input
  .input-area {
    min-width: 50%;
    padding: 20px 50px;
    border: 1px dotted gray;

    // 涉及到不同的具体独有的业务类型部分
    .different {
      margin-top: 20px;
    }
  }
  // bottom btn
  .btn {
    text-align: center;
  }
}
</style>