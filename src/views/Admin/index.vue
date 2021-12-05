<template>
  <div class="admin-container">
    <h3 class="title">管理员信息</h3>
    <div class="admin-info">
      <div>姓名： {{ admminName }}</div>
      <div>LoginId: {{ admminLoginId }}</div>
      <div>账号：{{ admminAccount }}</div>
      <div>本金 Corpus：{{ Corpus }}</div>
      <div>收入(贷款利息): {{ Income }}</div>
    </div>

    <div class="fund-manage">
      <div class="deposit">
        <h5>存款信息</h5>
        <span>存款总额：</span>
        <span>存款总额利息：<span class="tip">[支出]</span></span>
      </div>
      <div class="loan">
        <h5>贷款信息</h5>
        <span>贷款总额：</span>
        <span>贷款总额利息：<span class="tip">[收益]</span></span>
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
  inject: ["reload"], // 用户刷新界面
  data() {
    return {
      admminName: localStorage.getItem("admin-name"),
      admminAccount: localStorage.getItem("admin-account"),
      admminLoginId: localStorage.getItem("admin-loginId"),

      // <!-- 用户存款信息 -->
      Corpus: localStorage.getItem("admin-corpus"),
      Income: localStorage.getItem("admin-income"),

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
    };
  },
  components: {
    Icon,
    TopTip,
  },
  // computed: {
  //   AllDeposit,
  //   AllDepositInterest, // 累计所有存款利息
  //   AllLoan,
  //   AllLoanInterest, // 累计多有贷款利息
  //   AllFund, // 所有的数相加，(帐户上可见的)不管支出还是收益
  //   AllUseable, // 银行目前可用的 =
  //   // 公式一：AllFund - loan - depositInterest
  //   //公式二：  corpus + deposit + depositInterest（在帐户上放着的） -loan + loanInterest
  //   // 用户
  //   AllUserDeposit,
  //   AllUserLoan,
  //   AllUser,// I + II
  // },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";
@import "./styles.less";
</style>