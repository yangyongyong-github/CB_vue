<template>
  <div class="useri-container">
    <!-- 顶部覆盖登录选择区域的提示 -->
    <TopTip IconType="qq" tipText="贷款，让财富成倍增长~" />

    <header>
      <!-- header：基础信息部分 -->
      <div class="title">User_I Center</div>
      <!-- 基础信息 -->
      <div class="user-data-base tit">
        <div class="user-name">{{ userName }}</div>
        <div class="user-sex">{{ userSex === "true" ? "男" : "女" }}</div>
        <div class="user-age">年龄 {{ userAge }} 岁</div>
        <div class="user-job">职业：{{ userJob }}</div>
        <div class="user-mobile">电话：{{ userMobile }}</div>
        <div class="user-company">公司：{{ userCompany }}</div>
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

      <!-- 用户贷款信息 -->
      <div class="user-loan tit">
        <!-- 贷款额度总计 -->
        <div class="user-loan">贷款总额-本金:{{ userLoan }}元</div>
        <!-- 贷款利息总结 -->
        <div class="user-interest">贷款总额-利息:{{ userInterest }}元</div>
        <div>本息共计{{ loanTotal }}</div>
        <div>上次贷款类别：</div>
        <!-- 上次贷类别:1个人2企业 -->
        <div class="user-ident">{{ userIdent === 1 ? "个人" : "企业" }}</div>
        <div>上次贷款原因：</div>
        <!-- 这里由于db存储原因，只能存储最近的一次 -->
        <div class="user-cause">{{ userCause }}</div>

        <!-- 还款日期,还剩多少天 -->
        <!-- 是否拖欠还款, 未还款,不予续贷 -->
      </div>
    </header>

    <!-- ============================================== -->
    <div class="work-category">
      请选择办理业务类型:
      <span>
        <label
          >贷款
          <input
            type="radio"
            name="workCategory"
            v-model="serCategory"
            value="loan"
          />
        </label>
      </span>
      <span>
        <label>还款</label>
        <input
          type="radio"
          name="workCategory"
          v-model="serCategory"
          value="repay"
        />
      </span>
    </div>
    <!-- ======================loan====================-->
    <!-- 一、对应的办理内容 -->
    <div class="work-content">
      <!-- 借款loan -->
      <div class="ser-loan" v-if="this.serCategory === 'loan'">
        <!-- 二（二）续贷工作区 -->
        <div class="loanWork">
          <!-- 1. 类型选择 -->
          <h3>loan page</h3>
          <div class="loan">
            <div class="short">
              <input
                type="radio"
                name="loan_category"
                value="short"
                v-model="loanFormData.loan_category"
              />
              <div class="title">短期：</div>
              <div class="time">时间：1-3years</div>
              <div class="rate">
                利息：<span>{{ rateFormData.short }}</span>
              </div>
            </div>

            <div class="middle">
              <input
                type="radio"
                name="loan_category"
                value="middle"
                v-model="loanFormData.loan_category"
              />
              <div class="title">中期：</div>
              <div class="time">时间：3-5</div>
              <div class="rate">
                利息：<span>{{ rateFormData.middle }}</span>
              </div>
            </div>

            <div class="long">
              <input
                type="radio"
                name="loan_category"
                value="long"
                v-model="loanFormData.loan_category"
              />
              <div class="title">长期：</div>
              <div class="time">时间：>5 yrears</div>
              <div class="rate">
                利息：<span>{{ rateFormData.long }}</span>
              </div>
            </div>
          </div>
          <!-- 2. 用户输入续贷金额 -->
          <div>
            <label> 续贷金额:(单位：元) </label>
            <input
              type="number"
              v-model="loanFormData.inputNumber"
              @blur="rules & computed_interest"
            />

            <label> 续贷年限(单位：年): </label>
            <input
              type="number"
              v-model="loanFormData.inputYear"
              @blur="rules"
            />

            <label class="year-tip"> (小数时，自动向上取整)</label>
          </div>
          <!-- 3. 计算本息 -->
          <div>
            本息贷款利息为 <label>{{ loanFormData.interest }}</label>

            确定开始本此贷款？

            <button @click="loanWorking" :disabled="isSubmiting">
              {{ isSubmiting ? "提交中..." : "提交" }}
            </button>
          </div>
          <!-- 4. 异步执行还款操做 -->
        </div>
      </div>
      <!-- =========================== repay ======================= -->
      <div class="ser-repay" v-else>
        <!-- 二（一）、还款工作区 -->
        <div class="repay">
          <h3>repay page</h3>
          本此偿还<input
            type="number"
            v-model="repayData.number"
            @blur="rules"
          />
          元
          <!-- {isSubmiting?disabled:none} -->

          <button @click="repayWorking" :disabled="isSubmiting">
            {{ isSubmiting ? "提交中..." : "提交" }}
          </button>
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

export default {
  data() {
    return {
      // 从localStorage中获取已登录用户的各种信息

      //  <!-- 基础信息 -->
      userName: localStorage.getItem("useri-name"),
      userSex: localStorage.getItem("useri-sex"),
      userAge: localStorage.getItem("useri-age"),
      userJob: localStorage.getItem("useri-job"),
      userMobile: localStorage.getItem("useri-mobile"),
      userCompany: localStorage.getItem("useri-company"),

      //  <!-- 业务信息 -->
      userCage: localStorage.getItem("useri-cage"),
      userAccount: localStorage.getItem("useri-account"),
      userLoginId: localStorage.getItem("useri-loginId"),

      // <!-- 用户贷款信息 -->
      userLoan: localStorage.getItem("useri-loan"),
      userInterest: localStorage.getItem("useri-interest"),
      userIdent: localStorage.getItem("useri-ident"),
      userCause: localStorage.getItem("useri-cause"),
      // 用户控制信息
      userLimited: localStorage.getItem("useri-limited"),
      userFreezed: localStorage.getItem("useri-freezed"),

      // 利率数据表
      rateFormData: {
        A: rateData.A, // 大额存款起薪
        B: rateData.B, // 中额存款起薪
        C: rateData.C, // 大额贷款 限制标准数值
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

      // 用户选择的服务类型：loan ? repay
      serCategory: "loan", // 默认值

      // 还款数据对象
      repayData: {
        number: 0,
      },

      // 续贷数据(用户输入的数据)
      loanFormData: {
        // loan_category: "", // 用户选择的 贷款利率类型，初始为空，需要用户选择
        loan_category: "short", // 这里给个默认的比较好，如果用户不选，将出现NaN的bug
        inputNumber: "",
        inputYear: "",
        // 通过用户输入的信息，计算后的数据
        interest: 0,
        total: 0,
      },

      // 还款确认按钮
      isSubmiting: false,
    };
  },

  // computed: mapState("useriloginUser", ["data", "isLoading"]),
  components: {
    Icon,
    TopTip,
  },
  computed: {
    // 本息共计，每次通过计算获得
    loanTotal() {
      return DecimalPos(+this.userLoan + +this.userInterest, 2);
    },
    // 计算贷款利息
    loanInterest() {
      const loanYear = Math.ceil(this.loanFormData.inputYear); // 贷款时间，向上取整
      const result =
        (this.loanFormData.inputNumber *
          loanYear *
          this.rateFormData[this.loanFormData.loan_category]) /
        100;
      return DecimalPos(result, 2); //保留2位小数
    },
  },
  methods: {
    // 验证规则(repay&loan 同时验证，同一时间满足一个即可)
    rules() {
      // 正数
      if (this.repayData.number <= 0 && this.loanFormData.inputNumber <= 0) {
        // 1. 数字，正数
        this.repayData.number = 0;
        this.loanFormData.inputNumber = 0;
        // 无效数字，不做任何操做
        return;
      }

      // 2. repay <= loan
      if (+this.repayData.number > this.loanTotal) {
        alert("还多啦！(还款数超过了贷款数)");
        this.repayData.number = "";
        return;
      }

      // 贷款时间匹配判断
      if (
        (this.loanFormData.loan_category === "long" &&
          this.loanFormData.inputYear < 5) || // loan year < 5 选择了long
        (this.loanFormData.loan_category === "middle" &&
          this.loanFormData.inputYear > 5 &&
          this.loanFormData.inputYear < 3) || // loan year > 5 选择了 middle
        (this.loanFormData.loan_category === "short" &&
          this.loanFormData.inputYear > 3) // year > 3 选择了 short
      ) {
        alert("贷款和利率的年限不匹配！");
        this.loanFormData.inputYear = ""; // 清空时间即可，让用户重现填写
        return;
      }

      // 3. loan >= 大额贷款限制限制
      if (
        this.loanTotal + +this.loanFormData.inputNumber >=
          this.rateFormData.C &&
        this.userLimited
      ) {
        alert(
          "您贷款超过了银行的贷款限制数额，亲联系管理员为您开通【大额贷款限制】"
        );
        this.loanFormData.inputNumber = "";
        // this.loanFormData.interest = 0;
        return;
      }

      return "passRules";
    },

    computed_interest() {
      // 用户输入金额(失去焦点时，自动计算利息)
      this.loanFormData.interest = this.loanInterest; // call computed
    },

    /**
     * 完成提示消息
     * Assit_func show Message
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
          // 清空用户输入的 inputNumber
          this.repayData.number = "";
          this.loanFormData.inputNumber = "";
          (this.loanFormData.inputYear = ""),
            // 清空 计算的利息
            (this.loanFormData.interest = 0);
        },
      });
    },

    // loan main func
    async loanWorking() {
      // 先要通过input框中的验证
      if (this.rules() !== "passRules") {
        alert("输入框未通过验证！");
        // return; //会导致刷新页面(用户登录的信息全部消失)
        // 清空即可

        this.loanFormData.inputNumber = "";
      }
      this.isSubmiting = true; // 正在提交，防止重复点击
      this.loanFormData.interest = this.loanInterest;
      // console.log(
      //   "本此贷款：",
      //   this.loanFormData.inputNumber,
      //   "利息为：",
      //   this.loanInterest
      // );
      this.tip(); // showMesage
    },

    // 点击按钮进行还款
    // repay main func
    async repayWorking() {
      // 先要通过input框中的验证
      if (this.rules() !== "passRules") {
        alert("输入框未通过验证！");
        // return;
        this.repayData.number = "";
      }

      this.isSubmiting = true; // 正在提交，防止重复点击
      console.log("本此还款：", this.repayData.number);

      /**
       * > 异步执行还款操做
       * -  拿到LocalStorage值,
       * -  计算,
       * -  并写入localStorage，
       * -  以及提交到数据库中
       */

      /**
      *  button click 事件：
      *   - 点击一次后 再次点击无效
      *         样式：灰色 或者
      *         显示加载中的效果
      * 
          - 弹出提示页面：偿还成功 
          - 清空输入框
          - 基本信息栏中的数据重新获取和页面显示———— 刷新页面 无需登录的前提下

          参照 components / MessategoryArea 
      */
      this.tip();
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";
@import "./style.less";
@import "~@/styles/user.less";
</style>