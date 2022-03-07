<template>
  <div class="lottery-container">
    <TopTip :tipText="this.language.OnceLottery[lang]" />
    <div class="retsult-tip" v-show="workDone_status">
      <a-result status="success" :title="workDone_content" />
    </div>
    <!-- <ResultTip
      v-show="workDone_status"
      status="success"
      :title="workDone_content"
    /> -->
    <div class="box" ref="box"></div>
    <button v-show="lottery.auth" @click="startHandle">
      {{ language.Start[lang] }}
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { delay } from "@/utils";
import TopTip from "@/components/TopTip";
import ResultTip from "@/components/ResultTip";

export default {
  data() {
    return {
      randomArrs: [],
      colors: [
        "#f26395",
        "#62efab",
        "#ef7658",
        "#ffe868",
        "#80e3f7",
        "#d781f9",
      ],
      workDone_status: false,
      workDone_content: "",
      buiss_flag: "",
    };
  },
  components: {
    TopTip,
    ResultTip,
  },
  computed: mapState(["language", "lang", "lottery", "userData"]),
  methods: {
    getRandom(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    radColor() {
      var index = this.getRandom(0, this.colors.length);
      return this.colors[index];
    },
    async startHandle() {
      // console.log("start lottery ...");
      this.lottery.auth = false; // 使用一次机会使用完毕后关闭
      await this.preRandom();
      this.lottery.value = this.randomArrs[this.randomArrs.length - 1]; // last
      // console.log(`抽奖结果为: ${this.lottery.value}`);
      await this.showTask();
      // write store
      // console.log("抽奖之前的本金 ", this.userData.deposit);
      const newValue = +this.userData.deposit + +this.lottery.value;
      this.userData.deposit = newValue;
      // console.log(this.lottery.value, this.userData.deposit);
      //  back
      this.$router.go(-1);
    },

    randomFunc() {
      const itemNum = this.getRandom(1, 30);
      this.$refs.box.style.color = this.radColor();
      this.$refs.box.innerHTML = itemNum;
      this.randomArrs.push(itemNum);
    },
    async preRandom() {
      this.randomArrs = [];
      for (let i = 1; i <= 8; i++) {
        // setInterval(() => {
        //   this.randomFunc();
        //   console.log('for i ',i)
        // }, 1000);
        this.randomFunc();
        await delay(400);
      }
    },
    async showTask() {
      if (this.lang === "cn") {
        this.workDone_content = `抽奖结果为 ${this.lottery.value}元 将会自动进入您的存款中!`;
      } else if (this.lang === "en") {
        this.workDone_content = `Lottery result ${this.lottery.value}￥, become deposit !`;
      }
      await this.delayShow_result();
    },
    /**
     * 展示给用户一定的时间
     */
    async delayShow_result() {
      this.workDone_status = true;
      await delay(3000);
      this.workDone_status = false;
      this.workDone_content = "";
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";

.lottery-container {
  min-width: 1000px;
  .box {
    width: 400px;
    height: 200px;
    background-color: #000;
    border-radius: 20px;
    text-align: center;
    line-height: 200px;
    margin-top: 10px;
    // position: absolute;
    // margin: 0 auto;
    font-size: 7em;
    font-weight: bolder;
    margin-left: 38%;
    margin-top: 7%;
    box-shadow: 5px 12px 30px 10px rgba(236, 130, 8, 0.4);
  }
  button {
    margin-left: 47%;
    margin-top: 5%;
  }
  .retsult-tip {
    background-color: white;
    .self-fill();
  }
}
</style>