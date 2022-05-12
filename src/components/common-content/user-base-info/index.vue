<template>
  <div class="user-data-base tit">
    <div class="base-info">
      <div>
        <span class="guide">
          <!-- 姓名 -->
          {{ language.Name[lang] }}
          :
        </span>
        {{ userData.name }}
      </div>
      <div>
        <span class="guide">
          <!-- 性别 -->
          {{ language.Gender[lang] }}
          :
        </span>
        <!-- {{ userData.sex === "true" ? "男" : "女" }} -->
        {{ +userData.sex === 1 ? language.Male[lang] : language.Female[lang] }}
      </div>
      <div>
        <span class="guide">
          <!-- 年龄 -->
          {{ language.Age[lang] }}
          :
        </span>
        {{ userData.age }}
      </div>
      <div>
        <span class="guide">
          <!-- 职业 -->
          {{ language.Job[lang] }}
          :
        </span>
        {{ userData.job }}
      </div>
      <div>
        <span class="guide">
          <!-- 联系电话 -->
          {{ language.Mobile[lang] }}
          : </span
        >{{ userData.mobile }}
      </div>
      <div>
        <span class="guide" v-if="userData.flag === 'useri'">
          <!-- 单位/公司 -->
          {{ language.Company[lang] }}
          :
        </span>
        {{ userData.company }}
      </div>
    </div>

    <div class="person-account">
      <div>
        <span class="guide">
          <!-- 用户类别 -->
          {{ language.DepositCorpus[lang] }}
          :
        </span>
        {{
          userData.flag === "useri"
            ? language.Loan[lang]
            : language.Deposit[lang]
        }}
        ({{ userData.flag }})
      </div>
      <div>
        <span class="guide">
          <!-- 账号 -->
          {{ language.Account[lang] }}
          :
        </span>
        {{ userData.account }}
      </div>
      <div>
        <span class="guide"> ID : </span>
        {{ userData.loginId }}
      </div>
    </div>

    <div class="person-fund">
      <div v-if="userData.flag === 'useri'">
        <span class="guide">
          <!-- 贷款 本金 -->
          {{ language.Loan[lang] }}

          :</span
        >{{ userData.loan | moneyFormat }}
        <!-- 元 -->
        {{ language.Yuan[lang] }}
      </div>
      <div v-else-if="userData.flag === 'userii'">
        <span class="guide">
          <!-- 存款 本金 -->
          {{ language.Deposit[lang] }}

          :</span
        >{{ userData.deposit | moneyFormat }}
        <!-- 元 -->
        {{ language.Yuan[lang] }}
      </div>
      <!-- userData.loan userLoanTrim-->

      <!-- 贷款/存款利息 -->
      <div>
        <span class="guide">
          <!-- 贷款/存款利息 -->
          {{ language.Interest[lang] }} : </span
        >{{ userData.interest | moneyFormat }}
        <!-- 元 -->
        {{ language.Yuan[lang] }}
      </div>
      <div>
        <span class="guide">
          <!-- 本息共计 -->
          {{ language.Total[lang] }}
          : </span
        >{{ loanTotal | moneyFormat }}
        <!-- 元 -->
        {{ language.Yuan[lang] }}
      </div>
    </div>

    <div class="lately" v-if="userData.flag === 'useri'">
      <div>
        <span class="guide">
          <!-- 上次贷款类别 -->
          {{ language.LatelyLoanCategory[lang] }}
          :
        </span>
        {{
          userData.ident === 1 ? language.Person[lang] : language.Company[lang]
        }}
      </div>
      <div>
        <span class="guide">
          <!-- 上次贷款原因 -->
          {{ language.LatelyLoanCause[lang] }}
          :
        </span>
        <textarea
          cols="20"
          rows="4"
          :placeholder="userData.cause"
          disabled
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import numeral from "numeral";
import { mapState } from "vuex";
import { DecimalPos } from "@/utils";

export default {
  filters: {
    moneyFormat(num) {
      // console.log(typeof +num === 'number');
      // if (!num || +num !== 'number') {
      //   return;
      // }
      return numeral(num).format('1,000.00');
    },
  },
  computed: {
    ...mapState({
      userData: (state) => state.userData,
      lang: (state) => state.lang,
      language: (state) => state.language,
    }),
    // 本息共计，每次通过计算获得
    loanTotal() {
      if (this.userData.flag === "useri") {
        // loan total
        return DecimalPos(+this.userData.loan + +this.userData.interest, 2);
      } else if (this.userData.flag === "userii") {
        // deposit total
        return DecimalPos(+this.userData.deposit + +this.userData.interest, 2);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/user.less";
</style>