<template>
  <div class="useri-container">
    <!-- 顶部覆盖登录选择区域的提示 -->
    <TopTip IconType="qq" tipText="存款，啦啦啦~" />

    <header>
      <!-- header：基础信息部分 -->
      <div class="title">userii_loginUser Center</div>

      <p class="work-tit">用户基本信息</p>

      <!-- 基础信息 -->
      <div class="user-data-base tit">
        <div class="user-name">{{ userName }}</div>
        <div class="user-sex">{{ userSex === "true" ? "男" : "女" }}</div>
        <div class="user-age">年龄 {{ userAge }} 岁</div>
        <div class="user-job">职业：{{ userJob }}</div>
        <div class="user-mobile">电话：{{ userMobile }}</div>
      </div>

      <!-- 业务信息 -->
      <div class="user-data-account tit">
        <!-- 身份 loan ? deposit -->
        <div class="user-cage">
          用户类别: {{ userCage }} {{ userCage === "I" ? "贷款" : "存款" }}用户
        </div>
        <div class="user-account">账号:{{ userAccount }}</div>
        <div class="user-login-id">LoginId：{{ userLoginId }}</div>
      </div>

      <!-- 用户存款信息 -->
      <div class="user-deposit tit">
        <!-- 存款额度总计 -->
        <div class="user-deposit">存款总额-本金:{{ userDeposit }}元</div>
        <!-- 存款利息总结 -->
        <div class="user-interest">存款总额-利息:{{ userInterest }}元</div>
        <div>本息共计{{ depositTotal }}</div>
      </div>
    </header>
    <!-- ==================workarea======================== -->
    <!-- 用于动态的提示 是否冻结，只能并行，如果包含会导致 被套在Modal组件之间的数据不会渲染 -->
    <div class="workarea">
      <p class="work-tit">用户服务办理区域</p>
      <div class="modal" v-show="false">
        <Modal text="您的账户已被管理员冻结！"> </Modal>
        <!-- { userFreezed } -->
      </div>

      <div class="work-category">
        请选择办理业务类型:

        <div>
          <label
            >存款
            <input
              type="radio"
              name="workCategory"
              v-model="serCategory"
              value="deposit"
            />
          </label>
        </div>
        <div>
          <label>取款</label>
          <input
            type="radio"
            name="workCategory"
            v-model="serCategory"
            value="take"
          />
        </div>
      </div>
      <!-- =================deposit========================== -->

      <!-- 一、对应的办理内容 -->
      <div class="work-content">
        <div v-if="this.serCategory === 'deposit'">
          <!-- deposit -->
          <div class="depositWork">
            <!-- 1. 类型选择 -->
            <h3>deposit page</h3>
            <div class="deposit">
              <!-- 大额存款表头 -->
              <div>
                <div class="head-tip">
                  <div class="tit">大额存款</div>
                  <div class="start">起存金额(元) {{ rateFormData.A }}</div>
                </div>

                <hr />
              </div>
              <!-- 大额存款 表体 -->
              <div class="short">
                <input
                  type="radio"
                  name="deposit_category"
                  value="A_1"
                  v-model="depositFormData.deposit_category"
                />
                <div class="title">短期：</div>
                <div class="time">时间：1-3years</div>
                <div class="rate">
                  利息：<span>{{ rateFormData.A_1 }}</span>
                </div>
              </div>

              <div class="long">
                <input
                  type="radio"
                  name="deposit_category"
                  value="A_3"
                  v-model="depositFormData.deposit_category"
                />
                <div class="title">中长期：</div>
                <div class="time">时间：>=3 yrears</div>
                <div class="rate">
                  利息：<span>{{ rateFormData.A_3 }}</span>
                </div>
              </div>

              <!-- 中额存款表头 -->
              <div>
                <div class="head-tip mt-15">
                  <div class="tit">中额存款</div>
                  <div class="start">起存金额(元) {{ rateFormData.B }}</div>
                </div>

                <hr />
              </div>

              <!-- 中额存款表体 -->
              <div class="short">
                <input
                  type="radio"
                  name="deposit_category"
                  value="B_1"
                  v-model="depositFormData.deposit_category"
                />
                <div class="title">短期：</div>
                <div class="time">时间：1-3years</div>
                <div class="rate">
                  利息：<span>{{ rateFormData.B_1 }}</span>
                </div>
              </div>

              <div class="long">
                <input
                  type="radio"
                  name="deposit_category"
                  value="B_3"
                  v-model="depositFormData.deposit_category"
                />
                <div class="title">中长期：</div>
                <div class="time">时间：>=3 yrears</div>
                <div class="rate">
                  利息：<span>{{ rateFormData.B_3 }}</span>
                </div>
              </div>
              <hr />
              <!-- 其他存款 -->
              <div class="middle mt-15">
                <input
                  type="radio"
                  name="deposit_category"
                  value="other"
                  v-model="depositFormData.deposit_category"
                />
                <div class="title">其他</div>
                <div class="time">时间：不限</div>
                <div class="rate">利息：无</div>
              </div>
            </div>
            <!-- 2. 用户输入存款金额 -->
            <div class="user-input">
              <span class="part">
                <label> 存款金额(单位：元): </label>
                <input
                  type="number"
                  v-model="depositFormData.inputNumber"
                  @blur="rules_depoNum"
                />
              </span>

              <span class="part">
                <label> 相应的存款时间(单位：年): </label>

                <input
                  type="number"
                  class="year"
                  v-model="depositFormData.inputYear"
                  @blur="rules_depoYear"
                />

                <label class="year-tip"> (小数时，向下取整)</label>
              </span>
            </div>
            <!-- 3. 计算本息 -->
            <div class="part">
              本此存款利息为
              <label>{{ depositFormData.interest }}</label>
            </div>
            <div class="confirme">
              确定开始本此存款？
              <button @click="depositWorking" :disabled="isSubmiting">
                {{ isSubmiting ? "提交中..." : "提交" }}
              </button>
            </div>

            <!-- 4. 异步执行还款操做 -->
          </div>
        </div>
        <!-- ================================== take ================================ -->
        <div class="ser-take" v-else>
          <!-- 二（一）、take工作区 -->
          <div class="take">
            <h3>take page</h3>
            <div class="take-box">
              本此取款<input
                type="number"
                v-model="takeData.number"
                @blur="rules_take"
              />
              元
              <button @click="takeWorking" :disabled="isSubmiting">
                {{ isSubmiting ? "提交中..." : "提交" }}
              </button>
            </div>

            <!-- {isSubmiting?disabled:none} -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
import TopTip from "@/components/TopTip";
import { rate as rateData } from "@/store/temp"; // rate临时配置变量
import { DecimalPos } from "@/utils";
import Modal from "@/components/Modal";

export default {
  inject: ["reload"], // 用户刷新界面
  data() {
    return {
      // 从localStorage中获取已登录用户的各种信息

      //  <!-- 基础信息 -->
      userName: localStorage.getItem("userii-name"),
      userSex: localStorage.getItem("userii-sex"),
      userAge: localStorage.getItem("userii-age"),
      userJob: localStorage.getItem("userii-job"),
      userMobile: localStorage.getItem("userii-mobile"),

      //  <!-- 业务信息 -->
      userCage: localStorage.getItem("userii-cage"),
      userAccount: localStorage.getItem("userii-account"),
      userLoginId: localStorage.getItem("userii-loginId"),

      // <!-- 用户存款信息 -->
      userDeposit: localStorage.getItem("userii-deposit"),
      userInterest: localStorage.getItem("userii-interest"),

      // 用户控制信息
      userFreezed: localStorage.getItem("userii-freezed"),

      // －－－－－－－－－－－－－－－－－
      // 利率数据表
      rateFormData: {
        A: rateData.A, // 大额存款起薪
        B: rateData.B, // 中额存款起薪
        C: rateData.C, // 大额存款 限制标准数值
        // deposit
        A_1: rateData.A_1, // 大额存1-3年
        A_3: rateData.A_3, // 大额 存>=3年
        B_1: rateData.B_1, //中额 1-3年
        B_3: rateData.B_3, // 中额 >= 3年
        // loan rate
        short: rateData.L_s, // 短期 1年
        middle: rateData.L_m, // 中期 1-3年
        long: rateData.L_l, // 长期 >3年
      },
      // -----------------------------------

      // 用户选择的服务类型：deposit ? take
      serCategory: "deposit", // 默认值

      // 取款数据对象
      takeData: {
        number: 0,
      },

      // 存款数据(用户输入的数据)
      depositFormData: {
        // deposit_category: "", // 用户选择的 存款利率类型，初始为空，需要用户选择
        deposit_category: "A_1", // A_1,A_3,B_1,B_3, other // 这里给个默认的比较好，如果用户不选，将出现NaN的bug
        inputNumber: "",
        inputYear: "",
        // 通过用户输入的信息，计算后的数据
        interest: 0,
        total: 0,
      },

      // 取款确认按钮
      isSubmiting: false,
    };
  },

  components: {
    Icon,
    TopTip,
    Modal,
  },
  computed: {
    // 本息共计，每次通过计算获得
    depositTotal() {
      return DecimalPos(+this.userDeposit + +this.userInterest, 2);
    },
    // 计算存款利息
    depositInterest() {
      // 用户选择的为 其他时(不带利息收益)
      if (this.depositFormData.deposit_category === "other") {
        return this.depositFormData.inputNumber;
      }
      // 大额、中额存款(带利息收益)
      const deposit_time = Math.floor(this.depositFormData.inputYear); // 年数先向下取整
      const result =
        (this.depositFormData.inputNumber *
          deposit_time *
          this.rateFormData[this.depositFormData.deposit_category]) /
        100;
      // console.log( this.rateFormData[this.depositFormData.deposit_category] )
      return DecimalPos(result, 2); //保留2位小数
    },
  },
  methods: {
    /**
     *Assist func:  当用户输入未通过验证时，全部清空重填
     */
    clearInput_take() {
      this.takeData.number = 0;
    },
    clearInput_deposit() {
      this.depositFormData.inputNumber = 0;
      this.depositFormData.inputYear = 0;
    },

    // -------------- 验证规则 -----------
    /**
     * Assist func: 金额的判定：正数(take&deposit 同时验证，同一时间满足一个即可)
     */
    /**
     * 基础输入验证：take
     */
    rules_base_take() {
      if (this.takeData.number <= 0) {
        alert("无效输入！");
        this.clearInput_take();
        return;
      }
      return "passRulesOfBase_take";
    },

    /**
     * 基础输入验证：deposit
     */
    rules_base_deposit() {
      if (
        this.depositFormData.inputNumber <= 0 ||
        this.depositFormData.inputYear <= 0
      ) {
        // 1. 数字，正数
        // this.clearInput_deposit();
        alert("缺失：金额或年份！");
        return;
      }
      return "passRulesOfBase_deposit";
    },

    /* deposit: 起存金额判断 */
    rules_depoNum() {
      // 1. 大额存款，起存金额不够
      if (
        (this.depositFormData.deposit_category === "A_1" ||
          this.depositFormData.deposit_category === "A_3") &&
        this.depositFormData.inputNumber < this.rateFormData.A
      ) {
        alert(`大额存款，起存金额：${this.rateFormData.A}`);
        this.clearInput_deposit();
        return;
      }

      // 2.中额存款，起存金额不够
      if (
        (this.depositFormData.deposit_category === "B_1" ||
          this.depositFormData.deposit_category === "B_3") &&
        this.depositFormData.inputNumber < this.rateFormData.B
      ) {
        alert(`中额存款，起存金额：${this.rateFormData.B}`);
        this.clearInput_deposit();
        return;
      }

      return "passRules_depoNum";
    },

    /**
     * deposit
     * 并行判定 + 类型和年限的匹配
     * -  是否 存款 数额和时间都有值
     * -  低利率类型可以存长时间，但是高利率类型不可以存短时间
     */
    rules_depoYear() {
      // 低利率类型可以存长时间，但是高利率类型不可以存短时间
      if (
        (this.depositFormData.deposit_category === "A_3" &&
          this.depositFormData.inputYear < 3) ||
        (this.depositFormData.deposit_category === "B_3" &&
          this.depositFormData.inputYear < 3)
      ) {
        alert("高利率类型不可以存短时间");
        this.depositFormData.inputYear = "";
        return;
      }

      return "passRules_depoYear";
    },

    /**
     * take
     */
    rules_take() {
      if (this.rules_base_take() !== "passRulesOfBase_take") {
        return;
      }
      // 2. take <= deposit
      if (+this.takeData.number > this.depositTotal) {
        alert("余额不足！");
        this.takeData.number = "";
        return;
      }
      return "passRules";
    },

    // 存款：验证规则统一整合验证
    rules_depo() {
      if (
        this.rules_base_deposit() !== "passRulesOfBase_deposit" ||
        this.rules_depoNum() !== "passRules_depoNum" ||
        this.rules_depoYear() !== "passRules_depoYear"
      ) {
        // this.clearInput_deposit();
        return;
      }

      return "passRules";
    },

    computed_interest() {
      // 用户输入金额(失去焦点时，自动计算利息)---- 目前只能是 用户点击后提交
      this.depositFormData.interest = this.depositInterest; // 将计算的利息赋值给用户的利息
    },

    /**
     * 完成提示消息
     * Assit_func : show Message
     */
    tip() {
      // this.$emit("submit", this.formData, (successMsg) => {
      /* */
      this.$showMessage({
        content: "完成！", //successMsg
        type: "success",
        duration: 1000,
        container: this.$refs.from,
        callback: () => {
          this.isSubmiting = false;
          this.clearInput_deposit();
          // 清空 计算的利息
          this.depositFormData.interest = 0;
          this.reload(); // 刷新页面
        },
      });
    },

    // deposit main func
    async depositWorking() {
      // 统一规则验证
      if (this.rules_depo() !== "passRules") {
        // alert("输入框未通过验证！");
        this.clearInput_deposit();
        return;
      }

      this.isSubmiting = true; // 正在提交，防止重复点击
      this.depositFormData.interest = this.depositInterest;

      // ---------------------------------------------------------
      // 1. 【先写入localStorage】

      // 1.1  deposit
      // 追加上之前的，而非直接替换
      const newDepositValue =
        +this.depositFormData.inputNumber + +this.userDeposit;
      const newInterestValue = DecimalPos(
        +this.depositFormData.interest + +this.userInterest,
        2
      );

      localStorage.setItem("userii-deposit", newDepositValue);
      localStorage.setItem("userii-interest", newInterestValue);

      console.log(
        `本此存款： ${this.depositFormData.inputNumber} ，本此存款利息：${this.depositFormData.interest},
        帐户最新存款共计：${newDepositValue} ，帐户最新利息共计：${newInterestValue}
       `
      );

      const userObj = {
        loginId: localStorage.getItem("userii-loginId"),
        deposit: newDepositValue,
        interest: newInterestValue,
      };

      // 【2. 再去写入db】
      try {
        await this.$store.dispatch("userii/updata", userObj);
        this.tip(); // showMesage
      } catch (error) {
        console.log(error);
      }
    },

    // ===============================================

    // take main func
    async takeWorking() {
      // 先要通过input框中的验证
      if (this.rules_take() !== "passRules") {
        // alert("输入框未通过验证！");
        return;
      }

      this.isSubmiting = true; // 正在提交，防止重复点击
      console.log("本此取款：", this.takeData.number);

      // 1.2 take
      // deposit < take < deposit + interest
      if (+this.takeData.number >= +this.userDeposit) {
        // console.log("deposit < take < deposit + interest");

        const newTakeValue = Math.abs(
          DecimalPos(
            +this.takeData.number - this.userDeposit - this.userInterest,
            2
          )
        );

        localStorage.setItem("userii-deposit", 0);
        localStorage.setItem("userii-interest", newTakeValue);
      } else {
        // take < deposit
        // console.log(" take < deposit");
        const newTakeValue = Math.abs(
          DecimalPos(+this.userDeposit - this.takeData.number, 2)
        );
        localStorage.setItem("userii-deposit", newTakeValue);
      }

      const userObj = {
        loginId: localStorage.getItem("userii-loginId"),
        deposit: localStorage.getItem("userii-deposit"),
        interest: localStorage.getItem("userii-interest"),
      };

      // 再去写入db
      try {
        await this.$store.dispatch("userii/updata", userObj);
        this.tip();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";
@import "./style.less";
@import "~@/styles/user.less";
.useri-container {
  width: 100%;
  min-width: 850px;
}
</style>