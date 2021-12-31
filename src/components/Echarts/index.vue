<template>
  <div class="one-container">
    <div class="charts" ref="chart"></div>
  </div>
</template>

<script>
const echarts = require("echarts");

export default {
  props: {
    // chartsClass: {
    //   type: String,
    //   required: false,
    // },
    // chartsId: {
    //   type: String,
    //   required: true,
    // },
    // ref: {
    //   type: String,
    //   required: true,
    // },
  },
  mounted() {
    this.initCharts();
  },
  methods: {
    initCharts() {
      let myChart = echarts.init(this.$refs.chart);
      // 绘制图表
      myChart.setOption({
        title: {
          // title style
          text: "ChinaBank fund",
          subtext: "CB",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",//horizontal
          left: "left",
        },

        series: [
          {
            name: "ChinaBank fund",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
  },
};
</script>
<style lang="less" scoped>
.charts {
  width: 500px;
  height: 250px;
  border: 2px rgb(92, 247, 20) solid;
  padding: 0;
}
</style>