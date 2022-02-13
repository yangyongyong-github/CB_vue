<template>
  <div class="rate-show">
    <!-- <div class="main" v-if="rateData">
    </div>
    <div class="no-data">

    </div>
    <div class="loading">
      数据加载中
    </div> -->
    <div>
      <h3 class="title">我要存/贷款，利率展示区</h3>
    </div>
    <!-- deposit-table -->
    <div class="table table-deposit" >
      <b>Deposit 存款</b>
      <table class="deposit">
        <thead>
          <tr>
            <td>
              大额存款
              <span class="guide">起薪:{{ rateData.A }}￥</span>
            </td>
            <td></td>
            <td>
              中额存款
              <span class="guide">起薪:{{ rateData.B }}￥</span>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr class="guide">
            <!-- 大额 -->
            <td>短期(1-3年)</td>
            <td>中长期(>3年)</td>
            <!-- 中额 -->
            <td>短期(1-3年)</td>
            <td>中长期(>3年)</td>
          </tr>
          <tr>
            <!-- 大额 -->
            <td>{{ rateData.A_1 }}%</td>
            <td>{{ rateData.A_3 }}%</td>
            <!-- 中额 -->
            <td>{{ rateData.B_1 }}%</td>
            <td>{{ rateData.B_3 }}%</td>
          </tr>
        </tbody>
      </table>

      <div class="guide desc">
        说明:(1)
        目前仅支持以上的两类存款，用户存款时，必须手动选择与之匹配的；(2)
        除此之外，存款暂时没有利息。(3)存款100元起。 (4)办理存款业务(或者注册存款新用户)，即可参与抽奖。
      </div>
    </div>

    <!-- loan-table -->

    <div class="table table-loan">
      <b>Loan 贷款</b>
      <table>
        <thead>
          <tr>
            <td>长期贷款</td>
            <td>中期贷款</td>
            <td>短期贷款</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="guide">>5年</td>
            <td class="guide">4-5年</td>
            <td class="guide">1-3年</td>
          </tr>
          <tr>
            <td>{{ rateData.L_l }}%</td>
            <td>{{ rateData.L_m }}%</td>
            <td>{{ rateData.L_s }}%</td>
          </tr>
        </tbody>
      </table>

      <div class="guide desc">
        说明:(1)贷款不按金额计算，按年限计算; (2) 不足一年按一年计算。
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      rateData: (state) => state.rateData,
    }),
  },
};
</script>

<style lang="less" scoped>
.rate-show {
  width: 50%;
  .title {
    font-weight: bold;
    text-align: center;
  }
  div.table {
    table {
      width: 100%;
      box-sizing: border-box;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      text-align: center;
    }
  }
  .table-loan {
    margin-top: 20px;
  }
  .desc{
    margin-top: 7px;
    font-size: .8em;
  }
}
</style>