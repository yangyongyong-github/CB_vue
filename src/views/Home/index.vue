<template>
  <div class="home-container">
    <TopTip IconType="yuque" tipText="欢迎来到 中国银行！" />

    <div class="banner">
      <div class="swipper">
        <a-carousel autoplay>
          <img
            :src="item.img"
            alt=""
            v-for="(item, index) in swiperImgs"
            :key="index"
          />
        </a-carousel>
      </div>
      <aside>
        <div class="desc">
          <h2>重要公告</h2>
          <ul>
            <li v-for="(item, index) in descLists" :key="index">
              <a :href="item.link">{{ item.title }}</a>
            </li>
          </ul>
        </div>
        <div class="hand-server">
          <h2>便捷服务</h2>
          <div class="items">
            <div class="show" v-for="(item, index) in serverLists" :key="index">
              <a :href="item.link">
                <img :src="item.src" :alt="item.title" /><br />{{
                  item.title
                }}</a
              >
            </div>
          </div>
        </div>
      </aside>
    </div>

    <div class="line">
      <RateShow />
      <!-- 使用日历组件 -->
      <div class="calendar">
        <a-calendar :fullscreen="false" />
      </div>
    </div>

    <footer>
      <PureFooter />
    </footer>
  </div>
</template>

<script>
import TopTip from "@/components/TopTip";
import PureFooter from "@/components/PureFooter";
import RateShow from "@/components/RateShow";
// server imgs
import serImg0 from "@/assets/home/server-price-icon.gif";
import serImg1 from "@/assets/home/client-icon.gif";
import serImg2 from "@/assets/home/e-icon.gif";
import serImg3 from "@/assets/home/application-icon.gif";

// swiper imgs
import swImg0 from "@/assets/home-img0.jpg";
import swImg1 from "@/assets/home-img1.jpg";
import swImg2 from "@/assets/home-img2.jpg";
import swImg3 from "@/assets/home-img3.jpg";

export default {
  data() {
    return {
      swiperImgs: [
        { img: swImg0, link: "" },
        { img: swImg1, link: "" },
        { img: swImg2, link: "" },
        { img: swImg3, link: "" },
      ],
      descLists: [
        {
          title: "2022年贺岁普通纪念币预约、兑换公告",
          link: "https://www.boc.cn/custserv/bi2/bi2o/202201/t20220105_20540476.html",
        },
        {
          title: "在售理财产品列表(2022年1月7日更新)",
          link: "https://www.boc.cn/fimarkets/cs8/201109/t20110922_1532694.html",
        },
        {
          title: "关于2022年1月2日系统升级期间暂停投资",
          link: "https://www.boc.cn/fimarkets/bi2/202112/t20211231_20532750.html",
        },
      ],
      serverLists: [
        {
          title: "手机客户端",
          src: serImg0,
          link: "https://www.bankofchina.com/ebanking/service/cs1/201009/t20100921_1151946.html",
        },
        {
          title: "服务价目",
          src: serImg1,
          link: "https://www.bankofchina.com/custserv/fd5/202006/t20200629_18057046.html",
        },
        {
          title: "中银企E贷款",
          src: serImg2,
          link: "https://www.bank-of-china.com/ebanking/online/202101/t20210105_18941711.html",
        },
        {
          title: "申请信用卡",
          src: serImg3,
          link: "https://www.bank-of-china.com/ebanking/online/201310/t20131024_2567778.html",
        },
      ],
    };
  },
  components: {
    TopTip,
    RateShow,
    PureFooter,
  },
};
</script>
<style lang="less" scoped>
@import "./style.less";
</style>