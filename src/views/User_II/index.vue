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
        <div class="user-name">
          <span class="guide"> 姓名 : </span>{{ userData.name }}
        </div>
        <div class="user-sex">
          <span class="guide"> 性别 : </span>
          {{ userData.sex === "true" ? "男" : "女" }}
        </div>
        <div class="user-age">
          <span class="guide"> 年龄 : </span>
          {{ userData.age }} 岁
        </div>
        <div class="user-job">
          <span class="guide"> 职业 : </span>
          {{ userData.job }}
        </div>
        <div class="user-mobile">
          <span class="guide"> 联系电话 : </span>
          {{ userData.mobile }}
        </div>
      </div>

      <!-- 业务信息 -->
      <div class="user-data-account tit">
        <!-- 身份 loan ? deposit -->
        <div class="user-cage">
          <span class="guide"> 用户类别 : </span>
          {{ userData.flag }}
          {{ userData.flag === "I" ? "贷款" : "存款" }}用户
        </div>
        <div class="user-account">
          <span class="guide"> 账号 : </span>
          {{ userData.account }}
        </div>
        <div class="user-login-id">
          <span class="guide"> LoginId : </span>
          {{ userData.account }}
        </div>
      </div>

      <!-- 用户存款信息 -->
      <div class="user-deposit tit">
        <!-- 存款额度总计 -->
        <div class="user-deposit">
          <span class="guide"> 存款总额-本金 : </span>
          {{ userData.deposit }}元
        </div>
        <!-- 存款利息总结 -->
        <div class="user-interest">
          <span class="guide"> 存款总额-利息 : </span>
          {{ userData.interest }}元
        </div>

        <div>
          <span class="guide"> 本息共计 : </span>
          {{ depositTotal }}
        </div>
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
                  <div class="start">起存金额(元) {{ rateData.A }}</div>
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
                  利息：<span>{{ rateData.A_1 }}</span>
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
                  利息：<span>{{ rateData.A_3 }}</span>
                </div>
              </div>

              <!-- 中额存款表头 -->
              <div>
                <div class="head-tip mt-15">
                  <div class="tit">中额存款</div>
                  <div class="start">起存金额(元) {{ rateData.B }}</div>
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
                  利息：<span>{{ rateData.B_1 }}</span>
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
                  利息：<span>{{ rateData.B_3 }}</span>
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
import { mapState } from "vuex";
import Icon from "@/components/Icon";
import TopTip from "@/components/TopTip";
import rateData from "../../store/rateTemp"; // rate临时配置变量
import { DecimalPos } from "@/utils";
import Modal from "@/components/Modal";
// import writeDB from "@/mixins/writeDB";

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
      isSubmiting: false,
    };
  },
  components: {
    Icon,
    TopTip,
    Modal,
  },
  created() {
    console.log("rateData : ", this.rateData);
  },
  computed: {
    ...mapState({
      userData: (state) => state.userData,
      rateData: (state) => state.rateData,
    }),
    // 本息共计，每次通过计算获得
    depositTotal() {
      return DecimalPos(+this.userData.deposit + +this.userData.interest, 2);
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
          this.rateData[this.depositFormData.deposit_category]) /
        100;
      // console.log( this.rateData[this.depositFormData.deposit_category] )
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
        this.depositFormData.inputNumber < this.rateData.A
      ) {
        alert(`大额存款，起存金额：${this.rateData.A}`);
        this.clearInput_deposit();
        return;
      }

      // 2.中额存款，起存金额不够
      if (
        (this.depositFormData.deposit_category === "B_1" ||
          this.depositFormData.deposit_category === "B_3") &&
        this.depositFormData.inputNumber < this.rateData.B
      ) {
        alert(`中额存款，起存金额：${this.rateData.B}`);
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

      console.log(`本此存款： ${this.depositFormData.inputNumber} ，本此存款利息：${this.depositFormData.interest},
        帐户最新存款共计：${this.userData.deposit} ，帐户最新利息共计：${this.userData.interest} `);

      this.writeDB();
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

      /**
       * 1.2 take (1)
       * deposit < [take] < (deposit + interest)
       *
       * userData.deposit 减少
       * userData.interst 清零
       */
      if (+this.takeData.number >= +this.userData.deposit) {
        // console.log("deposit < take < deposit + interest");

        this.userData.interest = 0;
        this.userData.deposit = Math.abs(
          DecimalPos(
            +this.takeData.number -
              this.userData.deposit -
              this.userData.interest,
            2
          )
        );
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

    tip() {
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
        await this.$store.dispatch("updata", userObj);
        this.tip(); // showMesage
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
@import "~@/styles/user.less";
.useri-container {
  width: 100%;
  min-width: 850px;
}
</style>