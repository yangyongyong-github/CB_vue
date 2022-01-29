import { install } from "vuex";
import Vuex from 'vuex';
import Vue from 'vue';

import mutation from './mutations'
import action from "./actions"
import LanguagePackage from './languagePackage' // clinet 本地的，不用去server获取

// // temp, need to server 
// import rate from './rateTemp'
// import bank from './bankTemp'
// import users from './usersTemp'

Vue.use(Vuex)

if (!Vuex) {
  install(Vue);
}

const store = new Vuex.Store({

  // 仓库配置对象 全局
  state: {
    userData: null, // 登录后的用户信息 admin useri userii
    usersData: null, // 保存所有的用户信息, admin 之用
    bankData: null,
    rateData: null,
    lottery: { // 用户抽奖
      auth: false,// 用户是否可以抽象
      value: ''// 奖品 number
    },
    userQueryData: '', // 管理员点击查询用户后，从db中拿到的结果
    // UsersData: users, // temp
    // bankData: bank, // temp
    // rateData: rate, // temp
    isLoading: false,
    lang: 'cn',
    language: LanguagePackage
  },
  // 同步
  mutations: {
    ...mutation
  },
  // 异步
  actions: {
    ...action
  },
})

// window.store = store;

export default store;
