<template>
  <div class="lottery-container">
    <TopTip tipMsg="请先办理存款业务!" tipText="您有一次抽奖机会可用" />
    <div class="box" ref="box"></div>
    <button v-show="lottery.auth" @click="startHandle">Start</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import delay from "@/utils/delay";
import TopTip from "@/components/TopTip";

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
    };
  },
  components: {
    TopTip,
  },
  computed: mapState(["lottery", "userData"]),
  methods: {
    getRandom(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    radColor() {
      var index = this.getRandom(0, this.colors.length);
      return this.colors[index];
    },
    async startHandle() {
      console.log("start lottery ...");
      this.lottery.auth = false; // 使用一次机会使用完毕后关闭
      await this.preRandom();
      this.lottery.value = this.randomArrs[this.randomArrs.length - 1]; // last
      console.log("抽奖结果为:", this.lottery.value);
      alert(`抽奖结果为 ${this.lottery.value}元 将会自动进入您的存款中!`);
      // write store
      console.log('抽奖之前的本金 ',this.userData.deposit)
      const newValue = +this.userData.deposit + +this.lottery.value;
      this.userData.deposit = newValue;
      console.log( this.lottery.value, this.userData.deposit);
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
    margin-left: 50%;
    margin-top: 5%;
  }
}
</style>