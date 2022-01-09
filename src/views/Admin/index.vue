<template>
  <div class="admin-container">
    <TopTip IconType="team" tipText="银行有我来守护~" />

    <header>
      <!-- base info -->
      <!-- 不同的等级显示不同的提示语 -->
      <div class="rank-show">
        <div class="high" v-if="userData.rank === 'h'">欢迎管理银行资产！</div>
        <div class="common" v-else-if="userData.rank === 'c'">
          欢迎管理银行用户信息！
        </div>
        <div v-else>你是什么身份？</div>
      </div>
      <div class="name">
        <span class="guide">Name: </span> {{ userData.name }}
      </div>
      <div class="login-id">
        <span class="guide">LoginId : </span> {{ userData.loginId }}
      </div>
      <div class="rank">
        <span class="guide">Rank : </span> {{ userData.rank | FilterRank }}
      </div>
      <!-- 该按钮只针对高级管理员显示 -->
      <div class="common-op-btn" v-show="userData.rank === 'h'">
        普通操做区域:
        <button @click="handlecommonOP">
          {{ highFormData.commonOP | FilterComOP }}
        </button>
      </div>
    </header>
    <div class="page-title">银行管理员登录界面</div>
    <div class="main-operation">
      <!-- 主要的操做区域 -->
      <div class="high" v-if="userData.rank === 'h'">
        <div class="mt"><!-- 占位，拉开间距 margin-top --></div>
        <!-- 【part-2 用户情况 】 -->
        <div class="users-status">
          <div class="user-status">
            <div class="overall">
              <span class="indicate">目前在账资金:</span>
              <span class="num1"> {{ All_Fund }}</span>

              <span class="indicate ml"> 银行流动资金:</span>
              <span class="num1"> {{ All_FundWater }}</span>
            </div>

            <p class="users-nums">
              <span class="tit ml">用户情况 </span>
              <span class="indicate ml">用户总数:</span>
              <span class="num2"> {{ All_Users }}</span>
            </p>
            <!-- useri 总数 -->
            <div class="useri">
              <span class="indicate">Loan 用户总数:</span>
              <span class="num2"> {{ usersData[0].length }}</span>

              <span class="indicate ml">用户总贷款:</span>
              <b>{{ All_Loan_I }}</b>
              <span class="indicate ml">用户总贷款利息:</span>
              <b> {{ All_Interest_I }}</b>
            </div>
            <div class="userii">
              <span class="indicate">Deposit 用户总数:</span>
              <span class="num2"> {{ usersData[1].length }}</span>

              <span class="indicate ml">用户总存款:</span>
              <b> {{ All_Deposit_II }}</b>
              <span class="indicate ml">用户总存款利息:</span>
              <b>{{ All_Interest_II }}</b>
            </div>

            <div class="fund-alay">
              <div>
                <span class="indicate">存款用户-资金占比(在用户资金中):</span>
                <span class="num3"> {{ Persent_Deposit_fund }}</span>
                <span class="indicate ml">存款用户-人数占比:</span>
                <span class="num3"> {{ Persent_Deposit_user }}</span>
              </div>
              <div>
                <span class="indicate">贷款用户-资金占比(在用户资金中):</span>
                <span class="num3"> {{ Persent_Loan_fund }}</span>
                <span class="indicate ml">贷款用户-人数占比:</span>
                <span class="num3"> {{ Persent_Loan_user }}</span>
              </div>
              <div>
                <span class="indicate"> 银行本金-资金占比:</span>
                <span class="num3"> {{ Persent_Bank_corpus }}</span>
                <span class="indicate ml"> 用户资金-资金占比:</span>
                <span class="num3"> {{ Persent_users_corpus }}</span>
              </div>
            </div>
          </div>
          <div class="charts" ref="chart">
            <!-- charts -->
          </div>
        </div>
        <!-- 【part-3】 银行汇率控制 添加和增减 -->
        <div class="rate-op">
          <p>
            银行汇率
            <button @click="toOpRate">修改</button>
          </p>

          <!-- 查看 -->
          <table>
            <thead>
              <tr>
                <td>大额存款起薪(元)</td>
                <td>中额存款起薪(元)</td>
                <td>大额贷款限制数额(元)</td>
                <td>大额存款(>3年)</td>
                <td>大额存款(1-3年)</td>
                <td>中额存款(>3年)</td>
                <td>中额存款(1-3年)</td>
                <td>长期贷款(>5年)</td>
                <td>中期贷款(3-5年)</td>
                <td>短期贷款(1-3年)</td>
              </tr>
            </thead>
            <tbody>
              <td>{{ rateData.A }}</td>
              <td>{{ rateData.B }}</td>
              <td>{{ rateData.C }}</td>
              <td>{{ rateData.A_3 }}</td>
              <td>{{ rateData.A_1 }}</td>
              <td>{{ rateData.B_3 }}</td>
              <td>{{ rateData.B_1 }}</td>
              <td>{{ rateData.L_l }}</td>
              <td>{{ rateData.L_m }}</td>
              <td>{{ rateData.L_s }}</td>
            </tbody>
          </table>

          <!-- 修改 -->
          <div class="alter-rate" v-show="highFormData.alterRate_Flag">
            <b class="guide">请选择需要修改的利率类型</b>
            <select v-model="highFormData.rateCategory">
              <option
                v-for="(item, index) in rateDataLists"
                :key="index"
                :value="item.value"
              >
                {{ item.title }}
              </option>
            </select>
            <label>
              <b class="guide">请输入对应的利率/数额</b>
              <input type="number" v-model="highFormData.rateInput"
            /></label>
            <button @click="toAlertRate">提交</button>
          </div>
        </div>

        <!--【part-1】 银行本金 : 操做-增减 -->
        <div class="corpus">
          <div>
            <span class="tit">银行资金</span>

            <span class="num1"> {{ bankData.corpus }}</span> 元(人民币)
            <button @click="toOpCorpus">修改</button>
          </div>

          <div class="corpus-op" v-show="highFormData.corpusFlag">
            <!-- 不能直接赋值，必须采用增减的形式，以及点击确定等，避免点击失误 -->

            <div class="input-corpus">
              <input
                type="number"
                class="corpus-control"
                v-model="highFormData.corpus"
              />

              <label for=""
                >增加
                <input
                  type="radio"
                  name="corpusOP"
                  value="increase"
                  v-model="highFormData.corpusCategory"
              /></label>

              <label for=""
                >减少<input
                  type="radio"
                  name="corpusOP"
                  value="decrease"
                  v-model="highFormData.corpusCategory"
              /></label>

              <button @click="toAlterCorpus">提交</button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt"><!-- 占位，拉开间距 margin-top --></div>
      <div
        class="common"
        v-show="userData.rank === 'c' || highFormData.commonOP === true"
      >
        <!-- 查找和操做用户 -->
        <div class="work-user">
          <div class="query-user">
            <div><b>查找指定用户</b></div>
            <div>
              <span class="guide">请输入待查用户账号</span>
              <input type="text" v-model="com_OP_FormData.userAccount" />
            </div>
            <div>
              <span class="guide">请选择用户的类型</span>
              <select v-model="com_OP_FormData.userCategory">
                <option value="useri">I</option>
                <option value="userii">II</option>
              </select>
            </div>
            <div><button @click="toQueryUser">查询</button></div>
          </div>
          <div class="some-set-op"></div>
          <div class="query-result">
            <p class="guide tip-t">查询结果:</p>

            <div class="useri result" v-if="userQueryData.flag === 'useri'">
              <!-- useri -->
              <b>用户类型:I</b>
              <div class="line">
                <div>
                  <span class="guide">Name:</span>{{ userQueryData.name }}
                </div>
                <div>
                  <span class="guide">Gender:</span
                  >{{ userQueryData.sex | FilterSex }}
                </div>
                <div>
                  <span class="guide">Birthday:</span
                  >{{ userQueryData.birthday | FilterBirthday }}
                </div>
                <div>
                  <span class="guide">Age:</span>{{ userQueryData.age }}
                </div>
                <div>
                  <span class="guide">Account:</span>{{ userQueryData.account }}
                </div>
                <div>
                  <span class="guide">LoginID:</span>{{ userQueryData.loginId }}
                </div>
                <div>
                  <span class="guide">Mobile:</span>{{ userQueryData.mobile }}
                </div>
                <div>
                  <span class="guide">Job:</span>{{ userQueryData.job }}
                </div>
                <div>
                  <span class="guide">Limited:</span>{{ userQueryData.limited }}
                </div>
                <div>
                  <span class="guide">isFreezed:</span
                  >{{ userQueryData.isFreezed }}
                </div>
              </div>
              <div class="line">
                <div>
                  <span class="guide">Ident:</span>{{ userQueryData.ident }}
                </div>
                <div>
                  <span class="guide">loan:</span>{{ userQueryData.loan }}
                </div>
                <div>
                  <span class="guide">Interest:</span
                  >{{ userQueryData.interest }}
                </div>
                <div>
                  <span class="guide">Flag:</span>{{ userQueryData.flag }}
                </div>
                <div>
                  <span class="guide">Company:</span>{{ userQueryData.company }}
                </div>
                <div>
                  <span class="guide">Cause:</span>{{ userQueryData.cause }}
                </div>
              </div>
              <div class="line admin-op">
                <span class="guide"
                  >是否被冻结: {{ userQueryData.isFreezed }}
                  <button @click="toFreezedUser">
                    {{ userQueryData.isFreezed | FilterFreezed }}
                  </button>
                </span>

                <span class="guide"
                  >大额贷款限制: {{ userQueryData.limited }}
                  <button @click="toLimtedUser">
                    {{ userQueryData.limited | FilterLimited }}
                  </button>
                </span>
                <span class="guide">
                  <button @click="toDeleteUser">删除用户</button>
                  <!-- <a-popconfirm
                    placement="top"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="confirm"
                  >
                   <button @click="toDeleteUser">删除用户</button>
                  <p>确定要删除?</p>
                  </a-popconfirm> -->
                </span>
                <span class="guide">
                  <button @click="toAlertUserInfo">修改用户信息</button>
                </span>
              </div>
              <!-- 管理员点击是否需要修改用户信息区域 style-common.css -->
              <div
                class="alter-user-info"
                v-show="com_OP_FormData.userInfoAlert"
              >
                <b>修改用户信息</b>
                <div>
                  <!-- alter-pwd -->
                  <b class="guide">修改密码</b>
                  <label class="guide"> 请输入新密码: </label>
                  <input type="text" v-model="alter_userInfo.newPsw" />
                </div>
                <div>
                  <!-- alter-mobile --><b class="guide">修改联系电话</b>
                  <label class="guide"> 请输入新联系电话: </label>
                  <input type="number" v-model="alter_userInfo.newMobile" />
                </div>
                <div>
                  <!-- alter-job -->
                  <b class="guide">修改工作</b>
                  <label class="guide"> 请输入新工作: </label>
                  <input type="text" v-model="alter_userInfo.newJob" />
                </div>
                <button @click="toSubmit_alterUserInfo">提交</button>
              </div>
            </div>
            <div
              class="userii result"
              v-else-if="userQueryData.flag === 'userii'"
            >
              <!-- userii -->
              <b>用户类型:II</b>

              <div class="line">
                <div>
                  <span class="guide">Name:</span>{{ userQueryData.name }}
                </div>
                <div>
                  <span class="guide">Gender:</span
                  >{{ userQueryData.sex | FilterSex }}
                </div>
                <div>
                  <span class="guide">Birthday:</span
                  >{{ userQueryData.birthday | FilterBirthday }}
                </div>
                <div>
                  <span class="guide">Age:</span>{{ userQueryData.age }}
                </div>
                <div>
                  <span class="guide">Account:</span>{{ userQueryData.account }}
                </div>
                <div>
                  <span class="guide">LoginID:</span>{{ userQueryData.loginId }}
                </div>
                <div>
                  <span class="guide">Mobile:</span>{{ userQueryData.mobile }}
                </div>
                <div>
                  <span class="guide">Job:</span>{{ userQueryData.job }}
                </div>

                <div>
                  <span class="guide">isFreezed:</span
                  >{{ userQueryData.isFreezed }}
                </div>
              </div>
              <div class="line">
                <div>
                  <span class="guide">deposit:</span>{{ userQueryData.deposit }}
                </div>
                <div>
                  <span class="guide">Interest:</span
                  >{{ userQueryData.interest }}
                </div>
                <div>
                  <span class="guide">Flag:</span>{{ userQueryData.flag }}
                </div>
              </div>
              <div class="line admin-op">
                <span class="guide"
                  >是否被冻结: {{ userQueryData.isFreezed }}
                  <button @click="toFreezedUser">
                    {{ userQueryData.isFreezed | FilterFreezed }}
                  </button>
                </span>

                <span class="guide">
                  <button @click="toDeleteUser">删除用户</button>
                </span>
                <span class="guide">
                  <button @click="toAlertUserInfo">修改用户信息</button>
                </span>
              </div>
              <!-- 管理员点击是否需要修改用户信息区域 style-common.css -->
              <div
                class="alter-user-info"
                v-show="com_OP_FormData.userInfoAlert"
              >
                <b>修改用户信息</b>
                <div>
                  <!-- alter-pwd -->
                  <b class="guide">修改密码</b>
                  <label class="guide"> 请输入新密码: </label>
                  <input type="text" v-model="alter_userInfo.newPsw" />
                </div>
                <div>
                  <!-- alter-mobile --><b class="guide">修改联系电话</b>
                  <label class="guide"> 请输入新联系电话: </label>
                  <input type="number" v-model="alter_userInfo.newMobile" />
                </div>
                <div>
                  <!-- alter-job -->
                  <b class="guide">修改工作</b>
                  <label class="guide"> 请输入新工作: </label>
                  <input type="text" v-model="alter_userInfo.newJob" />
                </div>
                <button @click="toSubmit_alterUserInfo">提交</button>
              </div>
            </div>
            <div v-else></div>
          </div>
        </div>

        <div class="mt"><!-- 占位，拉开间距 margin-top --></div>
        <!-- 展示用户信息,动态渲染 -->
        <div class="users-show">
          <p class="users-show-title">
            存/贷款 <span class="nums">前3位</span> 用户信息
          </p>
          <!-- I -->
          <h4>User_I Loan user</h4>
          <table class="user-i">
            <thead>
              <tr class="guide">
                <td>Name</td>
                <td>Sex</td>
                <td>Birthday</td>
                <td>Age</td>
                <td>Account</td>
                <td>LoginID</td>
                <td>mobile</td>
                <td>job</td>
                <td>limited</td>
                <td>isFreezed</td>
                <td>ident</td>
                <td>loan</td>
                <td>interest</td>
                <td>company</td>
                <!-- <td>cause</td> -->
                <td>flag</td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in usersData[0]"
                :key="index"
                v-show="item.deletedAt === null"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.sex | FilterSex }}</td>
                <td>{{ item.birthday | FilterBirthday }}</td>
                <td>{{ item.age }}</td>
                <td>{{ item.account }}</td>
                <td>{{ item.loginId }}</td>
                <td>{{ item.mobile }}</td>
                <td>{{ item.job }}</td>
                <td>{{ item.limited }}</td>
                <td>{{ item.isFreezed }}</td>
                <td>{{ item.ident }} ({{ item.ident | FilterIdent }})</td>
                <td>{{ item.loan }}</td>
                <td>{{ item.interest }}</td>
                <td>{{ item.company }}</td>
                <!-- <td>{{ item.cause }}</td> -->
                <td>{{ item.flag }}</td>
              </tr>
            </tbody>
          </table>
          <!-- II -->
          <h4>User_II Deposit user</h4>
          <table class="user-ii">
            <thead>
              <tr class="guide">
                <td>Name</td>
                <td>Sex</td>
                <td>Birthday</td>
                <td>Age</td>
                <td>Account</td>
                <td>LoginID</td>
                <td>mobile</td>
                <td>job</td>
                <td>isFreezed</td>
                <td>deposit</td>
                <td>interest</td>
                <td>flag</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in usersData[1]" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ item.sex | FilterSex }}</td>
                <td>{{ item.birthday | FilterBirthday }}</td>
                <td>{{ item.age }}</td>
                <td>{{ item.account }}</td>
                <td>{{ item.loginId }}</td>
                <td>{{ item.mobile }}</td>
                <td>{{ item.job }}</td>
                <td>{{ item.isFreezed }}</td>
                <td>{{ item.deposit }}</td>
                <td>{{ item.interest }}</td>
                <td>{{ item.flag }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TopTip from "@/components/TopTip";
import * as MATH from "@/utils";
const echarts = require("echarts");
export default {
  inject: ["reload"], // 友好的刷新界面
  data() {
    return {
      /**
       * admin alter rate
       */
      rateDataLists: [
        { title: "大额存款起薪", value: "A" },
        { title: "中额存款起薪", value: "B" },
        { title: "大额贷款限制", value: "C" },
        { title: "大额存款(>3年)", value: "A_3" },
        { title: "大额存款(1-3年)", value: "A_1" },
        { title: "中额存款(>3年)", value: "B_3" },
        { title: "中额存款(1-3年)", value: "B_1" },
        { title: "长期贷款(>5年)", value: "L_l" },
        { title: "中期贷款(3-5年)", value: "L_m" },
        { title: "短期贷款(1-3年)", value: "L_s" },
      ],
      //高级管理员的操做表单
      highFormData: {
        /**
         * alter corpus
         */
        corpus: 0,
        corpusFlag: false, // show/hidden 修改corpus的按钮
        corpusCategory: "",
        /**
         * alter rate
         */
        alterRate_Flag: false, // show/hidden 修改利率的按钮
        rateInput: 0,
        rateCategory: "",
        /**
         * other
         */
        commonOP: true,
      },
      // 普通管理员的操做表单
      com_OP_FormData: {
        userAccount: "",
        userCategory: "",
        userInfoAlert: false,
      },
      // 管理员修改用户信息表单
      alter_userInfo: {
        newPsw: "",
        newMobile: "",
        newJob: "",
      },
    };
  },
  components: {
    TopTip,
  },
  mounted() {
    this.initCharts();
  },
  computed: {
    ...mapState({
      userData: (state) => state.userData,
      usersData: (state) => state.usersData,
      rateData: (state) => state.rateData,
      bankData: (state) => state.bankData,
      userQueryData: (state) => state.userQueryData,
    }),
    // useri 的 所有的贷款累计
    All_Loan_I() {
      return MATH.Sum(this.usersData[0], "loan");
    },
    // useri 的 所有的利息总计
    All_Interest_I() {
      return MATH.Sum(this.usersData[0], "interest");
    },
    // userii 的 所有的deposit累计
    All_Deposit_II() {
      return MATH.Sum(this.usersData[1], "deposit");
    },
    // useri 的 所有的利息总计
    All_Interest_II() {
      return MATH.Sum(this.usersData[1], "interest");
    },
    /**
     * 用户总数
     * useri+userii
     */
    All_Users() {
      return this.usersData[0].length + this.usersData[1].length;
    },
    /**
     * 流动资金
     * useri: loan+interest + userii: deposit+interest
     */
    All_FundWater() {
      // console.log(this.bankData.corpus*1)
      const useri = this.All_Loan_I + this.All_Interest_I;
      const userii = this.All_Deposit_II + this.All_Interest_II;

      return MATH.DecimalPos(useri + userii + this.bankData.corpus * 1, 2);
    },
    /**
     *
     * 目前在账资金 : AllFundWater - loan
     */
    All_Fund() {
      return MATH.DecimalPos(this.All_FundWater - this.All_Loan_I, 2);
    },
    // 银行本金资金占比
    Persent_Bank_corpus() {
      // 小数点后太多？
      // const num =
      //   MATH.DecimalPos(+this.bankData.corpus / this.All_FundWater, 2) *
      //   100;

      // return `${num} % `;
      return MATH.Persent(+this.bankData.corpus / +this.All_FundWater);
    },
    // 银行用户资金占比
    Persent_users_corpus() {
      const num =
        MATH.DecimalPos(
          (this.All_Loan_I +
            this.All_Interest_I +
            this.All_Deposit_II +
            this.All_Interest_II) /
            this.All_FundWater,
          2
        ) * 100; // 还是有小数位？进一步约束
      const newNum = MATH.DecimalPos(num, 2);
      return `${newNum} % `;
    },

    // 存款用户资金占比(在用户资金中)
    Persent_Deposit_fund() {
      const num =
        MATH.DecimalPos(
          (this.All_Loan_I + this.All_Interest_I) / this.All_FundWater,
          2
        ) * 100;
      return `${num} % `;
    },
    // 贷款用户占比
    Persent_Loan_fund() {
      const num =
        MATH.DecimalPos(
          1 - (this.All_Loan_I + this.All_Interest_I) / this.All_FundWater,
          2
        ) * 100;
      return `${num} % `;
    },
    // 存款用户人数占比
    Persent_Deposit_user() {
      const num = MATH.DecimalPos(
        this.usersData[1].length /
          (this.usersData[0].length + this.usersData[1].length),
        2
      );
      return MATH.Persent(num);
    },
    // 贷款用户人数占比(在用户资金中)
    Persent_Loan_user() {
      const num = MATH.DecimalPos(
        1 -
          this.usersData[1].length /
            (this.usersData[0].length + this.usersData[1].length),
        2
      );
      return MATH.Persent(num);
    },

    /**
     *收益=贷款利息-存款利息
      1. 贷款利息一定大于存款利息吗？ 数据库中的借款变动是很大的影响因素
     */
    // // 数额
    // Bank_fund_income() {
    //   const num = MATH.DecimalPos(All_Interest_I * 1 - All_Interest_II * 1, 2);
    //   return MATH.Persent(num);
    // },
    // // 占比
    // Persent_Bank_fund_income() {},
  },
  filters: {
    /**
     * 过滤显示管理员的等级
     */
    FilterRank(value) {
      if (value === "h") {
        return "高级管理员";
      } else if (value === "c") {
        return "管理员";
      }
    },
    FilterBirthday(value) {
      return MATH.formatDate(value, false);
    },
    FilterSex(value) {
      if (value === true) {
        return "男";
      } else {
        return "女";
      }
    },
    FilterIdent(value) {
      if (+value === 1) {
        return "个人";
      } else {
        return "企业";
      }
    },
    FilterInDe(value) {
      if (value === "increase") {
        return "+";
      } else if (value === "decrease") {
        return "-";
      } else {
        return;
      }
    },
    // 冻结/解冻 用户
    FilterFreezed(value) {
      if (value === true) {
        return "解冻";
      } else {
        return "冻结";
      }
    },
    // 设置/取消 大额带宽限制
    FilterLimited(value) {
      if (value === true) {
        return "取消";
      } else {
        return "设置";
      }
    },
    FilterComOP(value) {
      if (value === true) {
        return "隐藏";
      } else {
        return "显示";
      }
    },
  },
  methods: {
    /**
     * writeDB
     * common func
     * apply : alter user
     */
    async writeDB() {
      console.log(
        "> 管理员修改了用户信息，在写入数据库之前 : ",
        this.userQueryData
      );
      const result = await this.$store.dispatch("update", this.userQueryData);
      if (result) {
        console.log("> 管理员修改了用户信息，在写入数据库之后 : ", result);
        alert("alter done");
      } else {
        alert("alter fail");
      }
    },
    /**
     * admin aler user ------------
     */
    // delete user
    async toDeleteUser() {
      const resu = confirm("comfire to delete ?");
      if (!resu)  return;

      const deleResu = await this.$store.dispatch("deleteUser", {
        account: this.userQueryData.account,
        flag: this.userQueryData.flag,
      });
      if (deleResu) {
        alert("delete done");
        // 重新获取所有用户数据
       await this.GetUsers();
       this.reload();
      } else {
        alert("delete user fail");
      }
    },
    // set limted
    async toLimtedUser() {
      const resu = confirm("comfire ?");
      if (!resu) {
        return;
      }
      this.userQueryData.limited = !this.userQueryData.limited;
      this.writeDB();
    },
    // set freezed
    async toFreezedUser() {
      const resu = confirm("comfire ?");
      if (!resu) {
        return;
      }
      this.userQueryData.isFreezed = !this.userQueryData.isFreezed;
      this.writeDB();
    },
    /**
     * 管理员点击修改用户信息
     */
    async toSubmit_alterUserInfo() {
      // 输入验证
      if (
        this.alter_userInfo.newJob &&
        this.alter_userInfo.newPwd &&
        this.alter_userInfo.newMobile
      ) {
        alert("修改框未输入任何信息，无需修改！");
        return;
      }

      /**
       * 有新值则赋予，没有则使用原来的值(一次性的，减少提交次数，性能)
       * -  该项没有填写为空值时，则直接使用原有的
       */

      this.userQueryData.job =
        this.alter_userInfo.newJob || this.userQueryData.job;
      this.userQueryData.password =
        this.alter_userInfo.newPsw || this.userQueryData.password;
      this.userQueryData.mobile =
        this.alter_userInfo.newMobile || this.userQueryData.mobile;

      // write db .
      await this.writeDB();
      // clear input
      this.alter_userInfo.newJob = "";
      this.alter_userInfo.newPwd = "";
      this.alter_userInfo.newMobile = "";
    },
    // ----------------------------------
    /**
     * 高级管理员 点击show/hidden 普通的管理员操作区域
     */
    handlecommonOP() {
      // 状态取反
      this.highFormData.commonOP = !this.highFormData.commonOP;
    },
    // 管理员点击, 是否需要修改用户信息区域的show/hidden
    toAlertUserInfo() {
      this.com_OP_FormData.userInfoAlert = !this.com_OP_FormData.userInfoAlert;
    },
    /**
     * 点击查询用户
     */
    async toQueryUser() {
      if (!this.com_OP_FormData.userAccount) {
        alert("Account is lack !");
        return;
      } else if (!this.com_OP_FormData.userCategory) {
        alert("Category is lack !");
        return;
      }
      console.log("query...");
      const result = await this.$store.dispatch("QueryUser", {
        account: this.com_OP_FormData.userAccount,
        flag: this.com_OP_FormData.userCategory,
      });
      if (result) {
        console.log("query result : ", result);
      } else {
        console.log("query result : null");
        return;
      }
    },

    /**
     * admin-high 是否需要点击管理资金
     */
    toOpCorpus() {
      this.highFormData.corpusFlag = !this.highFormData.corpusFlag; // 用户点击，不想操做时可以再次点击隐藏的
      // 操做完成，让其隐藏
    },
    /**
     * admin-high 是否需要点击 alter rate
     */
    toOpRate() {
      this.highFormData.alterRate_Flag = !this.highFormData.alterRate_Flag;
      // 操做完成，让其隐藏
    },
    /**
     * admin-high to alter rate
     */
    async toAlertRate() {
      // 1.1 输入验证
      if (
        this.highFormData.rateInput <= 0 ||
        this.highFormData.rateCategory === ""
      ) {
        alert("值缺失！");
        return;
      }

      // 1.2 提交前的确认
      const resu = confirm(
        `comfirme to alter rate  ${this.highFormData.rateCategory} = ${this.highFormData.rateInput}`
      );
      if (!resu) return; // 取消则不做操做

      // 2.1. this.highFormData.rateInput -> rateData(store)
      const categroy = this.highFormData.rateCategory; // rate category
      const value = this.highFormData.rateInput;
      this.rateData[categroy] = value;
      console.log("> rate alter of store : ", this.rateData);

      // 2.2 write to db
      const writeResult = await this.$store.dispatch("updateRate", {
        id: 1,
        rateObj: this.rateData,
      });
      if (writeResult) {
        alert("alter rate done ");
      } else {
        alert("alter rate fail ");
      }

      // clear
      this.highFormData.rateInput === 0;
      this.highFormData.rateCategory === "";
    },
    /**
     * 点击提交进行curpos操做
     * 追加，而非替换
     */
    async toAlterCorpus() {
      if (
        this.highFormData.corpusCategory === "" ||
        this.highFormData.corpus <= 0
      ) {
        alert("值缺失！");
        return;
      }

      const confirme = window.confirm(
        `再次确定 [${this.highFormData.corpusCategory}] : ${this.highFormData.corpus}元吗? `
      );

      if (!confirme) {
        // 如果选择取消，则不予操做
        this.highFormData.corpusFlag = false;
        // clear input
        this.highFormData.corpus = 0;
        this.highFormData.corpusCategory = null;
        return;
      }

      try {
        /**
         * 区分增减操做
         */
        if (this.highFormData.corpusCategory === "increase") {
          this.bankData.corpus = MATH.DecimalPos(
            +this.bankData.corpus + +this.highFormData.corpus,
            2
          );
        } else if (this.highFormData.corpusCategory === "decrease") {
          this.bankData.corpus = MATH.DecimalPos(
            +this.bankData.corpus - +this.highFormData.corpus,
            2
          );
        } else {
          return;
        }

        const alterResult = await this.$store.dispatch("updateBank", {
          id: "cb1", // bankId
          obj: this.bankData,
        });
        if (alterResult) {
          alert("bank alter done ");
        } else {
          alert("bank alter fail ");
        }

        // clear input
        this.highFormData.corpus = 0;
        this.highFormData.corpusCategory = null;

        this.reload(); // 刷新页面
      } catch (error) {
        console.log(error);
      }
    },
    // 获取部分用户信息
     async GetUsers() {
      console.log('重新获取所有用户数据...')
      const usersInfo = await this.$store.dispatch("getUsers");
      if (usersInfo) {
        // 通过该id 拿到了对应的 数据
        console.log("init [users] data : ", usersInfo);
      }
    },
  
    /**
     * charts
     */
    initCharts() {
      let myChart = echarts.init(this.$refs.chart);
      // 绘制图表
      myChart.setOption({
        title: {
          // title style
          text: "中国银行 资金组成部分",
          subtext: "",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical", //horizontal
          left: "left",
        },

        series: [
          {
            name: "ChinaBank fund",
            type: "pie",
            radius: "50%",
            data: [
              { value: this.bankData.corpus, name: "银行本金" },
              { value: this.All_Loan_I, name: "贷款用户-总贷款" },
              { value: this.All_Interest_I, name: "贷款用户-总利息" },
              { value: this.All_Deposit_II, name: "存款用户-总存款" },
              { value: this.All_Interest_II, name: "存款用户-总利息" },
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
@import "~@/styles/mixin.less";
@import "./styles.less";
@import "./common.css";
</style>