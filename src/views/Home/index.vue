<template>
  <div class="home-container">
    <TopTip IconType="yuque" :tipText="language.TopTip_Home[lang]" />

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
import { mapState } from "vuex";
import TopTip from "@/components/TopTip";
import PureFooter from "@/components/PureFooter";
import RateShow from "@/components/RateShow";

import {swiperImgs, descLists, serverLists} from './mock'

export default {
  data() {
    return {
      swiperImgs,
      descLists,
      serverLists,
    };
  },
  components: {
    TopTip,
    RateShow,
    PureFooter,
  },
  computed: mapState(["language", "lang"]),
};
</script>
<style lang="less" scoped>
@import "./style.less";
</style>