<template>
  <div class="user-container">
    <div class="select-indent">
      <h3 class="page-title">
        <!-- 用户注册页面 -->
        {{ language.UserRegisterPage[lang] }}
      </h3>

      <b>
        <!-- 请选择用户身份  -->
        {{ language.SelectYouLoginIdentify[lang] }}
      </b>
      <select v-model="userInfo.flag">
        <option value="useri">I</option>
        <option value="userii">II</option>
      </select>
      <b> {{ userInfo.flag | FilterFlag }} </b>
    </div>

    <div class="img-show">
      <div class="useri" v-if="userInfo.flag === 'useri'">
        <img src="@/assets/loan.png" alt="useri-img" />
      </div>
      <div class="userii" v-else-if="userInfo.flag === 'userii'">
        <img src="@/assets/deposit.png" alt="userii-img" />
      </div>
    </div>

    <div class="input-area">
      <p>
        <b>{{ language.BusinessPart[lang] }}</b>
      </p>
      <!-- 业务部分 -->
      <div class="item">
        <label>{{ language.Account[lang] }} </label
        ><input
          type="text"
          v-model="userInfoTemp.account"
          @blur="vali_account"
          autocomplete="new-password"
          readonly
          onfocus="this.removeAttribute('readonly');"
          onblur="this.setAttribute('readonly',true);"
        />
        <!-- 去数据库中验证 -->
        <!-- <span class="format-tip">格式为 【{{ formatData.account }}】</span> -->
      </div>
      <!-- 业务部分 -->
      <div class="item">
        <label> {{ language.PassWord[lang] }} </label>
        <!-- 先存储在temp中，验证通过了再存储到信息中 -->
        <input type="password" v-model="userInfoTemp.ps1" />
        <!-- <span class="format-tip">格式为【 {{ formatData.loginPwd }}】</span> -->
      </div>
      <!-- 业务部分 -->
      <div class="item last">
        <label> {{ language.ConfirmePsw[lang] }}</label
        ><input
          type="password"
          v-model="userInfoTemp.ps2"
          @blur="rules_passwordConfirme"
        />
      </div>

      <p>
        <b>
          <!-- 个人信息部分 -->
          {{ language.PersonInfomationPart[lang] }}
        </b>
      </p>

      <!-- 个人信息部分 -->
      <div class="item">
        <label> {{ language.Name[lang] }} </label
        ><input type="text" v-model="userInfo.name" @blur="vali_name" />
      </div>

      <div class="item">
        <label>
          {{ language.Gender[lang] }}
        </label>
        {{ language.Male[lang] }}
        <input type="radio" name="sex" v-model="userInfo.sex" value="true" />
        <label>
          <!-- 占位距离 -->
        </label>
        {{ language.Female[lang] }}
        <input type="radio" name="sex" v-model="userInfo.sex" value="false" />
      </div>

      <div class="item">
        <label>
          {{ language.Birthday[lang] }}
        </label>
        <input type="date" v-model="userInfo.birthday" />
      </div>

      <div class="item">
        <label for="">
          {{ language.Job[lang] }}
        </label>
        <input type="text" v-model="userInfo.job" />
      </div>

      <div class="item">
        <label for="">
          {{ language.Mobile[lang] }}
        </label>
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
        <div class="useri" v-if="userInfo.flag === 'useri'">
          <!-- limited = none-input -->
          <!-- isFreezed  = none-input  -->
          <!-- indet 1 person /2 -->
          <!-- loan = 0 = none-input -->
          <!-- interest = 0 = none-input -->
          <div class="item company">
            <!-- company -->
            <label>{{ language.Company[lang] }}</label>
            <input type="text" v-model="userInfo.company" />
          </div>
          <!-- cause = none-input - -->
        </div>
        <!-- --------------- user_ii----------------- -->
        <!-- <div class="userii" v-else> -->
        <!-- isFreezed  =  none-input  -->
        <!-- loan = 0 = none-input -->
        <!-- interest = 0 = none-input -->
        <!-- </div> -->
        <button class="submit-btn" @click="submit">
          {{ language.Submit[lang] }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { rules_1, rules_2, rules_phone } from "@/utils";

export default {
  data() {
    return {
      userInfo: {
        flag: "useri",
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
      // 验证信息存储中介 待验证
      userInfoTemp: {
        account: "", // 数据库中去验证
        ps1: "",
        ps2: "",
        mobile: "",
      },
      // // 参照格式
      // formatData: {
      //   account: "姓名拼音+数字|示例:yangxiang01",
      //   // loginId: "", // 账号输入即可
      //   loginPwd: "账号.p| 示例:yangxiang01.p",
      // },
    };
  },
  computed: mapState(["lottery", "language", "lang"]),
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
    /**
     * account validate : 字母+数字
     */
    vali_account() {
      console.log(this.userInfo.account);
      console.log(!rules_1(this.userInfo.account));
      // 这里取反怎么就思路混乱了呢
      if (rules_1(this.userInfo.account)) {
        this.tipMsg("info", this.language.Grapheme_Num[this.lang]); // "字母+数字"
        this.userInfo.account = "";
        return;
      }
      // 数据库中查找去重
      this.accountIsUseable();
    },
    /**
     * name validate : 字母/汉字
     */
    vali_name() {
      // console.log(rules_2(this.userInfo.name))
      if (!rules_2(this.userInfo.name)) {
        this.tipMsg("info", this.language.GraphemeOrChinese[lang]); //"英文字母 或者 中文汉字"
        this.userInfo.name = "";
        return;
      }
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
      console.log("is repeat ? to db valiable .");
      const userr = await this.$store.dispatch("queryUser", {
        account: this.userInfoTemp.account,
        flag: this.userInfo.flag,
      });
      if (userr) {
        // alert("该账号已被注册，请重新填写！");
        this.tipMsg("warn", this.language.AlreadyRegister[this.lang]); // "该账号已被注册，请重新填写！"
        this.userInfoTemp.account = "";
        this.userInfoTemp.ps1 = "";
        this.userInfoTemp.ps2 = "";
        return;
      }
      // 验证通过，赋值
      this.userInfo.account = this.userInfoTemp.account; //
      this.userInfo.loginId = this.userInfoTemp.account; //
    },
    //   密码确认
    rules_passwordConfirme() {
      if (this.userInfoTemp.ps1 !== this.userInfoTemp.ps2) {
        this.tipMsg("warn", this.language.PswDifferent[this.lang]); // 密码不一致,请重新填写！
        this.userInfoTemp.ps1 = "";
        this.userInfoTemp.ps2 = "";
        return;
      }
      // return this.userInfoTemp.ps2;
      this.userInfo.loginPwd = this.userInfoTemp.ps2;
    },
    //   联系电话 验证(规则:1开头，11位数)
    rules_mobile() {
      // console.log(rules_phone(this.userInfoTemp.mobile))
      if (rules_phone(this.userInfoTemp.mobile)) {
        this.userInfo.mobile = this.userInfoTemp.mobile;
      } else {
        this.tipMsg("warn", this.language.PhoneError[this.lang]); // 电话号码有问题，请重新填写
        this.userInfoTemp.mobile = "";
        return;
      }
    },
    // 提交按钮
    async submit() {
      console.log(this.userInfo, this.userInfoTemp);

      if (this.userInfo.flag === "useri") {
        // ================ useri to register=====================
        console.log("register : I");
        // 判空验证
        if (
          !this.userInfo.account ||
          !this.userInfo.loginPwd ||
          !this.userInfo.name ||
          !this.userInfo.sex ||
          !this.userInfo.birthday ||
          !this.userInfo.job ||
          !this.userInfo.mobile ||
          !this.userInfo.company
        ) {
          // alert("value is Miss of user i");
          this.tipMsg("error", this.language.MissValue[this.lang]);
          return;
        }

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
          isFreezed: false,
          loan: 0,
          interest: 0,
          limited: true,
          cause: null,
          ident: 1,
          flag: "useri",
        };

        console.log("添加前确认", userIObj);
        // write to db

        try {
          const user = await this.$store.dispatch("adduser", userIObj);
          // alert("adduser I done ");
          this.tipMsg("success", this.language.AddDone_I[this.lang]);

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

        // =========== userii to register ==================
      } else if (this.userInfo.flag === "userii") {
        console.log("register : II");

        // 判空验证
        if (
          !this.userInfo.account ||
          !this.userInfo.loginPwd ||
          !this.userInfo.name ||
          !this.userInfo.sex ||
          !this.userInfo.birthday ||
          !this.userInfo.job ||
          !this.userInfo.mobile
        ) {
          // alert("value is Miss of user i");
          this.tipMsg("error",this.language.MissValue[this.lang]);
          return;
        }

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
          isFreezed: false,
          interest: 0,
          deposit: 0, // II
          flag: "userii",
        };

        // write to db

        try {
          const user = await this.$store.dispatch("adduser", userIIObj);
          // alert("adduser II done ");
          this.tipMsg("success", this.language.AddDone_II[this.lang]);
          this.lottery.auth = true; // 赋予一次抽奖的机会

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
    /**
     * 消息提示
     */
    tipMsg(type, msg) {
      this.$showMessage({
        content: msg, //successMsg
        type: type,
        duration: 1000,
        container: this.$refs.from,
        callback: () => {
          this.isSubmiting = false;
          // this.clearInput();
        },
      });
    },
  },
  watch: {
    "userInfo.flag"(oldV, newV) {
      console.log("watch", oldV, newV);
      this.accountIsUseable(); //用户改变flag后重新进行验证，防止用户耍滑，(即使混过去了也进入不了数据库)
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
@import "./index.less";
</style>