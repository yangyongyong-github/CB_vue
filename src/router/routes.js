import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Home from "@/views/Home";
// 其他的全部使用懒加载

import store from "@/store";

export default [
    // 首页 Home public
    { name: "home", path: '/', component: Home },
    // CB introduce page public
    {
        name: "introduce",
        path: '/introduce',
        component: () => import("@/views/Introduce")
    },
    // 受保护的页面，protect 
    {
        name: "protect",
        path: "/protect",
        component: () => import("@/views/Protect.vue"),
        beforeEnter(to, from, next) {
            if (store.state.loginUser.data) {
                next();
            } else {
                next("/login")
            }
        }
    },
    // ISwitch 界面 public
    {
        name: "toswitch",
        path: "/toswitch",
        component: () => import("@/views/Login/ToSwitch.vue")
    },

    // admin login 管理员登录页面
    {
        name: "login",
        path: "/adminlogin",
        component: () => import("@/views/Login/AdminLogin.vue")
    },
    // User_I login 登录页面
    {
        name: "userilogin",
        path: "/userilogin",
        component: () => import("@/views/Login/UserILogin.vue")
    },
    // User_II login 登录页面
    {
        name: "useriilogin",
        path: "/useriilogin",
        component: () => import("@/views/Login/UserIILogin.vue")
    },
    // 用户 注册页面
     // User_II
     {
        name: "useriiRegister",
        path: "/useriiRegister",
        component: () => import("@/views/Register/UserII.vue")
    },
    // admin Center
    {
        name: "admin",
        path: "/admin",
        component: () => import("@/views/Admin"),
        beforeEnter(to, from, next) {
            if (store.state.loginUser.data) {
                next();
            } else {
                alert('请先登录！');
                next("/adminlogin")
            }
        }
    },
    // User_I 用户中心，属于受保护的页面
    {
        name: "useri",
        path: "/useri",
        component: () => import("@/views/User_I"),
        beforeEnter(to, from, next) {
            if (store.state.useri_loginUser.data) {
                next();
            } else {
                alert('请先登录！');
                next("/userilogin")
            }
        }
    },
    // User_II Center pages , private
    {
        name: "userii",
        path: "/userii",
        component: () => import("@/views/User_II"),
        beforeEnter(to, from, next) {
            if (store.state.userii_loginUser.data) {
                next();
            } else {
                alert('请先登录！');
                next("/useriilogin")
            }
        }
    }
];

