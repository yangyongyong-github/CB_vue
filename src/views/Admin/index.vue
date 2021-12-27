<template>
  <div class="admin-container">
    <TopTip IconType="qq" tipText="银行有我来守护~" />
    <header>
      <!-- base info -->
      <div class="name">
        <span class="guide">Name: </span> {{ userData.name }}
      </div>
      <div class="login-id">
        <span class="guide">LoginId : </span> {{ userData.loginId }}
      </div>
      <div class="rank">
        <span class="guide">Rank : </span> {{ userData.rank | FilterRank }}
      </div>
    </header>
    <div class="main-operation">
      <!-- 主要的操做区域 -->
      <div class="high" v-if="userData.rank === 'h'">
        <b>high</b>
        <!-- 银行本金 : 操做-增减 -->
        <div class="corpus">
          <h3>银行资金</h3>
          <div>
            <!-- 目前银行在涨资金 = 本金  -->
            <!-- 银行目前总共流动资金 -->
            <!-- 使用e-cahrts? -->
          </div>
          <div>
            <span class="guide-h">银行本金</span>
            {{ bankData.corpus }} 元(人民币)
            <button @click="toOpCorpus">修改</button>
          </div>

          <div class="corpus-op" v-show="highFormData.corpusFlag">
            <!-- 不能直接赋值，必须采用增减的形式，以及点击确定等，避免点击失误 -->

            <div class="input-corpus">
              <input
                type="number"
                class="corpus-control"
                v-model="highFormData.corpus"
              />

              <label for=""
                >增加
                <input
                  type="radio"
                  name="corpusOP"
                  value="increase"
                  v-model="highFormData.corpusCategory"
              /></label>

              <label for=""
                >减少<input
                  type="radio"
                  name="corpusOP"
                  value="decrease"
                  v-model="highFormData.corpusCategory"
              /></label>

              <button @click="corpusSubmit">提交</button>
            </div>
          </div>
        </div>
        <!-- 银行汇率控制 添加和增减 -->
        <div class="rate-op">
          <h3>银行汇率</h3>
          <!-- 查看 -->
          <table>
            <thead>
              <tr>
                <td>大额存款起薪</td>
                <td>中额存款起薪</td>
                <td>大额贷款限制数额</td>
                <td>大额存款(>3年)</td>
                <td>大额存款(1-3年)</td>
                <td>中额存款(>3年)</td>
                <td>中额存款(1-3年)</td>
                <td>长期贷款(>5年)</td>
                <td>中期贷款(3-5年)</td>
                <td>短期贷款(1-3年)</td>
              </tr>
            </thead>
            <tbody>
              <td>{{ rateData.A }}</td>
              <td>{{ rateData.B }}</td>
              <td>{{ rateData.C }}</td>
              <td>{{ rateData.A_3 }}</td>
              <td>{{ rateData.A_1 }}</td>
              <td>{{ rateData.B_3 }}</td>
              <td>{{ rateData.B_1 }}</td>
              <td>{{ rateData.L_l }}</td>
              <td>{{ rateData.L_m }}</td>
              <td>{{ rateData.L_s }}</td>
            </tbody>
          </table>
          <!-- 修改 -->
          <!-- 添加 -->
        </div>
      </div>
      <div class="common">
        <b>base</b>
        <button @click="getAllUsers">Users</button>
        <!-- 用户列表 -->

        <!-- 贷款总人数 贷款总额 -->
        <!-- 存款总人数 存款总额 -->

        <!-- 查找指定用户 by account -->
        <!-- input: account + flag -->
        <!-- 展示该用户的所有信息 -->

        <!-- 展示用户信息,动态渲染 -->
        <div class="users-show">
          <table class="user-i">
            <thead>
              <tr class="guide">
                <td>Name</td>
                <td>Sex</td>
                <td>Birthday</td>
                <td>Age</td>
                <td>Account</td>
                <td>LoginID</td>
                <td>mobile</td>
                <td>job</td>
                <td>limited</td>
                <td>isFreezed</td>
                <td>ident</td>
                <td>loan</td>
                <td>interest</td>
                <td>company</td>
                <!-- <td>cause</td> -->
                <td>flag</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in UsersData[0]" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ item.sex | FilterSex }}</td>
                <td>({{ item.birthday | FilterBirthday }})</td>
                <td>{{ item.age }}</td>
                <td>{{ item.account }}</td>
                <td>{{ item.loginId }}</td>
                <td>{{ item.mobile }}</td>
                <td>{{ item.job }}</td>
                <td>{{ item.limited }}</td>
                <td>{{ item.isFreezed }}</td>
                <td>{{ item.ident }} ({{ item.ident | FilterIdent }})</td>
                <td>{{ item.loan }}</td>
                <td>{{ item.interest }}</td>
                <td>{{ item.company }}</td>
                <!-- <td>{{ item.cause }}</td> -->
                <td>{{ item.flag }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Icon from "@/components/Icon";
import TopTip from "@/components/TopTip";
import * as MATH from "@/utils";

export default {
  inject: ["reload"], // 友好的刷新界面
  data() {
    return {
      /**
       * 高级管理员的操做表单
       */
      highFormData: {
        corpus: 0,
        corpusFlag: false,
        corpusCategory: "",
      },
    };
  },
  computed: {
    ...mapState({
      userData: (state) => state.userData,
      UsersData: (state) => state.UsersData,
      rateData: (state) => state.rateData,
      bankData: (state) => state.bankData,
    }),
    /**
     * useri+userii
     */
    AllUsers() {},
    /**
     * 流动资金
     * useri: loan+interest + userii: deposit+interest
     */
    AllFundWater() {},
    /**
     *
     * 目前在账资金 : AllFundWater - loan
     */
    AllFund() {},
  },
  filters: {
    /**
     * 过滤显示管理员的等级
     */
    FilterRank(value) {
      if (value === "h") {
        return "高级管理员";
      } else if (value === "c") {
        return "管理员";
      }
    },
    FilterBirthday(value) {
      return MATH.formatDate(value, false);
    },
    FilterSex(value) {
      if (value === true) {
        return "男";
      } else {
        return "女";
      }
    },
    FilterIdent(value) {
      if (+value === 1) {
        return "个人";
      } else {
        return "企业";
      }
    },
    FilterInDe(value) {
      if (value === "increase") {
        return "+";
      } else if (value === "decrease") {
        return "-";
      } else {
        return;
      }
    },
  },
  components: {
    Icon,
    TopTip,
  },
  methods: {
    /**
     * admin-high 是否需要点击管理资金
     */
    toOpCorpus() {
      this.highFormData.corpusFlag = !this.highFormData.corpusFlag; // 用户点击，不想操做时可以再次点击隐藏的
      // 操做完成，让其隐藏
    },
    /**
     * 点击提交进行curpos操做
     * 追加，而非替换
     */
    async corpusSubmit() {
      const confirme = window.confirm(
        `再次确定 [${this.highFormData.corpusCategory}] : ${this.highFormData.corpus}元吗? `
      );

      if (!confirme) {
        // 如果选择取消，则不予操做
        this.highFormData.corpusFlag = false;
        return;
      }

      try {
        console.log("开始执行操做...");

        if (this.highFormData.corpusCategory === "increase") {
          const newCorpus =
            +this.$store.state.bankData.corpus + +this.highFormData.corpus;
          this.$store.commit("setCorpusData", newCorpus);
          // -----  write in db ------
          // console.log(
          //   "new corpus : ",
          //   newCorpus,
          //   "store : ",
          //   this.bankData.corpus
          // );
        } else if (this.highFormData.corpusCategory === "decrease") {
          const newCorpus =
            +this.$store.state.bankData.corpus - +this.highFormData.corpus;
          this.$store.commit("setCorpusData", newCorpus);
          // -----  write in db ------
          // console.log(
          //   "new corpus : ",
          //   newCorpus,
          //   "store : ",
          //   this.bankData.corpus
          // );
        } else {
          return;
        }

        alert("set corpus done.");
        console.log("执行操作完成");

        // clear input
        this.highFormData.corpus = 0;
        this.highFormData.corpusCategory = null;

        this.reload(); // 刷新页面
      } catch (error) {
        console.log(error);
      }
    },
    /*
     * 得到全部用户信息
     */
    async getAllUsers() {
      const Users = await this.$store.dispatch("getAllUser");
      if (Users) {
        console.log(Users);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "./styles.less";
@import "./common.css";
</style>