<template>
  <div class="useri-container">
    <!-- 顶部覆盖登录选择区域的提示 -->
    <TopTip IconType="rise" :tipText=language.TopTip_Loan[lang] />
    <header>
      <!-- header：基础信息部分 -->
      <div class="page-title">
        {{language.User_IPage[lang]}}
      </div>
      <!-- 基础信息: 组件化 -->
      <UserBaseInfo />
    </header>

    <div class="workarea">
      <p class="work-tit">
        <!-- 用户服务办理区域 -->
        {{ language.UserServerArea[lang] }}
      </p>

      <div class="modal" v-show="userData.isFreezed">
        <Modal Height="135%" :text=language.AccountBeenFreezed[lang]> </Modal>
      </div>

      <div class="work-category">
        <!-- 请选择办理业务类型 -->
        {{ language.SelectWorkCategory[lang] }}
        :
        <div>
          <label>
            <!-- 贷款 -->
            {{ language.Loan[lang] }}
            <input
              type="radio"
              name="workCategory"
              v-model="serCategory"
              value="loan"
            />
          </label>
        </div>
        <div>
          <label>
            <!-- 还款 -->
            {{ language.Repay[lang] }}
            <input
              type="radio"
              name="workCategory"
              v-model="serCategory"
              value="repay"
          /></label>
        </div>
      </div>

      <!-- 一、对应的办理内容 -->
      <div class="work-content">
        <!-- 借款loan -->
        <div class="ser-loan" v-if="this.serCategory === 'loan'">
          <!-- 贷款身份选择 -->
          <div class="info-select">
            <div class="ident-category">
              <!-- 请选择身份类型 -->
              {{ language.SelectIdentCategoty[lang] }}
              :
              <div>
                <label>
                  <!-- 个人 -->
                  {{ language.Person[lang] }}
                  <input
                    type="radio"
                    name="identCategory"
                    v-model="loanFormData.ident"
                    value="1"
                  />
                </label>
              </div>
              <div>
                <label>
                  <!-- 企业 -->
                  {{ language.Company[lang] }}
                  <input
                    type="radio"
                    name="identCategory"
                    v-model="loanFormData.ident"
                    value="2"
                /></label>
              </div>
            </div>
            <div class="cause-input">
              <!-- 请填写贷款原因 -->
              {{ language.LoanCause[lang] }}
              :
              <span class="tip">
                <!-- 不少于5个字符 -->
                ({{ language.MoreFiveCode[lang] }})
              </span>
              <textarea
                cols="30"
                rows="5"
                v-model="loanFormData.cause"
                @blur="causeValidate"
              ></textarea>
            </div>
            <div class="company-input" v-show="loanFormData.ident === '2'">
              <!-- 1 个人 2 企业 -->
              <!-- 请填写 -->
              {{ language.PleaseInput[lang] }}
              <!-- {{ userData.ident === 1 ? "个人" : "企业" }}  -->
              <!-- 单位(公司)名称 -->
              {{ language.Company[lang] }}
              {{ language.Name[lang] }}
              :
              <input type="text" v-model="loanFormData.company" />
            </div>
          </div>
          <!-- 二（二）续贷工作区 -->
          <div class="loan-work">
            <!-- 1. 类型选择 -->
            <!-- <h3>loan page</h3> -->
            <p>
              <!-- 请选择贷款利率类型 -->
              {{ language.RateCategory[lang] }}
              :
            </p>
            <div class="loan adjust">
              <div class="short">
                <input
                  type="radio"
                  name="loan_category"
                  value="short"
                  v-model="loanFormData.loan_category"
                />
                <div class="title">
                  <!-- 短期(1-3)年 -->
                  {{ language.Short[lang] }}(1-3){{ language.Year[lang] }}
                </div>

                <div class="rate">
                  <!-- 利息 -->
                  {{ language.Interest[lang] }}
                  :<span>{{ rateData.L_s }}%</span>
                </div>
              </div>

              <div class="middle">
                <input
                  type="radio"
                  name="loan_category"
                  value="middle"
                  v-model="loanFormData.loan_category"
                />
                <div class="title">
                  <!-- 中期(4-5)年 -->
                  {{ language.Middle[lang] }}
                  (4-5){{ language.Year[lang] }}
                </div>

                <div class="rate">
                  {{ language.Interest[lang] }}
                  :<span>{{ rateData.L_m }}%</span>
                </div>
              </div>

              <div class="long">
                <input
                  type="radio"
                  name="loan_category"
                  value="long"
                  v-model="loanFormData.loan_category"
                />
                <div class="title">
                  <!-- 长期(>5)年 -->
                  {{ language.Long[lang] }}(>5){{ language.Year[lang] }}
                </div>

                <div class="rate">
                  <!-- 利息 -->
                  {{ language.Interest[lang] }}
                  :<span>{{ rateData.L_l }}%</span>
                </div>
              </div>
            </div>
            <!-- 2. 用户输入续贷金额 -->
            <div class="item">
              <label>
                <!-- 续贷金额:(元) -->
                 {{ language.Input[lang] }}{{ language.Numbers[lang] }}:({{ language.Yuan[lang] }})
              </label>
              <input
                type="number"
                v-model="loanFormData.inputNumber"
                @blur="rules_loanNum"
              />
            </div>
            <div class="item">
              <label>
                <!-- 续贷年限(年) -->
                {{ language.Input[lang] }}{{ language.Years[lang] }}:({{
                  language.Yuan[lang]
                }})
              </label>
              <input
                type="number"
                v-model="loanFormData.inputYear"
                class="input-year"
                @blur="rules_loanYear"
              />
              <label class="year-tip">
                <!-- (小数自动向上取整) -->
                ( {{ language.DecimalAutoToInt[lang] }})
              </label>
            </div>

            <!-- 3. 计算本息 -->
            <div class="item item-bottom">
              <!-- 利息为 -->
              {{ language.Interest[lang] }}
              :{{ loanFormData.interest }}
              <!-- <b>确定开始本此贷款？</b> -->
            </div>
            <div class="sbt">
              <button
                @click="loanWorking"
                :disabled="isSubmiting"
                @blur="rules"
              >
                <!-- {{ isSubmiting ? '提交中...' : '提交' }} -->
                {{
                  isSubmiting
                    ? language.Sumbit[lang] + "..."
                    : language.Submit[lang]
                }}
              </button>
            </div>
            <!-- 4. 异步执行还款操做 -->
          </div>
        </div>
        <!-- =========================== repay ======================= -->
        <div class="ser-repay" v-else>
          <!-- 二（一）、还款工作区 -->
          <div class="repay">
            <p>
              <b>
                <!-- 本此偿还 -->
                {{ language.Repay[lang] }}
              </b>
            </p>

            <input
              type="number"
              v-model="repayData.number"
              @blur="rules_repay"
            />
            <!-- 元 -->
            {{ language.Yuan[lang] }}
            <br />
            <button
              class="reapy-btn"
              @click="repayWorking"
              :disabled="isSubmiting"
            >
              {{
                isSubmiting
                  ? language.Submit[lang] + "..."
                  : language.Submit[lang]
              }}
              <!-- {{ isSubmiting ? '提交中...' : '提交' }} -->
            </button>
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
import UserBaseInfo from '@/components/UserBaseInfo'
export default {
  // created(){
  //   console.log( typeof +this.userData.interest)
  // },
  data() {
    return {
      alter_area: false,
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
    UserBaseInfo
  },
  computed: {
    ...mapState({
      userData: (state) => state.userData,
      rateData: (state) => state.rateData,
      lang: (state) => state.lang,
      language: (state) => state.language,
      // lottery: (state) => state.lottery,
    }),
    // userLoanTrim() {
    //   return this.userData.loan.trim();
    // },
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
    // 单个验证 input loan number
    rules_loanNum() {
      if (this.loanFormData.inputNumber <= 0) {
        alert("input number no effect !"); // 死递归
        this.loanFormData.inputNumber = 0;
        return;
      } else {
        return 1;
      }
    },
    // 单个验证 input loan year
    rules_loanYear() {
      if (this.loanFormData.inputYear <= 0) {
        alert("input year no effect !"); // 死递归
        this.loanFormData.inputYear = 0;
        return;
      } else {
        return 1;
      }
    },
    /**
     * 集中调用 rules(){ this.rules_inputRear() !== 1}
     * 这种很容易造成递归死循环
     * 还是多写点代码，各个验证的方式
     *  - 首先用户输入的时候 alert
     *  - 集中sumbit时，再去写代码验证 input(只是省去了alert,直接return即可)
     */
    // 贷款验证规则 集体验证
    rules() {
      // 再次验证
      if (this.loanFormData.inputNumber <= 0) {
        this.loanFormData.inputNumber = 0;
        return;
      }

      if (this.loanFormData.inputYear <= 0) {
        this.loanFormData.inputYear = 0;
        return;
      }

      // loan run validate
      if (this.serCategory === "loan") {
        // indent === 2 & company
        if (this.loanFormData.ident === 2 && this.loanFormData.company === "") {
          alert("please input company name !");
          return;
        }

        // cause
        if (this.loanFormData.cause === null) {
          alert("please input cause !");
          return;
        } else if (this.loanFormData.cause.length < 5) {
          alert("Cause must be more five !");
          return;
        }
      }

      // 贷款时间匹配判断
      if (
        (this.loanFormData.loan_category === "long" &&
          +this.loanFormData.inputYear < 5) ||
        // loan year <= 5 选择了long
        (this.loanFormData.loan_category === "middle" &&
          this.loanFormData.inputYear > 5) ||
        (this.loanFormData.loan_category === "middle" &&
          this.loanFormData.inputYear < 4) ||
        // loan year > 5  选择了 middle
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
      if (this.rules() !== "passRules") return;
      this.loanFormData.interest = this.loanInterest;
      this.isSubmiting = true; // 正在提交，防止重复点击

      console.log(
        `本此贷款 : ${this.loanFormData.inputNumber}, 本此利息为: ${this.loanFormData.interest}
        本此贷款身份类型: ${this.loanFormData.ident}, 
        原因:${this.loanFormData.cause}, 
        公司名称:${this.loanFormData.company}`
      );

      this.$store.commit("setUserILoan", this.loanFormData.inputNumber);
      this.$store.commit("setUserInterest", this.loanFormData.interest);

      this.$store.commit("setUserIIdent", this.loanFormData.ident);
      this.$store.commit("setUserICause", this.loanFormData.cause);
      if (this.loanFormData.company) {
        // 有值了才写入
        this.$store.commit("setUserICompany", this.loanFormData.company);
      }

      // this.writeDB(); // write db
      this.prepareDB("loan");
    },

    // ======== repay part=================
    // 还款输入验证
    rules_repay() {
      if (+this.repayData.number <= 0) {
        alert("无效输入");
        this.repayData.number = 0;
        return;
      }
      // 2. repay <= loan
      if (+this.repayData.number > this.loanTotal) {
        alert("还多啦！(还款数超过了贷款数)");
        this.repayData.number = "";
        return;
      }
      return 1; // pass rules valiable
    },

    // 点击按钮进行还款
    // repay main func
    async repayWorking() {
      // 先要通过input框中的验证
      if (this.rules_repay() !== 1) {
        this.repayData.number = "";
        return;
      }

      // pass validate to repay
      this.isSubmiting = true; // 正在提交，防止重复点击

      /**
       * 1
       * status :  total > 还款额 > loan
       * resolve :
       */
      if (this.repayData.number > this.userData.loan) {
        const remnants = this.repayData.number - this.userData.loan; // 剩余
        // console.log('status : this.repayData.number > this.userData.loan')
        // console.log(' remnants(to decrease interest) : ',remnants)
        const loanValue = Math.abs(
          DecimalPos(this.userData.interest - remnants, 2)
        );
        // console.log('loanValue : ', loanValue)
        this.$store.commit("setUserILoan", 0);
        this.$store.commit("setUserInterest", loanValue);
      } else if (
        // this.repayData.number > this.userData.loan &&
        this.repayData.number < this.userData.interest
      ) {
        /**
         * 2
         * status : interset > 还款额 > loan (没有多少loan了，有很多利息需要偿还)
         * resolve : loanTotal - 还款额， 然后把剩余的钱全部存到Loan中(把interest->loan)
         */
        const loanValue = Math.abs(
          DecimalPos(this.userData.interest - this.repayData.number, 2)
        );
        // console.log('this.repayData.number < this.userData.interest')
        // console.log('loanValue to interest' , loanValue)
        this.$store.commit("setUserInterest", loanValue);
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
        await this.$store.dispatch("update", userObj);
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