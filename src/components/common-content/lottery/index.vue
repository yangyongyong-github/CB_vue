<template>
  <div
    class="lottery"
    @mouseenter="showLotteryTips"
    @mouseleave="hideLotteryTips"
  >
    <button :disabled="!lottery.auth" @click="lotteryHandle">
      {{ language.lottery[lang] }}
    </button>

    <!-- 阻拦 提示消息 -->
    <div class="buiness-tips" ref="lotterTips">{{ tipMsg }}</div>

    <div class="lottery-tips" ref="lotteryMsg">
      <!-- LotteryMessage -->
      <div class="cancel" @click="dropLotteryMsg"></div>
      {{ text }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    tipMsg: {
      type: String,
      default: "请先办理业务！",
    },
    text: {
      type: String,
      default: "办理业务可以抽奖哦，最高可以免除贷款利息/存款利息翻倍！",
    },
  },
  computed: mapState(["lottery", "language", "lang"]),
  methods: {
    // 抽奖---------------
    showLotteryTips() {
      // this.$refs.lotteryDom.style.display = "none";

      // 如果用户没有权限，请先办理业务
      if (this.lottery.auth === false) {
        this.$refs.lotterTips.style.display = "block";
      }
    },
    /**
     * 影藏消息提示
     */
    hideLotteryTips() {
      this.$refs.lotterTips.style.display = "none";
    },
    /**
     * 点击跳转到 lottery pages
     */
    lotteryHandle() {
      console.log(this.lottery.auth);
      // window.open("/lottery"); // 新开窗口后store中的值全部不能使用？
      this.$router.push("/lottery");
    },
    // 用户点击'X', 去掉显示msg
    dropLotteryMsg() {
      this.$refs.lotteryMsg.style.display = "none";
    },
  },
};
</script>

<style lang="less" scoped>
.lottery {
  position: relative;

  .buiness-tips {
    // 办理业务提示消息框
    width: 120px;
    padding-left: 5px;
    border: 1px silver dotted;
    background-color: brown;
    color: aliceblue;
    border-radius: 10px;
    position: absolute;
    top: 5px;
    left: -30px;
    cursor: no-drop;
    display: none; // 鼠标移上让其显示
  }
  .lottery-tips {
    // float: left;
    width: 200px;
    // height: 100px;
    margin-left: -50px;
    margin-top: 10px;
    padding: 0 5px;
    border: 2px dotted silver;
    border-radius: 10px;
    position: absolute;
    .cancel {
      position: absolute;
      top: 0;
      right: 4px;
      bottom: 5px;
      &::after {
        content: "X";
        width: 25px;
        height: 25px;
        cursor: pointer;
      }
    }
  }
}
</style>