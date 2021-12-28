<template>
  <div class="home-container">
    <h2>Home</h2>
    <button @click="handleClick">getRate</button>

    <div class="rate-show">
      <div>
        <h3>我要存贷款，利率展示区</h3>
      </div>
      <!-- deposit-table -->
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
            <td>{{ rateData.A_1 }}</td>
            <td>{{ rateData.A_3 }}</td>
            <!-- 中额 -->
            <td>{{ rateData.B_1 }}</td>
            <td>{{ rateData.B_3 }}</td>
          </tr>
        </tbody>
      </table>
      <div class="guide">
        说明:(1)
        目前仅支持以上的两类存款，用户存款时，必须手动选择与之匹配的；(2)
        除此之外，存款暂时没有利息。
      </div>
      <!-- loan-table -->
      <b>Loan 贷款</b>
      <table class="loan">
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
            <td class="guide">3-5年</td>
            <td class="guide">1-3年</td>
          </tr>
          <tr>
            <td>{{ rateData.L_l }}</td>
            <td>{{ rateData.L_m }}</td>
            <td>{{ rateData.L_s }}</td>
          </tr>
        </tbody>
      </table>
      <div class="guide">
        说明：(1)贷款不按金额计算，按年限计算; (2) 不足一年按一年计算。
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
  methods: {
    // async handleClick(id=1) { // pointX ??
    async handleClick() {
      const id = 1;
      // const rateInfo = await this.$store.dispatch("getRate", { id:1} );
      const rateInfo = this.$store.state.rateData;
      console.log("Home : ", id);
      if (rateInfo) {
        // 通过该id 拿到了对应的 数据
        console.log("init load rate data : ", rateInfo);
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import "./style.less";
</style>