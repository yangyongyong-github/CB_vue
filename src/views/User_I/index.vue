<template>
  <div class="useri-container">
    <!-- 顶部覆盖登录选择区域的提示 -->
    <TopTip IconType="rise" tipText="贷款，让财富成倍增长~" />
    <header>
      <!-- header：基础信息部分 -->
      <div class="page-title">User_I Center</div>
      <!-- 基础信息 -->
      <div class="user-data-base tit">
        <div class="user-name">
          <span class="guide">Name: </span> {{ userData.name }}
        </div>
        <div class="user-sex">
          <span class="guide">Gender : </span>
          {{ userData.sex === "true" ? "男" : "女" }}
        </div>
        <div class="user-age">
          <span class="guide">Age : </span>
          {{ userData.age }}
        </div>
        <div class="user-job">
          <span class="guide"> 职业: </span>
          {{ userData.job }}
        </div>
        <div class="user-mobile">
          <span class="guide"> 联系电话: </span>{{ userData.mobile }}
        </div>
        <div class="user-company">
          <span class="guide"> 单位/公司: </span> {{ userData.company }}
        </div>
      </div>

      <!-- 业务信息 -->
      <div class="user-data-account tit">
        <!-- 身份 loan ? deposit -->
        <div class="user-cage">
          <span class="guide"> 用户类别: </span> {{ userData.flag }}
          {{ userData.flag === "useri" ? "贷款" : "存款" }}用户
        </div>
        <div class="user-account">
          <span class="guide">账号 : </span> {{ userData.account }}
        </div>
        <div class="user-login-id">
          <span class="guide"> LoginID : </span>
          {{ userData.loginId }}
        </div>
      </div>

      <!-- 用户贷款信息 -->
      <div class="user-loan tit">
        <!-- 贷款额度总计 -->
        <div class="user-loan-num">
          <span class="guide"> 贷款总额-本金: </span> {{ userData.loan }}元
        </div>
        <!-- 贷款利息总结 -->
        <div class="user-interest">
          <span class="guide"> 贷款总额-利息: </span>{{ userData.interest }}元
        </div>
        <div><span class="guide"> 本息共计: </span>{{ loanTotal }}</div>
        <div><span class="guide"> 上次贷款类别 : </span></div>
        <!-- 上次贷类别:1个人2企业 -->
        <div class="user-ident">
          {{ userData.ident === 1 ? "个人" : "企业" }}
        </div>
        <div>
          <span class="guide"> 上次贷款原因: </span>
        </div>
        <!-- 这里由于db存储原因，只能存储最近的一次 -->
        <div class="user-cause">{{ userData.cause }}</div>

        <!-- 有待扩展 -->
        <!-- 还款日期,还剩多少天 -->
        <!-- 是否拖欠还款, 未还款,不予续贷 -->
      </div>
    </header>

    <div class="workarea">
      <p class="work-tit">用户服务办理区域</p>

      <div class="modal" v-show="userData.isFreezed">
        <Modal Height='190%' text="您的账户已被管理员冻结！"> </Modal>
      </div>

      <div class="work-category">
        请选择办理业务类型:
        <div>
          <label
            >贷款
            <input
              type="radio"
              name="workCategory"
              v-model="serCategory"
              value="loan"
            />
          </label>
        </div>
        <div>
          <label>还款</label>
          <input
            type="radio"
            name="workCategory"
            v-model="serCategory"
            value="repay"
          />
        </div>
      </div>

      <!-- 一、对应的办理内容 -->
      <div class="work-content">
        <!-- 借款loan -->
        <div class="ser-loan" v-if="this.serCategory === 'loan'">
          <!-- 贷款身份选择 -->
          <div class="info-select" style="height: 200px">
            <div class="ident-category">
              请选择身份类型:
              <div>
                <label
                  >个人
                  <input
                    type="radio"
                    name="identCategory"
                    v-model="loanFormData.ident"
                    value="1"
                  />
                </label>
              </div>
              <div>
                <label>企业</label>
                <input
                  type="radio"
                  name="identCategory"
                  v-model="loanFormData.ident"
                  value="2"
                />
              </div>
            </div>
            <div class="cause-input">
              请填写贷款原因:
              <span class="tip">不少于5个字符</span>
              <textarea
                cols="30"
                rows="5"
                v-model="loanFormData.cause"
                @blur="causeValidate"
              ></textarea>
            </div>
            <div class="company-input" v-show="loanFormData.ident === '2'">
              <!-- 1 个人 2 企业 -->
              <a-icon type="check-circle" /> 请填写
              {{ userData.ident === 1 ? "个人" : "企业" }} 单位(公司)名称:
              <input type="text" v-model="loanFormData.company" />
            </div>
          </div>
          <!-- 二（二）续贷工作区 -->
          <div class="loan-work">
            <!-- 1. 类型选择 -->
            <!-- <h3>loan page</h3> -->
            <p>请选择贷款利率类型:</p>
            <div class="loan">
              <div class="short">
                <input
                  type="radio"
                  name="loan_category"
                  value="short"
                  v-model="loanFormData.loan_category"
                />
                <div class="title">短期(1-3)</div>

                <div class="rate">
                  利息：<span>{{ rateData.L_s }}</span>
                </div>
              </div>

              <div class="middle">
                <input
                  type="radio"
                  name="loan_category"
                  value="middle"
                  v-model="loanFormData.loan_category"
                />
                <div class="title">中期(3-5)</div>

                <div class="rate">
                  利息：<span>{{ rateData.L_m }}</span>
                </div>
              </div>

              <div class="long">
                <input
                  type="radio"
                  name="loan_category"
                  value="long"
                  v-model="loanFormData.loan_category"
                />
                <div class="title">长期(>5)</div>

                <div class="rate">
                  利息：<span>{{ rateData.L_l }}</span>
                </div>
              </div>
            </div>
            <!-- 2. 用户输入续贷金额 -->
            <div class="item">
              <label> 续贷金额:(单位：元) </label>
              <input
                type="number"
                v-model="loanFormData.inputNumber"
                @blur="rules & computed_interest"
              />
            </div>
            <div class="item">
              <label> 续贷年限(单位：年): </label>
              <input
                type="number"
                v-model="loanFormData.inputYear"
                @blur="rules"
              />
              <label class="year-tip"> (小数时，自动向上取整)</label>
            </div>

            <!-- 3. 计算本息 -->
            <div class="item">
              <span style="margin-right: 20px"
                >本息贷款利息为:{{ loanFormData.interest }}</span
              >
              <b>确定开始本此贷款？</b>
            </div>
            <p style="text-align: center">
              <button @click="loanWorking" :disabled="isSubmiting">
                {{ isSubmiting ? "提交中..." : "提交" }}
              </button>
            </p>
            <!-- 4. 异步执行还款操做 -->
          </div>
        </div>
        <!-- =========================== repay ======================= -->
        <div class="ser-repay" v-else>
          <!-- 二（一）、还款工作区 -->
          <div class="repay">
            <p><b>本此偿还</b></p>

            <input type="number" v-model="repayData.number" @blur="rules" />
            元
            <!-- {isSubmiting?disabled:none} -->
            <div style="margin-top: 10px; padding-left: 30%">
              <button @click="repayWorking" :disabled="isSubmiting">
                {{ isSubmiting ? "提交中..." : "提交" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TopTip from "@/components/TopTip";
import Modal from "@/components/Modal";
import { DecimalPos } from "@/utils";

export default {
  data() {
    return {
      serCategory: "loan", // 默认值, 用户选择的服务类型：loan ? repay

      // 还款数据对象
      repayData: {
        number: 0,
      },
      // 续贷数据(用户输入的数据)
      loanFormData: {
        loan_category: "short", // 这里给个默认的比较好，如果用户不选，将出现NaN的bug
        inputNumber: "",
        inputYear: "",
        // 通过用户输入的信息，计算后的数据
        interest: 0,
        total: 0,
        // other info
        ident: 1,
        cause: "",
        company: "",
      },
      isSubmiting: false, // 还款确认按钮
    };
  },
  components: {
    TopTip,
    Modal,
  },
  computed: {
    ...mapState({
      userData: (state) => state.userData,
      rateData: (state) => state.rateData,
    }),
    // 本息共计，每次通过计算获得
    loanTotal() {
      return DecimalPos(+this.userData.loan + +this.userData.interest, 2);
    },
    // 计算贷款利息
    loanInterest() {
      const loanYear = Math.ceil(+this.loanFormData.inputYear); // 贷款时间，向上取整

      /**
       * 根据用户输入的类型，得出相应的利率
       */
      var rateVlaue = 0;
      if (this.loanFormData.loan_category === "short") {
        rateVlaue = this.rateData.L_s;
      } else if (this.loanFormData.loan_category === "middle") {
        rateVlaue = this.rateData.L_m;
      } else if (this.loanFormData.loan_category === "long") {
        rateVlaue = this.rateData.L_l;
      } else {
        rateVlaue = 1;
      }

      const result =
        (+this.loanFormData.inputNumber * +loanYear * +rateVlaue) / 100;

      return DecimalPos(result, 2); //保留2位小数
    },
  },
  methods: {
    /**
     *  loan validate - 验证 cause 数据是否大于5个字符
     */
    causeValidate() {
      if (this.loanFormData.cause === null) {
        alert("please input cause !");
        return;
      } else if (this.loanFormData.cause.length < 5) {
        alert("Cause mist be more five !");
        return;
      }
    },
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

      // loan run validate
      if (this.serCategory === "loan") {
        // indent === 2 & company
        if (this.loanFormData.ident == 2 && this.loanFormData.company === "") {
          alert("please input company name !");
          return;
        }

        // cause
        if (this.loanFormData.cause === null) {
          alert("please input cause !");
          return;
        } else if (this.loanFormData.cause.length < 5) {
          alert("Cause mist be more five !");
          return;
        }
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
        this.loanTotal + +this.loanFormData.inputNumber >= this.rateData.C &&
        this.userLimited
      ) {
        alert(
          "您贷款超过了银行的贷款限制数额，请联系管理员为您开通【大额贷款限制】"
        );
        this.loanFormData.inputNumber = "";
        return;
      }

      return "passRules";
    },

    computed_interest() {
      // 用户输入金额(失去焦点时，自动计算利息)
      this.loanFormData.interest = this.loanInterest; // call computed
    },

    // loan main func
    async loanWorking() {
      // 先要通过input框中的验证
      if (
        this.rules() !== "passRules"
        // ||
        // this.companyValidate !== "company-pass" ||
        // this.causeValidate !== "cause-pass"
      ) {
        alert("输入框未通过验证！");
        this.loanFormData.inputNumber = "";
        //  console.log("test validate : ", this.companyValidate, this.causeValidate);
        return;
      }

      this.isSubmiting = true; // 正在提交，防止重复点击
      this.loanFormData.interest = this.loanInterest;

      console.log(
        `本此贷款 : ${this.loanFormData.inputNumber}, 本此利息为: ${this.loanFormData.interest}
        本此贷款身份类型: ${this.loanFormData.ident}, 
        原因:${this.loanFormData.cause}, 
        公司名称:${this.loanFormData.company}`
      );

      this.$store.commit("setUserIIdent", this.loanFormData.ident);
      this.$store.commit("setUserICause", this.loanFormData.cause);
      this.$store.commit("setUserICompany", this.loanFormData.company);

      this.$store.commit("setUserILoan", this.loanFormData.inputNumber);
      this.$store.commit("setUserInterest", this.loanFormData.inputNumber);

      // this.writeDB(); // write db
      this.prepareDB("loan");
    },

    // 点击按钮进行还款
    // repay main func
    async repayWorking() {
      // 先要通过input框中的验证
      if (this.rules() !== "passRules") {
        alert("输入框未通过验证！");
        this.repayData.number = "";
        // return;
      }

      // pass validate to repay
      this.isSubmiting = true; // 正在提交，防止重复点击

      /**
       * 1
       * status :  loan + interset > 还款额 > loan
       * resolve : 先用利息去削弱它
       */
      if (this.repayData.number > this.userData.loan) {
        // this.userData.interest=0; 先用利息去削弱它
        this.$store.commit("setUserInterest", 0); // 利息归0
        const loanValue = Math.abs(
          DecimalPos(
            this.userData.loan -
              (this.repayData.number - this.userData.interest),
            2
          )
        );

        this.$store.commit("setUserILoan", loanValue);
      } else if (
        this.repayData.number > this.userData.loan &&
        this.repayData.number < this.userData.interest
      ) {
        /**
         * 2
         * status : interset > 还款额 > loan (没有多少loan了，有很多利息需要偿还)
         * resolve : loanTotal - 还款额， 然后把剩余的钱全部存到Loan中(把interest->loan)
         */
        const loanValue = Math.abs(
          DecimalPos(this.loanTotal - this.repayData.number, 2)
        );
        this.$store.commit("setUserInterest", 0); // 利息归0
        this.$store.commit("setUserILoan", loanValue);
      } else {
        /**
         * 3 还款额 < loan , 绝大部分情况
         */
        const loanValue = Math.abs(
          DecimalPos(this.userData.loan - this.repayData.number, 2)
        );
        this.$store.commit("setUserILoan", loanValue);
      }

      console.log("本此还款：", this.repayData.number);

      // this.writeDB(); // write db
      this.prepareDB("repay");
    },

    /**
     * 1. from store get data
     *  @type: loan / repay
     */
    async prepareDB(type) {
      // 续贷
      if (type === "loan") {
        /**
         * loan
         * loan  interest + cause ident company
         */
        const userObj = {
          loginId: this.userData.loginId,
          loan: this.userData.loan,
          interest: this.userData.interest,
          cause: this.userData.cause,
          company: this.userData.company,
          ident: this.userData.ident,
          flag: this.userData.flag,
        };
        await this.writeDB(userObj);
      } else if (type === "repay") {
        // 还款
        /**
         * repay
         * deposit interest
         */
        const userObj = {
          loginId: this.userData.loginId,
          loan: this.userData.loan,
          interest: this.userData.interest,
          flag: this.userData.flag,
        };
        await this.writeDB(userObj);
      }
    },

    /**
     *  2. 写入db
     * @ userObj: loan/repay 传递不同的参数信息
     */
    async writeDB(userObj) {
      try {
        await this.$store.dispatch("updata", userObj);
        this.tip(); // showMesage
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * tip func
     */
    // 清空用户输入的 inputNumber
    clearInput() {
      // repay
      this.repayData.number = "";
      this.loanFormData.inputNumber = "";
      this.loanFormData.inputYear = "";
      // loan extra
      this.loanFormData.cause = "";
      this.loanFormData.ident = 1;
      this.loanFormData.company = "";
      // 清空 计算的利息
      this.loanFormData.interest = 0;
    },
    tip() {
      this.$showMessage({
        content: "完成！", //successMsg
        type: "success",
        duration: 1000,
        container: this.$refs.from,
        callback: () => {
          this.isSubmiting = false;
          this.clearInput();
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "./self-style.less";
</style>