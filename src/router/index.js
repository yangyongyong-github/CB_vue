import Vue from "vue";
import VueRouter from "vue-router";// 导入全局注册的组件vue-router
import routes from "./routes";
Vue.use(VueRouter)

const router = new VueRouter({
    routes,
    mode: "history",
    base: process.env.BASE_URL,
})

export default router;