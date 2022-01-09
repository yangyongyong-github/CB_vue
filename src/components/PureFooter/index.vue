<template>
  <div class="footer-container">
    <div class="game">
      <h3 class="title">2020北京冬奥会: 一起上冰雪 携手向未来</h3>
      <div class="img">
        <img src="@/assets/introduce/game.jpg" alt="" />
      </div>
      <div class="text">
        <p>
          携手冬奥，筑梦冰雪。作为北京2022年冬奥会唯一官方银行合作伙伴，中国银行始终致力于构建“金融+体育”场景生态圈，不断创新金融服务模式，提升综合服务实力。在迎来北京冬奥会倒计时50天之际，让我们一同回顾双奥中行与北京冬奥的精彩瞬间。
          <!-- <span class="guide"><a href="https://www.bankofchina.com/aboutboc/Beijing2022/">更多...</a> </span> -->
        </p>
      </div>
    </div>

    <footer>
      <div class="one">
        <div>
          <b> 客户服务与投诉热线</b>：<span class="num">95566</span>
          (中国境内)；+86(区号) <span class="num">95566</span> (中国境外)
        </div>
        <div>
          <b> 信用卡客服与投诉热线</b>：<span class="num">40066-95566</span>
          (中国境内)；<span class="num"></span>
          <span class="num">+86-10-66085566</span>(中国境外)
        </div>
      </div>
      <div class="two">
        <div>
          <span>网站地图</span> <span>版权声明</span> <span>使用条款</span>
          <span> 联系我们</span
          ><span>京ICP备10052455号-1 京公网安备110102002036号</span>
          <p>Copyright© BANK OF CHINA(BOC) All Rights Reserved.</p>
        </div>
        <div>
          <img src="@/assets/bk-logo.png" alt="" />
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="less" scoped>
@import "~@/views/Introduce/common.less";
@import '~@/styles/mixin.less';

.footer-container {
  .game {
    margin-top: 80px;
    margin-bottom: 150px;
    .border-shadow-style-A();
    position: relative;

    div.img {
      display: flex;
      justify-content: center;
    }

    div.text {
      width: 56%;
      position: absolute;
      bottom: -12%;
      left: 22%;
      background-color: white;
      font-family: cursive;
      font-weight: bold;
      .border-shadow-style-A();
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
    }
  }

  footer {
    width: 100%;
    // border: 1px dotted;
    box-sizing: border-box;
    overflow: hidden;
    padding-left: 200px;
    font-size: 0.9em;
    margin-top: 80px;

    .one {
      padding-left: 80px;
      width: 75%;
      display: flex;
      border-bottom: 2px solid;
      padding-bottom: 10px;
      margin: 10px 0;
    }

    .two {
      width: 100%;

      display: flex;
      padding-left: 100px;

      span {
        margin-right: 10px;
        padding-right: 10px;
        border-right: 2px solid;

        &:last-child {
          border-right: none;
        }
      }

      img {
        width: 120px;
        margin-left: 50px;
      }
    }

    span.num {
      font-size: 0.8em;
      color: rgb(212, 86, 86);
    }
  }
}
</style>