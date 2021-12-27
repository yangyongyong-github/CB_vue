<template>
  <div class="home-container">
    <h2>Home</h2>
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
    <!-- ==============================loan=============================================================== -->
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
            <label> 用户输入续贷金额: </label>
            <input
              type="number"
              v-model="loanFormData.inputNumber"
              @blur="rules & computed_interest"
            />
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
      <!-- ================================== repay=========================================================== -->
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
// import { getRate } from "@/initLoadData";
import { rate as rateData } from "@/store/temp";
import { DecimalPos } from "@/utils";

export default {
  data() {
    return {
      // 利率数据表
      rateFormData: {
        A: rateData.A, // 大额存款起薪
        B: rateData.B, // 中额存款起薪
        C: rateData.C,
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

      // 办理业务类型
      serCategory: "loan", // 默认值

      // 还款数据对象
      repayData: {
        number: 0,
      },

      // 续贷数据(用户输入的数据)
      loanFormData: {
        loan_category: "", // 用户选择的 贷款利率类型，初始为空，需要用户选择
        inputNumber: "",
        // 通过用户输入的信息，计算后的数据
        interest: 0,
        total: 0,
      },

      // 还款确认按钮
      isSubmiting: false,
    };
  },
  computed: {
    // 计算贷款利息
    loanInterest() {
      const result =
        (this.loanFormData.inputNumber *
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

      // 2. 偿还和总额小于贷款本息
      // if(){}

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
          // 清空 计算的利息
          this.loanFormData.interest = 0;
        },
      });
    },

    // loan main func
    async loanWorking() {
      // 先要通过input框中的验证
      if (this.rules() !== "passRules") {
        alert("输入框未通过验证！");
        return;
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
        return;
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
@import "./style.less";
@import "~@/styles/mixin.less";
</style>