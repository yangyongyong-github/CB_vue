<template>
  <div class="useri-container">
    <!-- 顶部覆盖登录选择区域的提示 -->
    <TopTip IconType="pay-circle" :tipText="language.TopTip_Deposit[lang]" />
    <div class="retsult-tip" v-show="workDone_status">
      <a-result status="success" :title="workDone_content" />
    </div>
    <header>
      <!-- header：基础信息部分 -->
      <div class="page-title">
        {{ language.User_IIPage[lang] }}
      </div>
      <!-- 基础信息 -->
      <UserBaseInfo />
    </header>

    <div class="other-server">
      <!-- div : 修改个人信息 -->
      <!-- <AlterInfo /> -->
      <!-- div : lottery -->
      <Lottery
        :tipMsg="language.PleaseToDeposit[lang]"
        :text="language.lotteryFirstDeposit[lang]"
      />
    </div>

    <!-- ==================workarea======================== -->
    <!-- 用于动态的提示 是否冻结，只能并行，如果包含会导致 被套在Modal组件之间的数据不会渲染 -->

    <div class="workarea">
      <p class="work-tit">
        <!-- 用户服务办理区域 -->
        {{ language.UserServerArea[lang] }}
      </p>

      <div class="modal" v-show="userData.isFreezed">
        <Modal Height="160%" :text="language.AccountBeenFreezed[lang]"> </Modal>
      </div>

      <div class="work-category">
        <!-- 请选择办理业务类型 -->
        {{ language.SelectWorkCategory[lang] }}
        :
        <div>
          <label>
            <!-- 存款 -->
            {{ language.Deposit[lang] }}
            <input
              type="radio"
              name="workCategory"
              v-model="serCategory"
              value="deposit"
            />
          </label>
        </div>
        <div>
          <label>
            <!-- 取款 -->
            {{ language.Take[lang] }}
            <input
              type="radio"
              name="workCategory"
              v-model="serCategory"
              value="take"
          /></label>
        </div>
      </div>
      <!-- =================deposit========================== -->

      <!-- 一、对应的办理内容 -->
      <div class="work-content">
        <div v-if="this.serCategory === 'deposit'">
          <!-- deposit -->
          <div class="depositWork">
            <!-- 1. 类型选择 -->

            <div class="deposit">
              <!-- 大额存款表头 -->
              <div>
                <div class="head-tip">
                  <div class="tit">
                    <!-- 大额存款 -->
                    {{ language.Deposit_large[lang] }}
                  </div>
                  <div class="start">
                    <!-- 起存金额(元) -->
                    {{ language.min_amount_deposit[lang] }}
                    {{ rateData.A }}
                  </div>
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
                <div class="title">{{ language.Short[lang] }}</div>
                <div class="time">1-3 ({{ language.Year[lang] }})</div>
                <div class="rate">
                  {{ language.Interest[lang] }}
                  <span>{{ rateData.A_1 }}%</span>
                </div>
              </div>

              <div class="long">
                <input
                  type="radio"
                  name="deposit_category"
                  value="A_3"
                  v-model="depositFormData.deposit_category"
                />
                <div class="title">{{ language.Long[lang] }}</div>
                <div class="time">>3 ({{ language.Year[lang] }})</div>
                <div class="rate">
                  {{ language.Interest[lang] }}
                  <span>{{ rateData.A_3 }}%</span>
                </div>
              </div>

              <!-- 中额存款表头 -->
              <div>
                <div class="head-tip mt-15">
                  <div class="tit">{{ language.Deposit_middle[lang] }}</div>
                  <div class="start">
                    {{ language.min_amount_deposit[lang] }} {{ rateData.B }}
                  </div>
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
                <div class="title">{{ language.Short[lang] }}</div>
                <div class="time">1-3 ({{ language.Year[lang] }})</div>
                <div class="rate">
                  {{ language.Interest[lang] }}
                  <span>{{ rateData.B_1 }}%</span>
                </div>
              </div>

              <div class="long">
                <input
                  type="radio"
                  name="deposit_category"
                  value="B_3"
                  v-model="depositFormData.deposit_category"
                />
                <div class="title">{{ language.Long[lang] }}</div>
                <div class="time">>3 ({{ language.Year[lang] }})</div>
                <div class="rate">
                  {{ language.Interest[lang] }}
                  <span>{{ rateData.B_3 }}%</span>
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
                <div class="title">{{ language.Other[lang] }}</div>
                <div class="time">{{ language.none_limited_time[lang] }}</div>
                <div class="rate">{{ language.none_interest[lang] }}</div>
              </div>
            </div>
            <!-- 2. 用户输入存款金额 -->
            <div class="user-input">
              <span class="part">
                <!-- 存款金额 -->
                {{ language.Deposit[lang] }}{{ language.Numbers[lang] }}
                <input
                  type="number"
                  v-model="depositFormData.inputNumber"
                  @blur="rules_depoNum"
                />({{ language.Yuan[lang] }})
              </span>

              <span class="part">
                <!-- 相应的存款时间 -->
                {{ language.Deposit[lang] }}{{ language.Years[lang] }}
                <input
                  type="number"
                  class="input-year"
                  v-model="depositFormData.inputYear"
                  @blur="rules_depoYear"
                />
                ({{ language.Year[lang] }})
                <label class="year-tip">
                  <!-- (小数时向下取整) -->
                  ( {{ language.DecimalAutoToInt_less[lang] }})
                </label>
              </span>
            </div>
            <div class="confirme">
              <!-- 本此存款利息为 -->
              {{ language.Interest[lang] }}:
              {{ depositFormData.interest }}
              {{ language.Yuan[lang] }}
              <!-- <b>确定开始本此存款？</b> -->
            </div>
            <div class="part">
              <button @click="depositWorking" :disabled="isSubmiting">
                <!-- {{ isSubmiting ? "提交中..." : "提交" }} -->
                {{
                  isSubmiting ? language.Submiting[lang] : language.Submit[lang]
                }}
              </button>
            </div>

            <!-- 4. 异步执行还款操做 -->
          </div>
        </div>
        <!-- ================================== take ================================ -->
        <div class="ser-take" v-else>
          <!-- 二（一）、take工作区 -->
          <div class="take">
            <div class="take-box">
              <p>
                <b>
                  <!-- 本此取款 -->
                  {{ language.Take[lang] }}
                </b>
              </p>
              <input
                type="number"
                v-model="takeData.number"
                @blur="rules_take"
              />
              <!-- 元 -->
              {{ language.Yuan[lang] }}
              <div class="btn-sub">
                <button @click="takeWorking" :disabled="isSubmiting">
                  <!-- {{ isSubmiting ? "提交中..." : "提交" }} -->
                  {{
                    isSubmiting
                      ? language.Submiting[lang]
                      : language.Submit[lang]
                  }}
                </button>
              </div>
            </div>

            <!-- {isSubmiting?disabled:none} -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TopTip from "@/components/TopTip";
import { delay, DecimalPos } from "@/utils";
import Modal from "@/components/Modal";
import UserBaseInfo from "@/components/UserBaseInfo";
import AlterInfo from "@/components/AlterInfo";
import Lottery from "@/components/Lottery";

export default {
  inject: ["reload"], // 刷新界面
  // mixins: [writeDB()],
  data() {
    return {
      serCategory: "deposit", // 用户选择的服务类型：deposit ? take

      // 取款数据对象
      takeData: {
        number: 0,
      },
      // 存款数据(用户输入的数据)
      depositFormData: {
        deposit_category: "A_1", // A_1,A_3,B_1,B_3, other // 这里给个默认的比较好，如果用户不选，将出现NaN的bug
        inputNumber: "",
        inputYear: "",
        // 通过用户输入的信息，计算后的数据
        interest: 0,
        total: 0,
      },
      // 取款确认按钮
      // temp-store
      isSubmiting: false,
      workDone_status: false,
      workDone_content: "",
      buiss_flag: "",
    };
  },
  components: {
    TopTip,
    Modal,
    AlterInfo,
    UserBaseInfo,
    Lottery,
  },
  created() {
    console.log("rateData : ", this.rateData);
  },
  computed: {
    ...mapState({
      userData: (state) => state.userData,
      lang: (state) => state.lang,
      language: (state) => state.language,
      rateData: (state) => state.rateData,
      lottery: (state) => state.lottery,
      // workDone_status: (state) => state.workDone_status,
      // workDone_content: (state) => state.workDone_content,
      // buiss_flag: (state) => state.buiss_flag,
    }),
    // 本息共计，每次通过计算获得
    depositTotal() {
      return DecimalPos(+this.userData.deposit + +this.userData.interest, 2);
    },
    // 计算存款利息
    depositInterest() {
      // 用户选择的为 其他时(不带利息收益)
      if (this.depositFormData.deposit_category === "other") {
        return 0;
      }
      // 大额、中额存款(带利息收益)
      const deposit_time = Math.floor(+this.depositFormData.inputYear); // 年数先向下取整
      // console.log(deposit_time);
      // return;
      const result =
        (this.depositFormData.inputNumber *
          deposit_time *
          this.rateData[this.depositFormData.deposit_category]) /
        100;
      // console.log( this.rateData[this.depositFormData.deposit_category] )
      return DecimalPos(result, 2); //保留2位小数
    },
  },
  methods: {
    // -------修改用户信息-------------
    alterInfo() {
      console.log(this.alter_area);
      this.alter_area = !this.alter_area;
    },

    /**
     *Assist func:  当用户输入未通过验证时，全部清空重填
     */
    clearInput_take() {
      this.takeData.number = 0;
    },
    clearInput_deposit() {
      this.depositFormData.inputNumber = 0;
      this.depositFormData.inputYear = 0;
      this.depositFormData.interest = 0;
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
        this.tipMsg("warn", this.language.InputNoEffect[this.lang]); //无效输入
        this.clearInput_take();
        return;
      }
      return "passRulesOfBase_take";
    },

    /**
     * 基础输入验证：deposit
     */
    rules_base_deposit() {
      // if(this.depositFormData.inputYear<1){
      //   this.tipMsg("info", this.language.LessYear_1[this.lang]); //最少1年起
      //   return;
      // }
      if (
        this.depositFormData.inputNumber <= 0 ||
        this.depositFormData.inputYear <= 0
      ) {
        // 1. 数字，正数
        // this.clearInput_deposit();
        this.tipMsg("info", this.language.MissMoneyOrYear[this.lang]); //"缺失：金额或年份！"
        return;
      }
      return "passRulesOfBase_deposit";
    },

    /* deposit: 起存金额判断 */
    rules_depoNum() {
      if (+this.depositFormData.inputNumber < 100) {
        this.tipMsg("warn", this.language.Deposit_min_100[this.lang]); //"存款100元起!"
        return;
      }
      // 1. 大额存款，起存金额不够
      if (
        (this.depositFormData.deposit_category === "A_1" ||
          this.depositFormData.deposit_category === "A_3") &&
        +this.depositFormData.inputNumber < +this.rateData.A
      ) {
        this.tipMsg(
          "warn",
          ` ${this.language.min_amount_deposit[this.lang]} - ${
            this.language.Deposit_large[this.lang]
          } : ${this.rateData.A}`
        ); // 大额存款，起存金额：Large deposit of Min is
        // this.clearInput_deposit();
        return;
      }

      // 2.中额存款，起存金额不够
      if (
        (this.depositFormData.deposit_category === "B_1" ||
          this.depositFormData.deposit_category === "B_3") &&
        +this.depositFormData.inputNumber < +this.rateData.B
      ) {
        this.tipMsg(
          "warn",
          ` ${this.language.min_amount_deposit[this.lang]} - ${
            this.language.Deposit_middle[this.lang]
          } : ${this.rateData.B}`
        );
        // this.clearInput_deposit();
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
      // 年数先向下取整
      this.depositFormData.inputYear = Math.floor(
        +this.depositFormData.inputYear
      );

      if (this.depositFormData.inputYear <= 0) {
        this.tipMsg("warn", this.language.InputNoEffect[lang]);
        return;
      }
      // 低利率类型可以存长时间，但是高利率类型不可以存短时间
      if (
        (this.depositFormData.deposit_category === "A_3" &&
          this.depositFormData.inputYear <= 3) ||
        (this.depositFormData.deposit_category === "B_3" &&
          this.depositFormData.inputYear <= 3)
      ) {
        this.tipMsg("warn", this.language.Mismatch_RateTime[this.lang]); // Mismatch of rate with time "高利率类型不可以存短时间"
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
        this.tipMsg("error", this.language.SurplusDeficiency[this.lang]); //"余额不足！"
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
      console.log(this.depositInterest);
    },

    // deposit main func
    async depositWorking() {
      // 统一规则验证
      if (this.rules_depo() !== "passRules") {
        // alert("输入框未通过验证！");
        this.clearInput_deposit();
        return;
      }
      this.buiss_flag = "deposit";
      // this.$store.commit("setBuiss_flag", "deposit");
      this.isSubmiting = true; // 正在提交，防止重复点击
      this.depositFormData.interest = this.depositInterest;

      // ---------------------------------------------------------

      /**
       * 1.1  deposit 直接写到store中
       * 追加上之前的，而非直接替换
       */
      // new depisit value
      this.userData.deposit =
        +this.depositFormData.inputNumber + +this.userData.deposit;
      // new interest value
      this.userData.interest = DecimalPos(
        +this.depositFormData.interest + +this.userData.interest,
        2
      );

      // console.log(`本此存款： ${this.depositFormData.inputNumber} ，本此存款利息：${this.depositFormData.interest},
      //   帐户最新存款共计：${this.userData.deposit} ，帐户最新利息共计：${this.userData.interest} `);

      if (
        +this.depositFormData.inputNumber === NaN ||
        +this.depositFormData.interest === NaN
      )
        return;

      this.writeDB();
      this.lottery.auth = true; // 赋予一次抽奖的机会
    },

    // ===============================================
    /**
     * 展示给用户一定的时间
     */
    async delayShow_result() {
      this.workDone_status = true;
      // this.$store.commit("setWrokDone_status", true);
      // console.log('咋不展示',this.workDone_content);
      await delay(3000);
      this.isSubmiting = false;
      this.workDone_status = false;
      // this.$store.commit("setWorkDone_status", false);
      this.workDone_content = "";
      // this.$store.commit("setWorkDone_content", "");
    },
    // take main func
    async takeWorking() {
      // 先要通过input框中的验证
      if (this.rules_take() !== "passRules") {
        // alert("输入框未通过验证！");
        return;
      }

      this.isSubmiting = true; // 正在提交，防止重复点击
      this.buiss_flag = "take";
      // this.$store.commit("setBuiss_flag", "take");

      // console.log("本此取款：", this.takeData.number);

      /**
       * 1.2 take (1)
       * deposit < [take] < (deposit + interest)
       *
       * userData.deposit 减少
       * userData.interst 清零
       */
      if (+this.takeData.number > +this.userData.deposit) {
        // console.log("deposit < take < deposit + interest");

        const remains = this.takeData.number - this.userData.deposit; // 剩余
        // console.log('remains :' ,remains)
        const newValue = Math.abs(
          DecimalPos(this.userData.interest - remains, 2)
        );
        this.userData.deposit = 0;
        this.userData.interest = newValue;
      } else if (
        +this.takeData.number >= +this.userData.deposit &&
        +this.takeData.number <= this.userData.interest
      ) {
        /**
         * (2)
         * status : deposit 取完了，但是还剩很多Interst需要取
         * resolve : 先取利息，然后剩下的利息转为deposit
         */
        const depositVlaue = DecimalPos(
          this.depositTotal - this.takeData.number - 0,
          2
        );
        this.userData.interest = 0;
        this.userData.deposit = this.userData.deposit + depositVlaue;
      } else {
        /**
         * (3)
         * 绝大部分情况
         * [take] < deposit
         * userData.deposit 减少
         * userData.interst 不变
         *
         */
        this.userData.deposit = Math.abs(
          DecimalPos(+this.userData.deposit - this.takeData.number, 2)
        );
      }
      this.writeDB();
    },

    // tip() {
    //   this.$showMessage({
    //     content: this.language.Done[this.lang], //successMsg
    //     type: "success",
    //     duration: 1000,
    //     container: this.$refs.from,
    //     callback: () => {
    //       this.isSubmiting = false;
    //       this.clearInput_deposit();
    //       // 清空 计算的利息
    //       this.depositFormData.interest = 0;
    //       this.reload(); // 刷新页面
    //     },
    //   });
    // },

    async writeDB() {
      // 1. from store get data
      const userObj = {
        loginId: this.userData.loginId,
        deposit: this.userData.deposit,
        interest: this.userData.interest,
        flag: this.userData.flag,
      };
      /**
       * 2. 写入db
       */
      try {
        await this.$store.dispatch("update", userObj);
        // this.tipMsg("success", this.language.Done[this.lang]); // showMesage
        // this.clearInput_take();
        // this.clearInput_deposit();
        this.showTask();
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * 业务办理成功提示
     */
    async showTask() {
      // var val = "";
      if (this.buiss_flag === "deposit") {
        // 界面显示
        if (this.lang === "cn") {
          this.workDone_content = `本此 存款 ${this.depositFormData.inputNumber}元，年限 ${this.depositFormData.inputYear}年, 利息 ${this.depositFormData.interest}元`;
        } else if (this.lang === "en") {
          this.workDone_content = `Deposit ${this.depositFormData.inputNumber}￥，Time ${this.depositFormData.inputYear} Age，Interest ${this.depositFormData.interest}￥`;
        }
        await this.delayShow_result();
        this.clearInput_deposit();
      } else if (this.buiss_flag === "take") {
        if (this.lang === "cn") {
          this.workDone_content = `本此 取款 ${this.takeData.number}元`;
        } else if (this.lang === "en") {
          this.workDone_content = `Take ${this.takeData.number}￥`;
        }
        await this.delayShow_result();
        this.clearInput_take();
      }
      this.buiss_flag = "";
      // this.$store.commit("setWorkDone_content", val);
      // console.log("deposit", val);

      // this.$store.commit("setBuiss_flag", "");
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
        },
      });
    },
  },
  watch: {
    // "workDone.status"(o, n) {
    //   console.log(o, n);
    //   // this.reload(); // 刷新页面
    // },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";
@import "~@/styles/user.less";
@import "./self-style.less";
</style>