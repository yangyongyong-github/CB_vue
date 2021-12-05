import Vue from 'vue'
import Vuex from 'vuex'
import loginUser from "./loginUser"
import useri_loginUser from "./useri_loginUser"
import userii_loginUser from "./userii_loginUser"
import rate from "./rate"
import userii from "./userii"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loginUser,
    useri_loginUser,
    userii_loginUser,
    rate,
    userii
  }
})
