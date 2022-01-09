<template>
  <div class="introduce-container" ref="mainContainer">
    <h3 class="page-title">中国银行 简介 China Bank Introduce</h3>

    <div class="base">
      <div class="img-brief">
        <div class="text">
         
          <div class="left">
            <div class="item">
              <div class="tit">公司名称</div>
              <div class="content">中国银行</div>
            </div>
            <div class="item">
              <div class="tit">外文名</div>
              <div class="content">BANK OF CHINA</div>
            </div>
            <div class="item">
              <div class="tit">所属行业</div>
              <div class="content">金融</div>
            </div>
            <div class="item">
              <div class="tit">成立时间</div>
              <div class="content">1912年2月5号</div>
            </div>
            <div class="item">
              <div class="tit">总部地点</div>
              <div class="content">
                <span class="blue">北京</span>复兴门内大街1号
              </div>
            </div>
            <div class="item">
              <div class="tit">经营范围</div>
              <div class="content">
                <span class="blue"
                  >商业银行、投资银行、基金、保险、航空租赁</span
                >
                等
              </div>
            </div>
          </div>
          <div class="left">
            <div class="item">
              <div class="tit">公司类型</div>
              <div class="content">
                <span class="blue">中央企业</span> (副部级单位)
              </div>
            </div>
            <div class="item">
              <div class="tit">年营业额</div>
              <div class="content">1350.91亿美元</div>
            </div>
            <div class="item">
              <div class="tit">员工数</div>
              <div class="content">309384人</div>
            </div>
            <div class="item">
              <div class="tit">战略目标</div>
              <div class="content">建设全球一流现代银行集团</div>
            </div>
            <div class="item">
              <div class="tit">世界500强</div>
              <div class="content">第39位(2021年)</div>
            </div>
            <div class="item">
              <div class="tit">官网</div>
              <div class="content">http://www.boc.cn/</div>
            </div>
            <div class="item">
              <div class="tit">党委书记</div>
              <div class="content">刘连舸</div>
            </div>
            <div class="item">
              <div class="tit">行长</div>
              <div class="content">刘金</div>
            </div>
          </div>
        </div>

        <div class="map">
          <img src="@/assets/introduce/map.png" alt="" />
          <div>
            <b>中国银行总行</b> <br />
            <span>地址:北京市复兴门内大街1号</span> <br />
            <span>邮编:100818</span>
          </div>
        </div>
      </div>
    </div>

    <div class="history">
      <!-- <title> </title> -->
      <h3 class="title">中华民国顺势成立，中国银行应运而生（1912年）</h3>

      <!-- img-1 -->
      <div class="introduce-img-area">
        <div class="img">
          <img src="@/assets/introduce/old-address.jpg" alt="" />
          <p class="img-title">
            大清银行旧址，1912年2月5日，中国银行在此开业
            （上海汉口路3号，后改为汉口路50号）
          </p>
        </div>
        <!-- img-2 -->
        <div class="img">
          <img src="@/assets/introduce/files.jpg" alt="" />
          <p class="img-title">
            大清银行商股联合会呈请孙中山批准成立中国银行文
          </p>
        </div>
        <!-- img-3 -->
        <div class="img">
          <img src="@/assets/introduce/people.jpg" alt="" />
          <p class="img-title">大清银行第一次官商会议全体人员的合影</p>
        </div>
      </div>
      <div class="introduce-text-area">
        <p>
          鸦片战争后，外国银行涌入中国，通过垄断国际汇兑业务、资本输出、政治贷款、发钞、经营中国对外赔款等手段，扼住了中国金融、财政的咽喉。1895年甲午战争后，外国资本大量涌进国门，中国的金融、财政状况更加恶化。19世纪末，国内有识之士倡导兴办银行，“以中国之银，供中国之用”。
          中国银行的前身是中国第一家国家银行——户部银行。
        </p>
        <p>
          大清银行为官商合办的股份制银行，股本总额1000万两白银，官商各占半数。辛亥革命爆发后，作为清政府中央银行的大清银行，除上海分行外，分支机构绝大部分已经停业。为了保全商本，以大清银行秘书长项藻馨为主的大清银行股东，于1911年11月5日成立了股东联合会，并于11月14日发布公告，公告的主要内容为：接各处分行报告，军政府有误认大清银行全系官股，取去现洋庄折等要件，甚至将行员拘留，账款紊乱，事机万急；要求股东于11月18日到汉口路开会商讨对策。参加股东会一系列活动的主要是大清银行浙江籍股东及部分高级负责人。1911年12月4日，股东联合会改名为“商股联合会”。
        </p>
        <p>
          伴随着中华民国的诞生，中国银行成立了。伴随着中国近现代金融业的发展，中国银行开始了她不寻常的前进历程。
          <span class="guide"
            ><a
              href="https://www.boc.cn/aboutboc/ab7/200809/t20080926_6931.html"
              >更多...</a
            >
          </span>
        </p>
      </div>
    </div>

    <PureFooter />
  </div>
</template>

<script>
import mainScroll from '@/mixins/mainScroll'
import PureFooter from "@/components/PureFooter";
export default {
  data() {
    return {};
  },
  components: {
    PureFooter,
  },
  methods: {},
  mixins:[mainScroll("mainContainer")]
};
</script>

<style lang="less" scoped>
@import "./common.less";
@import "./style.less";
</style>